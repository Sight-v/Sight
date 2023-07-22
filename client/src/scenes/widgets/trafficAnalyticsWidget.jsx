import { useState } from "react";
import { Box, Typography, Divider, useTheme, FormControl, Select, MenuItem, Button, CircularProgress } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ApiListWidget from "./apiListWidget";
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrafficAnalyticsWidget = ({ api }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const [loading, setLoading] = useState(false);
  const medium = palette.neutral.medium;

  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);

  if (!api) return {};

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
  } else if (selectedTimeRange === 24) {
    currentTimeRangeStart = currentTime - 86400000;
  } else if (selectedTimeRange === 7) {
    currentTimeRangeStart = currentTime - 604800000;
  } else if (selectedTimeRange === 30) {
    currentTimeRangeStart = currentTime - 2592000000;
  }

  const chartData = [];
  for (let i = currentTimeRangeStart; i <= currentTime; i += 86400000) {
    const dayLabel = new Date(i).toLocaleDateString();
    const timeRangeLabel = selectedTimeRange === 1 ? generateMinuteLabels(i, i + 3600000) : selectedTimeRange === 3 ? generateMinuteLabels(i, i + 10800000) : selectedTimeRange === 12 ? generateMinuteLabels(i, i + 43200000) : selectedTimeRange === 24 ? generateMinuteLabels(i, i + 86400000) : generateTimeLabels(i, i + 86400000);
    chartData.push({ dayLabel, timeRangeLabel, totalApiCalls: 0, totalLatency: 0 });
  }

  const timeChartData = [];
  for (let i = currentTimeRangeStart; i <= currentTime; i += 60000) {
    const timeLabel = formatTime(new Date(i));
    timeChartData.push({ timeLabel, totalApiCalls: 0, totalLatency: 0 });
  }

  let totalApiCalls = 0;
  let completeData = []
  api.endpoints.forEach((endpoint) => {
    endpoint.data.forEach((entry) => {

      if (selectedTimeRange === 7 || selectedTimeRange === 30) {
        const receivedAt = new Date(entry.receivedAt);
        if (currentTime - receivedAt <= timeRange) {
          const dayLabel = receivedAt.toLocaleDateString();
          const dayIndex = chartData.findIndex((item) => item.dayLabel === dayLabel);
          if (dayIndex !== -1) {
            chartData[dayIndex].totalApiCalls++;
            chartData[dayIndex].totalLatency += entry.latency;
          }
        }
      } else {
        let time = new Date(entry.receivedAt).getTime();
        time = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        const timeIndex = timeChartData.findIndex((item) => item.timeLabel === time);
        if (timeIndex !== -1) {
          timeChartData[timeIndex].totalApiCalls++;
          timeChartData[timeIndex].totalLatency += entry.latency;

          totalApiCalls = 0;
          timeChartData.forEach((item) => {
            totalApiCalls += item.totalApiCalls;       
          });

          let data = {
            user: entry.user,
            endpoint: endpoint.endpoint,
            status: entry.statusCode,
            latency: entry.latency,
          }
          completeData.push(data);
        }
      }
    });
  });

  let chartLabels
  let chartApiCallsData, chartLatencyData
  let maxApiCalls, maxLatency, midPointA, midPointB, midPointApiCalls, midPointLatency
  if (selectedTimeRange === 1 || selectedTimeRange === 3 || selectedTimeRange === 12 || selectedTimeRange === 24) {
    chartLabels = chartData[0].timeRangeLabel;
  } else {
    chartLabels = chartData.map((item) => item.dayLabel);
  }

  if (selectedTimeRange === 1 || selectedTimeRange === 3 || selectedTimeRange === 12 || selectedTimeRange === 24) {
    chartApiCallsData = timeChartData.map((item) => item.totalApiCalls);
    chartLatencyData = timeChartData.map((item) => item.totalLatency);
  } else {
    chartApiCallsData = chartData.map((item) => item.totalApiCalls);
    chartLatencyData = chartData.map((item) => item.totalLatency);
  }

  maxApiCalls = Math.max(...chartApiCallsData);
  maxLatency = Math.max(...chartLatencyData);
  midPointA = (maxApiCalls) / 2;
  midPointB = (maxLatency) / 2;

  midPointApiCalls = Math.round((maxApiCalls) + midPointA * 2);
  midPointLatency = Math.round((maxLatency) + midPointB * 3);

  // chartLabels.reverse();
  // chartApiCallsData.reverse();
  // chartLatencyData.reverse();

  const chartDataFinal = {
    labels: chartLabels,
    datasets: [
      {
        label: "API Calls",
        data: chartApiCallsData,
        borderColor: palette.primary.main,
        backgroundColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y",
      },
      {
        label: "Latency",
        data: chartLatencyData,
        borderColor: palette.secondary.main,
        backgroundColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y1",
      },
    ],
  };

  const handleEndpointChange = (event) => {
    setSelectedEndpoint(event.target.value);
  };

  const handleTimeRangeFilter = async (hours) => {
    setSelectedTimeRange(hours);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const maxVisibleLabels = 1000;

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "API Calls - Latency Chart",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            if (context.parsed.x !== null && label) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;
              const latency = chartLatencyData[dataIndex];
              const apiCalls = chartApiCallsData[dataIndex];

              if (datasetIndex === 0) {
                return `API Calls: ${apiCalls}`;
              } else if (datasetIndex === 1) {
                return `Latency: ${latency}`;
              }
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: maxVisibleLabels,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        max: midPointApiCalls,
        title: {
          display: true,
          text: "API Calls",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        beginAtZero: true,
        max: midPointLatency,
        title: {
          display: true,
          text: "Latency",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        fill: false,
        borderColor: "rgba(0, 0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
      point: {
        radius: 0,
        hitRadius: 5,
      },
    },
    layout: {
      padding: {
        bottom: 20,
      },
    },
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem" pb="1.1rem" sx={{ width: "100%" }}>
        <FormControl sx={{ minWidth: "40%" }}>
          <Select value={selectedEndpoint} onChange={handleEndpointChange} displayEmpty>
            <MenuItem value="" disabled>
              Select Endpoint
            </MenuItem>
            {api.endpoints.map((endpoint) => (
              <MenuItem key={endpoint.id} value={endpoint.endpoint}>
                {endpoint.endpoint}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>

          <FlexBetween sx={{ width: "100%", height: "100%", alignItems: "center", gap: "1rem" }}>
            {["1h", "3h", "12h", "24h", "7d", "30d"].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === parseInt(range) ? "contained" : "outlined"}
                onClick={() => {
                  handleTimeRangeFilter(parseInt(range))
                }}
                sx={{
                  height: "3rem",
                  width: "2rem",
                }}
              >
                {range}
              </Button>
            ))}
          </FlexBetween>
        </Box>
      </FlexBetween>

      <FlexBetween gap="1.5rem" pb="1.1rem" sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ color: dark }}>
          Total API Calls: {totalApiCalls}
        </Typography>
      </FlexBetween>

      <Divider sx={{ my: "1.5rem" }} />

      <Box>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <CircularProgress />
          </div>
        ) : (
          <React.Fragment>
            <Line data={chartDataFinal} options={options} />
          </React.Fragment>
        )}
      </Box>

      <Divider sx={{ my: "1.5rem" }} />

      <ApiListWidget listData={completeData} />

    </WidgetWrapper>
  );
};

export default TrafficAnalyticsWidget;
