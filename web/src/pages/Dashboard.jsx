import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { format } from 'date-fns';

import StatCard from '../components/widgets/StatCard';
import TemperatureChart from '../components/widgets/TemperatureChart';
import HumidityGauge from '../components/widgets/HumidityGauge';
import AirQualityDonut from '../components/widgets/AirQualityDonut';
import SensorMap from '../components/widgets/SensorMap';
import ActivityTimeline from '../components/widgets/ActivityTimeline';
import WeatherWidget from '../components/widgets/WeatherWidget';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentMeasures, setRecentMeasures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats by type
        const statsResponse = await axios.get('http://localhost:5000/api/measures/stats/by-type');
        setStats(statsResponse.data);
        
        // Fetch recent measures
        const recentResponse = await axios.get('http://localhost:5000/api/measures/stats/recent');
        setRecentMeasures(recentResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  // Process data for different widgets
  const temperatureData = recentMeasures.filter(measure => measure.type === 'temperature');
  const humidityData = recentMeasures.filter(measure => measure.type === 'humidity');
  const airPollutionData = recentMeasures.filter(measure => measure.type === 'airPollution');

  return (
    <DashboardContainer>
      <Header>
        <Title>P.E.IoT Dashboard</Title>
        <DateDisplay>{format(new Date(), 'EEEE, MMMM do yyyy')}</DateDisplay>
      </Header>

      <WidgetGrid>
        <GridItem area="stat1">
          <StatCard 
            title="Total Sensors" 
            value={100} 
            icon="sensor" 
            color={theme.primary} 
          />
        </GridItem>
        <GridItem area="stat2">
          <StatCard 
            title="Active Users" 
            value={20} 
            icon="users" 
            color={theme.secondary} 
          />
        </GridItem>
        <GridItem area="stat3">
          <StatCard 
            title="Avg. Temperature" 
            value="24°C" 
            icon="temperature" 
            color={theme.warning} 
          />
        </GridItem>
        <GridItem area="stat4">
          <StatCard 
            title="Avg. Humidity" 
            value="45%" 
            icon="humidity" 
            color={theme.info} 
          />
        </GridItem>
        
        <GridItem area="temp">
          <TemperatureChart data={temperatureData} />
        </GridItem>
        
        <GridItem area="humidity">
          <HumidityGauge data={humidityData} />
        </GridItem>
        
        <GridItem area="air">
          <AirQualityDonut data={airPollutionData} />
        </GridItem>
        
        <GridItem area="map">
          <SensorMap />
        </GridItem>
        
        <GridItem area="timeline">
          <ActivityTimeline data={recentMeasures.slice(0, 10)} />
        </GridItem>
        
        <GridItem area="weather">
          <WeatherWidget />
        </GridItem>
      </WidgetGrid>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1500px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${props => props.theme.text};
`;

const DateDisplay = styled.div`
  font-size: 16px;
  color: ${props => props.theme.textLight};
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "stat1 stat2 stat3 stat4"
    "temp temp humidity humidity"
    "air air map map"
    "timeline timeline weather weather";
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "stat1 stat2"
      "stat3 stat4"
      "temp temp"
      "humidity humidity"
      "air air"
      "map map"
      "timeline timeline"
      "weather weather";
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "stat1"
      "stat2"
      "stat3"
      "stat4"
      "temp"
      "humidity"
      "air"
      "map"
      "timeline"
      "weather";
  }
`;

const GridItem = styled.div`
  grid-area: ${props => props.area};
  background-color: ${props => props.theme.cardBg};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadow};
  padding: 20px;
  transition: ${props => props.theme.transition};
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 20px;
  color: ${props => props.theme.danger};
`;

export default Dashboard;