import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "../style/homeAdmin.css"

export default function HomeAdmin() {
  const [menu, setMenu] = useState([]); //useState berfungsi untuk menyimpan data sementara

  //untuk melihat semua data
  const getAll = () => {
    axios
      .get("http://localhost:8000/makanans")
      .then((res) => {
        setMenu(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };

  useEffect(() => {
    //mengambil data, memperbarui DOM secara langsung,
    getAll();
  }, []);

  //menghapus data
  const deleteUser = async (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus data ini?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/makanans/" + id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }); // untuk pemberitahuan jika sudah berhasil menghapus
    getAll();
  };

  // totalHarga() {
  //   return this.cart.reduce((a, b) => a + b.harga, 0);
  // },
  return (
    <div className="container my-5">
      <table className="table table-bordered">
        <thead>
          <tr className="tabel">
            <th>No</th>
            <th className="img">Image</th>
            <th className="nama">Nama Product</th>
            <th className="des">Deskripsi</th>
            <th className="harga">Harga</th>
            {localStorage.getItem("username") !== null ? (
              <th>action</th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {menu.map(
            (
              makan,
              index //map untuk memetakan data
            ) => (
              <tr key={makan.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={makan.link} alt="" />
                </td>
                <td>{makan.namamakanan}</td>
                <td>{makan.deskripsi}</td>
                <td>{makan.harga}</td>
                {localStorage.getItem("username") !== null ? (
                  <td className="data">
                    <Button //button klik untuk delete
                      variant="danger"
                      className="mx-1"
                      onClick={() => deleteUser(makan.id)}
                    >
                      Hapus
                    </Button>
                    {/* untuk mengarahkan web ke path edit */}
                    <a href={"/edit/" + makan.id}>
                      <Button //button klik untuk edit
                        variant="warning"
                        className="mx-1"
                      >
                        Ubah
                      </Button>
                    </a>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
