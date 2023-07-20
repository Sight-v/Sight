import Api from "../models/Apis.js";

export const addApi = async (req, res) => {
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