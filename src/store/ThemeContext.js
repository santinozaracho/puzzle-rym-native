import React, { createContext, useContext, useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { default as customTheme } from '../../assets/colorsPalette/theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

/**
 * @description Provides theme features, icons and required for library
 * @returns {component}
 */

const ThemeContext = createContext({
  theme: 'light',
});
/**
 * @description Provides theme features, icons and required for library
 * @param {component} children
 * @returns {component}
 */
ThemeContext.displayName = 'ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva[theme], ...customTheme }}>
        {children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
