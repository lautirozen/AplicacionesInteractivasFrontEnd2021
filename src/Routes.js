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
import DetalleProducto from "./Productos/DetalleProducto";
import Dirrecion from "./Cart/Direccion";
import Cart from "./Cart/Cart";
import Resumen from "./Cart/Resumen";
import Pedido from "./Pedido/Pedido";
import HomeAdmin from "./Administrador/HomeAdmin";
import AñadirProducto from "./Administrador/AñadirProducto";
import BuscarModificarProducto from "./Administrador/BuscarModificarProducto";
import ModificarProducto from "./Administrador/ModificarProducto";
import DeshabilitarProducto from "./Administrador/DeshabilitarProducto";
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
                    <Route exact path="/Carrito" component={Cart} />
                    <Route exact path="/Carrito/Formulario" component={Dirrecion} />
                    <Route exact path="/Carrito/Formulario/Resumen" component={Resumen} />
                    <Route exact path="/Pedidos" component={Pedido} />
                    <Route exact path="/HomeAdmin" component={HomeAdmin} />
                    <Route exact path="/AñadirProducto" component={AñadirProducto} />
                    <Route exact path="/BuscarModificarProducto" component={BuscarModificarProducto} />
                    <Route exact strict path="/ModificarProducto/:titulo" component={ModificarProducto} />
                    <Route exact path="/DeshabilitarProducto" component={DeshabilitarProducto} />
                </Switch>
            </Router>
        )
    }
}