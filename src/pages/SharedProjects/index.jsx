import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

import Page from 'Pages/Page';
import DisplayContainer from 'Components/Display/DisplayContainer';
import SharedProjectsStore from 'Store/SharedProjects';

const SharedProjects = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SharedProjectsStore.actions.sharedProjectsFetch());
    },[])

    const sharedProjectsList = useSelector(state => state.sharedProjects);

    return(
        <Page>
            <Segment>
                <Header as="h2"> Shared Projects</Header>
                {sharedProjectsList.sharedProjects.length >=1 && <DisplayContainer listOfItems={sharedProjectsList.sharedProjects} />}
            </Segment>
        </Page>
    )
}

export default SharedProjects;