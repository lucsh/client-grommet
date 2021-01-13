import React, { Component, Fragment } from 'react';
import NotificationLayer from './Layer';

export const Notification = React.createContext();

class NotificationContainer extends Component {
  state = {
    display: false,
    message: '',
  };

  unsetNotification = () => this.setState({ display: false, message: '' });

  setNotification = message => {
    this.setState({ display: !!message, message });
    setTimeout(this.unsetNotification, 2000);
  };

  render() {
    const { children } = this.props;
    const { display, message } = this.state;
    return (
      <Fragment>
        <Notification.Provider
          value={{ setNotification: this.setNotification }}
        >
          {children}
          {display && (
            <NotificationLayer
              message={message}
              onClose={() => this.unsetNotification}
            />
          )}
        </Notification.Provider>
      </Fragment>
    );
  }
}

export default NotificationContainer;
