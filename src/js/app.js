import React, { Component } from 'react';
import { render } from 'react-dom';
import '../less/main.less';

import CurrentLoans from './components/CurrentLoans';

render(<CurrentLoans />, document.getElementById('app'));