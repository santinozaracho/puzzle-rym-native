import { gql } from '@apollo/client';

export const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        name
        episode
      }
    }
  }
`;
export const GET_EPISODE = gql`
  query Epidose($id: ID!) {
    episode(id: $id) {
      name
      air_date
      episode
      characters {
        name
        image
      }
      created
    }
  }
`;
export const GET_LOCATION = gql`
  query Location($id: ID!) {
    location(id: $id) {
      name
      type
      dimension
      residents {
        name
        image
      }
      created
    }
  }
`;
export const GET_CHARACTERS = gql`
  query Characters($page: Int!, $nameFilter: String, $typeFilter: String) {
    characters(page: $page, filter: { name: $nameFilter, type: $typeFilter }) {
      info {
        next
        count
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`;
export const GET_EPISODES = gql`
  query Episodes($page: Int!, $nameFilter: String, $episodeFilter: String) {
    episodes(page: $page, filter: { name: $nameFilter, episode: $episodeFilter }) {
      info {
        next
        count
        pages
      }
      results {
        id
        episode
        name
      }
    }
  }
`;
export const GET_LOCATIONS = gql`
  query Locations($page: Int!, $nameFilter: String, $dimensionFilter: String) {
    locations(page: $page, filter: { name: $nameFilter, dimension: $dimensionFilter }) {
      info {
        next
        count
        pages
      }
      results {
        id
        name
        dimension
      }
    }
  }
`;
