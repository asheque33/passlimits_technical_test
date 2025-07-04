'use client';
import React, { useState } from 'react';
import Header from '../Header/Header';
import TaskList from './TaskList';
import { taskData } from '@/app/data/tasks';
import TaskModal from './TaskModal';
import TaskActions from './TaskActions';
import { nextId } from '@/app/utils/nextId';

const TaskBoard = () => {
  const [tasks, setTasks] = useState(taskData);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  //  Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  //  Task counts for filter buttons
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const handleAddEditTask = (data, isAdded) => {
    if (isAdded) {
      setTaskToUpdate(null);
      setTasks([
        ...tasks,
        {
          id: nextId(tasks),
          ...data,
        },
      ]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === data.id) {
            return data;
          } else {
            return task;
          }
        })
      );
    }
  };

  const handleCloseModalTask = () => {
    setTaskToUpdate(null);
    setShowModal(false);
  };

  const handleUpdateTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleToggleStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed',
            }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      {showModal && (
        <TaskModal
          onShowModal={setShowModal}
          onSaveTask={handleAddEditTask}
          onCloseTask={handleCloseModalTask}
          updatedTask={taskToUpdate}
        />
      )}
      <div className='max-w-4xl w-full mx-auto py-8 px-4'>
        <Header />
        <TaskActions
          onShowModal={() => {
            setShowModal(true);
            setTaskToUpdate(null);
          }}
          filter={filter}
          onFilter={setFilter}
          taskCounts={taskCounts}
        />
        <TaskList
          tasks={filteredTasks}
          onToggleStatus={handleToggleStatus}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default TaskBoard;
