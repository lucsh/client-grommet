import React from 'react';

import Wrapper from '../common/Wrapper';
import MainRoutes from './Routes';
import Sidebar from './Sidebar';

class Container extends React.PureComponent {
  render() {
    return <Wrapper sidebar={<Sidebar />} content={<MainRoutes />} />;
  }
}

export default Container;
