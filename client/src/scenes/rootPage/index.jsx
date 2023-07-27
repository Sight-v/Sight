import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navigation from "../../components/root/Navigation";
import Top from "../../components/root/Top";
import List from "../../components/root/List";
import Mid from "../../components/root/Mid";
import Carousel from "../../components/root/Carousel";

const RootPage = () => {
    const theme = useTheme();
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const dark = theme.palette.neutral.dark;
    const primaryLight = theme.palette.primary.light;
    // const background = theme.palette.background.default;

    const GradientBox = styled(Box)({
        // background: "rgb(238,174,202)",
        // background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"

        // background: "#A9C9FF",
        background: "radial-gradient( circle farthest-corner at 0.2% 0.5%,  rgba(68,36,164,1) 3.7%, rgba(84,212,228,1) 92.7% );"
    });


    return (
        <Box>
            {/* navigation */}
            <Navigation />
            {/* landing page conmten t */}
            <GradientBox >
                <Top />
                {/* list of items */}
                <List />
                {/* mid section */}
                <Mid />
                {/* carousel */}
                <Carousel />
            </GradientBox >
        </Box>
    );
};

export default RootPage;
