// import { useState } from "react";
import {
    Box,
    Typography,
    useTheme,
  } from "@mui/material";
  import {
    Help,
    Settings,
    Traffic,
    Person
  } from "@mui/icons-material";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import FlexBetween from "../../components/FlexBetween";
  import UserImage from "../../components/UserImage";
  
  const ApiSidebar = () => {
    const { apiId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
  
    const theme = useTheme();
    const dark = theme.palette.neutral.dark;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
  
    const fullName = `${user.firstName} ${user.lastName}`;
    let page = window.location.pathname;
  
    return (
      <Box
        padding="1rem 0"
        backgroundColor={alt}
  
        width="100%"
        height="100%"
        
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderRadius="1rem" 
  
        sx={{
          overflowY: "scroll",
          height: "calc(90vh - 6rem)",
        }}
      >
        <Box px={2} width="100%">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={2}
            mb={2}
          >
            <FlexBetween
              onClick={() => navigate(`/api/${apiId}`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.dark,
                  backgroundColor: primaryLight,
                  borderRadius: "1rem",
                },
                gap: "0.5rem",
                padding: "8px",
                borderRadius: "1rem",
                backgroundColor: page === `/api/${apiId}` ? primaryLight : undefined,
              }}
              width="100%"
            >
              <Traffic />
              <Typography fontWeight="semibold" fontSize="1rem" width="100%">
                Traffic Analytics
              </Typography>
            </FlexBetween>

            <FlexBetween
              onClick={() => navigate(`/apiusers/${apiId}`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.dark,
                  backgroundColor: primaryLight,
                  borderRadius: "1rem",
                },
                gap: "0.5rem",
                padding: "8px",
                borderRadius: "1rem",
                backgroundColor: page === `/apiusers/${apiId}` ? primaryLight : undefined,
              }}
              width="100%"
            >
              <Person />
              <Typography fontWeight="semibold" fontSize="1rem" width="100%">
                User Analytics
              </Typography>
            </FlexBetween>
  
            <FlexBetween
              onClick={() => navigate(`/settings`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.dark,
                  backgroundColor: primaryLight,
                  borderRadius: "1rem",
                },
                gap: "0.5rem",
                padding: "8px",
                borderRadius: "1rem",
              }}
              width="100%"
            >
              <Settings />
              <Typography fontWeight="semibold" fontSize="1rem" width="100%">
                Settings
              </Typography>
            </FlexBetween>
  
            <FlexBetween
              onClick={() => navigate("/help")}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.dark,
                  backgroundColor: primaryLight,
                  borderRadius: "1rem",
                },
                gap: "0.5rem",
                padding: "8px",
                borderRadius: "1rem",
              }}
              width="100%"
            >
              <Help />
              <Typography fontWeight="semibold" fontSize="1rem" width="100%">
                Help
              </Typography>
            </FlexBetween>
          </Box>
        </Box>
        <Box px={2} pb={2} width="100%" textAlign="left">
          <FlexBetween
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
          >
            <UserImage image={user.pictureUrl} size="40px" />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              {fullName}
            </Typography>
          </FlexBetween>
        </Box>
      </Box>
    );
  };
  
  export default ApiSidebar;
  