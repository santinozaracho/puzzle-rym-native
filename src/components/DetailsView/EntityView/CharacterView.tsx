import React from 'react';
import styled from 'styled-components';
import { View, Image } from 'react-native';
import { Layout, Text, List, ListItem } from '@ui-kitten/components';

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

const StyledHeader = styled(View)`
  height: 30%;
  width: 100%;
  margin-bottom: 20%;
`;

const StyledLayoutList = styled(View)`
  height: 30%;
  width: 100%;
`;

const StyledBody = styled(View)`
  height: 40%;
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

const StyledImage = styled(Image)`
  height: 80%;
`;

const StyledList = styled(List)`
  background-color: white;
`;

const CharacterView: React.FC<CharacterViewProps> = props => {
  const { image, name, episode, origin, location, gender, type, status, species } = props.character;

  const episodes = episode.length > 5 ? [...episode].splice(0, 5) : episode;
  const renderItem = ({ item }) => <ListItem title={item.name} />;

  return (
    <StyledLayout>
      <StyledHeader>
        <StyledTextTitle category="h5">{name}</StyledTextTitle>
        <StyledImage source={{ uri: image }} />
      </StyledHeader>
      <StyledBody>
        <StyledText>Type: {type}</StyledText>
        <StyledText>Gender: {gender}</StyledText>
        <StyledText>Status: {status}</StyledText>
        <StyledText>Species: {species}</StyledText>
        <StyledText>Origin: {origin.name}</StyledText>
        <StyledText>Location: {location.name}</StyledText>
      </StyledBody>
      <StyledLayoutList>
        <StyledText>Episodes:</StyledText>
        <StyledList data={episodes} renderItem={renderItem} />
      </StyledLayoutList>
    </StyledLayout>
  );
};

export default CharacterView;
