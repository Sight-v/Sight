import {
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
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
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",

        location: "",
        occupation: "",
        pictureUrl: "",
    });

    const [isEditingL1, setIsEditingL1] = useState(false);
    const [isEditingL2, setIsEditingL2] = useState(false);

    const handleEditL1 = () => {
        setIsEditingL1(true);
    };

    const handleEditL2 = () => {
        setIsEditingL2(true);
    };

    const handleSaveL1 = () => {
        setIsEditingL1(false);
        if (newUser.firstName !== user.firstName || newUser.lastName !== user.lastName || newUser.pictureUrl !== user.pictureUrl || newUser.about !== user.about) {
            updateUserCard();
        }
    };

    const handleSaveL2 = () => {
        setIsEditingL2(false);
        if (newUser.location !== user.location || newUser.occupation !== user.occupation) {
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

            location: data.location,
            occupation: data.occupation,
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

        location,
        occupation,
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
                                onClick={() => navigate(`/profile/${userId}`)}
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
            <Divider />

            {/* SECOND ROW */}
            <FlexBetween gap="1rem">
                {isEditingL2 ? (
                    <Box p="1rem 0">
                        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                            <TextField
                                label="Location"
                                variant="outlined"
                                size="small"
                                value={newUser.location}
                                onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                            />
                        </Box>
                        <Box display="flex" alignItems="center" gap="1rem">
                            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                            <TextField
                                label="Occupation"
                                variant="outlined"
                                size="small"
                                value={newUser.occupation}
                                onChange={(e) => setNewUser({ ...newUser, occupation: e.target.value })}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Box p="1rem 0">
                        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                            <Typography color={medium}>{location}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap="1rem">
                            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                            <Typography color={medium}>{occupation}</Typography>
                        </Box>
                    </Box>
                )}
                {isEditingL2 ? (
                    <IconButton
                        onClick={() => handleSaveL2()}
                        sx={{ color: main }}
                    >
                        <Typography color={main} fontWeight="500">
                            Save
                        </Typography>
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => handleEditL2()}
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
