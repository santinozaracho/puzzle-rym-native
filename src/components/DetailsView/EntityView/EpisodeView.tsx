import React from 'react';
import styled from 'styled-components';
import { View, ViewBase } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

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

// const StyledPaper = styled(Paper)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: auto;
//   margin-top: 20px;
//   min-width: 300px;
//   max-width: 600px;
// `;
const StyledCard = styled(View)`
  height: 100%;
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const EpisodesView: React.FC<EpisodesViewProps> = props => {
  const { name, episode, air_date, characters, created } = props.episode;
  return (
    <View>
      <Layout>
        <Text>{name}</Text>
        <Text>Episode: {episode}</Text>
        <Text>Air Date: {air_date}</Text>
        <Text>Created: {created}</Text>
        <Text>Characters:</Text>
        {/* {characters.map((char, i) => (
          <StyledChip
            key={i}
            variant='outlined'
            avatar={<Avatar src={char.image} />}
            label={char.name} */}
      </Layout>
    </View>
  );
};

export default EpisodesView;
