import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from 'Util/ErrorBoundary';

const HomePage = lazy(() => import('./HomePage'));
const Projects = lazy(() => import('./Projects'));
const SharedProjects = lazy(() => import('./SharedProjects'));
const Favorites = lazy(() => import('./Favorites'));

const Pages = () => {
    return(
        <ErrorBoundary>
             <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path={routes.HOME} exact component={HomePage} />
                    <Route path={routes.PROJECTS} component={Projects} />
                    <Route path={routes.SHARED_PROJECTS} component={SharedProjects} />
                    <Route path={routes.FAVORITES} exact component={Favorites} />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    );
};

export default Pages;