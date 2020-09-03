import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const StyledText = styled(Text)`
  margin: 30px;
`;

interface ErrorViewProps {}
const ErrorView: React.FC<ErrorViewProps> = props => {
  return <StyledText>We're Sorry, We couldn't find that your are searching.</StyledText>;
};

export default ErrorView;
