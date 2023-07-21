import Api from "../models/Apis.js";
import User from "../models/User.js";

import { ObjectId } from "mongoose";

export const addApi = async (req, res) => {
    const { host_id, user, endpoint, latency, statusCode } = req.body;
    const endpointWithoutQueryParams = endpoint.split('?')[0];
    const name = endpoint.split('/')[0];

    console.log('host_id', host_id);

    try {
        const existingApiByName = await Api.findOne({ name: name });

        if (existingApiByName) {
            const matchedEndpoint = existingApiByName.endpoints.find(endpointObj => endpointObj.endpoint === endpointWithoutQueryParams);
            if (matchedEndpoint) {
                matchedEndpoint.totalRequests += 1;
                matchedEndpoint.data.push({
                    id: matchedEndpoint.totalRequests,
                    user: user,
                    latency: latency,
                    statusCode: statusCode,
                    receivedAt: new Date()
                });
            } else {
                existingApiByName.endpoints.push({
                    id: existingApiByName.endpoints.length + 1,
                    endpoint: endpointWithoutQueryParams,
                    data: [{
                        id: 1,
                        user: user,
                        latency: latency,
                        statusCode: statusCode,
                        receivedAt: new Date()
                    }],
                    totalRequests: 1
                });
            }
            existingApiByName.totalRequests = existingApiByName.endpoints.reduce((total, endpoint) => total + endpoint.totalRequests, 0);
            await existingApiByName.save();
        } else {
            const api = new Api({
                name: name,
                endpoints: [{
                    id: 1,
                    endpoint: endpointWithoutQueryParams,
                    data: [{
                        id: 1,
                        user: user,
                        latency: latency,
                        statusCode: statusCode,
                        receivedAt: new Date()
                    }],
                    totalRequests: 1
                }],
                totalRequests: 1
            });
            await api.save();

            const host = await User.findById({ _id: host_id });

            host.pendingApis.push({
                id: api._id,
                name: api.name,
                totalRequests: api.totalRequests
            });

            await host.save();
        }

        res.status(200).json({ message: 'Done' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getApis = async (req, res) => {
    try {
        // only send name and rootUrl
        const apis = await Api.find({}, { name: 1, rootUrl: 1 });

        res.status(200).json(apis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getApi = async (req, res) => {
    try {
        const api = await Api.findById(req.params.id);
        res.status(200).json(api);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const approveApi = async (req, res) => {
    try {
        const api = await Api.findById(req.params.id);
        const host = await User.findById({ _id: req.params.userId });

        host.apis.push({
            id: api._id,
            name: api.name,
            totalRequests: api.totalRequests
        });

        // Convert req.params.id to ObjectId before filtering
        const apiId = new ObjectId(req.params.id);

        // Filter out the approved API from pendingApis
        host.pendingApis = host.pendingApis.filter(apiItem => apiItem.id.equals(apiId));

        await host.save();

        res.status(200).json({ message: 'Done' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const rejectApi = async (req, res) => {
    try {
        const host = await User.findById({ _id: req.params.userId });

        const apiId = new ObjectId(req.params.id);

        host.pendingApis = host.pendingApis.filter(apiItem => apiItem.id.equals(apiId));

        await host.save();

        res.status(200).json({ message: 'Done' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}