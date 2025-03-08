import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const SensorTable = ({ sensors = [], setSensors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSensor, setCurrentSensor] = useState(null);
  const [formData, setFormData] = useState({
    creationDate: new Date().toISOString().split('T')[0],
    location: 'bedroom',
    userID: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users for the dropdown
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
        
        // Set default userID if users exist and no userID is set
        if (response.data.length > 0 && !formData.userID) {
          setFormData(prev => ({
            ...prev,
            userID: response.data[0]._id
          }));
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);

  const openModal = (sensor = null) => {
    if (sensor) {
      setCurrentSensor(sensor);
      setFormData({
        creationDate: new Date(sensor.creationDate).toISOString().split('T')[0],
        location: sensor.location,
        userID: sensor.userID._id
      });
    } else {
      setCurrentSensor(null);
      setFormData({
        creationDate: new Date().toISOString().split('T')[0],
        location: 'bedroom',
        userID: users.length > 0 ? users[0]._id : ''
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
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentSensor) {
        // Update existing sensor
        const response = await axios.put(`http://localhost:5000/api/sensors/${currentSensor._id}`, formData);
        setSensors(sensors.map(sensor => sensor._id === currentSensor._id ? response.data : sensor));
      } else {
        // Create new sensor
        const response = await axios.post('http://localhost:5000/api/sensors', formData);
        setSensors([...sensors, response.data]);
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving sensor:', error);
      // In a real app, you would show an error message to the user
    }
  };

  const handleDelete = async (sensorId) => {
    if (window.confirm('Are you sure you want to delete this sensor?')) {
      try {
        await axios.delete(`http://localhost:5000/api/sensors/${sensorId}`);
        setSensors(sensors.filter(sensor => sensor._id !== sensorId));
      } catch (error) {
        console.error('Error deleting sensor:', error);
        // In a real app, you would show an error message to the user
      }
    }
  };

  const getUserName = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? `${user.location} (${user.houseSize} house)` : 'Unknown';
  };

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>Sensors</TableTitle>
        <AddButton onClick={() => openModal()}>
          <FaPlus />
          <span>Add Sensor</span>
        </AddButton>
      </TableHeader>
      
      <Table>
        <thead>
          <tr>
            <th>Creation Date</th>
            <th>Location</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map(sensor => (
            <tr key={sensor._id}>
              <td>{new Date(sensor.creationDate).toLocaleDateString()}</td>
              <td>{sensor.location}</td>
              <td>{sensor.userID?.location || 'Unknown'}</td>
              <td>
                <ActionButtons>
                  <ActionButton onClick={() => openModal(sensor)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton danger onClick={() => handleDelete(sensor._id)}>
                    <FaTrash />
                  </ActionButton>
                </ActionButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{currentSensor ? 'Edit Sensor' : 'Add Sensor'}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <Form onSubmit={handleSubmit}>
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
                  <Label htmlFor="location">Location</Label>
                  <Select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="bedroom">Bedroom</option>
                    <option value="livingroom">Living Room</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="entrance">Entrance</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="userID">User</Label>
                  <Select
                    id="userID"
                    name="userID"
                    value={formData.userID}
                    onChange={handleInputChange}
                    required
                  >
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.location} ({user.houseSize} house)
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                
                <ModalFooter>
                  <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                  <SubmitButton type="submit">{currentSensor ? 'Update' : 'Create'}</SubmitButton>
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

export default SensorTable;
