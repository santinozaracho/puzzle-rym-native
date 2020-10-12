import React from 'react';
import { View } from 'react-native';
import SearchInput from './SearchInput';
import styled from 'styled-components';
import Filter from './Filter';
import ClearButton from './ClearButton';

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

const TopHomeBar: React.FC = () => {
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
