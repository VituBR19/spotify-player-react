import { Box } from '@chakra-ui/react';
import React from 'react';
import './style.css';

const Player = (props: any) => {
    const backgroundStyles = {
        backgroundImage: `url(${props.item?.album.images[0].url})`,
    };

    const progressBarStyles = {
        width: (props.progressMs * 100) / props.item?.duration_ms + '%',
    };

    return (
        <Box className="App">
            <Box className="main-wrapper">
                <Box className="now-playing__img">
                    <img src={props.item?.album.images[0].url} />
                </Box>
                <Box className="now-playing__side">
                    <Box className="now-playing__name">{props.item?.name}</Box>
                    <Box className="now-playing__artist">
                        {props.item?.artists[0].name}
                    </Box>
                    <Box className="now-playing__status">
                        {props.isPlaying ? 'Playing' : 'Paused'}
                    </Box>
                    <Box className="progress">
                        <Box
                            className="progress__bar"
                            style={progressBarStyles}
                        />
                    </Box>
                </Box>
                <Box className="background" style={backgroundStyles} />{' '}
            </Box>
        </Box>
    );
};
export default Player;
