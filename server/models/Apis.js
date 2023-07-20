import mongoose from "mongoose";

const ApiSchema = new mongoose.Schema({
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

const Apis = mongoose.model("Api", ApiSchema);
export default Apis;
