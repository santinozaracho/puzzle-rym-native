import React from 'react';
import styled from 'styled-components';
import { View, ImageBackground } from 'react-native';
import { Layout, Text, ListItem, Avatar, List } from '@ui-kitten/components';

/**
 * @description This component is responsible for render the fields of Episode.
 * @return {component}
 */

interface EpisodesViewProps {
  episode: {
    episode: string;
    name: string;
    characters: [{ name: string; image: string }];
    air_date: string;
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

const EpisodesView: React.FC<EpisodesViewProps> = props => {
  const { name, episode, air_date, characters, created } = props.episode;
  const charactersFiltered = characters.length > 5 ? [...characters].splice(0, 5) : characters;

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
        <StyledText>Episode: {episode}</StyledText>
        <StyledText>Air Date: {air_date}</StyledText>
        <StyledText>Created: {created}</StyledText>
      </StyledBody>
      <StyledLayoutList>
        <StyledText>Characters:</StyledText>
        <StyledList data={charactersFiltered} renderItem={renderItem} />
      </StyledLayoutList>
    </StyledLayout>
  );
};

export default EpisodesView;
