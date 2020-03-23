import React, { createContext, useReducer, Dispatch } from 'react';

type Episode = {}
type Favourite = {}

interface IState {
  episodes: Episode[],
  favourites: Favourite[],
}

interface IAction {
  type: string,
  payload: any,
}

interface IContext {
  state: IState,
  dispatch: Dispatch<IAction>
}

const initialState: IState = {
  episodes: [],
  favourites: []
};

export const Context = createContext<IContext>({
  state: initialState,
  dispatch: () => {}
});

function reducer(state: IState, action: IAction) {
  switch(action.type) {
    case 'FETCH_DATA': 
      return { ...state, episodes: action.payload };

    default: 
      return state;
  }
}

export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}