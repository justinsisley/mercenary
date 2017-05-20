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
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/segment.css';
import 'semantic-ui-css/components/message.css';
import 'semantic-ui-css/components/list.css';

import React from 'react';
import ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import App from './components/App';

// Global custom styles
import './index.css';

// Enable caching for offline experience
OfflinePluginRuntime.install();

ReactDOM.render(<App />, document.getElementById('root'));
