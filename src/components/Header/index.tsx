import { Box, Button } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props {}

function Header({}: Props): ReactElement {
    const logout = () => {
        localStorage.removeItem('authorize');
    };

    return (
        <Box>
            logado
            <Button onClick={logout}>logout</Button>
        </Box>
    );
}

export default Header;
