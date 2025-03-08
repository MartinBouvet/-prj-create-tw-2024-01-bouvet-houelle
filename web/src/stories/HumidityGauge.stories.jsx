import HumidityGauge from '../components/widgets/HumidityGauge';

export default {
  title: 'Widgets/HumidityGauge',
  component: HumidityGauge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const createMockData = (avgValue) => {
  return Array(10).fill().map((_, index) => ({
    _id: `h${index}`,
    type: 'humidity',
    creationDate: new Date(2024, 1, index + 1).toISOString(),
    sensorID: {
      _id: 's1',
      location: 'bedroom',
      userID: 'u1'
    },
    value: avgValue - 5 + Math.floor(Math.random() * 10)
  }));
};

export const Low = {
  args: {
    data: createMockData(25)
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Optimal = {
  args: {
    data: createMockData(45)
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const High = {
  args: {
    data: createMockData(75)
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithNoData = {
  args: {
    data: []
  },
  parameters: {
    layout: 'fullscreen',
  },
};