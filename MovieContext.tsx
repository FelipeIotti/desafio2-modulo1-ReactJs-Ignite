import {createContext, ReactNode, useEffect, useState} from 'react'
import {api} from './src/services/api';


interface MovieProviderProps {
  children: ReactNode;
}


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieContextData {
  selectedGenre : GenreResponseProps;
  movies : MovieProps[];
  genres : GenreResponseProps[];
  handleClickButton: (id: number)=> void;
  selectedGenreId: number;
}

export const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export function MovieProvider({children}: MovieProviderProps) {

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return(
    <MovieContext.Provider value={{selectedGenre,movies,genres,handleClickButton,selectedGenreId}} >
      {children}
    </MovieContext.Provider>
  );
}