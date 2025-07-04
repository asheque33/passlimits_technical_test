export const nextId = (tasks) => {
  const maxId = tasks.reduce((prevTask, currentTask) => prevTask.id > currentTask.id ? prevTask.id : currentTask.id)

  return Number(maxId) + 1;
}