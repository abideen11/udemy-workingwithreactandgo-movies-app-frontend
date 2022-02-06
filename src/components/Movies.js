import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/v1/movies")
      .then((json) => {
        setMovies(json.data.movies);
        setIsLoaded(!isLoaded);
      })
      .catch((error1) => {
        setError(error1.response.status);
      });
  }, []);

  if (error) {
    return <div>Error: Invalid response code: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>Choose a movie</h2>

        <div className="list-group">
          {movies.map((m) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/movies/${m.id}`}
              state={{ from: m }}
            >
              {m.title}
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default Movies;
