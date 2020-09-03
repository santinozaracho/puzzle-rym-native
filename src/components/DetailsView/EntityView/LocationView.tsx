import React from 'react';
import styled from 'styled-components';
import { Layout, Text } from '@ui-kitten/components';
import { View } from 'react-native';

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

const LocationView: React.FC<LocationViewProps> = props => {
  const { name, type, created, dimension, residents } = props.location;
  return (
    <View>
      <Layout>
        <Text>{name}</Text>
        <Text>Type: {type}</Text>
        <Text>Dimension: {dimension}</Text>
        <Text>Created: {created}</Text>
        <Text>Residents:</Text>
        {/* {residents.map((res, i) => (
          <StyledChip
            key={i}
            variant="outlined"
            avatar={<Avatar src={res.image} />}
            label={res.name}
          />
        ))} */}
      </Layout>
    </View>
  );
};

export default LocationView;
