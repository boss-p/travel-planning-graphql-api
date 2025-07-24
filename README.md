# Travel Planning GraphQL API

A scalable and maintainable GraphQL API for a travel planning application that provides city suggestions, weather forecasts, and activity rankings based on weather conditions.

## Features

- Dynamic city suggestions based on partial or complete user input
- Weather forecasts for selected cities
- Activity rankings based on weather conditions for:
  - Skiing
  - Surfing
  - Indoor sightseeing
  - Outdoor sightseeing

## Architecture Overview

The application follows a clean architecture pattern with clear separation of concerns:

- **GraphQL Schema**: Defines the API contract with types and queries
- **Resolvers**: Handle GraphQL queries and delegate to services
- **Services**: Contain business logic and interact with external APIs
- **Tests**: Unit tests for services and resolvers

### Tech Stack

- Node.js
- Apollo Server v4 for GraphQL
- Axios for HTTP requests
- Jest for testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. Open Apollo Explorer at http://localhost:4000

## API Usage

### City Suggestions

# Dynamic city suggestions based on partial or complete user input

```graphql
query {
  citySuggestions(query: "Johan") {
    id
    name
    latitude
    longitude
    timezone
    country_code
    country
    population
  }
}
```

### Weather Forecast

# Weather forecasts for selected city. The weather data for the current weather forecast and all the available hourly weather forecasts for that city

```graphql
# Fetch hourly weather forecasts
query {
  hourlyWeatherForecast(latitude: -26.20227, longitude: 28.04363) {
    timezone
    timezone_abbreviation
    current_weather {
      time
      temperature
      weather_code
      weather_description
      isDay
    }
    hourly_forecast {
      time
      temperature
      weather_code
      weather_description
    }
  }
}
```

```graphql
# Fetch daily weather forecasts
query {
  dailyWeatherForecast(latitude: -26.20227, longitude: 28.04363) {
    latitude
    longitude
    timezone
    timezone_abbreviation
    current_weather {
      time
      temperature
      weather_code
      weather_description
      isDay
    }
    daily_forecast {
      date
      temperature_min
      temperature_max
      weather_code
      weather_description
      wind_speed_max
      precipitation_sum
    }
  }
}
```

```graphql
# This service ranks 4 activities (Skiing, Surfing, Indoor sightseeing, Outdoor sightseeing) based on daily weather conditions, using the forecast data retrieved from openMeteoService
query {
  activityRankings(latitude: -26.20227, longitude: 28.04363) {
    date
    weatherSummary
    skiing {
      explanation
      score
    }
    surfing {
      explanation
      score
    }
    indoorSightseeing {
      explanation
      score
    }
    outdoorSightseeing {
      explanation
      score
    }
  }
}
```
