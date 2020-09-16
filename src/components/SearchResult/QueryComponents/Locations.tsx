import React from 'react';
import { useQuery } from '@apollo/client';
import GridView from '../GridView';
import useQueryContext from '../../../store/QueryContext';
import ErrorView from '../../ErrorView';
import LoadingView from '../../LoadingView';
import { GET_LOCATIONS } from '../../../queries/entityQueries';

/**
 * @description Locations Component is responsible for Query Locations to API and render the Grid View.
 * @return {component}
 */

interface LocationsProps {}

const componentSelector = (loading: any, error: any, data: any) => {
  if (data) {
    const {
      locations: { results, info },
    } = data;

    return <GridView collectionResult={results} pages={info.pages} />;
  }
  if (loading) return <LoadingView />;

  return <ErrorView />;
};
const Locations: React.FC<LocationsProps> = props => {
  const { query } = useQueryContext();
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    variables: {
      page: query.page,
      nameFilter: query.filter.extra ? '' : query.searchString,
      dimensionFilter: query.filter.extra ? query.searchString : '',
    },
  });

  const componentToRender = componentSelector(loading, error, data);
  return componentToRender;
};
export default Locations;
