import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

import Page from 'Pages/Page';
import Display from 'Components/Display/Display';
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
                {favoritesList.favorites.length >=1 && <Display listOfItems={favoritesList.favorites} />}
            </Segment>
        </Page>
    )
}

export default Favorites;