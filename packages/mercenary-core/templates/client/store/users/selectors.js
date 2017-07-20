import { createSelector } from 'reselect';

export const getUsers = state => state.users;
export const getUserFilter = state => state.ui.userFilter;

export const getFilteredUsers = createSelector(
  [getUserFilter, getUsers],
  (userFilter, users) => {
    const filteredUsers = {};

    if (!userFilter) {
      return users;
    }

    const lowerFilter = userFilter.toLowerCase();

    Object.keys(users).forEach((userId) => {
      const { name, username, email } = users[userId];

      const lowerName = name.toLowerCase();
      const lowerUsername = username.toLowerCase();
      const lowerEmail = email.toLowerCase();

      const matchesName = lowerName.indexOf(lowerFilter) > -1;
      const matchesUsername = lowerUsername.toLowerCase().indexOf(lowerFilter) > -1;
      const matchesEmail = lowerEmail.indexOf(lowerFilter) > -1;

      if (matchesName || matchesUsername || matchesEmail) {
        filteredUsers[userId] = users[userId];
      }
    });

    return filteredUsers;
  },
);
