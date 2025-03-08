import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const HumidityGauge = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);
  const [averageHumidity, setAverageHumidity] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      // Calculate average humidity
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const avg = Math.round(total / data.length);
      setAverageHumidity(avg);
      
      // Create gauge data
      setChartData([
        { name: 'Humidity', value: avg },
        { name: 'Remaining', value: 100 - avg }
      ]);
    }
  }, [data]);

  const COLORS = ['#3498db', '#ecf0f1'];

  // Determine humidity status
  const getHumidityStatus = (value) => {
    if (value < 30) return 'Low';
    if (value < 60) return 'Optimal';
    return 'High';
  };

  const humidityStatus = getHumidityStatus(averageHumidity);
  const statusColor = 
    humidityStatus === 'Low' ? '#e74c3c' :
    humidityStatus === 'Optimal' ? '#2ecc71' : 
    '#f39c12';

  return (
    <GaugeContainer>
      <GaugeHeader>
        <GaugeTitle>Average Humidity</GaugeTitle>
        <GaugeSubtitle>Current indoor humidity levels</GaugeSubtitle>
      </GaugeHeader>
      
      <GaugeContent>
        <ResponsiveContainer width="60%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        <GaugeInfo>
          <HumidityValue>{averageHumidity}%</HumidityValue>
          <HumidityStatus color={statusColor}>{humidityStatus}</HumidityStatus>
          <HumidityDescription>
            {humidityStatus === 'Low' && 'Low humidity can cause dry skin and respiratory issues.'}
            {humidityStatus === 'Optimal' && 'Optimal humidity levels for comfort and health.'}
            {humidityStatus === 'High' && 'High humidity can promote mold growth and feel uncomfortably warm.'}
          </HumidityDescription>
        </GaugeInfo>
      </GaugeContent>
    </GaugeContainer>
  );
};

const GaugeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const GaugeHeader = styled.div`
  margin-bottom: 20px;
`;

const GaugeTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.theme.text};
  margin-bottom: 5px;
`;

const GaugeSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

const GaugeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const GaugeInfo = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const HumidityValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.text};
`;

const HumidityStatus = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.color};
  padding: 5px 10px;
  border-radius: 20px;
  background-color: ${props => `${props.color}20`};
`;

const HumidityDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textLight};
  margin-top: 5px;
`;

export default HumidityGauge;