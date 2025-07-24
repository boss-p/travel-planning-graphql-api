import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import searchCitiesService from '../../services/searchCitiesService';

describe('SearchCitiesService', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('searchCities', () => {
    it('should return cities when API returns results', async () => {
      const mockResponse = {
        results: [
          {
            id: 1,
            name: 'Johannesburg',
            latitude: -26.20227,
            longitude: 28.04363,
            timezone: 'Africa/Johannesburg',
            country_code: 'ZA',
            country: 'South Africa',
            population: 957441
          }
        ]
      };

      mockAxios.onGet().reply(200, mockResponse);

      const result = await searchCitiesService.searchCities('Johan');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '1',
        name: 'Johannesburg',
        latitude: -26.20227,
        longitude: 28.04363,
        timezone: 'Africa/Johannesburg',
        country_code: 'ZA',
        country: 'South Africa',
        population: 957441
      });
    });

    it('should return empty array when no results', async () => {
      mockAxios.onGet().reply(200, {});

      const result = await searchCitiesService.searchCities('NonExistent');

      expect(result).toEqual([]);
    });

    it('should return empty array on API error', async () => {
      mockAxios.onGet().reply(500);

      const result = await searchCitiesService.searchCities('Error');

      expect(result).toEqual([]);
    });
  });
});