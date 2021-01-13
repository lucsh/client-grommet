import React from 'react';
import { Home, Notes, Group } from 'grommet-icons';
import NavButton from './common/nav/NavButton';

import config from '../config';
import Vocabulario from '../vocabulario';

const { routes } = config;

const NavLinks = () => (
  <React.Fragment>
    <NavButton
      to={`${routes.main}/uno`}
      label={Vocabulario.get('INICIO')}
      a11yTitle={Vocabulario.get('DESCRIPCION INICIO')}
      icon={<Home size="small" />}
    />
    <NavButton
      to={routes.second}
      label={Vocabulario.get('OTRO VINCULO')}
      a11yTitle={Vocabulario.get('DESCRIPCION OTRO VINCULO')}
      icon={<Notes size="small" />}
    />
    <NavButton
      to={routes.personas}
      label={Vocabulario.get('CRUD PERSONAS')}
      a11yTitle={Vocabulario.get('MUESTRA CRUD PERSONAS')}
      icon={<Group size="small" />}
    />
  </React.Fragment>
);

export default NavLinks;
