import React from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const TaskList = ({ tasks, updateTasks }) => {
  const clickDeleteTask = (event, task) => {
    event.preventDefault();

    fetch(`${API_BASE}/api/tasks/delete/${task._id}`, {
      method: 'delete',
    })
      .then(res => res.json())
      .then(() => updateTasks())
      .catch(err => console.error('Error deleting task:', err));
  };

  const toggleDone = task => {
    fetch(`${API_BASE}/api/tasks/update/${task._id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done }),
    })
      .then(() => updateTasks())
      .catch(err => console.error('Error updating task:', err));
  };

  return (
    <ul className="tasks">
      {tasks.map(task => (
        <li key={task._id}>
          <label className={task.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.done || false}
              onChange={() => toggleDone(task)}
            />{' '}
            {task.title}
            <svg
              onClick={event => clickDeleteTask(event, task)}
              className="delete-button"
              width="16"
              height="16"
              viewBox="0 0 12 16"
            >
              <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
            </svg>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;