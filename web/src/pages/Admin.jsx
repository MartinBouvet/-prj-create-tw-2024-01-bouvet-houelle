// web/src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserTable from '../components/admin/UserTable';
import SensorTable from '../components/admin/SensorTable';
import MeasureTable from '../components/admin/MeasureTable';
import TabNavigation from '../components/admin/TabNavigation';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch data based on active tab
        switch (activeTab) {
          case 'users':
            const usersResponse = await axios.get('http://localhost:5000/api/users');
            setUsers(usersResponse.data);
            break;
          case 'sensors':
            const sensorsResponse = await axios.get('http://localhost:5000/api/sensors');
            setSensors(sensorsResponse.data);
            break;
          case 'measures':
            const measuresResponse = await axios.get('http://localhost:5000/api/measures');
            setMeasures(measuresResponse.data);
            break;
          default:
            break;
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AdminContainer>
      <Header>
        <Title>Administration</Title>
      </Header>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <ContentContainer>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            {activeTab === 'users' && <UserTable users={users} setUsers={setUsers} />}
            {activeTab === 'sensors' && <SensorTable sensors={sensors} setSensors={setSensors} />}
            {activeTab === 'measures' && <MeasureTable measures={measures} setMeasures={setMeasures} />}
          </>
        )}
      </ContentContainer>
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  padding: 20px;
  max-width: 1500px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${props => props.theme.text};
`;

const ContentContainer = styled.div`
  background-color: ${props => props.theme.cardBg};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadow};
  padding: 20px;
  min-height: 600px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 20px;
  color: ${props => props.theme.error};
`;

export default Admin;