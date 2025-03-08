import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const MeasureTable = ({ measures = [], setMeasures }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeasure, setCurrentMeasure] = useState(null);
  const [formData, setFormData] = useState({
    type: 'temperature',
    creationDate: new Date().toISOString().split('T')[0],
    sensorID: '',
    value: 0
  });
  const [sensors, setSensors] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: measures.length
  });

  useEffect(() => {
    // Fetch sensors for the dropdown
    const fetchSensors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sensors');
        setSensors(response.data);
        
        // Set default sensorID if sensors exist and no sensorID is set
        if (response.data.length > 0 && !formData.sensorID) {
          setFormData(prev => ({
            ...prev,
            sensorID: response.data[0]._id
          }));
        }
      } catch (error) {
        console.error('Error fetching sensors:', error);
      }
    };
    
    fetchSensors();
    
    // Update total items when measures change
    setPagination(prev => ({
      ...prev,
      totalItems: measures.length
    }));
  }, [measures]);

  const openModal = (measure = null) => {
    if (measure) {
      setCurrentMeasure(measure);
      setFormData({
        type: measure.type,
        creationDate: new Date(measure.creationDate).toISOString().split('T')[0],
        sensorID: measure.sensorID._id,
        value: measure.value
      });
    } else {
      setCurrentMeasure(null);
      setFormData({
        type: 'temperature',
        creationDate: new Date().toISOString().split('T')[0],
        sensorID: sensors.length > 0 ? sensors[0]._id : '',
        value: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'value' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentMeasure) {
        // Update existing measure
        const response = await axios.put(`http://localhost:5000/api/measures/${currentMeasure._id}`, formData);
        setMeasures(measures.map(measure => measure._id === currentMeasure._id ? response.data : measure));
      } else {
        // Create new measure
        const response = await axios.post('http://localhost:5000/api/measures', formData);
        setMeasures([...measures, response.data]);
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving measure:', error);
      // In a real app, you would show an error message to the user
    }
  };

  const handleDelete = async (measureId) => {
    if (window.confirm('Are you sure you want to delete this measure?')) {
      try {
        await axios.delete(`http://localhost:5000/api/measures/${measureId}`);
        setMeasures(measures.filter(measure => measure._id !== measureId));
      } catch (error) {
        console.error('Error deleting measure:', error);
        // In a real app, you would show an error message to the user
      }
    }
  };

  const getSensorName = (sensorId) => {
    const sensor = sensors.find(sensor => sensor._id === sensorId);
    return sensor ? `${sensor.location} (${new Date(sensor.creationDate).toLocaleDateString()})` : 'Unknown';
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setPagination({
      ...pagination,
      currentPage: page
    });
  };

  // Calculate the displayed items based on pagination
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = measures.slice(indexOfFirstItem, indexOfLastItem);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pagination.totalItems / pagination.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>Measures</TableTitle>
        <AddButton onClick={() => openModal()}>
          <FaPlus />
          <span>Add Measure</span>
        </AddButton>
      </TableHeader>
      
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Sensor</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(measure => (
            <tr key={measure._id}>
              <td>{measure.type}</td>
              <td>{new Date(measure.creationDate).toLocaleDateString()}</td>
              <td>{measure.sensorID?.location || 'Unknown'}</td>
              <td>
                {measure.type === 'temperature' ? `${measure.value}°C` : 
                 measure.type === 'humidity' ? `${measure.value}%` : 
                 `AQI: ${measure.value}`}
              </td>
              <td>
                <ActionButtons>
                  <ActionButton onClick={() => openModal(measure)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton danger onClick={() => handleDelete(measure._id)}>
                    <FaTrash />
                  </ActionButton>
                </ActionButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Pagination>
        <PaginationButton 
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
        >
          Previous
        </PaginationButton>
        
        {pageNumbers.map(number => (
          <PageNumber
            key={number}
            active={pagination.currentPage === number}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </PageNumber>
        ))}
        
        <PaginationButton
          disabled={pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
        >
          Next
        </PaginationButton>
      </Pagination>
      
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{currentMeasure ? 'Edit Measure' : 'Add Measure'}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="airPollution">Air Pollution</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="creationDate">Creation Date</Label>
                  <Input
                    type="date"
                    id="creationDate"
                    name="creationDate"
                    value={formData.creationDate}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="sensorID">Sensor</Label>
                  <Select
                    id="sensorID"
                    name="sensorID"
                    value={formData.sensorID}
                    onChange={handleInputChange}
                    required
                  >
                    {sensors.map(sensor => (
                      <option key={sensor._id} value={sensor._id}>
                        {sensor.location} ({new Date(sensor.creationDate).toLocaleDateString()})
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="value">
                    Value 
                    {formData.type === 'temperature' ? ' (°C)' : 
                     formData.type === 'humidity' ? ' (%)' : 
                     ' (AQI)'}
                  </Label>
                  <Input
                    type="number"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.type === 'humidity' ? '100' : ''}
                    step="0.1"
                    required
                  />
                </FormGroup>
                
                <ModalFooter>
                  <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                  <SubmitButton type="submit">{currentMeasure ? 'Update' : 'Create'}</SubmitButton>
                </ModalFooter>
              </Form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TableTitle = styled.h2`
  font-size: 20px;
  color: ${props => props.theme.text};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.info};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.border};
  }
  
  th {
    font-weight: 600;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.background};
  }
  
  tr:hover {
    background-color: ${props => props.theme.background};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${props => props.danger ? `${props.theme.danger}20` : `${props.theme.primary}20`};
  color: ${props => props.danger ? props.theme.danger : props.theme.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.danger ? props.theme.danger : props.theme.primary};
    color: white;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  background-color: ${props => props.theme.cardBg};
  color: ${props => props.disabled ? props.theme.border : props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 14px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.disabled ? props.theme.cardBg : props.theme.background};
  }
`;

const PageNumber = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${props => props.active ? props.theme.primary : props.theme.cardBg};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.primary : props.theme.background};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.cardBg};
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  color: ${props => props.theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${props => props.theme.textLight};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${props => props.theme.text};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.theme.cardBg};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.border};
  }
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.info};
  }
`;

export default MeasureTable;