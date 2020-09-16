import React from 'react';
import { useQuery } from '@apollo/client';
import GridView from '../GridView';
import useQueryContext from '../../../store/QueryContext';
import ErrorView from '../../ErrorView';
import LoadingView from '../../LoadingView';
import { GET_EPISODES } from '../../../queries/entityQueries';

/**
 * @description Episodes Component is responsible for Query Episodes to API and render the Grid View.
 * @return {component}
 */

interface EpisodesProps {}
const componentSelector = (loading: any, error: any, data: any) => {
  if (data) {
    const {
      episodes: { results, info },
    } = data;

    return <GridView collectionResult={results} pages={info.pages} />;
  }
  if (loading) return <LoadingView />;

  return <ErrorView />;
};

const Episodes: React.FC<EpisodesProps> = props => {
  const { query } = useQueryContext();
  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: {
      page: query.page,
      nameFilter: query.filter.extra ? '' : query.searchString,
      episodeFilter: query.filter.extra ? query.searchString : '',
    },
  });
  const componentToRender = componentSelector(loading, error, data);
  return componentToRender;
};

export default Episodes;
