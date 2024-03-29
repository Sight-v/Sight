import { CheckRounded, CancelRounded } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton, Avatar } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ApiListWidget = ({ listData }) => {
    const { palette } = useTheme();
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    return (
        <WidgetWrapper>
            <Box sx={{ padding: "1rem" }}>
                {/* FIRST ROW */}
                <FlexBetween gap="0.5rem" pb="1.1rem">
                    <FlexBetween gap="1rem" sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                maxHeight: "50vh",
                                overflowY: "scroll",
                                "&::-webkit-scrollbar": {
                                    width: "0.5rem",
                                },
                                "&::-webkit-scrollbar-track": {
                                    background: "transparent",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: main,
                                    borderRadius: "1rem",
                                },
                            }}
                        >
                            {listData.map((api) => (
                                <Box
                                    key={api.id}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    gap="0.5rem"
                                    sx={{
                                        width: "100%",
                                        borderBottom: `1px solid ${medium}`,
                                        py: "0.5rem",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold" sx={{ color: dark }}>
                                        {api.time}
                                    </Typography>
                                    <Avatar />
                                    <Typography variant="h6" fontWeight="bold" sx={{ color: dark }}>
                                        {api.user}
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap="0.5rem">
                                        <Typography variant="h6" sx={{ color: dark, fontWeight: "bold" }}>
                                            {api.endpoint}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: medium }}>
                                            {api.status}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: medium }}>
                                            {api.latency}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </FlexBetween>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default ApiListWidget;
