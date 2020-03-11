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

const getSDFiles = (state, props) => state.files.sd;
const getLocalFiles = (state, props) => state.files.local;

// tree = []
//
// for item in treedata:
//     if item.type is machinecode:
//          tree.append({title, key, isLeaf})
//     else if itme.type is folder:
//         tree.append({
//             title, key, children: recurse(item.children)
//         })

function transformTree(files) {

    return files.map((item) => {
        if(item.type === "machinecode") {
            return {
                title: item.name,
                key: item.hash,
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
                key: item.hash,
                isLeaf: true
            }
        } else {
            assert("file type not handled: " + item.type);
        }

    })

}




// export const showFileList = () => {
//     return createSelector(
//       [files]
//     )
// }



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
