import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Personal");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        title,
        body,
        category,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Tambah Catatan Baru</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={saveUser}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Body</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Body"
                  rows="5" // Menambah tinggi untuk body
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="study">Study</option>
                    <option value="ideas">Ideas</option>
                    <option value="travel">Travel</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="finance">Finance</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
