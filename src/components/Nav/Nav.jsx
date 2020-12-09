import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Container, Icon } from 'semantic-ui-react';
import routes from 'Pages/routes';
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";
import CategoriesStore from 'Store/Categories';

const CustomMenu = styled(Menu)`
    border: none !important;
    background-color: #0D2E4C !important;
    
    .item {
        color: white !important;
       
        &:first-child {
            border-left: 0px !important;
        }

        &::before {
            display: none;
        }    

        &.active {
            box-shadow: 0px -2px 0px 0px #089ec8 inset !important;
            background: #089ec8 !important;
            color: white !important;
        }
    }
    
`;

const StyledDiv = styled.div`
   display: flex;
   flex-driection: row;
`;


const Nav = () => {

    const dispatch = useDispatch();

    const categoriesList = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(CategoriesStore.actions.categoriesFetch());
    }, []);

    const matchProjects = useRouteMatch({
        path: "/",
        exact: true
    });

    const matchSharedProjects = useRouteMatch({
        path: "/shared-projects",
    })

    const matchFavorites = useRouteMatch({
        path: "/favorites"
    })

    const matchSettings = useRouteMatch({
        path: "/settings"
    })

    let matchRoutes = [];

    matchRoutes.push(matchProjects);
    matchRoutes.push(matchSharedProjects);
    matchRoutes.push(matchFavorites);

    let routesForNav = [];

    routesForNav.push(routes.PROJECTS);
    routesForNav.push(routes.SHARED_PROJECTS);
    routesForNav.push(routes.FAVORITES);

    const icons = ["folder", "external share", "star"]

    return(
        <React.Fragment>
            <CustomMenu fixed="top" stackable>
                <Container>
                    <Menu.Item>
                       Ellipsis Drive
                    </Menu.Item>

                    {categoriesList.categories.length >= 1 && categoriesList.categories.map((category,i) => {
                        return <Menu.Item 
                            key={category.id}
                            name={category.name}
                            as={Link}
                            to={routesForNav[i]}
                            active={!!matchRoutes[i]}
                        >
                           <StyledDiv> <Icon name={icons[i]} /> {category.name} </StyledDiv>
                        </Menu.Item>
                    })}
                    <Menu.Menu position="right"> 
                        <Menu.Item
                            name="SETTINGS"
                            as={Link}
                            to={routes.SETTINGS}
                            active={!!matchSettings}
                        >
                           <StyledDiv> <Icon name="settings" /> &nbsp; Settings </StyledDiv>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </CustomMenu>
        </React.Fragment>
    )
}

export default Nav;