import React, { Component } from "react";
import { BrowserRouter as Router,Route, useHistory, Switch} from "react-router-dom";
import Nosotros from "./Nosotros/Nosotros";
import Productos from "./Productos/Productos";
import Login from "./Login/Login";
import Registrarse from "./Registrarse/Registrarse";
import OlvideContraseña from "./OlvidarContra/OlvidarseContra";
import OlvidarseContraseña from "./OlvidarContra/OlvidarseContraSegundo";
import RecuperarContraseña from "./OlvidarContra/RecuperarContraseña";
import Home from "./Home/Home";
import Admin from "./Home/Admin";
import Addproduct from "./Admin/AddProduct";
import BuscarEnCatalogo from "./Admin/productFinder";
import ModifyProduct from "./Admin/ModifyProduct";
import DetalleProducto from "./Productos/DetalleProducto";
export default class Routes extends Component {
    render() {
        console.log("Redirigiendo")
        return (
            <Router history={useHistory}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Nosotros" component={Nosotros}/>
                    <Route exact path="/Productos" component={Productos} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Registrarse" component={Registrarse} />
                    <Route exact path="/OlvideContraseña" component={OlvideContraseña} />
                    <Route exact path="/OlvidarseContraseña" component={OlvidarseContraseña} />
                    <Route exact path="/RecuperarContraseña" component={RecuperarContraseña} />
                    <Route exact strict path="/productos/:titulo" component={DetalleProducto} />
                    <Route exact strict path="/Home/Admin" component={Admin} />
                    <Route exact path="/AddProduct" component={Addproduct} />
                    <Route exact path="/modproduct" component={BuscarEnCatalogo} />
                    <Route exact path="/ModifyProduct" component={ModifyProduct} />
                </Switch>
            </Router>
        )
    }
}