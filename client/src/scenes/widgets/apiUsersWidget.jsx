import { useState } from "react";
import {
    Box,
    Typography,
    Divider,
    useTheme,
    FormControl,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import React from "react";
import ApiListWidget from "./apiListWidget";

const ApiUsersWidget = ({ api }) => {
    console.log(api);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const [loading, setLoading] = useState(false);
    const medium = palette.neutral.medium;

    const [selectedTimeRange, setSelectedTimeRange] = useState(1);

    if (!api) return {};

    const handleTimeRangeFilter = async (hours) => {
        setSelectedTimeRange(hours);
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
    };
    const currentTime = Date.now();
    const timeRange = selectedTimeRange * 24 * 60 * 60 * 1000;

    const formatTime = (time) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const generateTimeLabels = (startTime, endTime) => {
        const labels = [];
        for (let i = startTime; i <= endTime; i += 60000) {
            labels.push(formatTime(new Date(i)));
        }
        return labels;
    };

    const generateMinuteLabels = (startTime, endTime) => {
        const labels = [];
        for (let i = startTime; i <= endTime; i += 60000) { // 60000 = 1 minute
            labels.push(formatTime(new Date(i)));
        }
        return labels;
    };

    let currentTimeRangeStart = currentTime;
    if (selectedTimeRange === 1) {
        currentTimeRangeStart = currentTime - 3600000;
    } else if (selectedTimeRange === 3) {
        currentTimeRangeStart = currentTime - 10800000;
    } else if (selectedTimeRange === 12) {
        currentTimeRangeStart = currentTime - 43200000;
    } else if (selectedTimeRange === 2) {
        currentTimeRangeStart = currentTime - 172800000;
    } else if (selectedTimeRange === 7) {
        currentTimeRangeStart = currentTime - 604800000;
    } else if (selectedTimeRange === 30) {
        currentTimeRangeStart = currentTime - 2592000000;
    }

    const chartData = [];
    for (let i = currentTimeRangeStart; i <= currentTime; i += 86400000) {
        const dayLabel = new Date(i).toLocaleDateString();
        const timeRangeLabel = selectedTimeRange === 1 ? generateMinuteLabels(i, i + 3600000) : selectedTimeRange === 3 ? generateMinuteLabels(i, i + 10800000) : selectedTimeRange === 12 ? generateMinuteLabels(i, i + 43200000) : generateTimeLabels(i, i + 86400000);
        chartData.push({ dayLabel, timeRangeLabel, totalApiCalls: 0, totalLatency: 0 });
    }

    const timeChartData = [];
    for (let i = currentTimeRangeStart; i <= currentTime; i += 60000) {
        const dayLabel = new Date(i).toLocaleDateString();
        const timeLabel = formatTime(new Date(i));
        timeChartData.push({ dayLabel, timeLabel, totalApiCalls: 0, totalLatency: 0 });
    }

    let totalUsers = 0;
    let completeData = []
    api.endpoints.forEach((endpoint) => {
        endpoint.data.forEach((entry) => {
            if (selectedTimeRange === 2 || selectedTimeRange === 7 || selectedTimeRange === 30) {
                const receivedAt = new Date(entry.receivedAt);
                if (currentTime - receivedAt <= timeRange) {
                    const dayLabel = receivedAt.toLocaleDateString();
                    const dayIndex = chartData.findIndex((item) => item.dayLabel === dayLabel);
                    if (dayIndex !== -1) {
                        chartData[dayIndex].totalApiCalls++;
                        chartData[dayIndex].totalLatency += entry.latency;
                        totalUsers++;

                        let date = entry.receivedAt;
                        date = new Date(date).toLocaleDateString();

                        let data = {
                            time: date,
                            user: entry.user,
                            endpoint: endpoint.endpoint,
                            status: entry.statusCode,
                            latency: entry.latency,
                        }
                        completeData.push(data);
                    }
                }
            } else {
                let time = new Date(entry.receivedAt).getTime();
                time = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                const todaysDate = new Date().toLocaleDateString();
                const timeIndex = timeChartData.findIndex((item) => item.timeLabel === time);

                const DateFromEntry = new Date(entry.receivedAt).toLocaleDateString();

                if ((DateFromEntry === todaysDate) || selectedTimeRange === 24) {
                    if (timeIndex !== -1) {
                        totalUsers++;

                        let date = entry.receivedAt;
                        date = new Date(date).toLocaleDateString();

                        let data = {
                            time: date,
                            user: entry.user,
                            endpoint: endpoint.endpoint,
                            status: entry.statusCode,
                            latency: entry.latency,
                        }
                        completeData.push(data);
                    }
                }
            }
        });
    });

    return (
        <WidgetWrapper>
            <Box sx={{ px: "1.5rem" }}>
                <Box py="1.5rem">
                    <Typography variant="h5" sx={{ color: dark, fontWeight: "bold" }}>
                        API Users Statistics
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: medium }}>
                        Data for the selected time range.
                    </Typography>
                </Box>

                <Box py="1rem">
                    <FlexBetween sx={{ gap: "1rem" }}>
                        {["1h", "3h", "12h", "2d", "7d", "30d"].map((range) => (
                            <Button
                                key={range}
                                variant={selectedTimeRange === parseInt(range) ? "contained" : "outlined"}
                                onClick={() => {
                                    handleTimeRangeFilter(parseInt(range));
                                }}
                            >
                                {range}
                            </Button>
                        ))}
                    </FlexBetween>
                </Box>

                {loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" py="1rem">
                        <CircularProgress />
                    </Box>
                )}
            </Box>

            {!loading && (
                <>
                    <Box sx={{ px: "1.5rem" }}>
                    <Divider />

                    {/* Total Users */}
                    <Box py="1.5rem">
                        <Typography variant="h6" sx={{ color: dark, fontWeight: "bold" }}>
                            Total Users
                        </Typography>
                        <Typography variant="body1" sx={{ color: dark }}>
                            {totalUsers}
                        </Typography>
                    </Box>

                    <Divider />
                    </Box>

                    <ApiListWidget listData={completeData} />
                </>
            )}
        </WidgetWrapper>
    );
};

export default ApiUsersWidget;