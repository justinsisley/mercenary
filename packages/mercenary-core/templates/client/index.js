// Vendor global styles
import 'semantic-ui-css/components/reset.css';
import 'semantic-ui-css/components/site.css';
import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/grid.css';
import 'semantic-ui-css/components/menu.css';
import 'semantic-ui-css/components/table.css';
import 'semantic-ui-css/components/checkbox.css';
import 'semantic-ui-css/components/image.css';
import 'semantic-ui-css/components/icon.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Custom global styles
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
