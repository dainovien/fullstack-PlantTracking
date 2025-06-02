import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Personal");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        title,
        body,
        category,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setTitle(response.data.title);
    setBody(response.data.body);
    setCategory(response.data.category);
  };

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Edit Catatan</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={updateUser}>
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
                  rows="5"
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
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="button is-light ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

