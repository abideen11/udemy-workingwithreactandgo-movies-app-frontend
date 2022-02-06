import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = ({ jwt }) => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === "") {
      navigate("/login");
    }
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
        <h2>Manage Catalogue</h2>

        <hr />

        <div className="list-group">
          {movies.map((m) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/admin/movie/${m.id}`}
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

export default Admin;
