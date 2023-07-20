import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../scenes/navbar";

import SettingsWidget from "../../scenes/widgets/SettingsWidget";
import SettingsSidebarWidget from "../../scenes/widgets/SettingsSidebarWidget";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { _id } = useSelector((state) => state.user);
  
  if (userId !== _id) {
    navigate(`/profile/${userId}`);
  }

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };


  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

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
        <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
          <SettingsSidebarWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "60%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
            <SettingsWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
