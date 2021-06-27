import React, {useState, useEffect}  from "react";
import Navigation from '../Navbar';
import NavigationLog from '../NavCart';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Footer from '../Footer';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';

import _ from "lodash";

var user =JSON.parse(localStorage.getItem('user'));

  const useStyles = makeStyles((theme) => ({
    Cart:{
        backgroundColor:"#F2EFEB",

    },
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
      titulo:{
        fontStyle:"italic", 
        marginTop:"3rem",
        textAlign:"center",
        fontWeight: 'bold',
        marginBottom:"2rem",
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(4),
          width: '6ch',          
        },
      },
      formControl:{
        marginBottom:"1.5rem",
        marginRight:"2rem"
      },
      footer:{
        marginTop:"8.5rem"
      }
  }));
export default function Cart() {
    const classes = useStyles();
    const[total,setTotal]=useState([]);
    const[sumtotal,setSumtotal]=useState(0);
    const[listItems]=useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    const[quantity,setQuantity]=useState(0);
    const[newArray, setNewArray]=useState([]);
    const history= useHistory();
    useEffect(() => {
      listItems.map((product) => (
       product.ptotal=parseFloat(product.ptotal).toFixed(2),
        total.push(product.ptotal)
  ))
  var sum = 0;
    for(var i = 0; i < total.length; i++){
        sum += parseFloat(total[i])
    }
    setSumtotal(sum.toFixed(2))
    console.log(sumtotal)
    },[])
    const handleChange = (producto,event) => {
      console.log(total)
      console.log(event.target.value)
      if(listItems!==null){
        if(listItems.some(product => product._id === producto._id)){
          var objIndex = listItems.findIndex((product => product._id === producto._id))
          if(event.target.value > listItems[objIndex].cantidad){
            var cantidadvieja=listItems[objIndex].ptotal
            listItems[objIndex].cantidad = event.target.value
            listItems[objIndex].ptotal=((listItems[objIndex].cantidad) * parseFloat(listItems[objIndex].precio)).toFixed(2)
            setSumtotal(((sumtotal-cantidadvieja) + parseFloat(listItems[objIndex].ptotal)).toFixed(2))
          }else{
            var cantidadvieja=listItems[objIndex].ptotal
            listItems[objIndex].cantidad = event.target.value
            listItems[objIndex].ptotal=((listItems[objIndex].cantidad) * parseFloat(listItems[objIndex].precio)).toFixed(2)
            setSumtotal(((sumtotal-cantidadvieja) + parseFloat(listItems[objIndex].ptotal)).toFixed(2))
          }
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(listItems));
  }
  const removeitem = (producto) => {
    if(listItems.length>1){
    listItems.map((product) => (
          (product._id !== producto._id) ?
          newArray.push(product) : 
          setSumtotal(((sumtotal- parseFloat(product.ptotal))).toFixed(2))
    ))
    listItems.splice(0,listItems.length)
    console.log(listItems)
    newArray.map((product) => (
      listItems.push(product)
      ))
    newArray.splice(0,newArray.length)
    setQuantity(listItems.length)
    localStorage.setItem('cartItems', JSON.stringify(listItems));
    localStorage.setItem('quantity', JSON.stringify(quantity));
    }else{
      newArray.splice(0,newArray.length)
      listItems.splice(0,listItems.length)
      localStorage.setItem('cartItems', JSON.stringify(listItems));
      history.push("/Productos")
    }
  }
  return (
    <div className={classes.Cart}>
    <NavigationLog />
    <div style={{visibility: "hidden"}}>
      {listItems.map((product) => (
      (product.ptotal===0)?
        (product.ptotal=((product.cantidad) * parseFloat(product.precio)).toFixed(2))
        : console.log("no")
      ))}
    </div>
    <div className={classes.layout}>
    <React.Fragment>
        <div className={classes.titulo}>
            <h1>Mi carrito</h1>
        </div>
      <List disablePadding>
        {listItems.map((product) => (
          <div class="row col-sm-12 col-md-10 mx-auto ">
            <ListItem className={classes.listItem} key={product._id}>
                <div class="row col-sm-6 col-md-6 ml-auto">
                  <div class="col-md-2 ">
                    <img src={product.image}  width="80px" class="img-fluid" alt="Responsive image" />
                  </div>
                  <div class="col-md-8 ">
                    <ListItemText primary={product.titulo} secondary={
                      <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="medium" onClick={() => {removeitem(product)}} style={{color:"grey"}} />
                    </IconButton>} />
                  </div>
                </div>
              <div class="row col-sm-6 col-md-6 mr-auto ml-md-4">
                <div class="col-md-3">
                  <FormControl className={classes.formControl}>
                    <Select
                        key={product._id}
                        id={product._id}
                        defaultValue={product.cantidad}
                        onChange={(e) => handleChange(product,e)}
                      >
                        { _.range(1,product.stock+1).map( (value) => ( 
                              (value==product.cantidad)?
                              <option value={product.cantidad}>{product.cantidad}</option> :
                              <option value={value}>{value}</option>)
                      
                          )}
                    </Select>
                  </FormControl>
                </div>
              <div class="col-md-4">
                <Typography variant="body2" class="mb-4">$ {product.precio}</Typography>
              </div>
              <div class="col-md-5">
                <Typography variant="body2" class="mb-4 ml-md-3">$ {product.ptotal}</Typography>
              </div>
            </div>
          </ListItem>
          </div>
        ))}
        <div class="col-md-11 mx-auto mt-md-3" style={{borderTop: "2px solid #808080	"}}></div>
        <div class="col-md-8 mx-auto">
          <div class="row col-md-4 ml-auto">
            <ListItem className={classes.listItem}>
              <ListItemText primary="TOTAL" />
              <Typography variant="subtitle1" className={classes.total}>
                $ {sumtotal}
              </Typography>
            </ListItem>
          </div> 
          </div>
      </List>
      <div class="col-md-12 mx-auto">
        <div class="col-md-6 ml-auto">
          <button onClick={() => {history.push("/productos")}} className="btn btn-primary mr-2" style={{backgroundColor: "#401801", marginTop:"15px"}}>Añadir productos</button>
          <button onClick={() => {history.push({pathname:"/Carrito/Formulario", state:(sumtotal)})}} className="btn btn-primary" style={{backgroundColor: "#401801", marginTop:"15px"}}>Siguiente</button>
        </div>                    
      </div>
    </React.Fragment>
    </div>
    <div className={classes.footer}>
      <Footer />
      </div>
  </div>
  );
};
