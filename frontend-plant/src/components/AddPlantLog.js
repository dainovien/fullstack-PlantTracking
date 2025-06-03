import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils";

const AddPlantLog = () => {
  const [plantId, setPlantId] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState("");
  const [logType, setLogType] = useState("");

  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/plants`);
      setPlants(response.data);
    } catch (error) {
      console.error("Gagal memuat daftar tanaman:", error);
    }
  };

  const savePlantLog = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/plant-logs`, {
        plantId: parseInt(plantId),
        activity: activity || null,
        description: description || null,
        log_type: logType || null,
      });
      navigate(`/plants/${plantId}`); // <-- arahkan ke halaman detail tanaman
    } catch (error) {
      console.error("Gagal menyimpan log tanaman:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Tambah Log Tanaman</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={savePlantLog}>
            <div className="field">
              <label className="label">Tanaman</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={plantId}
                    onChange={(e) => setPlantId(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Tanaman --</option>
                    {plants.map((plant) => (
                      <option key={plant.id} value={plant.id}>
                        {plant.name} ({plant.species || "Unknown"})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Aktivitas</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Contoh: Penyiraman, Pemupukan"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Jenis Log</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={logType}
                  onChange={(e) => setLogType(e.target.value)}
                  placeholder="Contoh: Perawatan, Observasi"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Catatan</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tulis catatan perawatan atau observasi"
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>

            <div className="field mt-4">
              <button type="submit" className="button is-success">
                Simpan
              </button>
              <button
                type="button"
                onClick={() => navigate(`/plants/${plantId}`)}
                className="button is-light ml-2"
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

export default AddPlantLog;
