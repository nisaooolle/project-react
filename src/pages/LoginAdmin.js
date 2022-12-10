import axios from "axios";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/login.css";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const loginAdmin = async (e) => {
    e.preventDefault();
    axios.get(" http://localhost:8000/admins").then(({ data }) => {
      const user = data.find(
        (x) => x.username === username && x.password === password
      );
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Masuk sebagai " + username,
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("username", user.username)
        localStorage.setItem("id", user.id)
        history.push("/homeAdmin");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Username Or Password Not Found",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="container border my-5 pt-3 pb-5 px-5">
      <h1 className="mb-5">Form Login Admin</h1>
      <Form onSubmit={loginAdmin} method="POST">
        <div className="mb-3">
          <Form.Label>
            <strong>Username</strong>
          </Form.Label>
          <InputGroup className="d-flex gap 3">
            <Form.Control
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}required
            />
          </InputGroup>
        </div>
        <div className="mb-3">
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <InputGroup className="d-flex gap 3">
            <Form.Control
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required
            />
          </InputGroup>
        </div>
        <button type="submit" className="mx-1  btn btn-primary">
          Login
        </button>
      </Form>
      <br />
    </div>
  );
};

export default LoginAdmin;
