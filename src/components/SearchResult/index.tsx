import React from 'react';
import useQueryContext from '../../store/QueryContext';
import Characters from './QueryComponents/Characters';
import Locations from './QueryComponents/Locations';
import Episodes from './QueryComponents/Episodes';
import { Text } from '@ui-kitten/components';

/**
 * @description Search Result Component is responsible for render selected component by entity requeried in the TopB
 * ar and Support the Modal.
 * @return {component}
 */

const querySelector: any = {
  characters: Characters,
  locations: Locations,
  episodes: Episodes,
};

const SearchResult: React.FC = () => {
  const { query } = useQueryContext();

  if (!query.ready) return <Text>Start writing in the Top Bar!</Text>;

  const QueryToRender = querySelector[query.entity];

  return <QueryToRender />;
};

export default SearchResult;
