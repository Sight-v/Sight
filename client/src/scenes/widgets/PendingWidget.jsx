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

    const {
        pendingApis
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem" sx={{ width: "100%", }}>
                    <Box sx={{ width: "100%" }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between"
                            sx={{ width: "100%" }}>
                            {pendingApis.length > 0 && (
                                <Box
                                    sx={{
                                        backgroundColor: palette.primary.main,
                                        borderRadius: "50%",
                                        width: "1.5rem",
                                        height: "1.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color={palette.primary.contrastText}
                                    >
                                        {pendingApis.length}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </FlexBetween>
            </FlexBetween >
        </WidgetWrapper >
    );
};

export default PendingWidget;