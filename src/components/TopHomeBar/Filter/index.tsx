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
  Button,
  Toggle,
} from '@ui-kitten/components';

import styled from 'styled-components';
import useQueryContext from '../../../store/QueryContext';

interface FilterProps {}

const StyledView = styled(View)`
  flex: 1;

  flex-direction: row;
`;
const StyledOverflowMenu = styled(OverflowMenu)`
  min-width: 190px;
  width: 230px;
`;
const StyledMenuView = styled(View)`
  width: 20%;
  justify-content: center;
  align-items: center;
`;
const StyledToggle = styled(Toggle)`
  width: 60px;
  height: 30px;
`;
const Filter: React.FC<FilterProps> = props => {
  const { query, setExtraFilter } = useQueryContext();
  const { filterOption, filter } = query;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const FilterIcon = props => <Icon {...props} fill="#3366FF" name="funnel-outline" />;

  const ToggleButton = props => (
    <Toggle checked={filter.extra} status="basic" onChange={onToggleExtraFilter} />
  );

  const onToggleExtraFilter = () => setExtraFilter(!filter.extra);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => <TopNavigationAction icon={FilterIcon} onPress={toggleMenu} />;
  return (
    <StyledOverflowMenu
      anchor={renderMenuAction}
      appearance="noDivider"
      placement={'left end'}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem accessoryRight={ToggleButton} title={'Filter By ' + filterOption} />
    </StyledOverflowMenu>
  );
};

export default Filter;
