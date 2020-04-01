import React, { useContext, useEffect } from 'react';

import { Context } from './Store';

const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';

interface Episode {
  id: number;
  name: string;
  number: number;
  image: string;
  season: string;
}

type TVMazeEpisode = {
  id: number; 
  name: string; 
  number: number; 
  image: { 
    medium: string; 
  }; 
  season: string;
};

export const App = (): JSX.Element => {
  const { state, dispatch } = useContext(Context);

  const fetchDataAction = async (): Promise<void> => {
    const data = await fetch(URL);
    const {
      _embedded: {
        episodes
      }
    } = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: episodes.map((episode: TVMazeEpisode): Episode => {
        const {
          id, name, number, image: { medium: image }, season
        } = episode;

        return {
          id, name, number, image, season
        };
      }
      )
    });
  };

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  }, []);

  return (
    <>
      <header className="header">
        <h1>Rick & Morty</h1>
        <p>Pick your favorite episode!!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: Episode): JSX.Element => (
          <section key={episode.id} className="episode-box">
            <img src={episode.image} alt={`Rick & Morty ${episode.name}`} />
            <p>{episode.name}</p>
            <section>
              <div>
              Season: {episode.season} Number: {episode.number}
              </div>
            </section>
          </section>
        ))}
      </section>
    </>
  );
};