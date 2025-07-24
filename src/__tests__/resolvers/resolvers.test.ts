import { resolvers } from '../../resolvers/resolvers';
import searchCitiesService from '../../services/searchCitiesService';
import weatherForecastService from '../../services/weatherForecastService';
import activityRankingService from '../../services/activityRankingService';

jest.mock('../../services/searchCitiesService');
jest.mock('../../services/weatherForecastService');
jest.mock('../../services/activityRankingService');

describe('GraphQL Resolvers', () => {
  const mockSearchCitiesService = searchCitiesService as jest.Mocked<typeof searchCitiesService>;
  const mockWeatherForecastService = weatherForecastService as jest.Mocked<typeof weatherForecastService>;
  const mockActivityRankingService = activityRankingService as jest.Mocked<typeof activityRankingService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('citySuggestions', () => {
    it('should return cities from service', async () => {
      const mockCities = [
        {
          id: '1',
          name: 'Johannesburg',
          latitude: -26.20227,
          longitude: 28.04363,
          country_code: 'ZA',
          timezone: 'Africa/Johannesburg',
          country: 'South Africa',
          population: 957441
        }
      ];

      mockSearchCitiesService.searchCities.mockResolvedValue(mockCities);

      const result = await resolvers.Query.citySuggestions(null, { query: 'Johan' });

      expect(result).toEqual(mockCities);
      expect(mockSearchCitiesService.searchCities).toHaveBeenCalledWith('Johan');
    });

    it('should return empty array on service error', async () => {
      mockSearchCitiesService.searchCities.mockRejectedValue(new Error('Service error'));

      const result = await resolvers.Query.citySuggestions(null, { query: 'Error' });

      expect(result).toEqual([]);
    });
  });

  describe('hourlyWeatherForecast', () => {
    it('should return weather forecast from service', async () => {
      const mockForecast = {
        latitude: -26.20227,
        longitude: 28.04363,
        timezone: 'Africa/Johannesburg',
        timezone_abbreviation: 'SAST',
        current_weather: {
          time: '2024-01-01T12:00',
          temperature: 25.5,
          weather_code: 0,
          weather_description: 'Clear sky',
          isDay: true
        },
        hourly_forecast: []
      };

      mockWeatherForecastService.getHourlyWeatherForecast.mockResolvedValue(mockForecast);

      const result = await resolvers.Query.hourlyWeatherForecast(
        null,
        { latitude: -26.20227, longitude: 28.04363 }
      );

      expect(result).toEqual(mockForecast);
      expect(mockWeatherForecastService.getHourlyWeatherForecast).toHaveBeenCalledWith(-26.20227, 28.04363);
    });

    it('should return null on service error', async () => {
      mockWeatherForecastService.getHourlyWeatherForecast.mockRejectedValue(new Error('Service error'));

      const result = await resolvers.Query.hourlyWeatherForecast(
        null,
        { latitude: -26.20227, longitude: 28.04363 }
      );

      expect(result).toBeNull();
    });
  });

  describe('dailyWeatherForecast', () => {
    it('should return daily forecast from service', async () => {
      const mockForecast = {
        latitude: -26.20227,
        longitude: 28.04363,
        timezone: 'Africa/Johannesburg',
        timezone_abbreviation: 'SAST',
        current_weather: {
          time: '2024-01-01T12:00',
          temperature: 25.5,
          weather_code: 0,
          weather_description: 'Clear sky',
          isDay: true
        },
        daily_forecast: []
      };

      mockWeatherForecastService.getDailyWeatherForecast.mockResolvedValue(mockForecast);

      const result = await resolvers.Query.dailyWeatherForecast(
        null,
        { latitude: -26.20227, longitude: 28.04363 }
      );

      expect(result).toEqual(mockForecast);
    });
  });

  describe('activityRankings', () => {
    it('should return activity rankings from service', async () => {
      const mockRankings = {
        date: '2024-01-01',
        skiing: { explanation: 'Too warm', score: 2 },
        surfing: { explanation: 'Good conditions', score: 7 },
        indoorSightseeing: { explanation: 'Standard conditions', score: 5 },
        outdoorSightseeing: { explanation: 'Perfect weather', score: 9 },
        weatherSummary: 'Clear sky with temperatures between 18°C and 26°C.'
      };

      mockActivityRankingService.getActivityRankings.mockResolvedValue(mockRankings);

      const result = await resolvers.Query.activityRankings(
        null,
        { latitude: -26.20227, longitude: 28.04363 }
      );

      expect(result).toEqual(mockRankings);
      expect(mockActivityRankingService.getActivityRankings).toHaveBeenCalledWith(-26.20227, 28.04363);
    });

    it('should return null on service error', async () => {
      mockActivityRankingService.getActivityRankings.mockRejectedValue(new Error('Service error'));

      const result = await resolvers.Query.activityRankings(
        null,
        { latitude: -26.20227, longitude: 28.04363 }
      );

      expect(result).toBeNull();
    });
  });
});