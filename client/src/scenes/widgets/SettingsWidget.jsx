import {
    EditOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton, TextField, useMediaQuery } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const SettingsWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        pictureUrl: "",
    });

    const [isEditingL1, setIsEditingL1] = useState(false);

    const handleEditL1 = () => {
        setIsEditingL1(true);
    };

    const handleSaveL1 = () => {
        setIsEditingL1(false);
        if (newUser.firstName !== user.firstName || newUser.lastName !== user.lastName || newUser.pictureUrl !== user.pictureUrl || newUser.about !== user.about) {
            updateUserCard();
        }
    };

    const updateUserCard = async () => {

        await fetch(`http://localhost:3001/users/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        getUser();
    };

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        console.log(data);
        setNewUser({
            firstName: data.firstName,
            lastName: data.lastName,
            pictureUrl: data.pictureUrl,
        });
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        pictureUrl,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem">
                    <UserImage image={pictureUrl} />
                    {isEditingL1 ? (
                        <Box>
                            {isNonMobileScreens ? (
                                <FlexBetween gap="1rem" mb="0.5rem">
                                    <TextField
                                        label="First Name"
                                        variant="outlined"
                                        size="small"
                                        value={newUser.firstName}
                                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                    />
                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        size="small"
                                        value={newUser.lastName}
                                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                    />
                                </FlexBetween>
                            ) : (
                                <Box>
                                    <FlexBetween gap="1rem" mb="0.5rem">
                                        <TextField
                                            label="First Name"
                                            variant="outlined"
                                            size="small"
                                            value={newUser.firstName}
                                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                        />
                                    </FlexBetween>
                                    <FlexBetween gap="1rem" mb="0.5rem">
                                        <TextField
                                            label="Last Name"
                                            variant="outlined"
                                            size="small"
                                            value={newUser.lastName}
                                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                        />
                                    </FlexBetween>
                                </Box>
                            )}
                            <FlexBetween gap="1rem">
                                <TextField
                                    label="User picture URL"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={newUser.pictureUrl}
                                    onChange={(e) => setNewUser({ ...newUser, pictureUrl: e.target.value })}
                                />
                            </FlexBetween>
                        </Box>
                    ) : (
                        <Box p="1rem 0">
                            <Typography
                                variant="h4"
                                color={dark}
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer",
                                    },
                                }}
                                onClick={() => navigate("/home")}
                            >
                                {firstName} {lastName}
                            </Typography>
                        </Box>
                    )}
                </FlexBetween>
                {isEditingL1 ? (
                    <IconButton
                        onClick={() => handleSaveL1()}
                        sx={{ color: main }}
                    >
                        <Typography color={main} fontWeight="500">
                            Save
                        </Typography>
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => handleEditL1()}
                        sx={{ color: main }}
                    >
                        <EditOutlined />
                    </IconButton>
                )}
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default SettingsWidget;
