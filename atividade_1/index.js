const express = require("express");
const app = express();

//renderizador de páginas
app.set("view engine", "ejs");

//Rota principal
app.get("/", (req, res) => {
    res.render("index");
});

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
        {nome: 'Cereal', cpf: '123456789', endereco: 'Rua Pitanga'},
        {nome: 'Yasmin', cpf: '123456789', endereco: 'Barra'},
        {nome: 'Ana', cpf: '123456789', endereco: 'Valo Grande'},
        {nome: 'Isabely', cpf: '123456789', endereco: 'Rua Pitanga'}];
        res.render("produtos", {
            produtos: produtos
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