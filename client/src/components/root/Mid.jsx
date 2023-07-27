import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import {
    HomeOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Mid = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const primaryLight = theme.palette.primary.light;
    return (
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
        >
            <Box
                flexBasis={isNonMobileScreens ? "40%" : undefined}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <img src="https://cdn.discordapp.com/attachments/1096673366485782588/1113152082132869171/quake_2.png" alt="image" width="100%" height="100%" />
            </Box>
            <Box
                flexBasis={isNonMobileScreens ? "40%" : undefined}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h6" color={primaryLight}>
                    Title
                </Typography>
                <Typography variant="body1" color={primaryLight}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Typography>
            </Box>
        </Box>
    );
};

export default Mid;
