import React, { useState } from "react";
import axios from "axios";
import Input from "./form-components/Input";
import Alert from "./ui-components/Alert";
import { useNavigate } from "react-router-dom";

const Login = ({ setJwt }) => {
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState({
    type: "d-none",
    message: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors2 = [];

    if (login.email === "") {
      errors2.push("email");
    }

    if (login.password === "") {
      errors2.push("password");
    }

    setErrors(errors2);

    if (errors2.length > 0) {
      return false;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    axios
      .post("http://localhost:4000/v1/signin", payload)
      .then((json) => {
        setJwt(Object.values(json.data)[0]);
        window.localStorage.setItem(
          "jwt",
          JSON.stringify(Object.values(json.data)[0])
        );
        navigate("/admin");
      })
      .catch(() => {
        setAlert({
          type: "alert-danger",
          message: "An error occurred",
        });
      });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return (
    <>
      <h2>Login</h2>
      <hr />
      <Alert alertType={alert.type} alertMessage={alert.message} />
      <form className="pt-3" onSubmit={handleSubmit}>
        <Input
          type={"email"}
          title={"Email"}
          className={() => (hasError("email") ? "is-invalid" : "")}
          name={"email"}
          value={login.email}
          changeState={setLogin}
          errorDiv={() => hasError("email" ? "text-danger" : "d-none")}
          errorMsg={"Please enter a valid email address"}
        />
        <Input
          type={"password"}
          title={"Password"}
          className={() => (hasError("password") ? "is-invalid" : "")}
          name={"password"}
          value={login.password}
          changeState={setLogin}
          errorDiv={() => hasError("password" ? "text-danger" : "d-none")}
          errorMsg={"Please enter a password"}
        />

        <hr />
        <button className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default Login;
