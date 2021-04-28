import React, {useState} from 'react';
import NavigationAdmin from '../components/Navbar';
import {Button, Card} from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import history from './../history';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';
import Footer from '../components/Footer';


const ModifyProduct  = (props) => {
const [show, setShow]=useState(false);
const [elementoAAgregar, setElementoAAgregar]=useState("");    
const ModificarArticulo =(Titulo,Categoria,Precio, Marca, Descripcion, Codigo, Stock, Imagen)=>{
    const catalogo={
        titulo:Titulo,
        categoria:Categoria,
        precio:Precio,
        marca:Marca,
        descripcion:Descripcion,
        codigo:Codigo,
        stockInicial: Stock,
        stock:Stock,
        cantV:0,
        image:Imagen,

    }
    setElementoAAgregar(catalogo)
    setShow(true)

}
const useStyles = makeStyles((theme) => ({
    Addproduct:{
        backgroundColor:"#F2EFEB"
    },
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
        backgroundColor:"#F2EFEB",
        padding:30,
    },
    title:{
        fontStyle:"italic",
        marginTop:"3rem",
        textAlign:"center",
        fontWeight: 'bold',
        marginBottom:"2rem",
    },
    space:{
        marginTop:"15px",
    }
    }));
    const handleClose = () =>{
        setShow(false);
        history.push({
        pathname: '/BuscarCrearCuenta',
        state:JSON.parse(localStorage.getItem('user')) })
        }
    const classes = useStyles();
    const [elemento, setElemento] = useState(props.location.state); 
    return(
        <div className={classes.Addproduct}>
    <NavigationAdmin />
    <div className={classes.modify}>
        <div><h2 className={classes.title}>Crear Nuevo producto para el catalogo</h2>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-2">
                        <Formik
                        initialValues={{
                        titulo: elemento.titulo,
                        categoria: elemento.categoria,
                        precio: elemento.precio,
                        marca:elemento.marca,
                        descripcion: elemento.descripcion,
                        codigo: elemento.codigo,
                        stock: elemento.stock ,
                        imagen: elemento.imagen,
                        }}
                        validationSchema={Yup.object().shape({
                        titulo: Yup.string()
                        .required('El campo es obligatorio (*)')
                        .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                        descripcion: Yup.string()
                        .required('El campo es obligatorio (*)')
                        .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                        marca: Yup.string()
                        .required('El campo es obligatorio (*)'),
                        Precio: Yup.string()
                        .matches(Number,'Ingrese únicamente números')
                        .required('El campo es obligatorio (*)'),
                        stock: Yup.string()
                        .matches(Number,'Ingrese únicamente números')
                        .required('El campo es obligatorio (*)'),
                        categoria:Yup.string()
                        .required('El campo es obligatorio (*)')
                        .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                        codigo: Yup.string()
                        .required('El campo es obligatorio (*)'),
                        image: Yup.string()
                        .required('El campo es obligatorio (*)')
                        })}
                        onSubmit={fields => {
                        ModificarArticulo(fields.titulo, fields.categoria, fields.precio, fields.marca, fields.descripcion, fields.codigo, fields.stock, fields.image)
                        }}
                        render={({ errors, status, touched }) => (
                        <Card style={{backgroundColor:"#F2EFEB"}} className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-2">
                        <div className={classes.modify}>
                            <Form>
                            <div className="form-group">
                                <label htmlFor="titulo">Nombre del producto</label>
                                <Field name="titulo" type="text" className={'form-control' + (errors.titulo && touched.titulo ? ' is-invalid' : '')} />
                                <ErrorMessage name="titulo" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoria">Categoria del producto</label>
                                <Field name="categoria" type="text" className={'form-control' + (errors.categoria && touched.categoria ? ' is-invalid' : '')} />
                                <ErrorMessage name="categoria" component="div" className="invalid-feedback" />
                            </div>
                                <div className="form-group">
                                <label htmlFor="precio">Precio de venta</label>
                                <Field name="precio" type="text" className={'form-control' + (errors.precio&& touched.precio ? ' is-invalid' : '')} />
                                <ErrorMessage name="precio" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Marca">Marca</label>
                                <Field name="marca" type="text"  className={'form-control' + (errors.Marca && touched.Marca ? ' is-invalid' : '')} />
                                <ErrorMessage name="Marca" component="div" className="invalid-feedback" />
                            </div>
<div className="form-group">
<label htmlFor="codigo">Codigo</label>
<Field name="codigo" type="text" className={'form-control' + (errors.codigo && touched.codigo ? ' is-invalid' : '')} />
<ErrorMessage name="codigo" component="div" className="invalid-feedback" />
</div>
<div className="form-group">
<label htmlFor="stock">Stock</label>
<Field name="stock"  type="text" className={'form-control' + (errors.stock && touched.stock ? ' is-invalid' : '')} />
<ErrorMessage name="stock" component="div" className="invalid-feedback" />
</div>
<div className="form-group">
<label htmlFor="Imagen">Imagen</label>
<Field name="Imagen"  type="text" className={'form-control' + (errors.Imagen&& touched.Imagen ? ' is-invalid' : '')} />
<ErrorMessage name="Imagen" component="div" className="invalid-feedback" />
</div>​​
<div className="form-group">
<button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#401801", marginTop:"15px"}}>Añadir producto</button>
</div>
</Form>
</div>
</Card>
)}
/>
</div>
</div>
</div>
</div>
</div>
<Modal size="lg"  style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
<Modal.Header closeButton>
<Modal.Title>Cuenta creada</Modal.Title>
</Modal.Header>
<Modal.Body>
<Alert severity="success">La cuenta ha sido creada exitosamente </Alert><br />
Los datos de la cuenta son los siguientes: <br />
<h7 style={{fontWeight: 'bold'}}>Nombre: </h7>{elementoAAgregar.titulo}​​<br />
<h7 style={{fontWeight: 'bold'}}>Categoria: </h7> {elementoAAgregar.Categoria}​​ <br />
<h7 style={{fontWeight: 'bold'}}>Precio: </h7>{elementoAAgregar.Precio}​​<br />
<h7 style={{fontWeight: 'bold'}}>Marca: </h7>{elementoAAgregar.Marca}​​<br />
<h7 style={{fontWeight: 'bold'}}>Descripcion: </h7>{elementoAAgregar.Descripcion}​​<br />
<h7 style={{fontWeight: 'bold'}}>Codigo: </h7>{elementoAAgregar.Codigo}​​<br />
<h7 style={{fontWeight: 'bold'}}>Stock: </h7>{elementoAAgregar.Stock}​​<br />
<h7 style={{fontWeight: 'bold'}}>Imagen: </h7>{elementoAAgregar.Imagen}​​<br />
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#BF6D3A"}}>
Cerrar
</Button>
</Modal.Footer>
</Modal>
<Footer />
</div>

    );
 }
export default ModifyProduct