import React from 'react';
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import useQueryContext from '../../../store/QueryContext';

const ClearButton: React.FC = () => {
  const {
    query: { searchString },
    clearQuery,
  } = useQueryContext();

  const ClearIcon = props => (
    <Icon
      {...props}
      testID="clear-icon"
      fill={searchString === '' ? 'grey' : '#3366FF'}
      name="close-outline"
    />
  );

  return (
    <TopNavigationAction
      disabled={searchString === ''}
      testID="clear-btn"
      icon={ClearIcon}
      onPress={clearQuery}
    />
  );
};

export default ClearButton;
