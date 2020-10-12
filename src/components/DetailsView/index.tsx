import React from 'react';
import useQueryContext from '../../store/QueryContext';
import EntityView from './EntityView';
import ErrorView from '../ErrorView';

/**
 * @description DetailsView is only responsible for open details view and render the Body.
 * @return {component}
 */

const DetailsView: React.FC = () => {
  const {
    query: { itemDetails },
  } = useQueryContext();

  if (!itemDetails.isOpen) return <ErrorView />;

  return <EntityView />;
};

export default DetailsView;
