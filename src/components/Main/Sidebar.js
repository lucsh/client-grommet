import React, { PureComponent } from 'react';
import { UserSettings, Archive, Briefcase, DocumentUser } from 'grommet-icons';
import config from '../../config';
import SidebarWrapper from '../common/SidebarWrapper';
import Vocabulario from '../../vocabulario';

class Sidebar extends PureComponent {
  render() {
    const { routes } = config;
    return (
      <SidebarWrapper
        // startShrinked
        buttons={[
          {
            label: `${Vocabulario.get('CON SUBMENU')}`,
            a11yTitle: `${Vocabulario.get('DESCRIPCION CON SUBMENU')}`,
            icon: <Briefcase />,

            buttons: [
              {
                label: `${Vocabulario.get('SUBMENU UNO')}`,
                a11yTitle: `${Vocabulario.get('DESCRIPCION SUBMENU UNO')}`,
                icon: <UserSettings />,
                link: `${routes.main}/uno`,
              },
              {
                label: `${Vocabulario.get('SUBMENU DOS')}`,
                a11yTitle: `${Vocabulario.get('DESCRIPCION SUBMENU DOS')}`,
                icon: <Archive />,
                link: `${routes.main}/uno-dos`,
              },
            ],
          },
          {
            label: `${Vocabulario.get('CON SUBMENU DOS')}`,
            a11yTitle: `${Vocabulario.get('DESCRIPCION CON SUBMENU')}`,
            icon: <DocumentUser />,

            buttons: [
              {
                label: `${Vocabulario.get('SUBMENU UNO DOS')}`,
                a11yTitle: `${Vocabulario.get('DESCRIPCION SUBMENU UNO DOS')}`,
                icon: <UserSettings />,
                link: `${routes.main}/dos`,
              },
              {
                label: `${Vocabulario.get('SUBMENU DOS DOS')}`,
                a11yTitle: `${Vocabulario.get('DESCRIPCION SUBMENU DOS DOS')}`,
                icon: <Archive />,
                link: `${routes.main}/dos-dos`,
              },
            ],
          },

          {
            label: `${Vocabulario.get('OPCION TRES')}`,
            a11yTitle: `${Vocabulario.get('DESCRIPCION OPCION TRES')}`,
            icon: <Archive />,
            link: `${routes.main}/tres`,
          },
        ]}
      />
    );
  }
}

export default Sidebar;
