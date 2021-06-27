import React, { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Navigation from '../Navbar';
import NavigationLog from '../Navbarlog';
import Footer from '../Footer';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import Modal from 'react-bootstrap/Modal';
import { useHistory} from "react-router-dom";
import { number } from "yup";

function DetalleProducto(props) {
    const {titulo}= useParams();
    const [product,setProduct]=useState(props.location.state)
    var user =JSON.parse(localStorage.getItem('user'));
    const[listItems,setListItems]=useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    const [numb,setNumb]=useState(product.cantidad);
    const [mostrar, setMostrar] = useState(false);
    const [mostrars, setMostrars] = useState(false);
    const history= useHistory();
    const useStyles = makeStyles((theme) => ({
        Titulo:{
          fontFamily:"Garamond", 
          fontWeight:'bold',
          fontSize:"50px",
          textAlign:"left",
          marginTop:"3rem",
          marginLeft:"2rem"
        },
        Titulo1:{
            fontFamily:"Garamond", 
            fontWeight:'bold',
            fontSize:"50px",
            textAlign:"left",
            marginTop:"7rem",
            color:"#7F3004",
            marginLeft:"1rem"
          },
          Titulo2:{
            fontFamily:"Garamond", 
            fontWeight:'bold',
            fontSize:"35px",
            textAlign:"left",
            marginTop:"3rem",
            marginLeft:"2rem"
          },
          description:{
            textAlign:"justify",
            font: "25px/40px Garamond, Sans-Serif",
            marginLeft:"2rem"
          },
          button:{
            backgroundColor:"#401801",
            height:"4rem",
            width:"20rem",
            marginTop:"2rem"
          },
          button1:{
            backgroundColor:"#401801",
            height:"4rem",
            width:"4rem",
            marginTop:"2rem"
          },
          root: {
            '& .MuiTextField-root': {
              margin: theme.spacing(1),
              width: '6ch',
              marginTop:"2.5rem",
              
            },
          },
      })); 
    const classes = useStyles();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])
    const handlecerrar = () =>{
      setMostrar(false);
      history.push("/Productos")
    }
    const handlecerrars = () =>{
      setMostrars(false);
      history.push("/Productos")
    }
    const decreaseCant = (producto) =>{
      if(numb > 1){
        var number=numb-1
        setNumb(number)
        if(listItems!==null){
        if(listItems.some(product => product._id === producto._id)){
          var objIndex = listItems.findIndex((product => product._id === producto._id))
          listItems[objIndex].cantidad = number
        }else{
          producto.cantidad= number
          console.log(producto)
          }
        }else{
          producto.cantidad= number
          console.log(producto)
        }
      }
    }
    const increaseCant = (producto) =>{
      if(numb < producto.stock){
        console.log(numb)
        var number=numb+1
        console.log(number)
        setNumb(number)
        if(listItems!==null){
          if(listItems.some(product => product._id === producto._id)){
            var objIndex = listItems.findIndex((product => product._id === producto._id))
            if(number === product.stock){
              listItems[objIndex].cantidad=number
            }else{
              listItems[objIndex].cantidad = number+producto.cantidad
            }
          }else{
            producto.cantidad= number
          }
        }else{
          producto.cantidad= number
        }
      }
    }
    const addToCart = (producto) =>{
      //producto.ptotal=producto.ptotal.$numberDecimal
      if(user===null){
        history.push("/Login")
      }else{
      if(producto.stock!==0){
        if(listItems!==null){
          if(listItems.some(product => product._id === producto._id)){
          listItems.map((product) =>
            (product._id === producto._id)?
            (product.ptotal=parseFloat(producto.precio*(numb)),
            product.ptotal=product.ptotal.toFixed(2))
            :console.log(null)
          )
          }else{
            producto.ptotal=parseFloat(producto.precio *  (producto.cantidad))
            producto.ptotal=producto.ptotal.toFixed(2)
            listItems.push(producto)
            listItems.map((product) =>
            console.log(product))
          }
        console.log("Longitud",listItems.length)
        localStorage.setItem('quantity', JSON.stringify(listItems.length));
        localStorage.setItem('cartItems', JSON.stringify(listItems));
        console.log(product.cantidad * parseInt(product.precio))
        setMostrar(true);
      }else{
        producto.ptotal=parseFloat(producto.precio *  (producto.cantidad))
        producto.ptotal=producto.ptotal.toFixed(2)
        listItems.push(producto)
        listItems.map((product) =>
        console.log(product))
        console.log("Longitud",listItems.length)
        localStorage.setItem('quantity', JSON.stringify(listItems.length));
        localStorage.setItem('cartItems', JSON.stringify(listItems));
        console.log(product.cantidad * parseInt(product.precio))
        setMostrar(true);
      }
    }else{
      setMostrars(true);
    }
  }
  }
    return (
      <div className={classes.DetalleProducto}>
        {(user===null)? <Navigation />:<NavigationLog />}
        <div className={classes.Titulo}>
            {product.titulo}   
        </div>
        <div class="col-12 row mb-5">
            <div class="col-lg-6 col-md-8 col-sm-12 mt-5">
                <img src={product.image} height="500px" class="img-fluid" alt="Responsive image" />
            </div>
            <div class="col-lg-6 col-md-4 col-sm-12">
              <div class="ml-lg-3">
                <div className={classes.Titulo1}>
                    <div class="ml-lg-5">
                        ${product.precio}
                    </div>
                </div>
              </div>
                <div class="col-lg-6 col-md-4 col-sm-12 ml-lg-3">
                    <div class="row ml-lg-5">
                      <div className={classes.button1}>
                        <Button style={{color:"white", marginTop:"1rem"}} onClick={() => {decreaseCant(product)}}>-</Button>
                      </div>
                      <form className={classes.root} noValidate autoComplete="off">
                      <TextField
                        id="standard-read-only-input"
                        value={numb}
                        inputProps={{style: { textAlign: 'center', fontSize:"35px"}}}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      </form>
                      <div className={classes.button1}>
                        <Button style={{color:"white", marginTop:"1rem"}} onClick={() => {increaseCant(product)}}>+</Button>
                      </div>
                    </div>
                    <div className={classes.button}>
                        <Button style={{color:"white", marginTop:"1rem"}} onClick={() => {addToCart(product)}}>AGREGAR AL CARRITO</Button>    
                    </div>
                </div>
                <div className={classes.Titulo2}>
                    Descripción   
                </div>
                <div className={classes.description}>
                    {product.descripcion}
                </div>
            </div>
        </div>
        <Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={mostrar} onHide={handlecerrar} >
            <Modal.Header closeButton>
              <Modal.Title>Producto añadido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">El producto ha sido añadido exitosamente al carrito.</Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlecerrar}  style={{backgroundColor: "#401801", color:"white",  textTransform:"capitalize"}}>
                  Cerrar
              </Button>
            </Modal.Footer>
        </Modal>
        <Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={mostrars} onHide={handlecerrars} >
            <Modal.Header closeButton>
              <Modal.Title>Error al añadir el producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="error">El producto seleccionado se encuentra agotado.</Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlecerrars}  style={{backgroundColor: "#401801", color:"white", textTransform:"capitalize"}}>
                  Cerrar
              </Button>
            </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    );
  }
  export default DetalleProducto;