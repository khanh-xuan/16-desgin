const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config()

const authRouter = require('./routes/auth')
const projectRouter = require('./routes/project')
const imageRouter = require('./routes/image')

//connect mongooseDB
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@16design.aqtsf9t.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Mongoose DB connected');
    } catch (error) {
        console.log('error', error.message);
    }
}

connectDB();

const app = express();

//config size request
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/project", projectRouter)
app.use("/api/images", imageRouter)

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api running')
    })
}

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`))