import React from 'react';
import { View } from 'react-native';
import {
  Layout,
  Text,
  Icon,
  Button,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import styled from 'styled-components';
import useQueryContext from '../../../store/QueryContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface ClearButtonProps {}

const StyledView = styled(View)`
  flex: 1;

  flex-direction: row;
`;
const StyledSearchView = styled(View)`
  width: 80%;

  justify-content: center;
  align-items: center;
`;
const StyledIcon = styled(Icon)`
  width: 30px;
  height: 30px;
`;

const ClearButton: React.FC<ClearButtonProps> = props => {
  const { query, clearQuery } = useQueryContext();

  const clearQueryData = () => clearQuery();
  const ClearIcon = props => <Icon {...props} fill="#3366FF" name="close-outline" />;

  return <TopNavigationAction icon={ClearIcon} onPress={clearQueryData} />;
};

export default ClearButton;
