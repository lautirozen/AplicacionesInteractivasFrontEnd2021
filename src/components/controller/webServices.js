const urlApi = "https://aplicaciones-interactivas-2021.herokuapp.com/";
console.log("url",urlApi);

const urlWebServices = {
    updateProducts:urlApi+"api/producto/actualizar",
    disableProducts:urlApi+"api/producto/deshabilitar",
    allProducts:urlApi+"api/producto/todos",
    createProduct:urlApi+"api/producto/crear",
    login:urlApi+"api/login",
    forgotPass:urlApi+"api/user/profile",
    updatePass:urlApi+"api/user/update/password",
    register:urlApi+"api/registration",
}

export default urlWebServices;