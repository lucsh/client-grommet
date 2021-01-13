import React from 'react';

import Wrapper from '../common/Wrapper';
import Routes from './Routes';

class Container extends React.Component {
  render() {
    return <Wrapper content={<Routes />} />;
  }
}

export default Container;
