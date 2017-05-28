// Global vendor styles
import 'semantic-ui-css/components/reset.css';
import 'semantic-ui-css/components/site.css';
import 'semantic-ui-css/components/grid.css';
import 'semantic-ui-css/components/segment.css';
import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/message.css';
import 'semantic-ui-css/components/menu.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Global custom styles
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
