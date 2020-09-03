import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Layout, Text, Button, Card, Divider } from '@ui-kitten/components';
import styled from 'styled-components';

import useQueryContext from '../../../../store/QueryContext';
import { useNavigation } from '@react-navigation/native';

/**
 * @description Item View is responsible for render the items card in Grid View.
 * @return {component}
 */

interface ItemViewProps {
  item: {
    id: string;
    name: string;
    episode: string;
    dimension: string;
    image: string;
  };
}

const StyledCard = styled(Card)`
  flex: 1;
  margin: 10px;
  height: 500px;
`;
const StyledLayout = styled(Layout)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled(Text)`
  margin: 10px;
`;

const StyledImage = styled(Image)`
  height: 100%;
`;

const ItemView: React.FC<ItemViewProps> = ({ item }) => {
  const navigation = useNavigation();
  const { id, image, name, dimension, episode } = item;
  const { setItemDetails } = useQueryContext();
  const Header = props => (
    <View {...props}>
      <Text category="h4">{name}</Text>
    </View>
  );
  const openItem = () => {
    setItemDetails(id);
    navigation.navigate('details');
  };
  return (
    <StyledCard key={id} onPress={openItem} header={Header}>
      {image && <StyledImage source={{ uri: image }} />}
      <StyledText>{name}</StyledText>
      {episode && <StyledText>{episode}</StyledText>}
      {dimension && <StyledText>{dimension}</StyledText>}
    </StyledCard>
  );
};
export default ItemView;
