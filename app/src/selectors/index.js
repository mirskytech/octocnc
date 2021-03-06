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

const getSDFiles = state => state.files.sd;
const getLocalFiles = state => state.files.list || [];

function transformTree(files) {

    return files.map((item) => {
        if(item.type === "machinecode") {
            return {
                title: item.name,
                key: item.name + "_" + item.hash,
                size: item.size,
                date: item.date,
                resource: item.refs.resource,
                download: item.refs.download,
                type: item.type,
                isLeaf: true
            }
        } else if(item.type === "folder") {
            return {
                title: item.name,
                key: item.path,
                children: transformTree(item.children)
            }
        } else if(item.type === "model") {
            return {
                title: item.name,
                key: item.name + "_" + item.hash,
                isLeaf: true
            }
        } else {
            assert("file type not handled: " + item.type);
        }

    })

}

export const showLocalFileList = createSelector(
    getLocalFiles,
    (files) => {
        return transformTree(files);
    }
);




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
