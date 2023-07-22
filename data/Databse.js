import mongoose from "mongoose"

const Store = () => {
     console.log(process.env.PORT)
     mongoose.connect(process.env.MONGOURI, { dbName: "psi" }).then(() => {
          console.log('server is conndected to mongodb');
     }).catch(() => {
          console.log('Found error while connection database ');
     })


}

export default Store
