const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vbld0.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const ticketCollection = client.db("novoair").collection("ticketDetail");
    
    // // add new ticket
    // app.post('/addTicket', (req, res) => {
    //     const ticket = req.body;
    //     ticketCollection.insertMany(ticket)
    //     .then(result => {
    //         res.send(result.insertedCount)
    //     })
    // })


    // all ticket List
    app.get('/ticketList', (req, res) => {
        ticketCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

    // single ticket
    app.get('/ticket/:id', (req, res) => {
        servicesCollection.find({ _id: ObjectId(req.params.id) })
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

    
     

});





app.get('/', (req, res) => {
    res.send('Server Working...')
})
app.listen(process.env.PORT || port);