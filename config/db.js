const mongoose = require('mongoose')

const connections =  mongoose.connect('mongodb://0.0.0.0/men').then(()=>{
      console.log("connect to data base")
})

module.exports = connections