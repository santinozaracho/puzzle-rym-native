import React from 'react';
import { Icon, MenuItem, OverflowMenu, TopNavigationAction, Toggle } from '@ui-kitten/components';

import styled from 'styled-components';
import useQueryContext from '../../../store/QueryContext';

const StyledOverflowMenu = styled(OverflowMenu)`
  min-width: 190px;
  width: 230px;
`;

const Filter: React.FC = () => {
  const {
    query: { filterOption, filter },
    setExtraFilter,
  } = useQueryContext();

  const [isMenuVisible, setMenuVisible] = React.useState(false);
  const FilterIcon = props => <Icon {...props} fill="#3366FF" name="funnel-outline" />;

  const ToggleButton = () => (
    <Toggle checked={filter.extra} status="basic" onChange={onToggleExtraFilter} />
  );

  const onToggleExtraFilter = () => setExtraFilter(!filter.extra);

  const toggleMenu = () => {
    setMenuVisible(prevState => !prevState);
  };

  const renderMenuAction = () => <TopNavigationAction icon={FilterIcon} onPress={toggleMenu} />;

  return (
    <StyledOverflowMenu
      anchor={renderMenuAction}
      appearance="noDivider"
      placement={'left end'}
      visible={isMenuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem accessoryRight={ToggleButton} title={'Filter By ' + filterOption} />
    </StyledOverflowMenu>
  );
};

export default Filter;
