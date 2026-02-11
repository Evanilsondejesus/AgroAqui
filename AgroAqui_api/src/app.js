const express = require('express')
const path = require('path')
const fs = require('fs');
const session = require("express-session");


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "chave_super_secreta",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}));

// view engine
app.set('view engine', 'ejs')

// 🚨 A LINHA MAIS IMPORTANTE
app.set('views', path.join(__dirname, 'views'))

// arquivos estáticos
//app.use(express.static(path.join(__dirname, '../public')))




// rotas


fs.readdirSync(path.join(__dirname, 'controllers')).forEach(file => {
  if (file.endsWith('.js')) {
    const controller = require(`./controllers/${file}`);
    app.use('/', controller);
  }
});


app.use(express.static(path.join(__dirname, '../public')))


module.exports = app













 