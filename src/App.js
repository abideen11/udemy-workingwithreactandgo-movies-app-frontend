import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Movies from "./components/Movies";
import OneMovie from "./components/OneMovie";
import Genres from "./components/Genres";
import OneGenre from "./components/OneGenre";
import EditMovie from "./components/EditMovie";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Graphql from "./components/Graphql";
import Onemoviegraphql from "./components/Onemoviegraphql";

const App = () => {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    let t = window.localStorage.getItem("jwt");
    if (t !== null && jwt === "") {
      setJwt(JSON.parse(t));
    }
  }, []);

  const logout = () => {
    setJwt("");
    window.localStorage.removeItem("jwt");
  };

  let loginLink;

  if (jwt === "") {
    loginLink = <Link to="/login">Login</Link>;
  } else {
    loginLink = (
      <Link to="/logout" onClick={logout}>
        Logout
      </Link>
    );
  }

  return (
    <BrowserRouter>
      <div className="container">
        <div className="row">
          <div className="col mt-3">
            <h1 className="mt-3">Go Watch a Movie!</h1>
          </div>
          <div className="col mt-3 text-end">{loginLink}</div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>
                {jwt !== "" && (
                  <>
                    <li className="list-group-item">
                      <Link to="/admin/movie/0">Add movie</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/admin">Manage Catalogue</Link>
                    </li>
                  </>
                )}
                <li className="list-group-item">
                  <Link to="/graphql">GraphQL</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-mid-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/moviesgraphql/:id" element={<Onemoviegraphql />} />
              <Route path="/movies/:id" element={<OneMovie />} />
              <Route path="/genre/:id" element={<OneGenre />} />
              <Route path="/login" element={<Login setJwt={setJwt} />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/graphql" element={<Graphql />} />
              <Route path="/admin" element={<Admin jwt={jwt} />} />
              <Route
                path="/admin/movie/:id"
                element={<EditMovie jwt={jwt} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
