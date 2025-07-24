import activityRankingService from '../../services/activityRankingService';
import weatherForecastService from '../../services/weatherForecastService';

jest.mock('../../services/weatherForecastService');

describe('ActivityRankingService', () => {
  const mockWeatherForecastService = weatherForecastService as jest.Mocked<typeof weatherForecastService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getActivityRankings', () => {
    it('should return activity rankings for good weather', async () => {
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
        daily_forecast: [{
          date: '2024-01-01',
          temperature_min: 18.0,
          temperature_max: 26.0,
          weather_code: 0,
          weather_description: 'Clear sky',
          wind_speed_max: 8.0,
          precipitation_sum: 0.0
        }]
      };

      mockWeatherForecastService.getDailyWeatherForecast.mockResolvedValue(mockForecast);

      const result = await activityRankingService.getActivityRankings(-26.20227, 28.04363);

      expect(result.date).toBe('2024-01-01');
      expect(result.skiing.score).toBeLessThan(5);
      expect(result.surfing.score).toBeGreaterThan(5);
      expect(result.outdoorSightseeing.score).toBeGreaterThan(7);
      expect(result.weatherSummary).toContain('Clear sky');
    });

    it('should return activity rankings for snowy weather', async () => {
      const mockForecast = {
        latitude: 46.8182,
        longitude: 8.2275,
        timezone: 'Europe/Zurich',
        timezone_abbreviation: 'CET',
        current_weather: {
          time: '2024-01-01T12:00',
          temperature: -2.0,
          weather_code: 73,
          weather_description: 'Moderate snow fall',
          isDay: true
        },
        daily_forecast: [{
          date: '2024-01-01',
          temperature_min: -5.0,
          temperature_max: 2.0,
          weather_code: 73,
          weather_description: 'Moderate snow fall',
          wind_speed_max: 15.0,
          precipitation_sum: 8.0
        }]
      };

      mockWeatherForecastService.getDailyWeatherForecast.mockResolvedValue(mockForecast);

      const result = await activityRankingService.getActivityRankings(46.8182, 8.2275);

      expect(result.skiing.score).toBeGreaterThan(7);
      expect(result.outdoorSightseeing.score).toBeLessThan(4);
      expect(result.indoorSightseeing.score).toBeGreaterThan(7);
    });

    it('should throw error when weather service fails', async () => {
      mockWeatherForecastService.getDailyWeatherForecast.mockRejectedValue(new Error('API Error'));

      await expect(
        activityRankingService.getActivityRankings(-26.20227, 28.04363)
      ).rejects.toThrow('Failed to get activity rankings');
    });
  });
});