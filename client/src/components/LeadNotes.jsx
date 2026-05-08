import { useEffect, useState } from "react";
import API from "../services/api";

function LeadNotes({ leadId }) {
  const [notes, setNotes] = useState([]);

  const [content, setContent] =
    useState("");

  const [createdBy, setCreatedBy] =
    useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await API.get(
        `/notes/${leadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNote = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        `/notes/${leadId}`,
        {
          content,
          createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      setCreatedBy("");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Lead Notes</h3>

      <textarea
        placeholder="Add note..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          minHeight: "80px",
        }}
      />

      <input
        type="text"
        placeholder="Created By"
        value={createdBy}
        onChange={(e) =>
          setCreatedBy(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "10px",
        }}
      />

      <button
        onClick={handleAddNote}
        style={{
          marginTop: "10px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add Note
      </button>

      <div style={{ marginTop: "20px" }}>
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <p>{note.content}</p>

            <small>
              By {note.createdBy} •{" "}
              {new Date(
                note.createdAt
              ).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
export default LeadNotes;
