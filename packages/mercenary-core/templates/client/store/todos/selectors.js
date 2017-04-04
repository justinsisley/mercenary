import { denormalize } from 'normalizr';
import * as schema from '../schema';

export const getTodos = (state) => {
  const todo = denormalize(state.todos, schema.todo, state.entities);

  return todo;
};
