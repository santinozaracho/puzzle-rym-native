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
import useQueryContext from '../store/QueryContext';
import styled from 'styled-components';
import DetailsView from '../components/DetailsView';

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

interface DetailsScreenProps {
  navigation: {
    navigate: any;
    goBack: any;
  };
}

const StyledTopLayout = styled(Layout)`
  height: 10%;
`;

const StyledLayout = styled(Layout)`
  height: 90%;
  justify-content: center;
  align-items: center;
`;

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const { query, deleteItemDetails } = useQueryContext();
  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  const EditIcon = props => <Icon {...props} name="edit" />;

  const MenuIcon = props => <Icon {...props} name="more-vertical" />;

  const InfoIcon = props => <Icon {...props} name="info" />;

  const LogoutIcon = props => <Icon {...props} name="log-out" />;

  const [menuVisible, setMenuVisible] = React.useState(false);
  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const navigateBack = () => {
    deleteItemDetails();
    navigation.goBack(null);
  };

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;
  const renderBackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;
  return (
    <React.Fragment>
      <StyledTopLayout>
        <TopNavigation
          alignment="center"
          title="Details"
          subtitle="Characters"
          accessoryLeft={renderBackAction}
        />
      </StyledTopLayout>
      <StyledLayout style={styles.container}>
        <DetailsView />
      </StyledLayout>
    </React.Fragment>
  );
};
