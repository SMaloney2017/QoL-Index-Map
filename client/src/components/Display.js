import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const style = {
    width: '100%',
    height: '100%'
  };

export class Display extends React.Component {

  render() {
    return (
      <>
        <Map google={this.props.google} zoom={10}>
            style={style}
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: (AIzaSyDXTz91zMUSd21UhHcVTrb1GPJbGMI4hko)
  })(Display)