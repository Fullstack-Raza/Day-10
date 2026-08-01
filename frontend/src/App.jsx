import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [note, setnote] = useState([]);

  function fetchnotes() {
    axios.get("http://localhost:3000").then((res) => {
      setnote(res.data.notes || []);
    });
  }

  useEffect(() => {
    fetchnotes();
  }, []);

  function handle(e) {
    e.preventDefault();
    const { title, msg, age } = e.target.elements;

    axios
      .post("http://localhost:3000", {
        title: title.value,
        msg: msg.value,
        age: age.value,
      })
      .then(() => {
        fetchnotes();
        e.target.reset(); // Submitting ke baad input clear
      });
  }

  function deletenote(id) {
    axios.delete("http://localhost:3000/" + id).then(() => {
      fetchnotes();
    });
  }

  function updatenote(e, id) {
    e.preventDefault();
    const { msg } = e.target.elements;

    axios
      .patch("http://localhost:3000/" + id, { msg: msg.value })
      .then(() => {
        fetchnotes();
        e.target.reset();
      });
  }

  return (
    <div className="notes-app">
      <header className="header">
        <h1>📌 Notes Dashboard</h1>
      </header>

      {/* Main Form for Adding Note */}
      <form className="note-form" onSubmit={handle}>
        <h2>Create New Note</h2>
        <div className="input-grid">
          <input
            type="text"
            placeholder="Note Title"
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Message / Content"
            name="msg"
            required
          />
          <input
            type="number"
            placeholder="Age / Category"
            name="age"
            required
          />
        </div>
        <button type="submit" className="btn btn-add">
          + Add Note
        </button>
      </form>

      {/* Grid of Notes */}
      <div className="notes">
        {note.map((notes) => (
          <div className="note-card" key={notes._id}>
            <div className="note-content">
              <div className="note-top">
                <h3>{notes.title}</h3>
                <span className="age-badge">Age: {notes.age}</span>
              </div>
              <p className="note-msg">{notes.msg}</p>
            </div>

            <div className="note-footer">
              {/* Inline Update Form */}
              <form
                className="update-form"
                onSubmit={(e) => updatenote(e, notes._id)}
              >
                <input
                  type="text"
                  placeholder="Edit message..."
                  name="msg"
                  required
                />
                <button type="submit" className="btn btn-update">
                  Update
                </button>
              </form>

              {/* Delete Button */}
              <button
                className="btn btn-delete"
                onClick={() => deletenote(notes._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;