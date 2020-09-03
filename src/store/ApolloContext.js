import React, { createContext, useContext } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import PropTypes from 'prop-types';

/**
 * @description Apollo Context is responsible for Inject the Client as provider for use with UseQuery Hook.
 * @return {provider}
 */

export const ApolloContext = createContext();
ApolloContext.displayName = 'ApolloContext';

export const ApolloClientProvider = ({ children }) => {
  const apolloClient = createApolloClient();

  return (
    <ApolloContext.Provider>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  );
};

export default function useApolloContext() {
  return useContext(ApolloContext);
}

export const createApolloClient = (user) => {
  return new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    headers: { Authorization: null },
    cache: new InMemoryCache(),
  });
};

ApolloClientProvider.propTypes = {
  children: PropTypes.node,
};
