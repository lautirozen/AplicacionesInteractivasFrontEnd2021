import React from 'react';
import { useHistory} from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
import NavigationLog from '../components/NavbarAdmin';
import { categorias } from '../components/AdminCategorias';
import { makeStyles } from "@material-ui/core/styles";
import Footer from '../components/Footer';
function Admin(){
  const history= useHistory();
  const useStyles = makeStyles((theme) => ({
    card:{
    padding:"2%",
    height:"9rem",
    },
    title:{

      fontFamily:"Garamond", 

      fontWeight:'bold',

      fontSize:"30px",

    },
    adminHome:{
      backgroundColor:"#F2EFEB",
      
    }
    }));
  const classes = useStyles();
  return(
    <div className={classes.adminHome}>
    <NavigationLog/>
    <div class='row'>
      {categorias.map((categoria) =>(
        
          <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
            <CardActionArea onClick={() => history.push({
              pathname: categoria.direccion})}>
              <div class="card">
                <div className={classes.card}> 
                  <h6 className={classes.title}>{categoria.titulo}</h6>
                  <p>{categoria.descripcion}</p>
                </div>
              </div>
            </CardActionArea>
          </div>
        
      )  )}
    </div>
    <Footer />
    </div>
  )
}
export default Admin;