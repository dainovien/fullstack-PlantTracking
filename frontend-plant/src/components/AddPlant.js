import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPlant = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  // Simulasi ambil userId dari localStorage atau auth token jika sudah ada sistem auth
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const savePlant = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/plants", {
        name,
        species,
        userId: parseInt(userId),
      });
      navigate("/plants");
    } catch (error) {
      console.error("Gagal menyimpan tanaman:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Tambah Tanaman Baru</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={savePlant}>
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
                  placeholder="Contoh: Orchidaceae"
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
                  placeholder="Masukkan ID user"
                  required
                />
              </div>
            </div>

            <div className="field mt-4">
              <button type="submit" className="button is-success is-fullwidth">
                Simpan Tanaman
              </button>
            </div>
            <div className="field">
              <button
                type="button"
                className="button is-light is-fullwidth"
                onClick={() => navigate("/plants")}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
