import React, { useState, useEffect } from "react";
import "../../styles/Settings/Light.css";
import "../../styles/Settings/Font.css";
import "../../styles/Settings/Contrast.css";
//import "../../styles/Settings/Pog.css";
import "../../styles/Settings/Large.css";
import "../../styles/Settings/Accessibility.css";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from "@mui/material/Switch";

//const POG_KEY = "isPog"
const LIGHT_MODE_KEY = "isLightMode";
const CONTRAST_KEY = "isContrast";
const FONT_KEY = "isFont";
const LARGE_KEY = "isLarge"

export default function Accessibility() {
    const PinkSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: pink[600],
            '&:hover': {
                backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: pink[600],
        },
    }));

    const [isLightMode, setIsLightMode] = useState(() => {
        const stored = localStorage.getItem(LIGHT_MODE_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });
    const [isContrast, setContrast] = useState(() => {
        const stored = localStorage.getItem(CONTRAST_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });
    const [isFont, setFont] = useState(() => {
        const stored = localStorage.getItem(FONT_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });

    /*const [isPog, setPog] = useState(() => {
        const stored = localStorage.getItem(POG_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });*/

    const [isLarge, setLarge] = useState(() => {
        const stored = localStorage.getItem(LARGE_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });

    const toggleMode = () => {
        setIsLightMode(!isLightMode);
        setContrast(false);
    };

    const toggle = () => {
        setContrast(!isContrast);
        setIsLightMode(false);
    };

    const toggleFont = () => {
        setFont(!isFont);
    };

    /*const togglePog = () => {
        setPog(!isPog);
    }*/

    const toggleLarge = () => {
        setLarge(!isLarge);
    }


    useEffect(() => {
        localStorage.setItem(LIGHT_MODE_KEY, JSON.stringify(isLightMode));
        document.body.classList.toggle("light-mode", isLightMode);
    }, [isLightMode]);

    useEffect(() => {
        localStorage.setItem(FONT_KEY, JSON.stringify(isFont));
        document.body.classList.toggle("font", isFont);
    }, [isFont]);

    useEffect(() => {
        localStorage.setItem(CONTRAST_KEY, JSON.stringify(isContrast));
        document.body.classList.toggle("contrast", isContrast);
    }, [isContrast]);

    /*useEffect(() => {
        localStorage.setItem(POG_KEY, JSON.stringify(isPog));
        document.body.classList.toggle("pog", isPog);
    }, [isPog]);*/

    useEffect(() => {
        localStorage.setItem(LARGE_KEY, JSON.stringify(isLarge));
        document.body.classList.toggle("large", isLarge);
    }, [isLarge]);

    return (
        <div className="accessibility-container" style={{}}>
            <div className="accessibility-header">Accessibility Settings</div>
            <div className="accessibility-text">
                Light Mode
                <PinkSwitch
                    checked={isLightMode}
                    onChange={toggleMode}
                />
                <br></br>
                Font Switch
                <Switch
                    checked={isFont}
                    onChange={toggleFont}
                    color="primary"
                />
                <br></br>
                High Contrast Mode
                <Switch
                    checked={isContrast}
                    onChange={toggle}
                    color="warning"
                />

                <br></br>
                {/*Pog will be removed soon
                <Switch
                    checked={isPog}
                    onChange={togglePog}
                    color="secondary"
                />

                <br></br>*/}
                Larger Font
                <Switch
                    checked={isLarge}
                    onChange={toggleLarge}
                    color="secondary"
                />
            </div>
        </div>
    );
}
