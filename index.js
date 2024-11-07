import express from 'express'
const app = express();
import connection from './config/sequelize-config.js'
import ClientesController from "./controllers/ClientesController.js"

import UsersController from "./controllers/UsersControllers.js"
import session from "express-session"

import Auth from "./middleware/Auth.js"
import flash from "express-flash"

app.use(session({
    secret: "bootlab",
    cookie: {maxAge:3600000},//sessão expira em uma hora
    saveUninitialized: false,
    resave: false
}))

app.use(flash())

//Permitir capturar dados vindo de formulários
app.use(express.urlencoded({extended: false}))

//realizando a conexão com o banco de dados
connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
}).catch((error) => {
    console.log(error)
});

//criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS loja_gusta;`).then(() => {
    console.log("O banco de dados está criado.");
}).catch((error) => {
    console.log(error)
})

//renderizador de páginas
app.set("view engine", "ejs");
app.use(express.static('public'))

app.use("/", ClientesController)
app.use("/", UsersController)

//Rota principal
app.get("/", Auth, (req, res) => {
    res.render("index", {
        messages: req.flash()
    });
});

//rota de produtos
app.get("/produtos", Auth, (req,res) => {
    const produtos = [
        {nome: 'Teclado Mecânico', preco: '300', categoria: 'Periféricos', descricao: 'Teclado voltado a players de alto nível.', marca:'Redragon'},
        {nome: 'Mouse', preco: '200', categoria: 'Periféricos', descricao:'Mouse de 3600 DPI, voltado a games de FPS.', marca:'Redragon'},
        {nome: 'Placa de vídeo', preco: '3000', categoria: 'Acessórios', descricao:'placa de vídeo RTX 2060 super de 8GB.', marca:'NVIDIA'},
        {nome: 'Placa mãe', preco: '2000', categoria: 'Acessórios', descricao:'A550M Gigabyte, ideal para computadores que terão altos índices de gasto.', marca:'Gigabyte'},
        {nome: 'Memória Ram', preco: '200', categoria: 'Acessórios', descricao:'Pente Husky de 8GB de capacidade.', marca:'Husky'},
        {nome: 'Mousepad', preco: '100', categoria: 'Acessórios', marca:'Redragon', descricao:'Mousepad speed para quem deseja mais mobilidade na hora dos games.'},
        {nome: 'Notebook', preco: '3000', categoria: 'Notebook', marca:'Samsung', descricao:'Notebook gamer de última geração para rodar tudo que quiser jogar.'},
        {nome: 'PC Gamer', preco: '2500', categoria: 'Computador', marca:'--', descricao:'PC Gamer que chega montado: Ryzen 5 4600g, 16GB Ram, SSD 250GB'}];
        res.render("produtos", {
            produtos: produtos
        })
})

//rota de pedidos
app.get("/pedidos", Auth, (req,res) => {
    const pedidos = [
        {numeroPed: '1', valor: '400', cliente:'Gustavo', itens: '1x Mouspad, 1x teclado'},
        {numeroPed: '2', valor: '300', cliente:'Isabele', itens: '1x teclado'},
        {numeroPed: '3', valor: '100', cliente:'Thiago', itens: '1x Mouspad'},
        {numeroPed: '4', valor: '800', cliente:'João', itens: '2x Mouspad, 2x teclado'},
        {numeroPed: '5', valor: '3000', cliente:'Ana', itens: '1x Notebook'},
        {numeroPed: '6', valor: '2000', cliente:'Yasmin', itens: '1x Placa mãe'},
        {numeroPed: '7', valor: '600', cliente:'Isabely', itens: '2x Teclado'},
        {numeroPed: '8', valor: '600', cliente:'Gustavo', itens: '2x Teclado'}];
        res.render("pedidos", {
            pedidos:pedidos
        })
})

//conectando ao servidor
const port = 8080
app.listen(8080, function (error){
    if(error){
        console.log(`Ocorreu um erro! ${error}`);
    } else {
        console.log(`Servidor online aqui: http://localhost:${port}`);
    }
})