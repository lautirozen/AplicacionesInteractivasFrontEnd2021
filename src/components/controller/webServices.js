const urlApi = "https://aplicaciones-interactivas-2021.herokuapp.com/";
console.log("url",urlApi);

const urlWebServices = {
    getAllPedido:urlApi+"api/pedido/todos",
    createPedido:urlApi+"api/pedido/crear",
    getPedidoUser:urlApi+"api/pedido/usuario",
    updateProducts:urlApi+"api/producto/actualizar",
    disableProducts:urlApi+"api/producto/deshabilitar",
    allProducts:urlApi+"api/producto/todos",
    createProduct:urlApi+"api/producto/crear",
    allUnloggedProducts:urlApi+"api/product/todos",
    login:urlApi+"api/login",
    forgotPass:urlApi+"api/user/profile",
    updatePass:urlApi+"api/user/update/password",
    register:urlApi+"api/registration",
}

export default urlWebServices;