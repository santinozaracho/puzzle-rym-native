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

interface DetailsScreenProps {
  navigation: {
    navigate: any;
    goBack: any;
  };
}

const StyledTopLayout = styled(Layout)`
  height: 7%;
`;

const StyledLayout = styled(Layout)`
  height: 93%;
  justify-content: center;
  align-items: center;
`;
const capitalizeFirst = name => name.charAt(0).toUpperCase() + name.slice(1);

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const { query, deleteItemDetails } = useQueryContext();
  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  const navigateBack = () => {
    deleteItemDetails();
    navigation.goBack(null);
  };

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;
  return (
    <React.Fragment>
      <StyledTopLayout>
        <TopNavigation
          alignment="center"
          title="Details"
          subtitle={capitalizeFirst(query.entity)}
          accessoryLeft={renderBackAction}
        />
      </StyledTopLayout>
      <StyledLayout>
        <DetailsView />
      </StyledLayout>
    </React.Fragment>
  );
};
