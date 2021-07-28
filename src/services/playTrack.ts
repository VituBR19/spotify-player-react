export const playMedia = async (href: string, token: string) => {
    const result = await fetch(href, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    console.log('track', result);
    const data = await result.json();
};
