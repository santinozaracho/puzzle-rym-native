import React from 'react';
import { Platform, View, KeyboardAvoidingView } from 'react-native';
import { Layout, BottomNavigation, BottomNavigationTab, ViewPager } from '@ui-kitten/components';
import useQueryContext from '../store/QueryContext';
import styled from 'styled-components';
import TopHomeBar from '../components/TopHomeBar';
import SearchResult from '../components/SearchResult';

interface HomeScreenProps {
  navigation: {
    navigate: any;
  };
}

const StyledLayout = styled(Layout)`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  height: 100%;
`;

const StyledView = styled(View)`
  flex: 1;
  height: 100%;
  background-color: white;
`;
const StyledTopView = styled(View)`
  flex: 1;
  margin-top: 8px;
  height: 7%;
`;
const StyledCenterView = styled(View)`
  height: 86%;
`;
const StyledBottomView = styled(View)`
  height: 7%;
`;

const connectEntity: any = {
  0: () => 'characters',

  1: () => 'locations',

  2: () => 'episodes',
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { query, setEntity } = useQueryContext();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const changeIndex = index => {
    setSelectedIndex(index);

    setEntity(connectEntity[index]());
  };

  const shouldLoadComponent = index => index === selectedIndex;
  return (
    <StyledKeyboardAvoidingView
      enabled={false}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StyledView>
        <StyledTopView>
          <TopHomeBar />
        </StyledTopView>
        <StyledCenterView>
          <ViewPager
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={changeIndex}
          >
            <StyledLayout>
              <SearchResult />
            </StyledLayout>
            <StyledLayout>
              <SearchResult />
            </StyledLayout>
            <StyledLayout>
              <SearchResult />
            </StyledLayout>
          </ViewPager>
        </StyledCenterView>
        <StyledBottomView>
          <BottomNavigation selectedIndex={selectedIndex} onSelect={changeIndex}>
            <BottomNavigationTab title="Characters" />
            <BottomNavigationTab title="Locations" />
            <BottomNavigationTab title="Episodes" />
          </BottomNavigation>
        </StyledBottomView>
      </StyledView>
    </StyledKeyboardAvoidingView>
  );
};
