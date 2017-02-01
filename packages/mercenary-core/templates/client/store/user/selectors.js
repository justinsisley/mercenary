import { denormalize } from 'normalizr';
import * as schema from '../schema';

export const getUser = (state) => {
  const user = denormalize(state.user, schema.user, state.entities);

  return user;
};
