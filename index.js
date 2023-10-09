const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
var flash = require('express-flash')
const cookieParser = require('cookie-parser')



const app = express()


app.use(cookieParser('123'))
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash())

app.get('/', (req, res) => {
    let emailError = req.flash("emailError")
    let nomeError = req.flash("nomeError")
    let pontosError = req.flash("pontosError")
    let email = req.flash("email")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    email = (email == undefined || email.length == 0) ? "" : email

    res.render('index.ejs',{emailError,nomeError,pontosError, email: email})
})

app.post('/form', (req, res) => {
    const { email, nome, pontos } = req.body

    let emailError
    let pontosError
    let nomeError
    
    if (email == undefined || email == "") {
       emailError = "email invalido"
    }

    if (pontos == undefined || pontos < 20) {
    pontosError = 'seus pontos estao muito baixos'
    }

    if (nome == undefined || nome  == ""){
       nomeError = "seu nome esta incorreto"
    }

    if (emailError != undefined || pontosError != undefined || nomeError != undefined) {
        req.flash("emailError", emailError)
        req.flash("pontosError", pontosError)
        req.flash("nomeError", nomeError)

        req.flash("email",email)

        res.redirect("/")
    } else {
        res.send("formulario enviado")
    }

   
  
})


app.listen(7070, () => {
    console.log("server on 🚀")
})