// Task component receives props from the App component
function Task(props) {
  return (
    // Outer container for a single task
    // Applies the class 'mark-as-completed' if the task is completed
    // Also toggles completion when the entire task div is clicked
    <div
      className={`task ${props.completed ? 'mark-as-completed' : ''}`}
      onClick={() => props.completedTask(props.id)}
    >
      {/* This <span> displays the task's text */}
      {/* It's styled with a class to apply wrapping, font size, and optional strikethrough */}
      <span className="task-text">{props.text}</span>

      {/* Delete Button */}
      {/* When clicked, it deletes the task by calling deleteTask with its id */}
      {/* e.stopPropagation() prevents the click from triggering the parent div's onClick (mark as completed) */}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevents toggling completed state when clicking the button(edit & delete button)
          props.deleteTask(props.id); // Calls delete function from App, passing the current task's ID
        }}
      >
        Delete
      </button>

      {/* Edit Button */}
      {/* When clicked, it sets the app into 'edit mode' by setting:
          1. the editId (to know which task is being edited),
          2. the input value (to populate the form with the current task's text) */}
      {/* Again, stopPropagation prevents triggering the "mark-as-completed" action */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent accidental completion toggle
          props.setEditId(props.id); // Set the current task's ID as the one being edited
          props.setInput(props.text); // Load the current task text into the input field
        }}
      >
        Edit
      </button>
    </div>
  );
}

// Exporting the Task component to use it in App.jsx
export default Task;
