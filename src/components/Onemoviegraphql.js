import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Onemoviegraphql = () => {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const movieID = useParams();

  useEffect(() => {
    const payload = `
    {
        movie(id: ${movieID.id}) {
            id 
            title
            year
            runtime
            description
            release_date
            rating
            mpaa_rating
        }
    }
    `;

    axios
      .post("http://localhost:4000/v1/graphql", payload)
      .then((json) => {
        setMovie(json.data.data.movie);
        setIsLoaded(!isLoaded);
      })
      .catch((error1) => {
        setError(error1.response.status);
      });
  }, []);

  if (movie.genres) {
    movie.genres = Object.values(movie.genres);
  } else {
    movie.genres = [];
  }

  if (error) {
    return <div>Error: Invalid response code: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>
          Movie: {movie.title} ({movie.year})
        </h2>

        <div className="float-start">
          <small>Rating: {movie.mpaa_rating}</small>
        </div>
        <div className="float-end">
          {movie.genres.map((m, index) => (
            <span className="badge bg-secondary me-1" key={index}>
              {m}
            </span>
          ))}
        </div>
        <div className="clearfix"></div>

        <hr />

        <table className="table table-compact table-striped">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <strong>Title:</strong>
              </td>
              <td>{movie.title}</td>
            </tr>
            <tr>
              <td>
                <strong>Description:</strong>
              </td>
              <td>{movie.description}</td>
            </tr>
            <tr>
              <td>
                <strong>Run Time:</strong>
              </td>
              <td>{movie.runtime} minutes</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

export default Onemoviegraphql;
