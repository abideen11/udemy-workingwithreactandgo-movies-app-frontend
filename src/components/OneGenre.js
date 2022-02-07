import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const OneGenre = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [genreName, setGenreName] = useState("");

  const path = useLocation();
  const { from } = path.state;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/v1/movies/${from.id}`)
      .then((json) => {
        setMovies(json.data.movies);
        setIsLoaded(!isLoaded);
        setGenreName(from.genre_name);
      })
      .catch((error1) => setError(error1));
  }, []);

  if (!movies) {
    setMovies([]);
  }

  if (error) {
    return <div>Error: {"Invalid response code: 404"}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>Genre: {genreName}</h2>

        <div className="list-group">
          {movies.map((m) => (
            <Link
              to={`/movies/${m.id}`}
              className="list-group-item list-group-item-action"
            >
              {m.title}
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default OneGenre;
