import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaSmog } from 'react-icons/fa';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Paris'); // Default city

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // In a real app, you would call a real weather API
        // Here we'll simulate a weather API response
        
        // This would be your actual API call:
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
        
        // Simulated response for demo purposes
        const simulatedResponse = {
          data: {
            name: city,
            main: {
              temp: 18,
              humidity: 65,
              feels_like: 17.5,
            },
            weather: [
              {
                main: 'Clouds',
                description: 'scattered clouds',
              }
            ],
            wind: {
              speed: 4.5,
            }
          }
        };
        
        setTimeout(() => {
          setWeather(simulatedResponse.data);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchWeather();
  }, [city]);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <FaSun />;
      case 'Clouds':
        return <FaCloud />;
      case 'Rain':
      case 'Drizzle':
        return <FaCloudRain />;
      case 'Snow':
        return <FaSnowflake />;
      case 'Thunderstorm':
        return <FaBolt />;
      default:
        return <FaSmog />;
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <WeatherContainer>
      <WeatherHeader>
        <WeatherTitle>Current Weather</WeatherTitle>
        <CitySelector value={city} onChange={handleCityChange}>
          <option value="Paris">Paris</option>
          <option value="London">London</option>
          <option value="New York">New York</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Sydney">Sydney</option>
        </CitySelector>
      </WeatherHeader>
      
      {loading ? (
        <LoadingMessage>Loading weather data...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <WeatherContent>
          <WeatherIconContainer>
            {getWeatherIcon(weather.weather[0].main)}
          </WeatherIconContainer>
          
          <WeatherInfo>
            <CityName>{weather.name}</CityName>
            <Temperature>{Math.round(weather.main.temp)}°C</Temperature>
            <WeatherDescription>
              {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
            </WeatherDescription>
          </WeatherInfo>
          
          <WeatherDetails>
            <WeatherDetail>
              <DetailLabel>Feels like</DetailLabel>
              <DetailValue>{Math.round(weather.main.feels_like)}°C</DetailValue>
            </WeatherDetail>
            <WeatherDetail>
              <DetailLabel>Humidity</DetailLabel>
              <DetailValue>{weather.main.humidity}%</DetailValue>
            </WeatherDetail>
            <WeatherDetail>
              <DetailLabel>Wind</DetailLabel>
              <DetailValue>{weather.wind.speed} m/s</DetailValue>
            </WeatherDetail>
          </WeatherDetails>
        </WeatherContent>
      )}
    </WeatherContainer>
  );
};

const WeatherContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const WeatherHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const WeatherTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.theme.text};
`;

const CitySelector = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.cardBg};
  color: ${props => props.theme.text};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const LoadingMessage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.textLight};
`;

const ErrorMessage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.danger};
`;

const WeatherContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WeatherIconContainer = styled.div`
  font-size: 60px;
  color: ${props => props.theme.primary};
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const CityName = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const Temperature = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${props => props.theme.text};
`;

const WeatherDescription = styled.div`
  font-size: 16px;
  color: ${props => props.theme.textLight};
`;

const WeatherDetails = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

const WeatherDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const DetailLabel = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textLight};
`;

const DetailValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

export default WeatherWidget;
