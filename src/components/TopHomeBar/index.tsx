import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Layout,
  Text,
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import SearchInput from './SearchInput';
import styled from 'styled-components';
import useQueryContext from '../../store/QueryContext';
import Filter from './Filter';
import ClearButton from './ClearButton';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    minHeight: 128,
  },
});

interface TopSearchBarProps {}

const StyledView = styled(View)`
  flex: 1;

  flex-direction: row;
`;
const StyledSearchView = styled(View)`
  width: 80%;

  justify-content: center;
  align-items: center;
`;
const StyledMenuView = styled(View)`
  width: 20%;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TopHomeBar: React.FC<TopSearchBarProps> = props => {
  return (
    <StyledView>
      <StyledSearchView>
        <SearchInput />
      </StyledSearchView>

      <StyledMenuView>
        <ClearButton />
        <Filter />
      </StyledMenuView>
    </StyledView>
  );
};

export default TopHomeBar;
