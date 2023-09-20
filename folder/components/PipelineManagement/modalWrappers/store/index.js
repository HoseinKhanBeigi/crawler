import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import modalWrapperReducer from './reducer';

export const MODAL_KEY_MAP = {
  CARD_DETAIL: 'CARD_DETAIL',
  CREATE_CARD: 'CREATE_CARD',
  CREATE_PHASE: 'CREATE_PHASE',
  PIPE_SETTING: 'PIPE_SETTING',
  CREATE_CONDITION: 'CREATE_CONDITION',
};

export const initialState = {
  modals: {},
};

export const ModalWrapperContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const ModalWrapperContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalWrapperReducer, initialState);
  return (
    <ModalWrapperContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalWrapperContext.Provider>
  );
};

ModalWrapperContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
