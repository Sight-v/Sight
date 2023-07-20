import { Box, useTheme, IconButton, Typography, TextField } from "@mui/material";
import {
    AddOutlined,
    CancelOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBounties } from "../../state";

const CreateBountyPop = ({ close }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const main = theme.palette.neutral.main;

    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const [bounty, setBounty] = useState({
        user: user._id,
        title: "",
        description: "",
        due: "",
    });

    const { _id } = useSelector((state) => state.user);

    const handleBounty = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("title", bounty.title);
        formData.append("description", bounty.description);
        formData.append("due", bounty.due);

        const resp = await fetch("http://localhost:3001/bounty", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        const bounties = await resp.json();

        dispatch(setBounties({ bounties }));
        setBounty({
            user: user._id,
            title: "",
            description: "",
            due: "",
        });
        close();
    };

    return (
        <Box
            className="content"
            backgroundColor={theme.palette.neutral.light}
            sx={{
                width: "30vw",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                borderRadius: "9px",
                height: "40vh",
            }}
        >
            <FlexBetween gap="1rem" alignItems="center">
                <Box p="1rem" flexGrow={1}>
                    <Typography variant="h6" fontWeight="bold" mb="1rem" sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        Create Bounty
                    </Typography>
                    <Box display="flex" flexDirection="column" gap="1rem">
                        <TextField
                            label="Bounty Title"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={bounty.title}
                            onChange={(e) => setBounty({ ...bounty, title: e.target.value })}
                        />
                        <TextField
                            label="Bounty Description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                            value={bounty.description}
                            onChange={(e) =>
                                setBounty({ ...bounty, description: e.target.value })
                            }
                        />
                        <TextField
                            type="date"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={bounty.due}
                            onChange={(e) => setBounty({ ...bounty, due: e.target.value })}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" mt="1rem" gap="1rem">
                        <IconButton onClick={handleBounty} color="primary" variant="contained" sx={{
                            borderRadius: "9px",
                        }}>
                            <AddOutlined />
                            <Typography variant="button" ml={0.5}>Add</Typography>
                        </IconButton>
                        <IconButton onClick={close} color="primary" variant="contained" sx={{
                            borderRadius: "9px",
                        }}>
                            <CancelOutlined />
                            <Typography variant="button" ml={0.5}>Cancel</Typography>
                        </IconButton>
                    </Box>

                </Box>
            </FlexBetween>
        </Box>
    );
};

export default CreateBountyPop;