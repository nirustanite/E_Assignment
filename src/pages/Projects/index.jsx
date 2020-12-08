import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import Page from 'Pages/Page';
import DisplayContainer from 'Components/Display/DisplayContainer';
import DropDown from 'Components/Display/DropDown/DropDown';
import ProjectsStore from 'Store/Projects';

const StyledHeader = styled(Header)`
    color: #0D2E4C,
    font-size: 2 rem;
    padding-bottom: 20px;
`;

const Projects = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProjectsStore.actions.projectsFetch());
    },[]);

    const projectsList = useSelector(state => state.projects);

    const [projects, setProjects ] = useState([]);

    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
       setProjects(projectsList.projects);
       setFilteredProjects(projectsList.projects);
    },[projectsList.projects]);

    const handleChange = (e, data) => {
        setFilteredProjects(projects.filter(el => el.type === data.value));
        if(data.value === "All"){
            setFilteredProjects(projects);
        };
    };

    return(
        <Page>
            <Segment style={{
                paddingTop: "20px"
            }}>
                <StyledHeader as="h2">Projects</StyledHeader>
                <DropDown handleChange={handleChange} />
                {projectsList.projects.length >=1 && <DisplayContainer 
                    listOfItems={filteredProjects} 
                />}
            </Segment>
        </Page>
    )
}

export default Projects;