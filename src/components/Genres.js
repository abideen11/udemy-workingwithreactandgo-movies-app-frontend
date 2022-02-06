import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/v1/genres")
      .then((json) => {
        setGenres(json.data.genres);
        setIsLoaded(!isLoaded);
      })
      .catch((error1) => {
        setError(error1);
      });
  }, []);

  if (error) {
    return <div>Error: Invalid response code: 404</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>Genres</h2>

        <div className="list-group">
          {genres.map((m) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/genre/${m.id}`}
              state={{ from: m }}
            >
              {m.genre_name}
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default Genres;
