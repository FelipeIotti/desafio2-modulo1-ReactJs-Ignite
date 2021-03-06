import { MovieCard } from "./MovieCard";

import '../styles/content.scss';
import { useContext } from "react";
import { MovieContext} from "../../MovieContext";

export function Content() {
  // Complete aqui
  const {movies,selectedGenre} = useContext(MovieContext);
  return(
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}