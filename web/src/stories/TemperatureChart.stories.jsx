import TemperatureChart from '../components/widgets/TemperatureChart';

export default {
  title: 'Widgets/TemperatureChart',
  component: TemperatureChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const mockData = [
  {
    _id: '1',
    type: 'temperature',
    creationDate: '2024-02-01T12:00:00Z',
    sensorID: {
      _id: 's1',
      location: 'bedroom',
      userID: 'u1'
    },
    value: 22
  },
  {
    _id: '2',
    type: 'temperature',
    creationDate: '2024-02-02T12:00:00Z',
    sensorID: {
      _id: 's1',
      location: 'bedroom',
      userID: 'u1'
    },
    value: 23
  },
  {
    _id: '3',
    type: 'temperature',
    creationDate: '2024-02-03T12:00:00Z',
    sensorID: {
      _id: 's1',
      location: 'bedroom',
      userID: 'u1'
    },
    value: 21
  },
  {
    _id: '4',
    type: 'temperature',
    creationDate: '2024-02-04T12:00:00Z',
    sensorID: {
      _id: 's1',
      location: 'bedroom',
      userID: 'u1'
    },
    value: 24
  },
  {
    _id: '5',
    type: 'temperature',
    creationDate: '2024-02-05T12:00:00Z',
    sensorID: {
        _id: 's1',
        location: 'bedroom',
        userID: 'u1'
      },
      value: 25
    },
    {
      _id: '6',
      type: 'temperature',
      creationDate: '2024-02-06T12:00:00Z',
      sensorID: {
        _id: 's2',
        location: 'livingroom',
        userID: 'u2'
      },
      value: 23
    },
    {
      _id: '7',
      type: 'temperature',
      creationDate: '2024-02-07T12:00:00Z',
      sensorID: {
        _id: 's2',
        location: 'livingroom',
        userID: 'u2'
      },
      value: 22
    }
  ];
  
  export const Default = {
    args: {
      data: mockData
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
  