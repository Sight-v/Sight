import { CheckRounded, CancelRounded } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PendingWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

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

    if (!user) {
        return null;
    }

    function update() {
        getUser();
    }

    const { pendingApis } = user;

    const handleApprove = async (apiId) => {
        const response = await fetch(`http://localhost:3001/apis/${userId}/approve/${apiId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
        });
        update();
    };

    const handleReject = async (apiId) => {
        const response = await fetch(`http://localhost:3001/apis/${userId}/reject/${apiId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
        });
        update();
    };

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween gap="1rem" sx={{ width: "100%" }}>
                    <Box sx={{ width: "100%" }}>
                        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                            <Typography variant="h6" sx={{ color: dark }}>
                                Pending APIs
                            </Typography>
                            <Typography variant="h6" sx={{ color: medium }}>
                                ({pendingApis.length})
                            </Typography>
                        </Box>
                        <Divider sx={{ width: "100%", height: "1px", backgroundColor: medium }} />
                        {pendingApis.map((api) => (
                            <Box
                                key={api.id}
                                display="flex"
                                justifyContent="space-between" // Align children to the start and end of the container
                                alignItems="center"
                                gap="0.5rem"
                                sx={{
                                    width: "100%",
                                    borderBottom: `1px solid ${medium}`,
                                    py: "0.5rem",
                                }}
                            >
                                <Typography variant="h6" sx={{ color: dark }}>
                                    {api.name}
                                </Typography>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <IconButton color="primary" onClick={() => handleApprove(api.id)}>
                                        <CheckRounded />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleReject(api.id)}>
                                        <CancelRounded />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </FlexBetween>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default PendingWidget;
