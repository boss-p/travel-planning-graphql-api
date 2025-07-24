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
  type WeatherForecast {
    latitude: Float!
    longitude: Float!
    timezone: String
    timezone_abbreviation: String
    current_weather: CurrentWeather!
    hourly_forecast: [HourlyWeather!]!
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

# Activity ranking types
  type ActivityRanking {
    activity: String!
    score: Float!
  }

  type ActivityRankings {
    rankings: [ActivityRanking!]!
  }

  type Query {
    # Get city suggestions based on partial or complete user input
    citySuggestions(query: String!): [City!]!

    # Get weather forecast for a selected city
    weatherForecast(latitude: Float!, longitude: Float!): WeatherForecast

    # Get activity rankings based on weather forecast for a location
    # activityRankings(latitude: Float!, longitude: Float!): ActivityRankings!
  }
`;
