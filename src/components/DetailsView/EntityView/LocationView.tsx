import React from 'react';
import styled from 'styled-components';
import { Layout, Text, ListItem, Avatar, List } from '@ui-kitten/components';
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

const StyledHeader = styled(View)`
  height: 20%;
  width: 100%;
  margin-bottom: 20%;
`;

const StyledLayoutList = styled(View)`
  height: 60%;
  width: 100%;
`;

const StyledBody = styled(View)`
  height: 20%;
`;

const StyledLayout = styled(Layout)`
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  height: 100%;
  padding: 10%;
  padding-top: 5%;
  width: 100%;
`;

const StyledText = styled(Text)`
  margin: 2px;
`;
const StyledTextTitle = styled(Text)`
  margin: 10px;
  align-self: center;
`;

const StyledList = styled(List)`
  background-color: white;
`;

const LocationView: React.FC<LocationViewProps> = props => {
  const { name, type, created, dimension, residents } = props.location;
  const residentsFiltered = residents.length > 5 ? [...residents].splice(0, 5) : residents;
  const renderItem = ({ item }) => {
    const characterAvatar = () => (
      <Avatar ImageComponent={ImageBackground} shape="square" source={{ uri: item.image }} />
    );
    return <ListItem accessoryLeft={characterAvatar} title={item.name} />;
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <StyledTextTitle category="h3">{name}</StyledTextTitle>
      </StyledHeader>
      <StyledBody>
        <StyledText>Type: {type}</StyledText>
        <StyledText>Dimension: {dimension}</StyledText>
        <StyledText>Created: {created}</StyledText>
      </StyledBody>
      <StyledLayoutList>
        <StyledText>Residents:</StyledText>
        <StyledList data={residentsFiltered} renderItem={renderItem} />
      </StyledLayoutList>
    </StyledLayout>
  );
};

export default LocationView;
