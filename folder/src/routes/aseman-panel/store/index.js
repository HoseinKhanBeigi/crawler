import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import asemanPanelReducer from './reducer';

export const initialState = {
  groupBy: {},
  filter: {},
};

export const AsemanPanelContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const AsemanPanelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(asemanPanelReducer, initialState);
  return (
    <AsemanPanelContext.Provider value={{ state, dispatch }}>
      {children}
    </AsemanPanelContext.Provider>
  );
};

AsemanPanelContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
