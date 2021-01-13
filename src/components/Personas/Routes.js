import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Container from './Container';

class Routes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={Container} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
