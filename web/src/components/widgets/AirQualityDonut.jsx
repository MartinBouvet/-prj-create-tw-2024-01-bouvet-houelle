import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AirQualityDonut = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);
  const [averageValue, setAverageValue] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      // Calculate average air pollution
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const avg = Math.round(total / data.length);
      setAverageValue(avg);
      
      // Group data by quality ranges
      const ranges = [
        { name: 'Good (0-25)', range: [0, 25], count: 0, color: '#2ecc71' },
        { name: 'Moderate (26-50)', range: [26, 50], count: 0, color: '#f1c40f' },
        { name: 'Unhealthy (51-75)', range: [51, 75], count: 0, color: '#e67e22' },
        { name: 'Dangerous (76-100)', range: [76, 100], count: 0, color: '#e74c3c' }
      ];
      
      data.forEach(item => {
        for (const range of ranges) {
          if (item.value >= range.range[0] && item.value <= range.range[1]) {
            range.count++;
            break;
          }
        }
      });
      
      // Filter out ranges with no data
      const filteredRanges = ranges.filter(range => range.count > 0);
      setChartData(filteredRanges);
    }
  }, [data]);

  // Determine air quality status
  const getAirQualityStatus = (value) => {
    if (value <= 25) return { text: 'Good', color: '#2ecc71' };
    if (value <= 50) return { text: 'Moderate', color: '#f1c40f' };
    if (value <= 75) return { text: 'Unhealthy', color: '#e67e22' };
    return { text: 'Dangerous', color: '#e74c3c' };
  };

  const airQuality = getAirQualityStatus(averageValue);

  return (
    <DonutContainer>
      <DonutHeader>
        <DonutTitle>Air Quality Index</DonutTitle>
        <DonutSubtitle>Distribution of air pollution measurements</DonutSubtitle>
      </DonutHeader>
      
      <DonutContent>
        <ResponsiveContainer width="60%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="count"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} readings`, 'Count']} />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
        
        <AirQualityInfo>
          <AirQualityValue>AQI: {averageValue}</AirQualityValue>
          <AirQualityStatus color={airQuality.color}>{airQuality.text}</AirQualityStatus>
          <AirQualityDescription>
            {airQuality.text === 'Good' && 'Air quality is satisfactory, and air pollution poses little or no risk.'}
            {airQuality.text === 'Moderate' && 'Air quality is acceptable; however, there may be some concern for certain people.'}
            {airQuality.text === 'Unhealthy' && 'Some members of the general public may experience health effects.'}
            {airQuality.text === 'Dangerous' && 'Health warnings of emergency conditions. The entire population is likely to be affected.'}
          </AirQualityDescription>
        </AirQualityInfo>
      </DonutContent>
    </DonutContainer>
  );
};

const DonutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DonutHeader = styled.div`
  margin-bottom: 20px;
`;

const DonutTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.theme.text};
  margin-bottom: 5px;
`;

const DonutSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

const DonutContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const AirQualityInfo = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const AirQualityValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.text};
`;

const AirQualityStatus = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.color};
  padding: 5px 10px;
  border-radius: 20px;
  background-color: ${props => `${props.color}20`};
`;

const AirQualityDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textLight};
  margin-top: 5px;
`;

export default AirQualityDonut;
