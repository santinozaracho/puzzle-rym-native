import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const StyledText = styled(Text)`
  margin: 30px;
`;

const ErrorView: React.FC = () => {
  return <StyledText>We're Sorry, We couldn't find that your are searching.</StyledText>;
};

export default ErrorView;
