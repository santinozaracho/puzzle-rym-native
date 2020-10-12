import React from 'react';
import { useQuery } from '@apollo/client';
import GridView from '../GridView';
import useQueryContext from '../../../store/QueryContext';
import ErrorView from '../../ErrorView';
import LoadingView from '../../LoadingView';
import { GET_CHARACTERS } from '../../../queries/entityQueries';

/**
 * @description Characters Component is responsible for Query Characters to API and render the Grid View.
 * @return {component}
 */

const componentSelector = (loading: any, error: any, data: any) => {
  if (data) {
    const {
      characters: { results, info },
    } = data;

    return <GridView collectionResult={results} pages={info.pages} />;
  }
  if (loading) return <LoadingView />;

  return <ErrorView />;
};

const Characters: React.FC = () => {
  const { query } = useQueryContext();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: query.page,
      nameFilter: query.filter.extra ? '' : query.searchString,
      typeFilter: query.filter.extra ? query.searchString : '',
    },
  });

  const componentToRender = componentSelector(loading, error, data);
  return componentToRender;
};

export default Characters;
