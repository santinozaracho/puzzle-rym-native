import React from 'react';
import styled from 'styled-components';
import { Layout, Text, ListItem, Avatar, List, Card } from '@ui-kitten/components';
import { View, ImageBackground } from 'react-native';

/**
 * @description This component is responsible for render the fields of Location.
 * @return {component}
 */

interface LocationViewProps {
  location: {
    name: string;
    dimension: string;
    residents: [{ name: string; image: string }];
    type: string;
    created: string;
  };
}

const StyledView = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledFootView = styled(View)`
  height: 400px;
`;
const StyledCard = styled(Card)`
  flex: 1;
`;
const StyledLayout = styled(Layout)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 95%;
`;
const StyledText = styled(Text)`
  margin: 2px;
`;

const StyledList = styled(List)`
  background-color: white;
`;

const LocationView: React.FC<LocationViewProps> = props => {
  const { name, type, created, dimension, residents } = props.location;
  const residentsFiltered = residents.length > 5 ? [...residents].splice(0, 5) : residents;

  const Header = props => (
    <StyledView {...props}>
      <StyledText category="h2">{name}</StyledText>
    </StyledView>
  );

  const renderItem = ({ item }) => {
    const characterAvatar = () => (
      <Avatar ImageComponent={ImageBackground} shape="square" source={{ uri: item.image }} />
    );
    return <ListItem accessoryLeft={characterAvatar} title={item.name} />;
  };

  const Footer = props => (
    <StyledFootView {...props} style={props.style}>
      <StyledText>Residents:</StyledText>
      <StyledList data={residentsFiltered} renderItem={renderItem} />
    </StyledFootView>
  );
  return (
    <StyledLayout>
      <StyledCard header={Header} footer={Footer}>
        <StyledText>Type: {type}</StyledText>
        <StyledText>Dimension: {dimension}</StyledText>
        <StyledText>Created: {created}</StyledText>
      </StyledCard>
    </StyledLayout>
  );
};

export default LocationView;
