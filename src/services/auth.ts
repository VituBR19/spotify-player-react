const clientID = '544d76b390c54280b4d79e4ada79fac7';
const clientSecret = '636afe23970842afaca58ec727feb6ae';

export const getToken = async (): Promise<string> => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
        },
        body: 'grant_type=client_credentials',
    });

    const { access_token } = await result.json();

    console.log(access_token);
    return access_token as string;
};
