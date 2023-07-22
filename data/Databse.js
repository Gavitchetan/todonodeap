import mongoose from "mongoose"

const Store = () => {
     console.log(process.env.PORT)
     mongoose.connect(process.env.MONGOURI, { dbName: "psi" }).then((c) => {
          console.log(`database is connected to ${c.connection.host}`);
     }).catch(() => {
          console.log('Found error while connection database ');
     })


}

export default Store
