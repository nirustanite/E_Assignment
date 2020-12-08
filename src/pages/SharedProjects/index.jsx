import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import Page from 'Pages/Page';
import routes from 'Pages/routes';
import DisplayContainer from 'Components/Display/DisplayContainer';
import DropDown from 'Components/Display/DropDown/DropDown';
import SharedProjectsStore from 'Store/SharedProjects';

const StyledHeader = styled(Header)`
    color: #0D2E4C,
    font-size: 2 rem;
    padding-bottom: 20px;
`;

const SharedProjects = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SharedProjectsStore.actions.sharedProjectsFetch());
    },[]);

    const sharedProjectsList = useSelector(state => state.sharedProjects);

    const [sharedProjects, setSharedProjects ] = useState([]);

    const [filteredSharedProjects, setFilteredSharedProjects] = useState([]);

    useEffect(() => {
       setSharedProjects(sharedProjectsList.sharedProjects);
       setFilteredSharedProjects(sharedProjectsList.sharedProjects);
    },[sharedProjectsList.sharedProjects]);

    const handleChange = (e, data) => {
        setFilteredSharedProjects(sharedProjects.filter(el => el.type === data.value));
        if(data.value === "All"){
            setFilteredSharedProjects(sharedProjects);
        }
    }

    return(
        <Page>
            <Segment>
                <StyledHeader as="h2"> Shared Projects</StyledHeader>
                <DropDown handleChange={handleChange} />
                {sharedProjectsList.sharedProjects.length >=1 && <DisplayContainer 
                   listOfItems={filteredSharedProjects} 
                />}
            </Segment>
        </Page>
    )
}

export default SharedProjects;