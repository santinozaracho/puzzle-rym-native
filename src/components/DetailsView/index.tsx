import React from 'react';
import styled from 'styled-components';
import useQueryContext from '../../store/QueryContext';
import EntityView from './EntityView';
import ErrorView from '../ErrorView';

/**
 * @description DetailsView is only responsible for open details view and render the Body.
 * @return {component}
 */

interface DetailsViewProps {}

const DetailsView: React.FC<DetailsViewProps> = props => {
  const { query } = useQueryContext();

  if (!query.itemDetails.open) return <ErrorView />;

  return <EntityView />;
};

export default DetailsView;
