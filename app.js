// const http = require('http')

// // routing
// const server = http.createServer((req,res)=>{
//       if(req.url == "/about"){
//             res.end("this the about page")
//       }

//       if(req.url == "/profile"){
//             res.end("the profile page")
//       }

//       if(req.url == "/"){
//             res.end("home page")
//       }
// }) // creat server



// server.listen(3000) // start the server

const express = require('express')
const morgan = require('morgan')
const app = express();
const userModel = require('./models/user')
const dbConnections = require('./config/db')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended : true})) //Builtin Middlewire
app.use(express.static("public"))

app.set('view engine','ejs') // set front-end to server 

//middlewire 
//custom middlewire
app.use((rq,res,next)=>{
      console.log('this is a middle wire')
      // res.send("this is middlewire")
      return next()
})

// custom and third party middlewire 
app.get("/",
//       (req, res, next) =>{
//     next () //pass the forward control 
// },
(req,res)=>{
      // res.send('hello world')
      res.render('index')

})

app.get("/about",(req,res)=>{
      res.send("about page")
})

app.get("/profile",(req,res)=>{
      res.send('personal')
})


app.get('/register',(req,res)=>{
      res.render('register')
})
// form handeling 

// app.get("/get-form-data",(req,res)=>{ //get used server->frontend 
//       console.log(req.query)
//       res.send("data recieved") 
// })

app.post("/get-form-data",(req,res)=>{ //post used frontend->server 
      console.log(req.body)
      res.send("data recieved")
})

app.post('/register',async (req,res)=>{

      const { username , email , password } = req.body //destructuring 

      const newuser = await userModel.create({
            username : username,
            email : email,
            password : password
      })
      res.send(newuser)
})

// read operation
app.get('/get-users',(req,res)=>{

      // userModel.findOne({
      //       username : 'a'
      // }).then((user)=>{
      //       res.send(user)
      // })
      userModel.find(
            // {
            //       username : 'sayan'
            // }
      ).then((users)=>{
            res.send(users)
      })
})

//update operation 

app.get('/update-user',(req,res)=>{
      userModel.findOneAndUpdate(
      {
            password : 'sayan123'
      },
      {
            password : 'sayan2005'
      }
)

      res.send('userupdated')

})

//delete operation 

app.get('/delete-user',async (req,res)=>{
      await userModel.findOneAndDelete({
            password : 'sayan123'
      })
      res.send('user deleted')
})



app.listen(3000)