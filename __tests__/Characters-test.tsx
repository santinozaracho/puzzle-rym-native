import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import Characters from '../src/components/SearchResult/QueryComponents/Characters';
import { MockedProvider } from '@apollo/client/testing';
import { CHARACTERS_MOCKS } from '../__mocks__/charactersQuery';
import { MockedContext } from '../__mocks__/MockedContext';

/**
 * @format
 */

describe('Characters Component correct rendering with moked Query', () => {
  const { findAllByText } = render(
    <MockedProvider mocks={CHARACTERS_MOCKS}>
      <MockedContext component={Characters} />
    </MockedProvider>,
  );

  it('shoud render correctly the two items whit the MockeQuery', async () => {
    const items = await findAllByText('Solicitor Rick');
    expect(items).toHaveLength(2);
  });
});
