import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import {
    Diversity3,
    DataUsage,
    ManageAccounts
} from "@mui/icons-material";
const List = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
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
                    Users
                </Typography>
                <Typography variant="h6">
                    Get proper insight on your users !
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
                    <DataUsage sx={{ fontSize: "40px" }} style={{ color: "black" }} />
                </IconButton>
                <Typography variant="h6" >
                    Line Graphs
                </Typography>
                <Typography variant="h6" >
                    Shows proper line graphs of your API's usage
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
                    <ManageAccounts sx={{ fontSize: "40px" }} style={{ color: "black" }} />
                </IconButton>
                <Typography variant="h6" >
                    Manage
                </Typography>
                <Typography variant="h6" >
                    Manage multiple APIs with ease
                </Typography>
            </Box>
        </Box>
    );
};

export default List;
