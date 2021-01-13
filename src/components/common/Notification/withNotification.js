import React from 'react';
import { Notification } from './Container';

/**
 * With Notification
 * HOC component, entrega las props requeridas en caso de que el child lo requiera, ex: setNotification
 * @param Component
 * @returns {function(*): *}
 */
function withNotification(Component) {
  return function contextComponent(props) {
    return (
      <Notification.Consumer>
        {({ setNotification }) => {
          return <Component {...props} setNotification={setNotification} />;
        }}
      </Notification.Consumer>
    );
  };
}

export default withNotification;
