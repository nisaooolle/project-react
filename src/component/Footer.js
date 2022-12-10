import React from "react";
import image from "../image/logo (1).png";
import "../style/footer.css";

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div>
          <img className="fot" src={image} alt="" />
          <br />
          <h5>#STEAKNYAINDONESIA</h5>
        </div>
        <div>
          <h4>Informasi</h4>
          <p>Profil Waroeng Steak & Shake</p>
          <p>Sertifikasi dan</p>
          <p>Jaminan Kualitas</p>
        </div>

        <div>
          <h4>Layanan</h4>
          <p>Waroeng Food Truck</p>
          <p>Saran & Kritik</p>
        </div>

        <div className="phg">
          <h4>Penghargaan Dan Sertifikat</h4>
          <img
            className="fott"
            src="https://waroengsteakandshake.com/assets/v2/img/top-digital-pr-2022.png"
            alt=""
          />
          <img
            className="fott"
            src="https://waroengsteakandshake.com/assets/v2/img/LOGO%20MURI.png"
            alt=""
          />
          <img
            className="fott"
            src="https://waroengsteakandshake.com/assets/v2/img/logo-halal-2.png"
            alt=""
          />
          <img
            className="fott"
            src="https://waroengsteakandshake.com/assets/v2/img/logo-top-brand-2022.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <p className="rigt">Hak Cipta © 2020 Waroeng Steak and Shake. Seluruh Hak Cipta.</p>
      </div>
    </div>
  );
}
