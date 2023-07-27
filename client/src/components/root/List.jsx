import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import {
    HomeOutlined,
    Diversity3
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const List = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const dark = theme.palette.neutral.dark;
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
                flexBasis={isNonMobileScreens ? "25%" : undefined}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
                textAlign="center"

                sx={{
                    background: "rgba(0,0,0,0.0)",
                    borderRadius: "1rem",
                    padding: "1rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    "color": "black"
                }}
            >
                <IconButton>
                    <Diversity3 sx={{ fontSize: "40px" }} style={{ color: "black" }} />
                </IconButton>
                <Typography variant="h6">
                    Title
                </Typography>
                <Typography variant="h6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Typography>
            </Box>
            <Box 
                flexBasis={isNonMobileScreens ? "25%" : undefined}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
                textAlign="center"

                sx={{
                    background: "rgba(0,0,0,0.0)",
                    borderRadius: "1rem",
                    padding: "1rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    "color": "black"
                }}
            >
                <IconButton>
                    <HomeOutlined sx={{ fontSize: "40px" }} style={{ color: "black" }} />
                </IconButton>
                <Typography variant="h6" >
                    Title
                </Typography>
                <Typography variant="h6" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Typography>
            </Box>
            <Box 
                flexBasis={isNonMobileScreens ? "25%" : undefined}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
                textAlign="center"

                sx={{
                    background: "rgba(0,0,0,0.0)",
                    borderRadius: "1rem",
                    padding: "1rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    "color": "black"
                }}
            >
                <IconButton>
                    <HomeOutlined sx={{ fontSize: "40px" }} style={{ color: "black" }} />
                </IconButton>
                <Typography variant="h6" >
                    Title
                </Typography>
                <Typography variant="h6" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Typography>
            </Box>
            <Box 
                flexBasis={isNonMobileScreens ? "25%" : undefined}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
                textAlign="center"

                sx={{
                    background: "rgba(0,0,0,0.0)",
                    borderRadius: "1rem",
                    padding: "1rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    "color": "black"
                }}
            >
                <IconButton>
                    <HomeOutlined sx={{ fontSize: "40px" }} style={{ color: "black" }} />
                </IconButton>
                <Typography variant="h6" >
                    Title
                </Typography>
                <Typography variant="h6" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Typography>
            </Box>
        </Box>
    );
};

export default List;
