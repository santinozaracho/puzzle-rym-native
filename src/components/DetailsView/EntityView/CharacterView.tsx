import React from 'react';
import styled from 'styled-components';
import { View, Image } from 'react-native';
import { Layout, Text, Card, List, ListItem } from '@ui-kitten/components';

/**
 * @description This component is responsible for render the fields of Character.
 * @return {component}
 */

interface CharacterViewProps {
  character: {
    image: string;
    name: string;
    episode: [{ name: string }];
    origin: { name: string };
    location: { name: string };
    status: string;
    type: string;
    gender: string;
    species: string;
  };
}

const StyledView = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledFootView = styled(View)`
  padding-top: 0px;
  height: 190px;
`;
const StyledCard = styled(Card)`
  flex: 1;
  padding-top: 0px;
  margin-top: 0px;
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
const StyledImage = styled(Image)`
  height: 200px;
  width: 100%;
`;
const StyledList = styled(List)`
  background-color: white;
`;

const CharacterView: React.FC<CharacterViewProps> = props => {
  const { image, name, episode, origin, location, gender, type, status, species } = props.character;

  const episodes = episode.length > 5 ? [...episode].splice(0, 5) : episode;
  const Header = props => (
    <StyledView {...props}>
      <StyledText category="h5">{name}</StyledText>
      <StyledImage source={{ uri: image }} />
    </StyledView>
  );

  const renderItem = ({ item }) => <ListItem title={item.name} />;

  const Footer = props => (
    <StyledFootView {...props} style={props.style}>
      <StyledText>Episodes:</StyledText>
      <StyledList data={episodes} renderItem={renderItem} />
    </StyledFootView>
  );
  return (
    <StyledLayout>
      <StyledCard header={Header} footer={Footer}>
        <StyledText>Type: {type}</StyledText>
        <StyledText>Gender: {gender}</StyledText>
        <StyledText>Status: {status}</StyledText>
        <StyledText>Species: {species}</StyledText>
        <StyledText>Origin: {origin.name}</StyledText>
        <StyledText>Location: {location.name}</StyledText>
      </StyledCard>
    </StyledLayout>
  );
};

export default CharacterView;
