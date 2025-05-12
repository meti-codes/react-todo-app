// React hooks for state and side effects
import { useEffect, useState } from 'react';

// Reusable header component
import Header from './Components/Header';

// Reusable task component for each task item
import Task from './components/Task.jsx';

function App() {
  // Load tasks from localStorage on initial render
  // useState receives a function (lazy initializer) that checks for saved tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks'); // Try to get saved task list
    return saved ? JSON.parse(saved) : []; // If found, parse JSON string to array; otherwise start with empty list
  });

  // Holds the ID of the task currently being edited (null if no editing)
  const [editId, setEditId] = useState(null);

  // Holds the value of the input field (used for both adding and editing)
  const [input, setInput] = useState('');

  // useEffect watches for changes in 'tasks'
  // Whenever tasks change, update localStorage with the new array
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Delete a task by filtering it out using its ID
  const deleteTask = (idToDelete) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  };

  // Toggle the completed state of a task
  const completedTask = (idToComplete) => {
    setTasks(
      tasks.map((task) =>
        task.id === idToComplete
          ? { ...task, completed: !task.completed } // Flip the 'completed' value
          : task
      )
    );
  };

  // Update a task's text and exit edit mode
  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
    setEditId(null); // Reset edit mode
  };

  return (
    <div className="app">
      {/* Renders the page header */}
      <Header />

      {/* Input form for adding or editing tasks */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page refresh

          // If not editing, add a new task
          if (editId === null) {
            setTasks([
              ...tasks,
              {
                id: Date.now(), // Unique ID based on timestamp
                text: input, // Task content from input
                completed: false, // New tasks are not completed by default
              },
            ]);
          } else {
            // If editing, update the existing task
            setTasks(
              tasks.map((task) =>
                task.id === editId ? { ...task, text: input } : task
              )
            );
            setEditId(null); // Exit edit mode
          }

          setInput(''); // Clear input field
        }}
      >
        {/* Controlled input field */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state on every keystroke
        />
      </form>

      {/* Render all tasks using the Task component */}
      {tasks.map((task) => (
        <Task
          key={task.id} // Required by React to optimize list rendering
          id={task.id} // Unique task ID
          text={task.text} // Task text to display
          completed={task.completed} // Completion status
          isEditing={editId === task.id} // Check if this task is being edited
          setEditId={setEditId} // Function to enter edit mode
          setInput={setInput} // Function to set input text for editing
          updateTask={updateTask} // Function to update task content
          deleteTask={deleteTask} // Function to delete task
          completedTask={completedTask} // Function to toggle completion
        />
      ))}
    </div>
  );
}

export default App;
