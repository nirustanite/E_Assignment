import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Container, Icon } from 'semantic-ui-react';
import routes from 'Pages/routes';
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";
import CategoriesStore from 'Store/Categories';

const CustomMenu = styled(Menu)`
    .item {
        &:first-child {
            border-left: 0px !important;
        }

        &::before {
            display: none;
        }

        &.active {
            box-shadow: 0px -2px 0px 0px #089ec8 inset !important;
            background: #fff !important;
        }
    }
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
        path: "/shared",
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

    return(
        <React.Fragment>
            <CustomMenu fixed="top" borderless>
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
                            {category.name}
                        </Menu.Item>
                    })}
                    <Menu.Menu position="right"> 
                        <Menu.Item
                            name="SETTINGS"
                            as={Link}
                            to={routes.SETTINGS}
                            active={!!matchSettings}
                        >
                            <Icon name="settings" /> &nbsp; Settings
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </CustomMenu>
        </React.Fragment>
    )
}

export default Nav;