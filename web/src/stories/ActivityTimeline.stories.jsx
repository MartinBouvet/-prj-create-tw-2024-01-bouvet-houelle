import ActivityTimeline from '../components/widgets/ActivityTimeline';

export default {
  title: 'Widgets/ActivityTimeline',
  component: ActivityTimeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const createTimelineData = () => {
  const types = ['temperature', 'humidity', 'airPollution'];
  const locations = ['bedroom', 'livingroom', 'bathroom', 'entrance'];
  
  return Array(10).fill().map((_, index) => ({
    _id: `tl${index}`,
    type: types[index % 3],
    creationDate: new Date(2024, 1, 20 - index, 10, 30).toISOString(),
    sensorID: {
      _id: `s${index % 4 + 1}`,
      location: locations[index % 4],
      userID: `u${index % 3 + 1}`
    },
    value: types[index % 3] === 'temperature' ? 20 + Math.floor(Math.random() * 20) :
           types[index % 3] === 'humidity' ? 30 + Math.floor(Math.random() * 60) :
           10 + Math.floor(Math.random() * 90)
  }));
};

export const Default = {
  args: {
    data: createTimelineData()
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
