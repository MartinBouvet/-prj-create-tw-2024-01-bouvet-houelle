import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';

const TemperatureChart = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // Process data for the chart
      const processedData = data.slice(0, 20).map(item => ({
        date: format(parseISO(item.creationDate), 'MMM dd'),
        value: item.value,
        location: item.sensorID?.location || 'Unknown'
      }));
      
      setChartData(processedData);
    }
  }, [data]);

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Temperature Trends</ChartTitle>
        <ChartSubtitle>Last 20 temperature readings (°C)</ChartSubtitle>
      </ChartHeader>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value) => [`${value}°C`, 'Temperature']}
            labelFormatter={(value) => `Date: ${value}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#FF7F50" 
            activeDot={{ r: 8 }}
            name="Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  margin-bottom: 20px;
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.theme.text};
  margin-bottom: 5px;
`;

const ChartSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

export default TemperatureChart;