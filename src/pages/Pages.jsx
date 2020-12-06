import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from 'Util/ErrorBoundary';

const Projects = lazy(() => import('./Projects'));
const SharedProjects = lazy(() => import('./SharedProjects'));
const Favorites = lazy(() => import('./Favorites'));
const Settings = lazy(() =>  import('./Settings'));

const Pages = () => {
    return(
        <ErrorBoundary>
             <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path={routes.PROJECTS} exact component={Projects} />
                    <Route path={routes.SHARED_PROJECTS} component={SharedProjects} />
                    <Route path={routes.FAVORITES} component={Favorites} />
                    <Route path={routes.SETTINGS} component={Settings} />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    );
};

export default Pages;