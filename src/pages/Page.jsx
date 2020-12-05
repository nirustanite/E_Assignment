import React from "react";
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import Nav from 'Components/Nav/Nav';

const StyledContainer = styled(Container)`
    padding-top: 5em;
    padding-bottom: 5em;
`;

const Page = ({ children }) => {
    return (
        <React.Fragment>
            <Nav />
            <StyledContainer>{children}</StyledContainer>
        </React.Fragment>
    );
};

export default Page;