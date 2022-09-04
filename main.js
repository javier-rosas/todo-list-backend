const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./server.js')

async function main() {
  // configuring .env file
  dotenv.config()
  // port
  const port = process.env.PORT
  
  try {
    mongoose.connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`, 
                       {useNewUrlParser : true})

    app.listen(port, () => {
      console.log("Server is runinng on port", port)
    })

  } catch(e) {
    console.error(e)
    process.exit(1)
  }

}

main().catch(console.error)



