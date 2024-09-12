// // import {MongoClient} from 'mongodb';
require("dotenv").config();
// const {MongoClient} = require("mongodb");

// const url = process.env.VITE_MONGODB_URL;

// console.log("url ",url);
// const client = new MongoClient(url);

// const connect = () => new Promise((resolve, reject) => {
//     client.connect((err) => {
//         if (err) {
//             reject(err);
//         } else {
//             console.log("mongo connected");
//             resolve();
//         }
//     });
// });

// function disconnect(callback) {
//     client.close(function (err) {
//         if (err) {
//             return callback(err);
//         }
//         console.log("mongo disconnected");
//         callback();
//     });
// }

// module.exports = {connect, disconnect, client};

// export default client;



const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.qp2hcax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = process.env.VITE_MONGODB_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

module.exports = {client};