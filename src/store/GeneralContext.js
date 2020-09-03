import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();
Context.displayName = 'Context';

export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return <Context.Provider value={{ loading, setLoading }}>{children}</Context.Provider>;
};

export default function useGeneralContext() {
  return useContext(Context);
}

Provider.propTypes = {
  children: PropTypes.node,
};
