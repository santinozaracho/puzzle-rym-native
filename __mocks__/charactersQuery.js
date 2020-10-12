import { GET_CHARACTERS } from '../src/queries/entityQueries';

const CHARACTERS_RESULT_DATA = {
  characters: {
    info: {
      next: 0,
      count: 3,
      pages: 1,
    },
    results: [
      {
        id: 330,
        name: 'Solicitor Rick',
        image: 'https://rickandmortyapi.com/api/character/avatar/330.jpeg',
      },
      {
        id: 330,
        name: 'Solicitor Rick',
        image: 'https://rickandmortyapi.com/api/character/avatar/330.jpeg',
      },
    ],
  },
};

export const CHARACTERS_MOCKS = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        page: 1,
        nameFilter: '',
        typeFilter: '',
      },
    },
    result: { data: CHARACTERS_RESULT_DATA },
  },
];
