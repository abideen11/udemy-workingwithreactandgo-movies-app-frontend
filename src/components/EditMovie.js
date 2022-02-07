import axios from "axios";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditMovie.css";
import Input from "./form-components/Input";
import Select from "./form-components/Select";
import Textarea from "./form-components/Textarea";
import Alert from "./ui-components/Alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const EditMovie = ({ jwt }) => {
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    rating: "",
    description: "",
  });

  const [mpaaOptions] = useState([
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
  ]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState({
    type: "d-none",
    message: "",
  });

  const movieID = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === "") {
      navigate("/login");
    }
    if (parseInt(movieID.id) > 0) {
      axios
        .get(`http://localhost:4000/v1/movie/${movieID.id}`)
        .then((json) => {
          const releaseDate = new Date(json.data.movie.release_date);
          setMovie({
            id: json.data.movie.id,
            title: json.data.movie.title,
            release_date: releaseDate.toISOString().split("T")[0],
            runtime: json.data.movie.runtime,
            mpaa_rating: json.data.movie.mpaa_rating,
            rating: json.data.movie.rating,
            description: json.data.movie.description,
          });
          setIsLoaded(!isLoaded);
        })
        .catch((error1) => {
          setError(error1.response.status);
        });
    } else {
      setIsLoaded(!isLoaded);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors2 = [];
    if (movie.title === "") {
      errors2.push("title");
    }

    setErrors(errors2);

    if (errors2.length > 0) {
      return false;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());
    payload.id = `${movie.id}`;
    const myHeaders = {};
    myHeaders.Authorization = `Bearer ${jwt}`;

    axios
      .post("http://localhost:4000/v1/admin/editmovie", payload, {
        headers: myHeaders,
      })
      .then(() => {
        setAlert({
          type: "alert-success",
          message: "Changes saved!",
        });
        navigate("/admin");
      })
      .catch((error1) => {
        setError(error1.response.status);
        setAlert({
          type: "alert-danger",
          message: "An error occurred",
        });
      });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const confirmDelete = () => {
    confirmAlert({
      title: "Delete Movie?",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const myHeaders = {};
            myHeaders.Authorization = `Bearer ${jwt}`;
            axios
              .get(`http://localhost:4000/v1/admin/deletemovie/${movie.id}`, {
                headers: myHeaders,
              })
              .then(() => {
                setAlert({ type: "alert-success", message: "Movie deleted!" });
                navigate("/admin");
              })
              .catch(() => {
                setAlert({
                  type: "alert-danger",
                  message: "An error occurred",
                });
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  if (error) {
    return <div>Error: Invalid response code: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>Add/Edit Movie</h2>
        <Alert alertType={alert.type} alertMessage={alert.message} />
        <hr />
        <form onSubmit={handleSubmit}>
          <Input
            type={"text"}
            title={"Title"}
            className={() => (hasError("title") ? "is-invalid" : "")}
            name={"title"}
            value={movie.title}
            changeState={setMovie}
            errorDiv={() => (hasError("title") ? "text-danger" : "d-none")}
            errorMsg={"Please enter a title"}
          />

          <Input
            type={"date"}
            title={"Release Date"}
            name={"release_date"}
            value={movie.release_date}
            changeState={setMovie}
          />

          <Input
            type={"text"}
            title={"Runtime"}
            name={"runtime"}
            value={movie.runtime}
            changeState={setMovie}
          />

          <Select
            title={"MPAA Rating"}
            name={"mpaa_rating"}
            mpaaOptions={mpaaOptions}
            value={movie.mpaa_rating}
            placeholder={"Choose..."}
            setMovie={setMovie}
          />

          <Input
            type={"text"}
            title={"Rating"}
            name={"rating"}
            value={movie.rating}
            changeState={setMovie}
          />

          <Textarea
            title={"Description"}
            name={"description"}
            rows={"3"}
            value={movie.description}
            setMovie={setMovie}
          />

          <hr />

          <button className="btn btn-primary">Save</button>
          <Link to="/admin" className="btn btn-warning ms-1">
            Cancel
          </Link>
          {movie.id > 0 && (
            <a
              href="#!"
              onClick={confirmDelete}
              className="btn btn-danger ms-1"
            >
              Delete
            </a>
          )}
        </form>
      </>
    );
  }
};

export default EditMovie;
