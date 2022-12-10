import axios from "axios";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    axios.get(" http://localhost:8000/users").then(({ data }) => {
      const user = data.find(
        (x) => x.email === email && x.password === password
      );
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Selamat Datang!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("id", user.id);
        history.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Email Or Password Not Found",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="container border my-5 pt-3 pb-5 px-5">
      <h1 className="mb-5">Form Login</h1>
      <Form onSubmit={login} method="POST">
        <div className="mb-3">
          <Form.Label>
            <strong>Email</strong>
          </Form.Label>
          <InputGroup className="d-flex gap 3">
            <Form.Control
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required
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
      <p>
        <span className="notReg">
          Silahkan Register Jika Tidak Memiliki Akun
        </span> 
        <a href="/register" className="navbar-brand reg">
          {" "}
          Register
        </a>
      </p>
      <p>
        <span className="notReg">
          Masuk sebagai Admin
        </span> 
        <a href="/admin" className=" navbar-brand reg">
          {" "}
          Login Admin
        </a>
      </p>
    </div>
  );
};

export default Login;
