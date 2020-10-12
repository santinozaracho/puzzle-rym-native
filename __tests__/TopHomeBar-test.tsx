import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TopHomeBar from '../src/components/TopHomeBar';
import { MockedContext } from '../__mocks__/MockedContext';

/**
 * @format
 */

describe('test TopHomeBar integration between, clear button and input text', () => {
  const setup = () => {
    const utils = render(<MockedContext component={TopHomeBar} />);

    const input = utils.getByTestId('searchInput');
    const clearIcon = utils.getByTestId('clear-icon');
    const clearBtn = utils.getByTestId('clear-btn');
    return {
      input,
      clearBtn,
      clearIcon,
      ...utils,
    };
  };

  it('should set empty value when the clear button is pressed', async () => {
    const { input, clearBtn } = setup();
    fireEvent.changeText(input, 'testText');
    expect(input.props.value).toBe('testText');
    fireEvent.press(clearBtn);
    expect(input.props.value).toBe('');
  });
});
