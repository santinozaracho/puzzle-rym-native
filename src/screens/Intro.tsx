import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout, Text, Button, Card } from '@ui-kitten/components';
import useQueryContext from '../store/QueryContext';
import styled from 'styled-components';
import { Link } from '@react-navigation/native';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IntroScreenProps {
  navigation: {
    navigate: any;
  };
}

const StyledCard = styled(Card)`
  flex: 1;
  margin: 20px;
`;
const StyledLayout = styled(Layout)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled(Text)`
  height: 60%;
`;
export const IntroScreen: React.FC<IntroScreenProps> = ({ navigation }) => {
  const { query } = useQueryContext();

  const Header = props => (
    <View {...props}>
      <Text category="h3">Find anything of Rick and Morty here!!.</Text>
    </View>
  );

  const Footer = props => (
    <View {...props} style={props.style}>
      <Button onPress={() => navigation.navigate('main')}>Ok!, I'm Ready!!</Button>
    </View>
  );
  return (
    <StyledLayout>
      <StyledCard header={Header} footer={Footer}>
        <StyledText>
          This project was built for an Challenge of Puzzle Co. Made by Santino Zaracho on
          {'https://github.com/santinozaracho'}, as abstract, this Mobile App made with
          React-Native, and Apollo-GraphQL shows you any content of Rick And Morty serie.
        </StyledText>
      </StyledCard>
    </StyledLayout>
  );
};
