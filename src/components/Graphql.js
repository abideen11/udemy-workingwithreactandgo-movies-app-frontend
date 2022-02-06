import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./form-components/Input";

const Graphql = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState({
    search: "",
  });

  useEffect(() => {
    const payload = `
        {
            list {
                id 
                title
                year
                runtime
                description
            }
        }
        `;
    axios
      .post("http://localhost:4000/v1/graphql", payload)
      .then((json) => {
        setMovies(json.data.data.list);
        setIsLoaded(!isLoaded);
      })
      .catch((error1) => {
        setError(error1.response.status);
      });
  }, []);

  const performSearch = () => {
    const payload = `
    {
        search(titleContains: "${searchTerm.search}") {
            id 
            title
            year
            runtime
            description
        }
    }
    `;

    axios
      .post("http://localhost:4000/v1/graphql", payload)
      .then((json) => {
        let theList = json.data.data.search;
        if (theList.length > 0) {
          setMovies(json.data.data.search);
        } else {
          setMovies([]);
        }
      })
      .catch((error1) => {
        setError(error1.response.status);
      });
  };

  if (error) {
    return <div>Error: Invalid response code: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>GraphQL</h2>
        <hr />
        <Input
          type={"text"}
          title={"Search"}
          name={"search"}
          value={searchTerm.search}
          changeState={setSearchTerm}
          performSearch={performSearch}
        />
        <div className="list-group">
          {movies.map((m) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/moviesgraphql/${m.id}`}
            >
              <strong>{m.title}</strong>
              <br />
              <small className="text-muted">
                ({m.year}) - {m.runtime} minutes
              </small>
              <br />
              {m.description.slice(0, 100)}...
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default Graphql;
