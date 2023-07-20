import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        {/* <Typography fontWeight="bold" fontSize="32px" color="primary">
          Trapi
        </Typography> */}
        <img src="https://cdn.discordapp.com/attachments/1096673366485782588/1117772388327768134/Trapilogo.png" alt="Quake Logo" width="120vw" height="auto" />
        {/* since this doesnt load the image we will */}
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Trapi ! Hope you enjoy your stay.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
