import React, {useState } from 'react';
import { Button, Card} from 'react-bootstrap';
import Navigation from '../components/Navbar';
import {Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import {Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';

function BuscarEnCatalogo (){
const [user, setUser]=useState(false);
const [cliente, setCliente]=useState(false);
const useStyles=makeStyles((theme) => ({
container: {
display: 'flex',
flexWrap: 'wrap',
},
textField: {
marginLeft: theme.spacing(1),
marginRight: theme.spacing(1),
marginBottom: theme.spacing(2),
width: 200,
},
modify: {
padding:30,
},
button: {
backgroundColor:"#BF6D3A",
color:"white",
marginTop:"15px"
},
title:{
fontStyle:"italic",
textAlign:"center",
marginTop:"15px",
},
title1:{
fontWeight: 'bold'
}
}));
const Number = /^[0-9]+$/;
const classes = useStyles();
const [display, setDisplay]=useState(false);
const [elementoABuscar, setElementoABuscar]=useState("");
const [productoView, setProductoView]=useState(false);

return (
<div className="Modificar">
    <Navigation/>
    <div className={classes.modify}>
        <div><h2 className={classes.title}>Crear cuenta bancaria</h2>
        <Card className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
    <div className={classes.modify}>
<h7 className={classes.title1}>Buscar cliente por DNI/CBU/CUIT</h7>
<Formik
initialValues={{
Buscador: '',
}}
validationSchema={Yup.object().shape({
Buscador: Yup.string()
.required('El campo es obligatorio (*)')
})}
onSubmit={fields => {
    const catalogo={
        id: 28,
        titulo: "Copa Vino Diamante 490 Ml x6 Libey",
        categoria: "vasos y copas",
        precio: "1,549",
        marca: "Libbey",
        descripcion:"Copa de Degustación para Vino - Forma Diamante 490 Ml x6 unidades",
        codigo:"copavinolibbey",
        stock:"7",
    }
    if (fields.Buscador===catalogo.titulo){
        setElementoABuscar(catalogo)
        setProductoView(true)
        setDisplay(false)
    }
    else{
        setProductoView(false)
        setDisplay(true)
    }

}}
render={({ errors, status, touched }) => (
<Form>
<div class="row">
<Field name="Buscador" type="text" className={'form-control col-sm-5 col-lg-9 ml-3' + (errors.Buscador && touched.Buscador ? ' is-invalid' : '')} />
<button type="submit" className="btn btn-primary col-sm-1 col-sm-md-2 col-lg-1 ml-lg-2" style={{backgroundColor: "#BF6D3A"}}><SearchIcon /></button>
<ErrorMessage name="Buscador" component="div" className="invalid-feedback" />
{display && (
<Alert severity="error">No se han encontrado resultados</Alert>)}
</div>
</Form>
)}
/>
{productoView && (
<div className={classes.title1}>
<h7 >titulo: </h7>{elementoABuscar.titulo}<br />
<h7 >marca: </h7> {elementoABuscar.marca} <br />
<h7>precio: </h7>{elementoABuscar.precio}<br />
<h7>categoria: </h7>{elementoABuscar.categoria}<br />
<Link to={{
pathname: '/ModifyProduct',
state:elementoABuscar}}><Button style ={{backgroundColor:"#BF6D3A", color:"white"}} > Siguiente </Button></Link>
</div>
)}
</div>
</Card>
</div>
</div>
</div>
);
}
export default BuscarEnCatalogo;

