export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'add_task':
      return [...state,
      {
        id: action.payload.id,
        ...action.payload.task
      }
      ]
    case 'update_task':
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload.task;
        } else {
          return task;
        }
      })
    case 'toggle_status':
      return state.map((task) =>
        task.id === action.payload.id
          ? {
            ...task,
            status: task.status === 'completed' ? 'pending' : 'completed',
          }
          : task
      )
    case 'delete_task':
      return state.filter((task) => task.id !== action.payload.id)
    default:
      return new Error(`No type matched with ${action.type}`)
  }
}