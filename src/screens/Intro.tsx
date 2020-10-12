import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Button, Card } from '@ui-kitten/components';
import useQueryContext from '../store/QueryContext';
import styled from 'styled-components';

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
  height: 95%;
  justify-content: center;
  align-items: center;
`;

const StyledLayout = styled(Layout)`
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 5%;
`;

const StyledText = styled(Text)`
  align-content: center;
  height: 55%;
`;

const StyledButtonView = styled(View)`
  justify-content: center;
  align-items: center;
`;
const StyledDateText = styled(Text)`
  height: 5%;
`;

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const IntroScreen: React.FC<IntroScreenProps> = ({ navigation }) => {

  const Header = props => (
    <View {...props}>
      <Text category="h3">Find anything of Rick and Morty here!!.</Text>
    </View>
  );

  const Footer = props => (
    <StyledButtonView {...props} style={props.style}>
      <Button testID="ButtonImReady" onPress={() => navigation.navigate('main')}>Ok!, I'm Ready!!</Button>
    </StyledButtonView>
  );
  return (
    <StyledLayout>
      <StyledCard disabled header={Header} footer={Footer}>
        <StyledText>
          This project was built for an Challenge of Puzzle Co. Made by Santino Zaracho on
          {' ' + 'https://github.com/santinozaracho'}, as abstract, this Mobile App made with
          React-Native, and Apollo-GraphQL shows you any content of Rick And Morty serie.
        </StyledText>
      </StyledCard>
      <StyledDateText>{new Date().toLocaleString(undefined, dateOptions)}</StyledDateText>
    </StyledLayout>
  );
};
