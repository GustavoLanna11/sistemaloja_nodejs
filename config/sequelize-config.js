import Sequelize from "sequelize";

const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '', 
    //inicie com essa linha comentada pois o banco não está criado 
    database: 'loja_gusta',
    timezone: '-03:00'
})

export default connection;