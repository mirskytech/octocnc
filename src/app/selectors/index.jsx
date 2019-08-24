import {createSelector} from 'reselect'

const getUserManagementStatus = (state, props) => state.config.user_management;
const getAuthenticated = (state, props) => state.auth.authenticated;

export const shouldHandleLogin = () => {
    return createSelector(
      [getUserManagementStatus, getAuthenticated],
      (user_management, authenticated) => {
          return user_management && !authenticated;
      });
};

// const getCommandHistory = (state, props) => state.commands.history;
//
// export const determineCommandHistory = () = {
//     return createSelector(
//       [getCommandHistory],
//       (history) => {
//           return history;
//       }
//     )
// };
