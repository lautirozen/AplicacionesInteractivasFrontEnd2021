import React, { useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import Footer from '../Footer';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles/';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from "./../Assets/Logo.png";
import Stanley from "./../Assets/Stanley.jpg";
import { Alert } from '@material-ui/lab';
import Bialetti from "./../Assets/Bialetti.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from '@material-ui/core/Badge';
import KitchenAid from "./../Assets/KitchenAid.jpg";
import Mica from "./../Assets/mica.jpg";
import Hudson from "./../Assets/Hudson.jpg";
import Nadir from "./../Assets/nadir.jpg";
import Park from "./../Assets/park.PNG";
import Porcelana from "./../Assets/porcelana-tsuji.jpg";
import Tomorrows from "./../Assets/tomorrow.jpg"
import Tramontina from "./../Assets/tramontina.png";
import Libbey from "./../Assets/libbey.svg";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Pyrex from "./../Assets/pyrex.svg";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
 function Productos (props){  
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[user]=useState(JSON.parse(localStorage.getItem('nombre')));
    const[usera]=useState(JSON.parse(localStorage.getItem('apellido')));
    const [quantity, setQuantity]= useState(0);
    const[cartProducts]= useState([]);
    const[exito,setExito]=useState(false);
    const [isLoaded, setIsLoaded]=useState(false);
    const[cantidad, setCantidad]=useState(JSON.parse(localStorage.getItem('quantity')));
    if(cantidad===null){
      setCantidad(0)
    }
    const[listItems]=useState(JSON.parse(localStorage.getItem('cartItems')))
    const handleShow = () => setShow(true);
    const theme = createMuiTheme({
      palette: {
         secondary: {
             main: "#401801"
         }
      }
    })
    const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      marginLeft:"2%",
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
    modify1: {
        padding:10,
    },
    media: {
      height: 140,
    },
    medias:{
      height:307,
      width:280

    },
    title:{
      fontStyle:"italic", 
      marginTop:"3rem",
      textAlign:"center",
      fontWeight: 'bold',
      marginBottom:"2rem",
  },
    title1:{
        fontWeight: 'bold',
        textAlign:"center",
        marginTop:"5px"
    },
    page:{
      backgroundColor:"#F2EFEB",
    },
    card:{
      padding:"4%",
      height:"12rem",
    },
    cards:{
      padding:"2%",
      height:"31rem",
    },
    input:{
      width:"300px",
      height:"40px",
      backgroundColor:"#4d240d",
      color:"white",
    },
    footer:{
      marginTop:"14.7rem"
    },
  })); 
  const classes = useStyles();
  const [info, setInfo]=useState(props.location.state);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const[filteredProductsinfo, setFilteredProductsinfo]= useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [mstock, setMstock]=useState(false);
  const [products,setProducts]=useState([]);
  const sinstock = () =>{
    setMstock(false);
}
  const handlecerrar = () =>{
    setMostrar(false);
  }
  const handlecerrarexito = () =>{
    setExito(false);
  }
    const onClickcerrar= () =>{
      localStorage.clear();
      var userrr = JSON.parse(localStorage.getItem('user'));
      console.log(userrr)
      history.push("/")
  }
  const onClick = (marca) =>{
    console.log(marca)
    setInfo(marca)
    setSearch("")
    products.map((product) => (
    setFilteredProductsinfo(
      products.filter((product) =>
      product.marca.toLowerCase().match(marca.toLowerCase()) || product.categoria.toLowerCase().match(marca.toLowerCase())
      ))))
    setShow(false)
}
const onSearch = (buscar) =>{
  console.log(buscar)
  setSearch(buscar)
  products.map((product) => (
    setFilteredProducts(
    products.filter((product) =>
    product.titulo.toLowerCase().includes(buscar.toLowerCase())
    ))
    ))
  setInfo(undefined)
  }
  const onClicksame = () =>{
    setInfo(undefined)
  }
  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
    axios.get('https://aplicaciones-interactivas-2021.herokuapp.com/api/product/todos',
    {
        mode: "cors",
        headers: {
            'Access-control-Allow-Origin': true,
    },
  })
  .then(function (response) {
      console.log(response.data.data.docs)
      setProducts(response.data.data.docs);
      if(info!==undefined){
        response.data.data.docs.map((product) => (
          setFilteredProductsinfo(
            response.data.data.docs.filter((product) =>
            product.marca.toLowerCase().match(info.toLowerCase()) || product.categoria.toLowerCase().match(info.toLowerCase())
            ))))
      }
      setIsLoaded(false);
    })
    .catch(function (error) {
    console.log(error.message);
    });
    if(listItems!==null){
      let i=0;
      for (i===0; i<listItems.length; i++){
        if(cartProducts.includes(listItems[i])){
          console.log("Incluidooo")
        }else{
          cartProducts.push(listItems[i])
          console.log("Longitud", cartProducts.length)
          console.log("listaa",listItems[i])
          setQuantity(cartProducts.length)
        }
    }
  }
},[]);
    const history= useHistory();
    const handleHistory = () => {
        history.push("/");
    }
    const addToCart = (producto) =>{
      producto.ptotal=producto.ptotal.$numberDecimal
      if(producto.stock===0){
        setMstock(true)
      }else{
      if(user===null){
        history.push("/Login")
      }else{
      if(cartProducts.length===0){
        producto.ptotal=parseFloat(producto.precio)
        cartProducts.push(producto)
        console.log("Longitud",cartProducts.length)
        setQuantity(cartProducts.length)
        setExito(true);
      }else{
      if(cartProducts.some(product => product._id === producto._id)){
        setMostrar(true)
      }else{
      producto.ptotal=producto.precio
      cartProducts.push(producto)
      setQuantity(cartProducts.length)
      console.log(quantity+1)
      cartProducts.map((product) =>
      console.log(product),
      setExito(true)
      )}}}}
      localStorage.setItem('quantity', JSON.stringify(cartProducts.length));
      localStorage.setItem('cartItems', JSON.stringify(cartProducts));
    }
    const redirectDetails = (producto) =>{
      if(cartProducts!==null){
        if (cartProducts.some(product => product._id === producto._id)){
          cartProducts.map((product) =>{
          if(product._id === producto._id){
            history.push({pathname: `/productos/${product.titulo}`, state: product})
          }})
        }
        else{
          history.push({pathname: `/productos/${producto.titulo}`, state: producto})
        }
      }
      else{
        history.push({pathname: `/productos/${producto.titulo}`, state: producto})
      }
    }
    return (
    <div className={classes.page}>
         {(user===null)?
       <Navbar expand="lg" variant="dark" style={{backgroundColor:"#401801"}}>
       <Navbar.Brand ><img src={Logo} width="150" height="100" /></Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color:"white"}}/>
       <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="mr-auto">
           <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
             pathname: '/',})}>Home</Nav.Link>
           <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={onClicksame}>Productos</Nav.Link>
           <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={handleShow}>Marcas</Nav.Link>
           <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={() => history.push({
             pathname: '/Nosotros',})}>Nosotros</Nav.Link>
           </Nav>
           <Nav.Item>
              <input
                        type="text"
                        placeholder="Buscar producto"
                        className={classes.input}
                        onChange={(e) =>{onSearch(e.target.value)}}
                      />
              </Nav.Item>
           <Nav className="cerrarsesion">
               <Nav.Link style={{color:"white", fontSize:"20px"}} onClick={() => history.push({
             pathname: '/Login',})} >Ingresar</Nav.Link>
           </Nav>
       </Navbar.Collapse>
<Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={show} onHide={handleClose} >
   <Modal.Header closeButton>
     <Modal.Title>Marcas</Modal.Title>
   </Modal.Header>
   <Modal.Body>
   <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Bialetti")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Bialetti}
                      title="Bialetti"
                    />
              </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Hudson")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Hudson}
                      title="Hudson"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("KitchenAid")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={KitchenAid}
                      title="KitchenAid"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Libbey")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Libbey}
                      title="Libbey"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Mica")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Mica}
                      title="Mica"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Nadir Argentina")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Nadir}
                      title="Nadir Argentina"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Park Design")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Park}
                      title="Park Design"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Porcelana Tsuji")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Porcelana}
                      title="Porcelana Tsuji"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Pyrex")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Pyrex}
                      title="Pyrex"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Stanley")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Stanley}
                      title="Stanley"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Tomorrow´s Kitchen")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Tomorrows}
                      title="Tomorrow´s Kitchen"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Tramontina")}}>
          <div class="card">
            <div className={classes.card}>
              <CardMedia
                      className={classes.media}
                      image={Tramontina}
                      title="Tramontina"
                    />
            </div>
          </div>
        </CardActionArea>
      </div>
    </div>
  </div>
   </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#401801"}}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
    </Navbar>
    : <Navbar expand="lg"  variant="dark" style={{backgroundColor:"#401801"}}>
    <Navbar.Brand ><img src={Logo} width="150" height="100" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
          pathname: '/',})}>Home</Nav.Link>
        <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={onClicksame} >Productos</Nav.Link>
        <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={handleShow}>Marcas</Nav.Link>

            <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={() => history.push({
          pathname: '/Nosotros',})}>Nosotros</Nav.Link>
        </Nav>
        <Nav.Item>
        <input
                  type="text"
                  placeholder="Buscar producto"
                  className={classes.input}
                  onChange={(e) =>{onSearch(e.target.value)}}
                />
        </Nav.Item>
        <Nav className="cerrarsesion">
            <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={() => history.push({pathname: '/Pedidos'})} ><AccountCircle />  {user} {usera}</Nav.Link>
            <Nav.Link style={{color:"grey",  fontSize:"20px"}} onClick={() => history.push({pathname: '/Carrito'})}><Badge badgeContent={quantity} color='error'>
              <ShoppingCartIcon />
            </Badge></Nav.Link>
            <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={onClickcerrar} >Cerrar sesión</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    <Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={show} onHide={handleClose} >
    <Modal.Header closeButton>
      <Modal.Title>Marcas</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div class="container">
    <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("Bialetti")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={Bialetti}
                        title="Bialetti"
                      />
                </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("Hudson")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={Hudson}
                        title="Hudson"
                      />
              </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("KitchenAid")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={KitchenAid}
                        title="KitchenAid"
                      />
              </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("Libbey")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={Libbey}
                        title="Libbey"
                      />
              </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("Mica")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={Mica}
                        title="Mica"
                      />
              </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("Nadir Argentina")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={Nadir}
                        title="Nadir Argentina"
                      />
              </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("Park Design")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={Park}
                        title="Park Design"
                      />
              </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
          <CardActionArea onClick={() => {onClick("Porcelana Tsuji")}}>
            <div class="card">
              <div className={classes.card}>
                <CardMedia
                        className={classes.media}
                        image={Porcelana}
                        title="Porcelana Tsuji"
                      />
              </div>
            </div>
          </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Pyrex")}}>
        <div class="card">
        <div className={classes.card}>
        <CardMedia
                className={classes.media}
                image={Pyrex}
                title="Pyrex"
              />
        </div>
        </div>
        </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Stanley")}}>
        <div class="card">
        <div className={classes.card}>
        <CardMedia
                className={classes.media}
                image={Stanley}
                title="Stanley"
              />
        </div>
        </div>
        </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Tomorrow´s Kitchen")}}>
        <div class="card">
        <div className={classes.card}>
        <CardMedia
                className={classes.media}
                image={Tomorrows}
                title="Tomorrow´s Kitchen"
              />
        </div>
        </div>
        </CardActionArea>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
        <CardActionArea onClick={() => {onClick("Tramontina")}}>
        <div class="card">
        <div className={classes.card}>
        <CardMedia
                className={classes.media}
                image={Tramontina}
                title="Tramontina"
              />
        </div>
        </div>
        </CardActionArea>
        </div>
        </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#401801"}}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
    </Navbar>
    }
      <div className={classes.title}>
          <h1>Productos</h1>
        </div>
        {(isLoaded?
        <MuiThemeProvider theme={theme}>
            <LinearProgress color="secondary" />
        </MuiThemeProvider>:           
        <div class="col-12 row">
               {(info===undefined && search==="")? 
               products.map((product) => (
                <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2 mt-5">
                  <div class="card" key={product._id}>
                      <div className={classes.cards}>
                      <CardMedia><Image src={product.image} className={classes.medias} style={{resizeMode:"contain"}}/></CardMedia>
                      <CardContent>
                        <Typography gutterBottom style={{textAlign:"left"}} variant="h5" component="h2">
                          <div style={{fontFamily:"Georgia, serif"}}>
                            <h5>{product.titulo}</h5>
                          </div>
                          <h5>${product.precio}</h5>
                        </Typography>
                        </CardContent>
                        <div style={{borderTop: "2px solid #808080	", marginLeft: 5, marginRight: 5 }}></div>
                          <div class="row">
                            <CardActionArea style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-3 " onClick={() => {redirectDetails(product)}}>
                                <VisibilityIcon /> Detalles
                            </CardActionArea >
                            <div style={{borderLeft:"2px solid #808080",marginLeft: 50}}></div>
                              <CardActionArea  class=" ml-auto mt-3 mr-auto"   style={{backgroundColor:"white", border:"0"}}   onClick={() => {addToCart(product)}}>
                                  <AddShoppingCartIcon /> Comprar
                              </CardActionArea >
                            </div>
                      </div>
                      </div>
                    </div>)) : console.log("no")}
                {(info!==undefined && filteredProductsinfo!=="" && search==="")?
                filteredProductsinfo.map((product) =>
                <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2">
                  <div className="products">
                    <div class="card" key={product._id}>
                    <div className={classes.cards}>
                    <CardMedia><Image src={product.image} className={classes.medias} style={{resizeMode:"contain"}}/></CardMedia>
                    <CardContent>
                      <Typography gutterBottom style={{textAlign:"left"}} variant="h5" component="h2">
                        <div style={{fontFamily:"Georgia, serif"}}>
                            <h5>{product.titulo}</h5>
                        </div>
                        <h5>${product.precio}</h5>
                      </Typography>
                      </CardContent>
                      <div style={{borderTop: "2px solid #808080	", marginLeft: 5, marginRight: 5 }}></div>
                        <div class="row">
                        <CardActionArea style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-3 "  onClick={() => {redirectDetails(product)}}>
                            <VisibilityIcon /> Detalles
                        </CardActionArea >
                        <div style={{borderLeft:"2px solid #808080",marginLeft: 50}}></div>
                        <CardActionArea class=" ml-auto mt-3 mr-auto"  style={{backgroundColor:"white", border:"0"}}   onClick={() => {addToCart(product)}}>
                            <AddShoppingCartIcon /> Comprar
                        </CardActionArea >
                      </div>
                  </div>
                  </div>
                </div>
                    </div>) : console.log("no")}
                    {(info===undefined && search!=="" && filteredProducts!=="")?
                    filteredProducts.map((product) => 
                      <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2">
                      <div className="products">
                        <div class="card" key={product._id}>
                        <div className={classes.cards}>
                        <CardMedia><Image src={product.image} className={classes.medias} style={{resizeMode:"contain"}}/></CardMedia>
                      <CardContent>
                        <Typography gutterBottom style={{textAlign:"left"}}variant="h5" component="h2">
                          <div style={{fontFamily:"Georgia, serif"}}>
                            <h5>{product.titulo}</h5>
                          </div>
                          <h5>${product.precio}</h5>
                        </Typography>
                        </CardContent>
                        <div style={{borderTop: "2px solid #808080	", marginLeft: 5, marginRight: 5 }}></div>
                          <div class="row">
                          <CardActionArea style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-3 " onClick={() => {redirectDetails(product)}}>
                              <VisibilityIcon /> Detalles
                          </CardActionArea >
                          <div style={{borderLeft:"2px solid #808080",marginLeft: 50}}></div>
                          <CardActionArea class=" ml-auto mt-3 mr-auto"  style={{backgroundColor:"white", border:"0"}}  onClick={() => {addToCart(product)}}>
                              <AddShoppingCartIcon /> Comprar
                          </CardActionArea >
                        </div>
                    </div>
                  </div>
                  </div>
                      </div>): console.log("no")}
                      </div>)}
            <Modal size="lg"  style={{maxWidth: '1600px'}} show={mostrar} onHide={handlecerrar} >
            <Modal.Header closeButton>
            <Modal.Title>Operación inválida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="error">El producto ya se encuentra en el carrito. En caso de caso de querer añadir más unidades del producto, hacer click 
                en la opción "Detalles".
                </Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handlecerrar}  style={{backgroundColor: "#401801"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
            <Modal size="lg"  style={{maxWidth: '1600px'}} show={mstock} onHide={sinstock} >
            <Modal.Header closeButton>

            <Modal.Title>Stock agotado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="error">El producto seleccionado se encuentra agotado.</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={sinstock}  style={{backgroundColor: "#401801"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
        <Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={exito} onHide={handlecerrarexito} >
            <Modal.Header closeButton>
              <Modal.Title>Producto añadido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">El producto ha sido añadido exitosamente al carrito.</Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlecerrarexito}  style={{backgroundColor: "#401801", color:"white"}}>
                  Cerrar
              </Button>
            </Modal.Footer>
        </Modal>
          <div className={classes.footer}>
            <Footer />
          </div>
        </div>
      )
}
export default Productos;