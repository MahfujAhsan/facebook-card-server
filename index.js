const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// MiddleWares
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_ADMIN_PASS}@fbcardcluster.m3z92.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect();
        const postCollection = client.db('facebookCard').collection('postCollection');

        app.get("/facebookAd", async (req, res) => {
            const query = {};
            const cursor = postCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

    }
    finally {

    }
};

run().catch(console.dir);


app.get("/", async (req, res) => {
    res.send("Simple Facebook Server Running...")
})

app.listen(port, () => {
    console.log("Server Booming")
})
