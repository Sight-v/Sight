import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";

const UserApiWidget = ({ user }) => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;

    if (!user) {
        return null;
    }

    const { apis } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween gap="1.5rem" pb="1.1rem" sx={{ width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <Typography variant="h6" sx={{ color: dark }}>
                            APIs
                        </Typography>
                        <Typography variant="h6" sx={{ color: medium }}>
                            ({apis.length})
                        </Typography>
                    </Box>
                    <Divider sx={{ width: "100%", height: "1px", backgroundColor: medium }} />
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                        gap="1rem"
                        sx={{
                            width: "100%",
                            py: "0.5rem",
                            mt: "1rem",
                        }}
                    >
                        {apis.map((api) => (
                            <Box
                                key={api.id}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                gap="0.5rem"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    py: "1rem",
                                    px: "1rem",
                                    border: "1px solid",
                                    borderColor: medium,
                                    borderRadius: "0.5rem",
                                }}
                                onClick={() => navigate(`/api/${api.id}`)}
                            >
                                <Typography variant="h6" sx={{ color: dark }}>
                                    {api.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </FlexBetween>
        </WidgetWrapper>
    );

};

export default UserApiWidget;
