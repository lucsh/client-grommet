import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Content from './Content';
import SecondaryContent from './SecondaryContent';

class Routes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/uno`} component={Content} />
        <Route
          exact
          path={`${this.props.match.url}/uno-dos`}
          component={SecondaryContent}
        />
      </Switch>
    );
  }
}

export default withRouter(Routes);
