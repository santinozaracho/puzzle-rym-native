import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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

const StyledTopLayout = styled(Layout)`
  height: 10%;
`;

const StyledLayout = styled(Layout)`
  height: 90%;
  justify-content: center;
  align-items: center;
`;

const TopHomeBar: React.FC<TopSearchBarProps> = props => {
  const { query } = useQueryContext();
  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  const ClearIcon = props => <Icon {...props} name="close-outline" />;

  const MenuIcon = props => <Icon {...props} name="funnel-outline" />;

  const InfoIcon = props => <Icon {...props} name="info" />;

  const LogoutIcon = props => <Icon {...props} name="log-out" />;

  const [menuVisible, setMenuVisible] = React.useState(false);
  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={ClearIcon} onPress={clearQueryData} />
      <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const clearQueryData = () => {
    console.log('hello');
  };
  const searchInput = () => <SearchInput />;
  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;
  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={searchInput}
      accessoryRight={renderRightActions}
    />
  );
};

export default TopHomeBar;
