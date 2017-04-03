import { denormalize } from 'normalizr';
import * as schema from '../schema';

export const getUsers = (state) => {
  const user = denormalize(state.users, schema.user, state.entities);

  return user;
};
