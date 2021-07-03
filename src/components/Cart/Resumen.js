import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Navigation from '../Navbar';
import NavigationLog from '../NavCart';
import Footer from "../Footer";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Alert } from '@material-ui/lab';
import moment from 'moment';
import axios from 'axios';
import urlWebServices from '../controller/webServices';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  resumen: {
    backgroundColor: "#F2EFEB",
  },
  titulo: {
    fontStyle: "italic",
    marginTop: "3rem",
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom: "2rem",
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(1) * 1)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));

export default function Resumen(props) {
  const classes = useStyles();
  const [datosenvio] = useState(props.location.state);
  var user = JSON.parse(localStorage.getItem('user'));
  const [formArray, setFormArray] = useState([]);
  const [nroPedido, setNroPedido] = useState(0);
  const history = useHistory();
  const [listItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [unombre] = useState(JSON.parse(localStorage.getItem('nombre')));
  const [usera] = useState(JSON.parse(localStorage.getItem('apellido')));
  const [userid] = useState(JSON.parse(localStorage.getItem('id')));
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("cartItems")
    history.push({
      pathname: '/'
    })
  }
  const confirmar = () => {
    listItems.map((product) => {
      const productoo = {
        titulo: product.titulo,
        categoria: product.categoria,
        precio: product.precio,
        marca: product.marca,
        descripcion: product.descripcion,
        codigo: product.codigo,
        stock: product.stock,
        image: product.image,
        cloudinary_id: product.cloudinary_id,
        cantidad: product.cantidad,
        ptotal: product.ptotal,
      }
      formArray.push(productoo)
    })
    const pedido = {
      fecha: (moment().format("DD-MM-YYYY")),
      precioTotal: parseFloat(datosenvio.totalprecio),
      direccion: (datosenvio.domicilio_calle + " " + datosenvio.domicilio_numero),
      productos: formArray,
      nombre: unombre,
      apellido: usera,
      userId: userid,
    }
    axios.post(urlWebServices.createPedido, pedido,
      {
        mode: "cors",
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token')),
          'Access-control-Allow-Origin': true,
          'Accept': 'application/form-data',
        },
      })
      .then(function (response) {
        setNroPedido(response.data.createdPedido._id)
        listItems.map((product) => {
          product.stock = (product.stock - product.cantidad)
          var form = new FormData()
          form.set('titulo', product.titulo);
          form.set('categoria', product.categoria);
          form.set('precio', product.precio);
          form.set('marca', product.marca);
          form.set('descripcion', product.descripcion);
          form.set('codigo', product.codigo);
          form.set('stock', product.stock);
          form.set('image', product.image);
          form.set('cloudinary_id', product.cloudinary_id);
          form.set('cantidad', 1);
          form.set('ptotal', 0);
          axios.post(urlWebServices.updateProducts, form,
            {
              mode: "cors",
              headers: {
                'x-access-token': JSON.parse(localStorage.getItem('token')),
                'Access-control-Allow-Origin': true,
                'Accept': 'application/form-data',
              },
            })
            .then(function (response) {
              setDisplay(false);
            })
            .catch(function (error) {
              console.log(error.message);
              setDisplay(true);
            });
        })
        setDisplay(false);
        localStorage.removeItem("pedido")
        setShow(true)
      })
      .catch(function (error) {
        setDisplay(true);
        console.log(error.message);
      });
  }
  return (
    <div className={classes.resumen}>
      {(user === null) ?
        <Navigation /> : <NavigationLog />}
      <div style={{ visibility: "hidden" }}>
        {listItems.map((product) => (
          (product.ptotal === 0) ?
            (product.ptotal = ((product.cantidad) * parseInt(product.precio)).toFixed(2))
            : null
        ))}
      </div>
      <div class="container">
        <React.Fragment>
          <div className={classes.titulo}>
            <h1>Resumen del carrito</h1>
          </div>
          <List disablePadding>
            {listItems.map((product) => (
              <div class="row col-md-12 mx-auto">
                <ListItem className={classes.listItem} key={product.id}>
                  <div class="col-sm-1 col-md-1">
                    <img src={product.image} width="50px" class="img-fluid" alt="Responsive image" />
                  </div>
                  <div class="col-sm-8 col-md-4">
                    <ListItemText primary={product.titulo} secondary={"Unidades " + product.cantidad} />
                  </div>
                  <div class="col-sm-3 col-md-2 ml-auto">
                    <Typography variant="body2">$ {product.ptotal}</Typography>
                  </div>
                </ListItem>
              </div>
            ))}
            <div style={{ borderTop: "2px solid #808080" }}></div>
            <div class="col-md-10 mx-auto">
              <ListItem className={classes.listItem}>
                <div class="ml-md-3">
                  <ListItemText primary="TOTAL" />
                </div>
                <div class="ml-auto">
                  <Typography variant="subtitle1" className={classes.total}>
                    $ {datosenvio.totalprecio}
                  </Typography>
                </div>
              </ListItem>
            </div>
          </List>
          <div style={{ borderTop: "2px solid #808080", marginLeft: 4, marginRight: 4 }}></div>
          <div class="row">
            <div class="col-md-6">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                    Datos del envío
                  </Typography>
                  <Typography gutterBottom>{datosenvio.nombre} {datosenvio.apellido}</Typography>
                  <Typography gutterBottom>{datosenvio.domicilio_calle} {datosenvio.domicilio_numero}, {datosenvio.domicilio_ciudad}, {datosenvio.domicilio_barrio}</Typography>
                </Grid>
              </Grid>
            </div>
            <div class="col-md-3 ml-auto my-auto">
              {display && (<Alert severity="error">Ha ocurrido un error al realizar la compra.</Alert>)}
              <button onClick={() => { history.push("/Carrito") }} className="btn btn-primary mr-2" style={{ backgroundColor: "#401801", marginTop: "15px" }}>Volver</button>
              <button onClick={confirmar} className="btn btn-primary" style={{ backgroundColor: "#401801", marginTop: "15px" }}>Realizar compra</button>
            </div>
          </div>
        </React.Fragment>
      </div>
      <Modal size="lg" size="lg" style={{ maxWidth: '1600px' }} show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Compra realizada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert severity="success">La compra ha sido realizada con éxito. Su código de compra es {nroPedido}.</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#401801" }}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
}