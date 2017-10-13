import React, { Component } from 'react';
import { render } from 'react-dom';
import '../less/main.less';

export default class Hello extends Component {
  render() {
    return (
      <div>
        Hello from reacttttt
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));