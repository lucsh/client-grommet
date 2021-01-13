import React from 'react';
import PropTypes from 'prop-types';
import { MFService } from '../medfusion';

export const AnnouncerContext = React.createContext();

class MedfusionProvider extends React.Component {
  constructor(props) {
    super(props);
    this.service = MFService({
      baseURL: props.baseURL,
      apiKey: props.apiKey,
      customerUuid: props.customerUuid,
      userUuid: props.userUuid,
      accessToken: props.accessToken,
    });
  }

  render() {
    return (
      <AnnouncerContext.Provider value={{ mfConnect: this.service }}>
        {this.props.children}
      </AnnouncerContext.Provider>
    );
  }
}

MedfusionProvider.propTypes = {
  baseURL: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  customerUuid: PropTypes.string.isRequired,
  userUuid: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
};

export default MedfusionProvider;
