const express = require("express");
const app = express();

//renderizador de páginas
app.set("view engine", "ejs");

//Rota principal
app.get("/", (req, res) => {
    res.render("index");
});

app.use(express.static('public'))

//rota de clientes
app.get("/clientes", (req, res) => {
    const clientes =[
        {nome: 'Gustavo', cpf: '123456789', endereco: 'Rua Pitanga'},
        {nome: 'Yasmin', cpf: '123456789', endereco: 'Barra'},
        {nome: 'Ana', cpf: '123456789', endereco: 'Valo Grande'},
        {nome: 'Isabely', cpf: '123456789', endereco: 'Rua Pitanga'}];
     res.render("clientes", {
        clientes: clientes
     })
})

//rota de produtos
app.get("/produtos", (req,res) => {
    const produtos = [
        {nome: 'Teclado Mecânico', preco: '300', categoria: 'Periféricos'},
        {nome: 'Mouse', preco: '200', categoria: 'Periféricos'},
        {nome: 'Computador de mesa', preco: '5000', categoria: 'Computador'},
        {nome: 'Notebook', preco: '3000', categoria: 'Notebook'}];
        res.render("produtos", {
            produtos: produtos
        })
})

app.get("/pedidos", (req,res) => {
    const pedidos = [
        {numeroPed: '1', valor: '100'},
        {numeroPed: '2', valor: '200'},
        {numeroPed: '3', valor: '300'},
        {numeroPed: '4', valor: '400'}];
        res.render("pedidos", {
            pedidos:pedidos
        })
})


const port = 8080
app.listen(8080, function (error){
    if(error){
        console.log(`Ocorreu um erro! ${error}`);
    } else {
        console.log(`Servidor online aqui: http://localhost:${port}`);
    }
})