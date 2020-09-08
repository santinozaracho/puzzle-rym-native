import React from 'react';
import styled from 'styled-components';
import { View, ViewBase, ImageBackground } from 'react-native';
import { Layout, Text, ListItem, Avatar, Card, List } from '@ui-kitten/components';

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

const EpisodesView: React.FC<EpisodesViewProps> = props => {
  const { name, episode, air_date, characters, created } = props.episode;
  const charactersFiltered = characters.length > 5 ? [...characters].splice(0, 5) : characters;

  const Header = props => (
    <StyledView {...props}>
      <StyledText category="h2">{name}</StyledText>
    </StyledView>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      accessoryLeft={() => (
        <Avatar ImageComponent={ImageBackground} shape="square" source={{ uri: item.image }} />
      )}
      title={item.name}
    />
  );

  const Footer = props => (
    <StyledFootView {...props} style={props.style}>
      <StyledText>Characters:</StyledText>
      <StyledList data={charactersFiltered} renderItem={renderItem} />
    </StyledFootView>
  );
  return (
    <StyledLayout>
      <StyledCard header={Header} footer={Footer}>
        <StyledText>Episode: {episode}</StyledText>
        <StyledText>Air Date: {air_date}</StyledText>
        <StyledText>Created: {created}</StyledText>
      </StyledCard>
    </StyledLayout>
  );
};

export default EpisodesView;
