import React from 'react';
import { primary } from '../../../assets/colorsPalette';
import styled from 'styled-components';
import { Spinner } from '@ui-kitten/components';

/**
 * @description Loading Component, renders a PorgressLine to indicate when the component is retrieving data.
 * @return {component}
 */

interface LoadingViewProps {}
const LoadingView: React.FC<LoadingViewProps> = props => {
  return <Spinner size="giant" />;
};

export default LoadingView;
