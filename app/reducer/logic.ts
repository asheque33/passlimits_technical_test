// // add
// setTasks([
//   ...tasks,
//   {
//     id: nextId(tasks),
//     ...data,
//   },
// ]);
// // update
// setTasks(
//   tasks.map((task) => {
//     if (task.id === data.id) {
//       return data;
//     } else {
//       return task;
//     }
//   })
// );
// // toggle status
// setTasks(
//   tasks.map((task) =>
//     task.id === taskId
//       ? {
//         ...task,
//         status: task.status === 'completed' ? 'pending' : 'completed',
//       }
//       : task
//   )
// );
// // ----delete
// setTasks(tasks.filter((task) => task.id !== taskId));
