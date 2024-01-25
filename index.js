const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const corsOption = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
// middleware
app.use(cors(corsOption))
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@simplecrud.xgcpsfy.mongodb.net/?retryWrites=true&w=majority`;

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

        const blogsCollection = client.db('blog-website-DB').collection('blog');
        const usersCollection = client.db('blog-website-DB').collection('user')





        
        // -----------users related apis---------------//

        // get all users from database for admin
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        //update user role to author
        app.patch('/user/author/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    role: 'author'
                }
            };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);
        })

        //update user role to admin
        app.patch('/user/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    role: 'admin'
                }
            };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);
        })

        //add user to database using put method
        app.put('/user', async (req, res) => {
            const userInfo = req.body;
            const query = { email: userInfo.email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    userInfo
                }
            };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);
        })

        // delete a specific user 
        app.delete('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })











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


app.get('/', (req, res) => {
    res.send('let`s build great things!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})