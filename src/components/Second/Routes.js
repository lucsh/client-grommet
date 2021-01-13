import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Content from './Content';

class Routes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={Content} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
