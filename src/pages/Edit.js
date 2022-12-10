import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
// import "../style/edit.css";
import Swal from "sweetalert2";

const Edit = () => {
  //method edit
  const param = useParams(); //mengembalikan objek
  const [link, setLink] = useState("");
  const [namamakanan, setNamamakanan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");

  const history = useHistory(); // akses ke instance riwayat yang dapat digunakan untuk bernavigasi.

  useEffect(() => {
    //mengambil data, memperbarui DOM secara langsung,
    axios
      .get("http://localhost:8000/makanans/" + param.id)
      .then((response) => {
        const newfood = response.data;
        setLink(newfood.link);
        setNamamakanan(newfood.namamakanan);
        setDeskripsi(newfood.deskripsi);
        setHarga(newfood.harga);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir!!" + error);
      });
  }, []);

  const submitActionHandler = async (event) => {
    //untuk mengeksekusi setiap kali event dipicu.
    event.preventDefault(); //tindakan default yang termasuk dalam acara tersebut tidak akan terjadi.

    //axios put untuk mengedit data
    await Swal.fire({
      title: "Anda yakin ingin mengedit?",
      text: "yakinn ingin mengedit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.put("http://localhost:8000/makanans/" + param.id, {
            link: link,
            namamakanan: namamakanan,
            deskripsi: deskripsi,
            harga: harga,
          });
          Swal.fire("Edit!", "Berhasil mengedit", "success");
        }
      })
      .then(() => {
        history.push("/homeAdmin"); //untuk mengepush ulang data setelah diedit
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        alert("Terjadi kesalahan :" + error);
      });
  };
  return (
    <div className="edit mx-5">
      <div className="container my-5">
        <h2>Update</h2>
        <hr />
        <Form onSubmit={submitActionHandler}>
          <div className="name mb-3">
            <Form.Label>
              <strong>Link</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="place-of birth mb-3">
            <Form.Label>
              <strong className="name">Nama Product</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Nama Product"
                value={namamakanan}
                onChange={(e) => setNamamakanan(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="birth-date mb-3">
            <Form.Label>
              <strong className="name">Deskripsi</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="birth-date mb-3">
            <Form.Label>
              <strong className="name">Harga</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <div className="d-flex justify-content-end align-items-center mt-2 mb-">
              <button className="button btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
