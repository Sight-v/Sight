import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../scenes/navbar";

import ApiSidebar from "../widgets/apiSidebarWidget";
import TrafficAnalyticsWidget from "../widgets/trafficAnalyticsWidget";
const ApiPage = () => {
  const { apiId } = useParams();
  console.log(apiId);
  const [api, setApi] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
  const { _id } = useSelector((state) => state.user);

  const getApi = async () => {
    const response = await fetch(`http://localhost:3001/apis/${apiId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    const data = await response.json();
    setApi(data);
    console.log(data);
  };

  useEffect(() => {
    getApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
        sx={{
          overflowY: "scroll",
          height: "calc(100vh - 6rem)",
        }}
      >
        <Box flexBasis={isNonMobileScreens ? "20%" : undefined}>
          <ApiSidebar />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "70%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {api !== null ? (
            <TrafficAnalyticsWidget api={api} />
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ApiPage;
