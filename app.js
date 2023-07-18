import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// Create Express app
const app = express();

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
    totalRequests: {
        type: Number,
        default: 0
    }
});

// Create API model
const Api = mongoose.model('Api', apiSchema);

app.post('/api', async (req, res) => {
    const { name, endpoint } = req.body;

    // Capture start time
    const startTime = new Date();

    try {
        // Make request to the user's API endpoint
        const response = await fetch(endpoint);

        // Capture end time and calculate latency
        const endTime = new Date();
        const latency = endTime - startTime;

        // Find existing API data with the same endpoint
        const existingApi = await Api.findOne({ endpoint });

        if (existingApi) {
            // If an existing API entry is found, increment the totalRequests count
            existingApi.totalRequests += 1;
            await existingApi.save();
        } else {
            // Save the API data to the database
            const api = new Api({
                name: name,
                endpoint: endpoint,
                latency: latency,
                statusCode: response.status,
                totalRequests: 1
            });
            await api.save();
        }

        // Send the response to the user's API
        res.json({ message: 'API data saved and response sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
