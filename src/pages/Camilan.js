import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Camilan() {
  const [menu, setMenu] = useState([]); //useState berfungsi untuk menyimpan data sementara
  const [foodId, setFoodId] = useState(0);

  //untuk melihat semua data
  const getAll = () => {
    axios
      .get("http://localhost:8000/camilan")
      .then((res) => {
        setMenu(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };

  const addToCart = async (e) => {
    await axios
      .post("http://localhost:8000/cart/" + foodId)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        setFoodId(0);
        alert("success");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //mengambil data, memperbarui DOM secara langsung,
    getAll();
  }, []);
  return (
    <div className="cr flex-wrap">
      {menu.map((makanan) => (
        <div
          data-aos="zoom-in"
          className="card  text-bg-secondary mb-3"
          style={{ width: "18rem" }}
        >
          <img src={makanan.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{makanan.namabarang}</h5>
              <p className="card-text">{makanan.deskripsi}</p>
              <p>Rp.{makanan.harga}</p>
              {localStorage.getItem("id") !== null ? (
              <a
                onClick={() => addToCart(makanan.id)}
                className="btn btn-primary"
              >
                Beli
              </a>
          ) : (
              <></>
              )}
              </div>
        </div>
      ))}
    </div>
  );
}
