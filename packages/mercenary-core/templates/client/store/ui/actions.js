import { createAction } from 'redux-actions';

export const showPublicStickyNav = createAction('set ui.publicStickyNav.show');
export const hidePublicStickyNav = createAction('set ui.publicStickyNav.hide');
