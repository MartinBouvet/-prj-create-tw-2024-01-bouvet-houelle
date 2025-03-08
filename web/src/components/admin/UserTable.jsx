import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const UserTable = ({ users = [], setUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    personsInHouse: 1,
    houseSize: 'small'
  });

  const openModal = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        location: user.location,
        personsInHouse: user.personsInHouse,
        houseSize: user.houseSize
      });
    } else {
      setCurrentUser(null);
      setFormData({
        location: '',
        personsInHouse: 1,
        houseSize: 'small'
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
      [name]: name === 'personsInHouse' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentUser) {
        // Update existing user
        const response = await axios.put(`http://localhost:5000/api/users/${currentUser._id}`, formData);
        setUsers(users.map(user => user._id === currentUser._id ? response.data : user));
      } else {
        // Create new user
        const response = await axios.post('http://localhost:5000/api/users', formData);
        setUsers([...users, response.data]);
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error);
      // In a real app, you would show an error message to the user
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        // In a real app, you would show an error message to the user
      }
    }
  };

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>Users</TableTitle>
        <AddButton onClick={() => openModal()}>
          <FaPlus />
          <span>Add User</span>
        </AddButton>
      </TableHeader>
      
      <Table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Persons In House</th>
            <th>House Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.location}</td>
              <td>{user.personsInHouse}</td>
              <td>{user.houseSize}</td>
              <td>
                <ActionButtons>
                  <ActionButton onClick={() => openModal(user)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton danger onClick={() => handleDelete(user._id)}>
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
              <ModalTitle>{currentUser ? 'Edit User' : 'Add User'}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="personsInHouse">Persons In House</Label>
                  <Input
                    type="number"
                    id="personsInHouse"
                    name="personsInHouse"
                    min="1"
                    max="10"
                    value={formData.personsInHouse}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="houseSize">House Size</Label>
                  <Select
                    id="houseSize"
                    name="houseSize"
                    value={formData.houseSize}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="big">Big</option>
                  </Select>
                </FormGroup>
                
                <ModalFooter>
                  <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                  <SubmitButton type="submit">{currentUser ? 'Update' : 'Create'}</SubmitButton>
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

export default UserTable;