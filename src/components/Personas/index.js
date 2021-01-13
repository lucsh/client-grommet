import React from 'react';

import Wrapper from '../common/Wrapper';
import MainRoutes from './Routes';

class Index extends React.PureComponent {
  render() {
    return <Wrapper content={<MainRoutes />} />;
  }
}

export default Index;
