import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/utils";

const EditPlant = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPlantById();
  }, []);

  const updatePlant = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/plants/${id}`, {
        name,
        species,
        userId: parseInt(userId),
      });
      navigate("/plants");
    } catch (error) {
      console.error("Gagal update tanaman:", error);
    }
  };

  const getPlantById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/plants/${id}`);
      setName(response.data.name);
      setSpecies(response.data.species || "");
      setUserId(response.data.userId.toString());
    } catch (error) {
      console.error("Gagal mengambil data tanaman:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Edit Tanaman</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={updatePlant}>
            <div className="field">
              <label className="label">Nama Tanaman</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Anggrek"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Spesies</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  placeholder="Contoh: Hias"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">User ID</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="ID user"
                  required
                />
              </div>
            </div>

            <div className="field mt-4">
              <button type="submit" className="button is-success">
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate("/plants")}
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

export default EditPlant;
