import styled from 'styled-components';
import { FaThermometerHalf, FaTint, FaWind, FaUsers, FaMicrochip } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'temperature':
        return <FaThermometerHalf />;
      case 'humidity':
        return <FaTint />;
      case 'airPollution':
        return <FaWind />;
      case 'users':
        return <FaUsers />;
      case 'sensor':
        return <FaMicrochip />;
      default:
        return <FaMicrochip />;
    }
  };

  return (
    <Card>
      <IconContainer color={color}>
        {renderIcon()}
      </IconContainer>
      <Content>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  height: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${props => `${props.color}20`};
  color: ${props => props.color};
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textLight};
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.text};
`;

export default StatCard;