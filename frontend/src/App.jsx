import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [note, setnote] = useState([]);

  function updatenote(e, id) {
    e.preventDefault();
    const { msg } = e.target.elements;

    axios
      .patch("http://localhost:3000/" + id, { msg: msg.value })
      .then((res) => {
        fetchnotes();
      });
  }
  function deletenote(e) {
    axios.delete("http://localhost:3000/" + e).then(() => {
      fetchnotes();
    });
  }
  function handle(e) {
    e.preventDefault();

    const { title, msg, age } = e.target.elements;

    axios
      .post("http://localhost:3000", {
        title: title.value,
        msg: msg.value,
        age: age.value,
      })
      .then((res) => {
        fetchnotes();
      });
  }
  function fetchnotes() {
    axios.get("http://localhost:3000").then((res) => {
      setnote(res.data.notes);
    });
  }

  useEffect(() => {
    fetchnotes();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          handle(e);
        }}
      >
        <input type="text" placeholder="Title" name="title" />
        <input type="text" placeholder="msg" name="msg" />
        <input type="number" name="age" />
        <button type="submit">submit</button>
      </form>
      <div className="notes">
        {note.map((notes) => {
          return (
            <div className="note">
              <h1>{notes.title}</h1>
              <p>{notes.msg}</p>
              <p>{notes.age}</p>
              <button
                onClick={(e) => {
                  deletenote(notes._id);
                }}
              >
                Delete
              </button>

              <form
                onSubmit={(e) => {
                  updatenote(e, notes._id);
                }}
              >
                <input type="text" placeholder="for edite msg" name="msg" />
                <button>update</button>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
