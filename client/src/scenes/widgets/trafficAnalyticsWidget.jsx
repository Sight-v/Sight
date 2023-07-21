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

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem" pb="1.1rem" sx={{ width: "100%" }}>
        {/* Left side - Endpoint Dropdown */}
        <FormControl sx={{ minWidth: "40%" }}>
          <Select
            value={selectedEndpoint}
            onChange={handleEndpointChange}
            displayEmpty
          >
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
            <Select
              value={selectedTimezone}
              onChange={handleTimezoneChange}
              displayEmpty
            >
              <MenuItem value="UTC">UTC</MenuItem>
              {/* Add other timezone options as needed */}
            </Select>
          </FormControl>

          {/* Time Range Buttons */}
          <Button variant="outlined" onClick={() => handleTimeRangeFilter(1)}>
            Last 1h
          </Button>
          <Button variant="outlined" onClick={() => handleTimeRangeFilter(3)}>
            Last 3h
          </Button>
          <Button variant="outlined" onClick={() => handleTimeRangeFilter(12)}>
            Last 12h
          </Button>
          <Button variant="outlined" onClick={() => handleTimeRangeFilter(24)}>
            Last 24h
          </Button>
          <Button variant="outlined" onClick={() => handleTimeRangeFilter(7 * 24)}>
            Last 7d
          </Button>
          <Button variant="outlined" onClick={() => handleTimeRangeFilter(30 * 24)}>
            Last 30d
          </Button>
        </Box>
      </FlexBetween>

      <Divider sx={{ my: "1.5rem" }} />

      {/* Additional Dropdowns - All Customers and All Responses */}
      <FlexBetween gap="1.5rem" pb="1.1rem" sx={{ width: "100%" }}>
        {/* Customer Dropdown */}
        <FormControl sx={{ minWidth: "40%" }}>
          <Select
            value={selectedCustomer}
            onChange={handleCustomerChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              All Customers
            </MenuItem>
            {api.endpoints.flatMap((endpoint) =>
              endpoint.data.map((entry) => entry.user)
            ).map((customer, index) => (
              <MenuItem key={index} value={customer}>
                {customer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Response Dropdown */}
        <FormControl sx={{ minWidth: "40%" }}>
          <Select
            value={selectedResponse}
            onChange={handleResponseChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              All Responses
            </MenuItem>
            {api.endpoints.flatMap((endpoint) =>
              endpoint.data.map((entry) => entry.statusCode)
            ).map((response, index) => (
              <MenuItem key={index} value={response}>
                {response}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FlexBetween>

      <Divider sx={{ my: "1.5rem" }} />
    </WidgetWrapper>
  );
};

export default TrafficAnalyticsWidget;
