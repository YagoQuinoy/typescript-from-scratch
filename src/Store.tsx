import React, { createContext, useReducer, Dispatch } from 'react';

type Episode = {
  id: number;
  name: string;
  number: number;
  image: string;
  season: string;
  favourite?: boolean;
};

type State = {
  episodes: Episode[];
  favourites: Episode[];
}

type FetchDataAction = {
  type: string;
  payload: Episode[];
};

type AddFavAction = {
  type: string;
  payload: Episode;
};

type ActionTypes = FetchDataAction | AddFavAction;  

type TContext = {
  state: State;
  dispatch: Dispatch<ActionTypes>;
}

const initialState: State = {
  episodes: [],
  favourites: []
};

export const Context = createContext<TContext>({
  state: initialState,
  dispatch: () => { return {}; }
});

function reducer(state: State, action: ActionTypes): State {
  switch(action.type) {
  case 'FETCH_DATA': 
    return { 
      ...state, 
      episodes: action.payload as Episode[]
    };
    
  case 'ADD_FAV':
    return { 
      ...state, 
      episodes: state.episodes.map((e: Episode): Episode => 
        e.id === (action.payload as Episode).id ? { ...e, favourite: true } : e) 
    }; 

  default: 
    return state;
  }
}

type StoreProviderProps = {
  children: React.ReactChildren;
};

export function StoreProvider(props: StoreProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}