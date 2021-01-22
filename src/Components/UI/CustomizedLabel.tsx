import React, { PureComponent } from 'react';

export class CustomizedLabel extends PureComponent<{ value: string }> {
  render(): React.ReactElement {
    return (
      <text
        x='-0'
        y='270'
        transform='rotate(-90, 50, 290)'
        fontSize='20px'
        style={{ fill: '#444444' }}
      >
        {this.props.value}
      </text>
    );
  }
}
