import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

import Page from 'Pages/Page';
import Display from 'Components/Display/Display';
import ProjectsStore from 'Store/Projects';

const Projects = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProjectsStore.actions.projectsFetch());
    },[])

    const projectsList = useSelector(state => state.projects);

    return(
        <Page>
            <Segment>
                <Header as="h2">Projects</Header>
                {projectsList.projects.length >=1 && <Display listOfItems={projectsList.projects} />}
            </Segment>
        </Page>
    )
}

export default Projects;