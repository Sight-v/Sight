import { Typography, useTheme, Button } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'
import Popup from 'reactjs-popup';

import { setTheme } from "../../state";

const SettingsSidebarWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const light = palette.neutral.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const dispatch = useDispatch();

  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const { setSolid, setGradient } = useColorPicker(color, setColor);

  const theme = useSelector((state) => state.theme);

  return (
    <WidgetWrapper>
      <FlexBetween mb={2}>
        <Typography variant="h6">Theme</Typography>
        <Popup trigger={<Button>Change Theme</Button>} modal nested>
          {close => (
            <div className="modal" style={{ backgroundColor: dark, color: light , padding: '2rem', borderRadius: '2rem'}}>
              <div className="header" style={{ paddingBottom: '1rem', alignContent: 'center', justifyContent: 'space-between', display: 'flex'}}>
              <Button
                className="button"
                style={{ backgroundColor: "#00D5FA", color: "black" }}
                onClick={() => {
                  dispatch(setTheme({ theme: 'linear-gradient( 180deg,  rgba(122,231,248,1) 6.5%, rgba(86,118,191,1) 90.9% );' }));
                  close();
                }}
              >
                Reset
              </Button>
              <Button className="close" style={{ backgroundColor: 'red', color: 'white' }} onClick={close}>
                &times;
              </Button>
              <Button
                className="button"
                style={{ backgroundColor: "#00D5FA", color: "black" }}
                onClick={() => {
                  dispatch(setTheme({ theme: color.toString() }));
                  close();
                }}
              >
                Save
              </Button>
              </div>
              <div className="content">
                {' '}
                <ColorPicker
                  width={300}
                  height={300}
                  value={color}
                  onChange={setColor}
                  onSolid={setSolid}
                  onGradient={setGradient}
                />
              </div>
            </div>
          )}
        </Popup>

      </FlexBetween>
    </WidgetWrapper>
  );

};

export default SettingsSidebarWidget;
