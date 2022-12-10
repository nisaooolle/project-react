import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavigationBar from "./component/NavigationBar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginAdmin from "./pages/LoginAdmin";
import Edit from "./pages/Edit";
import Makanan from "./pages/Makanan";
import Minuman from "./pages/Minuman";
import Camilan from "./pages/Camilan";
import HomeAdmin from "./pages/HomeAdmin";
import Footer from "./component/Footer";

function App() {
    // this.state = {
    //   categoriYangDipilih:  'Makanan' , 
    //   keranjangs: []

    //   masukKeranjang = (value) => {
    //     console.log("Menu : " , value);
    //   }
    // }
  return (
    <div>
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/admin" component={LoginAdmin} exact />
            <div>
              <NavigationBar />
              <Route path="/" component={Home} exact />
              <Route path="/homeAdmin" component={HomeAdmin} exact />
              <Route path="/cart" component={Cart} exact />
              <Route path="/makanan" component={Makanan} exact />
              <Route path="/minuman" component={Minuman} exact />
              <Route path="/camilan" component={Camilan} exact />
              <Route path="/footer" component={Footer} exact />
              <Route path="/edit/:id" component={Edit} exact />
            </div>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
