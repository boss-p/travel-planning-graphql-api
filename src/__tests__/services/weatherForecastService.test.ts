import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import weatherForecastService from '../../services/weatherForecastService';

describe('WeatherForecastService', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('getHourlyWeatherForecast', () => {
    it('should return formatted hourly weather data', async () => {
      const mockResponse = {
        latitude: -26.20227,
        longitude: 28.04363,
        timezone: 'Africa/Johannesburg',
        timezone_abbreviation: 'SAST',
        current_weather: {
          time: '2024-01-01T12:00',
          temperature: 25.5,
          weathercode: 0,
          is_day: 1
        },
        hourly: {
          time: ['2024-01-01T12:00', '2024-01-01T13:00'],
          temperature_2m: [25.5, 26.0],
          weather_code: [0, 1]
        }
      };

      mockAxios.onGet().reply(200, mockResponse);

      const result = await weatherForecastService.getHourlyWeatherForecast(-26.20227, 28.04363);

      expect(result.latitude).toBe(-26.20227);
      expect(result.current_weather.temperature).toBe(25.5);
      expect(result.current_weather.weather_description).toBe('Clear sky');
      expect(result.hourly_forecast).toHaveLength(2);
    });

    it('should throw error on API failure', async () => {
      mockAxios.onGet().reply(500);

      await expect(
        weatherForecastService.getHourlyWeatherForecast(-26.20227, 28.04363)
      ).rejects.toThrow('Unable to retrieve weather forecast.');
    });
  });

  describe('getDailyWeatherForecast', () => {
    it('should return formatted daily weather data', async () => {
      const mockResponse = {
        latitude: -26.20227,
        longitude: 28.04363,
        timezone: 'Africa/Johannesburg',
        timezone_abbreviation: 'SAST',
        current_weather: {
          time: '2024-01-01T12:00',
          temperature: 25.5,
          weathercode: 0,
          is_day: 1
        },
        daily: {
          time: ['2024-01-01'],
          temperature_2m_min: [15.0],
          temperature_2m_max: [28.0],
          weather_code: [0],
          precipitation_sum: [0.0],
          wind_speed_10m_max: [10.5]
        }
      };

      mockAxios.onGet().reply(200, mockResponse);

      const result = await weatherForecastService.getDailyWeatherForecast(-26.20227, 28.04363);

      expect(result.latitude).toBe(-26.20227);
      expect(result.daily_forecast).toHaveLength(1);
      expect(result.daily_forecast[0].temperature_min).toBe(15.0);
      expect(result.daily_forecast[0].weather_description).toBe('Clear sky');
    });
  });
});