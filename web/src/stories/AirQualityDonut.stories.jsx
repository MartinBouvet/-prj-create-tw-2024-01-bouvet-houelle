import AirQualityDonut from '../components/widgets/AirQualityDonut';

export default {
  title: 'Widgets/AirQualityDonut',
  component: AirQualityDonut,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const createAirQualityData = (avgValue) => {
  return Array(20).fill().map((_, index) => ({
    _id: `a${index}`,
    type: 'airPollution',
    creationDate: new Date(2024, 1, index + 1).toISOString(),
    sensorID: {
      _id: 's1',
      location: 'bedroom',
      userID: 'u1'
    },
    value: avgValue - 10 + Math.floor(Math.random() * 20)
  }));
};

export const Good = {
  args: {
    data: createAirQualityData(20)
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Moderate = {
  args: {
    data: createAirQualityData(40)
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Unhealthy = {
  args: {
    data: createAirQualityData(65)
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Dangerous = {
  args: {
    data: createAirQualityData(85)
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