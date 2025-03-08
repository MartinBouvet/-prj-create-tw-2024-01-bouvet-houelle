import styled from 'styled-components';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'users', label: 'Users' },
    { id: 'sensors', label: 'Sensors' },
    { id: 'measures', label: 'Measures' }
  ];

  return (
    <TabsContainer>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.isActive ? props.theme.primary : props.theme.cardBg};
  color: ${props => props.isActive ? 'white' : props.theme.text};
  font-size: 16px;
  font-weight: ${props => props.isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isActive ? props.theme.shadow : 'none'};
  
  &:hover {
    background-color: ${props => props.isActive ? props.theme.primary : props.theme.border};
  }
  
  &:focus {
    outline: none;
  }
`;

export default TabNavigation;