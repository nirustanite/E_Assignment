import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

import Page from 'Pages/Page';
import DisplayContainer from 'Components/Display/DisplayContainer';
import FavoritesStore from 'Store/Favorites';

const Favorites = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FavoritesStore.actions.favoritesFetch());
    },[])

    const favoritesList = useSelector(state => state.favorites);

    console.log(favoritesList);
    
    return(
        <Page>
            <Segment>
                <Header as="h2">Favorites</Header>
                {favoritesList.favorites.length >=1 && <DisplayContainer listOfItems={favoritesList.favorites} />}
            </Segment>
        </Page>
    )
}

export default Favorites;