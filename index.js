const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors')
const{MongoClient}= require('mongodb')


// const fs = require('fs');

dotenv.config();
const app = express();
app.use(cors(
    origin='http://localhost:3000/',
    origin='http://localhost:3001/',
))

const port = process.env.PORT || 4001;
const mongo_uri = process.env.MONGO_URI

const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let data;
// try {
    //     data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
    // } catch (error) {
        //     console.error('Error reading data.json file:', error);
        //     process.exit(1); // Exit the process if the file read fails
        // }
        
        // connecting mongo db
        
        mongoose.connect(mongo_uri,{useNewUrlParser:true,UseUnifiedTopology:true})
        .then(()=>console.log('mongodb connected'))
        .catch((err)=>console.log(`error ${err} `))
        

app.use(bodyParser.json())

const userRoute=require('./routes/userRoutes')
const student_route=require('./routes/student_Routes')
// const indevisualStudent = require('./routes/indevisualStudent')

app.use('/api/users',userRoute)
app.use('/api/student', student_route)
// app.use('/api/student', indevisualStudent)


app.get('/', (req, res) => {
    res.send("Server is up and running");
});
// to GET json data  - FACTHING DATA
app.get('/api/students', async (req, res) => {

    try {
        await client.connect();
        const database = client.db('test');
        const collection = database.collection('studentrecords');
    
        const students = await collection.find({}).toArray();
        res.status(200).json(students);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching student records');
      } finally {
        await client.close();
      }
    });




    // res.send("student data running ");


// app.get('/api', (req, res) => {
//     res.json(data); // It's better to use res.json for JSON responses
// });

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server running at port ${port}`);
    }
});

