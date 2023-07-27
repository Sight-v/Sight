import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  FileCopyOutlined,
  PanoramaFishEyeOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
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

  const [showId, setShowId] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    pictureUrl,
  } = user;

  const userId = user._id;
  const asterisks = "*";
  const asterisksUserId = asterisks.repeat(userId.length);

  const handleShowId = () => {
    setShowId(!showId);
  };

  // Function to copy the userId to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(userId).then(() => {
      setIsCopied(true);
      // Reset the 'isCopied' state after a few seconds (e.g., 3 seconds)
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem" sx={{ width: "100%" }}>
          <UserImage image={pictureUrl} />
          <Box sx={{ width: "100%" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
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
                  onClick={() => navigate("/home")}
                >
                  {firstName} {lastName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </FlexBetween>
      </FlexBetween>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Box display="flex" alignItems="center" gap="1rem">
          {/* Display userId as a token with asterisks */}
          <Typography variant="p" color={dark} fontWeight="500">
            {showId ? userId : asterisksUserId}
          </Typography>
          {/* Show userId button */}
          <IconButton
            aria-label="show"
            onClick={handleShowId}
            sx={{ color: main }}
          >
            {/* You can use any icon you like for the show button */}
            <PanoramaFishEyeOutlined />
          </IconButton>
          {/* Copy button */}
          <IconButton
            aria-label="copy"
            onClick={copyToClipboard}
            sx={{ color: main }}
          >
            {/* You can use any icon you like for the copy button */}
            <FileCopyOutlined />
          </IconButton>
          {isCopied && (
            <Typography variant="body2" color="success">
              Copied User Token
            </Typography>
          )}
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
