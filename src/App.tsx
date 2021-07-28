import { Box, Button, Input, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Player from './components/Player';
import { getToken } from './services/auth';
import { playMedia } from './services/playTrack';
import { search } from './services/search';
import SpotifyPlayer from 'react-spotify-web-playback';

interface SpotifyTrack {
    items: [
        {
            name: string;
            external_urls: { spotify: string };
            href: string;
        }
    ];
}

interface CurrentPlay {
    item: any;
    isPlaying: boolean;
    progressMs: number;
}

// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial: any, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

const clientId = '544d76b390c54280b4d79e4ada79fac7';
const redirectUri = 'http://localhost:3000/callback';

var scopes =
    'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state';
export const authEndpoint = 'https://accounts.spotify.com/authorize';

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [track, setTrack] = useState('');
    const [token, setToken] = useState('');
    const [running, setRunning] = useState('');
    const [responses, setResponses] = useState<SpotifyTrack | null>(null);
    const [authorize, setAuthorize] = useState<any | null>(null);
    const [media, setMedia] = useState('');

    useEffect(() => {
        async function generateToken(): Promise<void> {
            const data = await getToken();

            setToken(data);
        }

        let _token = localStorage.getItem('authorize') ?? hash.access_token;
        if (_token) {
            // Set token
            setAuthorize(_token);
            setIsLogged(true);
            localStorage.setItem('authorize', _token);
        }
        console.log(authorize);

        generateToken();

        // console.log(scopes.join('%20'));
    }, []);

    const getTrack = async () => {
        const { tracks } = await search(track, token);

        setResponses(tracks);
        // setCurrentPlaying(tracks);
    };

    const playMusic = async () => {
        console.log(responses);
        playMedia(running, token).then((res) => console.log(res));
        // setMedia(music?.uri);
        // getCurrentlyPlaying(authorize);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            width="200px"
            margin="auto"
            padding="5"
        >
            {isLogged ? (
                <Header />
            ) : (
                <Link
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
                        scopes
                    )}&response_type=token&show_dialog=true`}
                    variant="solid"
                    textColor="white"
                    bgColor="green"
                >
                    Log In
                </Link>
            )}

            <Input
                type="text"
                value={track}
                onChange={({ target }) => setTrack(target.value)}
            />
            <Button onClick={getTrack}>click</Button>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box margin="20">
                    <SpotifyPlayer token={authorize} uris={running} />
                </Box>

                {responses?.items.length &&
                    responses?.items.map((item: any) => (
                        <Box
                            style={{
                                width: 350,
                                marginTop: 15,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Link
                                href={item.external_urls.spotify}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.name}
                            </Link>

                            <Button
                                variant="solid"
                                textColor="white"
                                bgColor="green"
                                style={{ marginLeft: 15 }}
                                onClick={() => {
                                    console.log(item.uri);
                                    setRunning(item.uri);
                                }}
                            >
                                play
                            </Button>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
}

export default App;
