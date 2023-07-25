import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../scenes/navbar";
import UserWidget from "../../scenes/widgets/UserWidget";
import PendingWidget from "../../scenes/widgets/PendingWidget";
import UserApiWidget from "../widgets/UserApiWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
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

  function update() {
    getUser();
  }

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
        <Box flexBasis={isNonMobileScreens ? "30%" : undefined} position={isNonMobileScreens ? "sticky" : undefined} top={isNonMobileScreens ? "0rem" : undefined}
               sx={{
                overflowY: "scroll",
                height: "calc(90vh - 6rem)",
              }}
        >
          <UserWidget user={user} />
          <Box m="2rem 0" />  
          <PendingWidget user={user} userId={userId} update={update} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <UserApiWidget user={user} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
