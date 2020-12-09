import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import Page from 'Pages/Page';
import DisplayContainer from 'Components/Display/DisplayContainer';
import DropDown from 'Components/Display/DropDown/DropDown';
import FavoritesStore from 'Store/Favorites';

const StyledHeader = styled(Header)`
    color: #0D2E4C,
    font-size: 2 rem;
    padding-bottom: 20px;
`;

const Favorites = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FavoritesStore.actions.favoritesFetch());
    },[])

    const favoritesList = useSelector(state => state.favorites);

    const [favorites, setFavorites ] = useState([]);

    const [filteredFavorites, setFilteredFavorites] = useState([]);

    useEffect(() => {
        setFavorites(favoritesList.favorites);
        setFilteredFavorites(favoritesList.favorites);
    },[favoritesList.favorites]);

    const handleChange = (e, data) => {
        setFilteredFavorites(favorites.filter(el => el.type === data.value));
        if(data.value === "All"){
            setFilteredFavorites(favorites);
        }
    }
    
    return(
        <Page>
            <Segment>
                <StyledHeader as="h2">Favorites</StyledHeader>
                <DropDown handleChange={handleChange} />
                {favoritesList.favorites.length >=1 && <DisplayContainer 
                    listOfItems={filteredFavorites} 
                />}
            </Segment>
        </Page>
    )
}

export default Favorites;