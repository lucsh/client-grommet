import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { error: null, info: null };

  componentDidCatch(error, info) {
    // TODO: loggear el error a algún servicio
    this.setState({
      error,
      info,
    });
  }

  render() {
    const { error, info } = this.state;
    if (info) {
      // Error path
      return (
        <div>
          <h2>Ocurrio un error.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {info.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
