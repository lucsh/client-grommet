import React from 'react';
import config from '../config';
import Main from '../components/Main/Container';
import Second from '../components/Second/Container';
import Personas from '../components/Personas';
import NotFound from '../components/NotFound';
import { Route, Switch } from 'react-router-dom';

class PrivateRoutes extends React.Component {
  render() {
    const { routes } = config;
    return (
      <Switch>
        <Route path={routes.main} component={Main} />
        <Route path={routes.second} component={Second} />
        <Route path={routes.personas} component={Personas} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default PrivateRoutes;
