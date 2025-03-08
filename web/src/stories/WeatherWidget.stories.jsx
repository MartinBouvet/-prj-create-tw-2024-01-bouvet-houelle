import WeatherWidget from '../components/widgets/WeatherWidget';

export default {
  title: 'Widgets/WeatherWidget',
  component: WeatherWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
};