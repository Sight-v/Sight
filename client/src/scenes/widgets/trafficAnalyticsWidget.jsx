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
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrafficAnalyticsWidget = ({ api }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  // State variables for selected filters and time range
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedResponse, setSelectedResponse] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState(1); // Default to 1 hour

  // Function to filter and process the data based on selected filters and time range
  if (!api) return {};

  const currentTime = Date.now();
  const timeRange = selectedTimeRange * 24 * 60 * 60 * 1000;

  const chartData = [];
  for (let i = selectedTimeRange - 1; i >= 0; i--) {
    const dayTime = currentTime - i * 24 * 60 * 60 * 1000;
    const dayLabel = new Date(dayTime).toLocaleDateString();
    chartData.push({ dayLabel, totalApiCalls: 0, totalLatency: 0 });
  }

  api.endpoints.forEach((endpoint) => {
    endpoint.data.forEach((entry) => {
      const receivedAt = new Date(entry.receivedAt);
      if (currentTime - receivedAt <= timeRange) {
        const dayLabel = receivedAt.toLocaleDateString();
        const dayIndex = chartData.findIndex((item) => item.dayLabel === dayLabel);
        if (dayIndex !== -1) {
          chartData[dayIndex].totalApiCalls++;
          chartData[dayIndex].totalLatency += entry.latency;
        }
      }
    });
  });

  const chartLabels = chartData.map((item) => item.dayLabel);
  const chartApiCallsData = chartData.map((item) => item.totalApiCalls);
  const chartLatencyData = chartData.map((item) => item.totalLatency);

  // Calculate the maximum values for API calls and latency
  const maxApiCalls = Math.max(...chartApiCallsData);
  const maxLatency = Math.max(...chartLatencyData);
  const midPoint = (maxApiCalls + maxLatency) / 2;

  const chartDataFinal = {
    labels: chartLabels,
    datasets: [
      {
        label: "API Calls",
        data: chartApiCallsData,
        borderColor: palette.primary.main,
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        yAxisID: "y",
      },
      {
        label: "Latency",
        data: chartLatencyData,
        borderColor: palette.secondary.main,
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        yAxisID: "y1",
      },
    ],
  };

  // Handler for endpoint dropdown change
  const handleEndpointChange = (event) => {
    setSelectedEndpoint(event.target.value);
  };

  // Handler for timezone dropdown change
  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  // Handler for customer dropdown change
  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  // Handler for response dropdown change
  const handleResponseChange = (event) => {
    setSelectedResponse(event.target.value);
  };

  // Handler for time range button clicks
  const handleTimeRangeFilter = (hours) => {
    setSelectedTimeRange(hours);
  };

  // Move options here
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
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, // Adjust the maximum number of x-axis labels
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        max: midPoint, // Set the maximum value for the left Y-axis
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
        max: midPoint, // Set the maximum value for the right Y-axis
        title: {
          display: true,
          text: "Latency",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust the tension for rounded lines (0 = straight lines, 1 = very curved lines)
        borderWidth: 2, // Increase the line width for better visibility
        fill: false, // Do not fill the area under the lines
        borderColor: "rgba(0, 0, 0, 0)", // Transparent border color to hide the default border
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
      },
      point: {
        radius: 0, // Hide data points to make the chart fully rounded
        hitRadius: 5, // Set the hit radius to make it easier to select the data points
      },
    },
    layout: {
      padding: {
        bottom: 20, // Add padding to the bottom to accommodate x-axis labels
      },
    },
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem" pb="1.1rem" sx={{ width: "100%" }}>
        {/* Left side - Endpoint Dropdown */}
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

        {/* Right side - Timezone Dropdown and Time Range Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <FormControl sx={{ minWidth: "120px" }}>
            <Select value={selectedTimezone} onChange={handleTimezoneChange} displayEmpty>
              <MenuItem value="UTC">UTC</MenuItem>
              {/* Add other timezone options as needed */}
            </Select>
          </FormControl>

          {/* Time Range Buttons */}
          <Button
            variant={selectedTimeRange === 1 ? "contained" : "outlined"}
            onClick={() => handleTimeRangeFilter(1)}
          >
            Last 1h
          </Button>
          <Button
            variant={selectedTimeRange === 3 ? "contained" : "outlined"}
            onClick={() => handleTimeRangeFilter(3)}
          >
            Last 3h
          </Button>
          <Button
            variant={selectedTimeRange === 12 ? "contained" : "outlined"}
            onClick={() => handleTimeRangeFilter(12)}
          >
            Last 12h
          </Button>
          <Button
            variant={selectedTimeRange === 24 ? "contained" : "outlined"}
            onClick={() => handleTimeRangeFilter(24)}
          >
            Last 24h
          </Button>
          <Button
            variant={selectedTimeRange === 7 * 24 ? "contained" : "outlined"}
            onClick={() => handleTimeRangeFilter(7 * 24)}
          >
            Last 7d
          </Button>
          <Button
            variant={selectedTimeRange === 30 * 24 ? "contained" : "outlined"}
            onClick={() => handleTimeRangeFilter(30 * 24)}
          >
            Last 30d
          </Button>
        </Box>
      </FlexBetween>

      <Divider sx={{ my: "1.5rem" }} />

      {/* Line Chart */}
      <Box>
        <Line data={chartDataFinal} options={options} />
      </Box>

      {/* Time Range Markers */}
      <FlexBetween sx={{ width: "100%", mt: "1rem" }}>
        {["1h", "3h", "12h", "24h", "7d", "30d"].map((range) => (
          <Button
            key={range}
            variant={selectedTimeRange === parseInt(range) ? "contained" : "outlined"}
            onClick={() => handleTimeRangeFilter(parseInt(range))}
          >
            Last {range}
          </Button>
        ))}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default TrafficAnalyticsWidget;