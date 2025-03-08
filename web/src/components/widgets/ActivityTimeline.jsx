import { useState } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { FaThermometerHalf, FaTint, FaWind } from 'react-icons/fa';

const ActivityTimeline = ({ data = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'temperature':
        return <FaThermometerHalf />;
      case 'humidity':
        return <FaTint />;
      case 'airPollution':
        return <FaWind />;
      default:
        return null;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'temperature':
        return '#FF7F50';
      case 'humidity':
        return '#3498db';
      case 'airPollution':
        return '#9b59b6';
      default:
        return '#7f8c8d';
    }
  };

  const getFormattedValue = (type, value) => {
    switch (type) {
      case 'temperature':
        return `${value}°C`;
      case 'humidity':
        return `${value}%`;
      case 'airPollution':
        return `AQI: ${value}`;
      default:
        return value;
    }
  };

  return (
    <TimelineContainer>
      <TimelineHeader>
        <TimelineTitle>Recent Activity</TimelineTitle>
        <TimelineSubtitle>Latest sensor readings</TimelineSubtitle>
      </TimelineHeader>
      
      <Timeline>
        {data.map((activity, index) => (
          <TimelineItem key={index}>
            <TimelineIconContainer color={getColor(activity.type)}>
              {getIcon(activity.type)}
            </TimelineIconContainer>
            
            <TimelineContent>
              <TimelineInfo>
                <TimelineType>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} reading</TimelineType>
                <TimelineValue>{getFormattedValue(activity.type, activity.value)}</TimelineValue>
              </TimelineInfo>
              
              <TimelineDetails>
                <TimelineLocation>
                  {activity.sensorID?.location || 'Unknown location'}
                </TimelineLocation>
                <TimelineTime>
                  {activity.creationDate ? format(parseISO(activity.creationDate), 'MMM dd, yyyy • HH:mm') : 'Unknown date'}
                </TimelineTime>
              </TimelineDetails>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineContainer>
  );
};

const TimelineContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TimelineHeader = styled.div`
  margin-bottom: 20px;
`;

const TimelineTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.theme.text};
  margin-bottom: 5px;
`;
const TimelineSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  max-height: 350px;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.border};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 10px;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 15px;
`;

const TimelineIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => `${props.color}20`};
  color: ${props => props.color};
  font-size: 16px;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const TimelineInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimelineType = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const TimelineValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.primary};
`;

const TimelineDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimelineLocation = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

const TimelineTime = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

export default ActivityTimeline;