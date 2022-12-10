import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import "../style/home.css";
export default function Home() {
  const [menu, setMenu] = useState([]); //useState berfungsi untuk menyimpan data sementara
  const [foodId, setFoodId] = useState(0);

  // const handleAddToCart = () => {
  //   onAddToCart(product.id, 1);
  // }

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
    <div className="isi">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="true"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://waroengsteakandshake.com/uploads/2022/11/01/Menu_Bulky_Waroeng_Steak_and_Shake.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://waroengsteakandshake.com/uploads/2022/12/06/12.12_BANNER_WEB.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://waroengsteakandshake.com/uploads/2022/10/12/PROMO_LIVIN_THE_COFFEE.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <hr />
      <h2 className="baru">~~Menu Baru~~</h2>
      <hr />
      <div className="cr flex-wrap">
        {menu.map((makan) => (
          <div
            data-aos="zoom-in"
            className="card  text-bg-secondary mb-3"
            style={{ width: "18rem" }}
          >
            <img src={makan.link} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{makan.namamakanan}</h5>
              <p className="card-text">{makan.deskripsi}</p>
              <p>Rp.{makan.harga}</p>
              {localStorage.getItem("id") !== null ? (
                <a
                  onClick={() => addToCart(makan.id)}
                  className="btn btn-warning"
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
    </div>
  );
}
