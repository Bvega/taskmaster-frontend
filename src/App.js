import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tasks`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>TaskMaster</h1>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
