export const search = async (query: string, token: string) => {
    console.log(token);
    const result = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await result.json();

    console.log(data);
    return data;
};
