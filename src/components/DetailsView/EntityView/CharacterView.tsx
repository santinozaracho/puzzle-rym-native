import React from 'react';

import styled from 'styled-components';
import { View, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';

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

const CharacterView: React.FC<CharacterViewProps> = props => {
  const { image, name, episode, origin, location, gender, type, status, species } = props.character;
  return (
    <View>
      <Layout>
        <Text>{name}</Text>
        <Text>Type: {type}</Text>
        <Text>Gender: {gender}</Text>
        <Text>Status: {status}</Text>
        <Text>Species: {species}</Text>
        <Text>Origin: {origin.name}</Text>
        <Text>Location: {location.name}</Text>
        <Text>Episodes:</Text>
      </Layout>
    </View>
  );
};

export default CharacterView;
