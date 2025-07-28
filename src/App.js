\import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TasksList from './components/TaskList';

// Use environment variable in production, proxy in development
const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const getTasks = useCallback(() => {
    fetch(`${API_BASE}/api/tasks`)
      .then(res => res.json())
      .then(setTasks)
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const clickAddTask = event => {
    event.preventDefault();

    if (!newTaskTitle.trim()) {
      alert('Please enter a task title');
      return;
    }

    fetch(`${API_BASE}/api/tasks/add`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle }),
    }).then(() => {
      setNewTaskTitle('');
      getTasks();
    });
  };

  return (
    <div className="App">
      <h1>TaskMaster</h1>

      <TasksList tasks={tasks} updateTasks={getTasks} />

      <form onSubmit={clickAddTask}>
        <input
          type="text"
          size="30"
          placeholder="New Task"
          value={newTaskTitle}
          onChange={event => setNewTaskTitle(event.target.value)}
        />
        <input className="btn-primary" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default App;