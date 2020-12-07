import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

import Page from 'Pages/Page';
import DisplayContainer from 'Components/Display/DisplayContainer';
import ProjectsStore from 'Store/Projects';

const Projects = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProjectsStore.actions.projectsFetch());
    },[])

    const projectsList = useSelector(state => state.projects);

    return(
        <Page>
            <Segment style={{
                paddingTop: "20px"
            }}>
                <Header as="h2">Projects</Header>
                {projectsList.projects.length >=1 && <DisplayContainer listOfItems={projectsList.projects} showfavorite={true} />}
            </Segment>
        </Page>
    )
}

export default Projects;