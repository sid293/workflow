const express = require("express");
var cors = require("cors");
// const db = require("./db");
const {client} = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const db = client.db("workflow");
const collection = db.collection("workflow-collection");

async function InsertData(data){
    const result = await collection.find().toArray();
    console.log("insert ",result);
    return true;
}

app.get("/",(req,res)=>{
    res.send("hellow ");
})

app.post("/setworkflow",async (req,res)=>{
    let data = req.body;
    console.log("data ",data);
    try {
        const result = await collection.insertOne(data);
        console.log("insert ", result);
        res.status(200);
        res.send({success:true});
    } catch (err) {
        console.error(err);
        res.status(500);
    }
    // InsertData();
    // const result = collection.insertOne(object);
})

app.get("/workflowids",async (req,res)=>{
    try {
        // const result = await collection.insertOne(data);
        const result = await collection.find().toArray();
        console.log("workflowids ", result);
        // res.status(200);
        res.send({success:true, data:result});
    } catch (err) {
        console.error(err);
        res.status(500);
    }
    // InsertData();
    // const result = collection.insertOne(object);
})

app.listen(port,()=>{
    console.log("listentnig on 3000");
})

async function main() {
    // console.log("client ",client);
    try{
        const db = client.db("workflow");
        const collection = db.collection("workflow-collection");

        let object = {test:"data"};
        // const result = await collection.insertOne(object);
        const result = await collection.find().toArray();
        console.log(result);
    }catch (err){
        console.error(err);
    }
    // console.log("main start");
    // await db.connect();

    // const myDb = db.db();
    // const collection = myDb.collection("mycollection");
    // const result = await collection.find().toArray();
    // console.log(result);
    // await myDb.disconnect();

}
main();