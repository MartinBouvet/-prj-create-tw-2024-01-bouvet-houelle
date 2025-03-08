import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBed, FaCouch, FaBath, FaDoorOpen } from 'react-icons/fa';

const SensorMap = () => {
  // In a real application, we would get this data from an API
  const [sensorsByLocation, setSensorsByLocation] = useState({
    bedroom: { count: 35, color: '#3498db' },
    livingroom: { count: 28, color: '#2ecc71' },
    bathroom: { count: 23, color: '#9b59b6' },
    entrance: { count: 14, color: '#f1c40f' }
  });

  const getIcon = (location) => {
    switch (location) {
      case 'bedroom':
        return <FaBed />;
      case 'livingroom':
        return <FaCouch />;
      case 'bathroom':
        return <FaBath />;
      case 'entrance':
        return <FaDoorOpen />;
      default:
        return null;
    }
  };

  return (
    <MapContainer>
      <MapHeader>
        <MapTitle>Sensor Distribution</MapTitle>
        <MapSubtitle>Sensor placement throughout homes</MapSubtitle>
      </MapHeader>
      
      <HouseMapContainer>
        <HouseMap>
          <Room type="bedroom" color={sensorsByLocation.bedroom.color}>
            {getIcon('bedroom')}
            <RoomName>Bedroom</RoomName>
            <SensorCount>{sensorsByLocation.bedroom.count}</SensorCount>
          </Room>
          
          <Room type="livingroom" color={sensorsByLocation.livingroom.color}>
            {getIcon('livingroom')}
            <RoomName>Living Room</RoomName>
            <SensorCount>{sensorsByLocation.livingroom.count}</SensorCount>
          </Room>
          
          <Room type="bathroom" color={sensorsByLocation.bathroom.color}>
            {getIcon('bathroom')}
            <RoomName>Bathroom</RoomName>
            <SensorCount>{sensorsByLocation.bathroom.count}</SensorCount>
          </Room>
          
          <Room type="entrance" color={sensorsByLocation.entrance.color}>
            {getIcon('entrance')}
            <RoomName>Entrance</RoomName>
            <SensorCount>{sensorsByLocation.entrance.count}</SensorCount>
          </Room>
        </HouseMap>
      </HouseMapContainer>
      
      <MapLegend>
        {Object.entries(sensorsByLocation).map(([location, data]) => (
          <LegendItem key={location}>
            <LegendColor color={data.color} />
            <LegendText>{location.charAt(0).toUpperCase() + location.slice(1)}</LegendText>
          </LegendItem>
        ))}
      </MapLegend>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MapHeader = styled.div`
  margin-bottom: 20px;
`;

const MapTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.theme.text};
  margin-bottom: 5px;
`;

const MapSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

const HouseMapContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HouseMap = styled.div`
  width: 80%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

const Room = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => `${props.color}20`};
  border: 2px solid ${props => props.color};
  border-radius: 8px;
  padding: 20px;
  font-size: 24px;
  color: ${props => props.color};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const RoomName = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const SensorCount = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

const MapLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const LegendText = styled.span`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

export default SensorMap;