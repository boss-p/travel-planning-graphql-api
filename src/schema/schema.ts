import { gql } from "graphql-tag";

export const typeDefs = gql`
  # City data schema
  type City {
    id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
    country_code: String
    timezone: String
    country: String!
    population: Int
  }

  # Weather forcasts types
  type HourlyWeatherForecast {
    latitude: Float!
    longitude: Float!
    timezone: String
    timezone_abbreviation: String
    current_weather: CurrentWeather!
    hourly_forecast: [HourlyWeather!]!
  }

  type DailyWeatherForecast {
    latitude: Float!
    longitude: Float!
    timezone: String
    timezone_abbreviation: String
    current_weather: CurrentWeather!
    daily_forecast: [DailyWeather!]!
  }

  type CurrentWeather {
    time: String!
    temperature: Float!
    weather_code: Int
    weather_description: String
    isDay: Boolean!
  }

  type HourlyWeather {
    time: String!
    temperature: Float!
    weather_code: Int
    weather_description: String
  }

  type DailyWeather {
    date: String!
    temperature_min: Float!
    temperature_max: Float!
    weather_code: Int
    weather_description: String
    wind_speed_max: Float
    precipitation_sum: Float
  }

  # Activity ranking types
  type ActivityRankings {
    date: String!
    skiing: RankingScore!
    surfing: RankingScore!
    indoorSightseeing: RankingScore!
    outdoorSightseeing: RankingScore!
    weatherSummary: String!
  }
  type RankingScore {
    explanation: String!
    score: Float!
  }

  type Query {
    # Get city suggestions based on partial or complete user input
    citySuggestions(query: String!): [City!]!

    # Get hourly weather forecast for a selected city
    hourlyWeatherForecast(
      latitude: Float!
      longitude: Float!
    ): HourlyWeatherForecast

    # Get daily weather forecast for a selected city
    dailyWeatherForecast(
      latitude: Float!
      longitude: Float!
    ): DailyWeatherForecast

    # Get activity rankings based on weather forecast for a location
    activityRankings(latitude: Float!, longitude: Float!): ActivityRankings
  }
`;
