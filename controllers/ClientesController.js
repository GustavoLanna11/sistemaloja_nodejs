import express from 'express'
const router = express.Router()
import Cliente from "../models/Cliente.js"
import Auth from '../middleware/Auth.js'

router.get("/clientes", Auth, function(req,res){
    Cliente.findAll().then(clientes => {
        res.render("clientes", {
            clientes: clientes,
        })
    })
})

router.post("/clientes/new", Auth, (req,res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco;
    Cliente.create({
        nome:nome,
        cpf:cpf,
        endereco:endereco,
    }).then(()=>{
        res.redirect("/clientes");
    })
})

router.get("/clientes/delete/:id", Auth, (req, res) => {
    const id = req.params.id
    Cliente.destroy({
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect("/clientes")
    }).catch(error => {
        console.log(error)
    })
});

router.get("/clientes/edit/:id", Auth, (req,res)=>{
    const id = req.params.id
    //memorize esse comando do sequelize
    Cliente.findByPk(id).then((cliente) => {
        res.render("clienteEdit", {
            cliente:cliente,
        });
    }).catch((error) => {
        console.log(error)
    })
});

router.post("/clientes/update", Auth, (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    Cliente.update(
        {
            //esquerda = banco 
            //direita = formulario
            nome:nome,
            cpf:cpf,
            endereco:endereco
        },
        {where: {id:id}}
    ).then(()=>{
        res.redirect("/clientes")
    }).catch((error) => {
        console.log(error)
    })
});

export default router