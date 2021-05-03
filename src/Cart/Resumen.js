import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Navigation from '../components/Navbar';
import NavigationLog from '../components/NavCart';
import Footer from "../components/Footer";
import { useHistory} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import { Alert } from '@material-ui/lab';
import moment from 'moment';

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
  resumen:{
    backgroundColor:"#F2EFEB",
  },
  titulo:{
    fontStyle:"italic", 
    marginTop:"3rem",
    textAlign:"center",
    fontWeight: 'bold',
    marginBottom:"2rem",
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
  const [datosenvio]=useState(props.location.state);
  var user =JSON.parse(localStorage.getItem('user'));
  const [nroPedido,setNroPedido]=useState(0);
  const history= useHistory();
  const[listItems]=useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const[unombre]=useState(JSON.parse(localStorage.getItem('nombre')));
  const[usera]=useState(JSON.parse(localStorage.getItem('apellido')));
  const [show,setShow] = useState(false);
  const handleClose = () =>{
    setShow(false);
    localStorage.removeItem("cartItems")
    history.push({
        pathname: '/'})}
  const confirmar = () =>{
    listItems.map((product) => (
        product.stock=(product.stock - product.cantidad)
    ))
    var npedido=(Math.floor((Math.random() * (10000000) + 100)))
    setNroPedido(npedido)
    const pedido = {
      nroPedido:npedido,
      fecha:(moment().format("DD/MM/YYYY")),
      preciototal:datosenvio.totalprecio,
      direccion: (datosenvio.domicilio_calle + " " + datosenvio.domicilio_numero),
      productos:listItems,
      estado:"En preparación",
      nombre_persona:unombre,
      apellido_persona:usera,
    }
 
    console.log(pedido)
    localStorage.removeItem("pedido")
    localStorage.setItem('pedido', JSON.stringify(pedido));
    setShow(true)
  }  
  return (
    <div className={classes.resumen}>
        {(user===null)?
        <Navigation />: <NavigationLog />}
         <div style={{visibility: "hidden"}}>
            {listItems.map((product) => (
            (product.ptotal===0)?
                (product.ptotal=((product.cantidad) * parseInt(product.precio)).toFixed(2))
                : console.log("no")
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
                        <img src={product.image}  width="50px" class="img-fluid" alt="Responsive image" />
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
                <div style={{borderTop: "2px solid #808080"}}></div>
                <div class="col-md-10 mx-auto">
                  <ListItem className={classes.listItem}>
                  <div class="ml-md-3">
                    <ListItemText  primary="TOTAL" />
                  </div> 
                  <div class="ml-auto">
                    <Typography variant="subtitle1" className={classes.total}>
                      $ {datosenvio.totalprecio}
                    </Typography>
                  </div>
                  </ListItem>
                </div>
            </List>
            <div style={{borderTop: "2px solid #808080", marginLeft: 4, marginRight: 4}}></div>
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
                <button onClick={() => {history.push("/Carrito")}} className="btn btn-primary mr-2" style={{backgroundColor: "#401801", marginTop:"15px"}}>Volver</button>
                <button onClick={confirmar} className="btn btn-primary" style={{backgroundColor: "#401801", marginTop:"15px"}}>Realizar compra</button>
              </div>
            </div>
            </React.Fragment>
        </div>
        <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Compra realizada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">La compra ha sido realizada con éxito. Su número de compra es {nroPedido}.</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#401801"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
        <Footer />
    </div>
  );
}