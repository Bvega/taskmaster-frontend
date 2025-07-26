import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold my-4">TaskMaster</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
