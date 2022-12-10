import axios from "axios";
import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import image from "../image/logo (1).png";
import "../style/nav.css";
export default function NavigationBar() {
  const [show, setShow] = useState(false); //useState berfungsi untuk menyimpan data sementara
  const [link, setLink] = useState("");
  const [namamakanan, setNamamakanan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");

  const history = useHistory();
  const handleClose = () => setShow(false); // fungsi handleClose akan menyetel variabel acara ke false.
  const handleShow = () => setShow(true); //  menyetel variabel status acara ke true,

  const addUser = async (e) => {
    e.preventDefault();

    const data = {
      link: link,
      namamakanan: namamakanan,
      deskripsi: deskripsi,
      harga: harga,
    };

    //axios post untuk menambahkan data ke database
    await axios.post("http://localhost:8000/makanans", data);
    Swal.fire({
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    })
      .then(() => {
        window.location.reload(); //otomatis reload web setelah menambahkan data
      })
      .catch((error) => {
        // alert error untuk mengetahui jika terjadi error
        alert("Terjadi kesalahan" + error);
      });
  };

  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/login");
  };
  return (
    <div className="nav">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img className="images" src={image} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="navbar-brand " aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="/cart">
                  Cart
                </a>
              </li>

              {localStorage.getItem("username") !== null ? (
                <>
                  <li className="nav-item">
                    <a className="navbar-brand btn" onClick={handleShow}>
                      Tambah Product
                    </a>
                  </li>
                </>
              ) : (
                <></>
              )}
              {localStorage.getItem("id") !== null ? (
              <li className="nav-item float-ringht">
                <a className="navbar-brand btn" onClick={logout}>
                  Logout
                </a>
              </li>
              ):(
              <li className="nav-item">
                <a className="navbar-brand" href="/login">
                  Login
                </a>
              </li>
                )}
            </ul>
          </div>
          <br />
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-warning dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              List Menu
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/makanan">
                  Makanan
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/minuman">
                  Minuman
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/camilan">
                  Camilan
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* modal untuk mengisi data saat ingin menambahkan isi table */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="add" closeButton>
          <Modal.Title>Tambah menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addUser} method="POST">
            <div className="mb-3">
              <Form.Label>
                <strong>Image</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Nama Product</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan nama product"
                  value={namamakanan}
                  onChange={(e) => setNamamakanan(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Deskripsi</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  type="text"
                  placeholder="Masukkan Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Harga</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan Harga"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <button
              className="mx-1 button-btl btn btn-danger"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="mx-1 button btn btn-primary"
              onClick={handleClose}
            >
              Save
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
