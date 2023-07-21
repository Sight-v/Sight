import {
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ user }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    pictureUrl,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem" sx={{ width: "100%", }}>
          <UserImage image={pictureUrl} />
          <Box sx={{ width: "100%" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between"
              sx={{ width: "100%" }}>
              <Box display="flex" alignItems="left" gap="1rem">
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.dark,
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  {firstName} {lastName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </FlexBetween>
      </FlexBetween >
    </WidgetWrapper >
  );
};

export default UserWidget;