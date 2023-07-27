import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Paper, Typography } from '@mui/material';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div style={{ margin: "0 10%", padding: "2rem 0" }}>
            <Slider {...settings}>
                <div>
                    <Paper elevation={3} 
                        style={{ 
                            padding: "2rem",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            color: "white",
                            backgroundImage: "url(https://images.unsplash.com/photo-1629788959470-4b8b5b0b4b0a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}>
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                    </Paper>
                </div>
                <div>
                    <Paper elevation={3} style={{ 
                            padding: "2rem",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            color: "white",
                            backgroundImage: "url(https://images.unsplash.com/photo-1629788959470-4b8b5b0b4b0a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}>
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                    </Paper>
                </div>
                <div>
                    <Paper elevation={3} style={{ 
                            padding: "2rem",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            color: "white",
                            backgroundImage: "url(https://images.unsplash.com/photo-1629788959470-4b8b5b0b4b0a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}>
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                    </Paper>
                </div>
                <div>
                    <Paper elevation={3} style={{ 
                            padding: "2rem",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            color: "white",
                            backgroundImage: "url(https://images.unsplash.com/photo-1629788959470-4b8b5b0b4b0a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}>
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </Typography>
                    </Paper>
                </div>

            </Slider>
        </div>
    );
};

export default Carousel;