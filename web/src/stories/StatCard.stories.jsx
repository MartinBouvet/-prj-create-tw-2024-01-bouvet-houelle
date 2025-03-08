import StatCard from '../components/widgets/StatCard';

export default {
  title: 'Widgets/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    icon: { 
      control: { type: 'select' }, 
      options: ['temperature', 'humidity', 'airPollution', 'users', 'sensor'],
    },
    color: { control: 'color' },
  },
};

export const Temperature = {
  args: {
    title: 'Average Temperature',
    value: '24°C',
    icon: 'temperature',
    color: '#FF7F50',
  },
};

export const Humidity = {
  args: {
    title: 'Average Humidity',
    value: '45%',
    icon: 'humidity',
    color: '#3498db',
  },
};

export const AirPollution = {
  args: {
    title: 'Air Quality Index',
    value: 'AQI: 35',
    icon: 'airPollution',
    color: '#9b59b6',
  },
};

export const Users = {
  args: {
    title: 'Active Users',
    value: '20',
    icon: 'users',
    color: '#2ecc71',
  },
};

export const Sensors = {
  args: {
    title: 'Total Sensors',
    value: '100',
    icon: 'sensor',
    color: '#f39c12',
  },
};