// https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#schema
import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');
export const userListSchema = new schema.Array(userSchema);

export const todoSchema = new schema.Entity('todos');
export const todoListSchema = new schema.Array(todoSchema);
