import React from 'react';
import { Spinner } from '@ui-kitten/components';

/**
 * @description Loading Component, renders a PorgressLine to indicate when the component is retrieving data.
 * @return {component}
 */

const LoadingView: React.FC = () => {
  return <Spinner size="giant" />;
};

export default LoadingView;
