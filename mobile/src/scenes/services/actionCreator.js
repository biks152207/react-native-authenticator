export const asyncActionNames = (baseName) => (
  {
    request: `${baseName}_REQUEST`,
    progress: `${baseName}_PROGRESS`,
    failure: `${baseName}_FAILURE`,
    success: `${baseName}_SUCCESS`,
    privileges:`${baseName}_SET_ADMIN_PRIVILEGES`,
    unauth:`${baseName}_UNAUTH`
  }
)

export const buildAsyncActions = (actionName) => ({
  request: () => ({
    type: actionName.request
  }),
  failure: (errors) => ({
    type: actionName.failure,
    errors
  }),
  progress: () =>({
    type: actionName.progress
  }),
  success: (payload) => ({
    type: actionName.success,
    payload
  }),
  admin_privileges: () =>({
    type: actionName.privileges
  }),
  unauth:() =>({
    type: actionName.unauth
  })
})
