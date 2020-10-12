import React from 'react';
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import useQueryContext from '../../../store/QueryContext';

const ClearButton: React.FC = () => {
  const {
    query: { searchString },
    clearQuery,
  } = useQueryContext();

  const ClearIcon = props => (
    <Icon {...props} fill={searchString !== '' ? '#3366FF' : 'grey'} name="close-outline" />
  );

  return (
    <TopNavigationAction disabled={searchString === ''} icon={ClearIcon} onPress={clearQuery} />
  );
};

export default ClearButton;
