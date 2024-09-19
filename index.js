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
        {nome: 'Gustavo', cpf: '123.456.789-11', endereco: 'Rua Pitanga'},
        {nome: 'Isabele', cpf:'777.444.333-12', endereco:'Rua Vila Antunes'},
        {nome: 'Yasmin', cpf: '123.456.789-13', endereco: 'Rua Barra'},
        {nome: 'Ana', cpf: '123.456.789-14', endereco: 'Rua Valo Grande'},
        {nome: 'Isabely', cpf: '123.456.789-15', endereco: 'Rua Pitanga'},
        {nome: 'Thiago', cpf:'123.987.655-16', endereco:'Rua do grau'},
        {nome: 'João', cpf:'999.777.656-17', endereco:'Rua Pirajá'},
        {nome: 'Clayton', cpf:'888.999.000-18', endereco:'Rua Tupiniquim'},
        {nome: 'Maria', cpf:'988.779.110-19', endereco:'Rua Matilda'},
        {nome: 'Julia', cpf:'688.799.190-20', endereco:'Rua Das Flores'}];
     res.render("clientes", {
        clientes: clientes
     })
})

//rota de produtos
app.get("/produtos", (req,res) => {
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
app.get("/pedidos", (req,res) => {
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