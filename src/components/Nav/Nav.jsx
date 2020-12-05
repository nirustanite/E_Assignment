import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesStore from 'Store/Categories';
import { Menu, Container } from 'semantic-ui-react';
import routes from 'Pages/routes';
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";

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

    const matchHome = useRouteMatch({
        path: "/",
        exact: true
    });

    const matchProjects = useRouteMatch({
        path: "/projects",
    });

    const matchSharedProjects = useRouteMatch({
        path: "/shared",
    })

    const matchFavorites = useRouteMatch({
        path: "/favorites"
    })

    let matchRoutes = [];

    matchRoutes.push(matchProjects);
    matchRoutes.push(matchSharedProjects);
    matchRoutes.push(matchFavorites);

    let routesForNav = [];

    routesForNav.push(routes.PROJECTS);
    routesForNav.push(routes.SHARED_PROJECTS);
    routesForNav.push(routes.FAVORITES);

    useEffect(() => {
        dispatch(CategoriesStore.actions.categoriesFetch());
    }, []);


    return(
        <React.Fragment>
            <CustomMenu fixed="top" borderless>
                <Container>
                    <Menu.Item
                        name="HOME"
                        as={Link}
                        to={routes.HOME}
                        active={!!matchHome}
                    >
                        Home
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
                </Container>
            </CustomMenu>
        </React.Fragment>
    )
}

export default Nav;