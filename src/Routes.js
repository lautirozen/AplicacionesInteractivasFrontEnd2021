import React, { Component } from "react";
import { BrowserRouter as Router,Route, useHistory, Switch} from "react-router-dom";
import Nosotros from "./components/Nosotros/Nosotros";
import Productos from "./components/Productos/Productos";
import Login from "./components/Login/Login";
import Registrarse from "./components/Registrarse/Registrarse";
import OlvideContraseña from "./components/OlvidarContra/OlvidarseContra";
import OlvidarseContraseña from "./components/OlvidarContra/OlvidarseContraSegundo";
import RecuperarContraseña from "./components/OlvidarContra/RecuperarContraseña";
import Home from "./components/Home/Home";
import DetalleProducto from "./components/Productos/DetalleProducto";
import Dirrecion from "./components/Cart/Direccion";
import Cart from "./components/Cart/Cart";
import Resumen from "./components/Cart/Resumen";
import Pedido from "./components/Pedido/Pedido";
import HomeAdmin from "./components/Administrador/HomeAdmin";
import AñadirProducto from "./components/Administrador/AñadirProducto";
import BuscarModificarProducto from "./components/Administrador/BuscarModificarProducto";
import ModificarProducto from "./components/Administrador/ModificarProducto";
import DeshabilitarProducto from "./components/Administrador/DeshabilitarProducto";
import ResumenPedidos from "./components/Administrador/ResumenPedidos";
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
                    <Route exact path="/ResumenVentas" component={ResumenPedidos} />
                </Switch>
            </Router>
        )
    }
}