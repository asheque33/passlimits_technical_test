import TaskCard from './TaskCard';

const TaskList = ({
  tasks,
  onToggleStatus,
  onDeleteTask,
  onUpdateTask,
  onShowModal,
}) => {
  return (
    <div className='space-y-6'>
      {tasks.length === 0 ? (
        <div className='py-12 text-center'>
          <div className='text-gray-400 text-6xl mb-4'>📝</div>
          <h3 className='text-gray-900 font-medium text-xl mb-2'>
            No Task Found
          </h3>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onShowModal={onShowModal}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
