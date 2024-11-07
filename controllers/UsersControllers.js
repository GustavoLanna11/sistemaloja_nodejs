import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router()

router.get("/login", (req,res)=>{
    res.render("login", {
        loggedOut: true, 
        messages: req.flash()
    })
})

//rota de logout
router.get("/logout", (req,res)=>{
    req.session.user = undefined;
    res.render("login", {
        loggedOut: true,
        messages: req.flash()
    })
})

router.get("/cadastro", (req,res)=>{
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    })
})

router.post("/createUser", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //verificar se o usuário já existe
    User.findOne({ where:{email:email}}).then(user => {
        if(user == undefined){
            //aqui é feito o cadastro e o hash de senha, quanto maior o número, maior o processo
            const salt = bcrypt.genSaltSync(10) 
            //criação do hash a partir do campo e do salt
            const hash = bcrypt.hashSync(password, salt)
            User.create({
                email:email,
                //o que será gravado no banco vai ser a senha com hash
                password: hash
            }).then(()=>{
                res.redirect("/login")
            }).catch((error)=>{
                console.log(error)
            });
        } //caso esteja cadastrado
        else{
            req.flash('danger', "Usuário cadastrado, faça o login!");
            res.redirect("/cadastro")
        }
    })
});

//rota de autenticação
router.post("/authenticate", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password
    //buscar usuário no banco
    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if(user != undefined){
            //valida a senha, verifica a hash
            const correct = bcrypt.compareSync(password, user.password)
            //se a senha for válida
            if(correct){
                //autoriza login
                req.session.user={
                    id: user.id,
                    email: user.email
                };
                req.flash('success', "Login efetuado com sucesso!");
               res.redirect("/")
            } else{
                req.flash('danger', "A senha informada está incorreta! Tente novamente! ");
                res.redirect("/login")
            }
        } else{
            req.flash('danger', "O usuário informado não existe! Tente novamente! ");
            res.redirect("/login")
        }
    })
})

export default router;