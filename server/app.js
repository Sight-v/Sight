import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Body-parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define API schema
const apiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rootUrl: {
        type: String,
        required: true
    },
    data: [
        {
            _id: false,
            id: {
                type: Number,
                required: true
            },
            user: {
                type: String,
                required: true
            },
            endpoint: {
                type: String,
                required: true
            },
            latency: {
                type: Number,
                required: true
            },
            statusCode: {
                type: Number,
                required: true
            },
            receivedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    totalRequests: {
        type: Number,
        default: 0
    }
});

// Create API model
const Api = mongoose.model('Api', apiSchema);

app.post('/api', async (req, res) => {
    const { name, user, endpoint, latency, statusCode } = req.body;
    const endpointWithoutQueryParams = endpoint.split('?')[0];

    try {
        
        const existingApi = await Api.findOne({ rootUrl: endpointWithoutQueryParams });
        if (existingApi) {
            existingApi.totalRequests += 1;
            existingApi.data.push({
                id: existingApi.totalRequests,
                user: user,
                endpoint: endpoint,
                latency: latency,
                statusCode: statusCode,
                receivedAt: new Date()
            });
            await existingApi.save();
        } else {
            const api = new Api({
                name: name,
                rootUrl: endpointWithoutQueryParams,
                totalRequests: 1,
                data: [{
                    id: 1,
                    user: user,
                    endpoint: endpoint,
                    latency: latency,
                    statusCode: statusCode,
                    receivedAt: new Date()
                }]
            });
            await api.save();
        }

        res.json({ message: 'Done' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/apis', async (req, res) => {
    try {
        // only send name and rootUrl
        const apis = await Api.find({}, { name: 1, rootUrl: 1 });
        res.json(apis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/:id', async (req, res) => {
    try {
        const api = await Api.findById(req.params.id);
        res.json(api);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});    

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
