// `asyncComponent` enables JavaScript bundle splitting by screen.
// This will cause webpack to output a core JS file with an additional file
// for each screen.
// NOTE: webpack needs to see the explicit imports for bundle splitting to work.
import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => import('./index'),
});
