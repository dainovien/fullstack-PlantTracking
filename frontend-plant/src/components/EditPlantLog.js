import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPlantLog = () => {
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [logType, setLogType] = useState("");
  const [plantId, setPlantId] = useState("");
  const [plants, setPlants] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPlants();
    getLogById();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/plants");
      setPlants(response.data);
    } catch (error) {
      console.error("Gagal memuat daftar tanaman:", error);
    }
  };

  const getLogById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/plant-logs/${id}`);
      const log = response.data;
      setActivity(log.activity || "");
      setDescription(log.description || "");
      setLogType(log.log_type || "");
      setPlantId(log.plantId?.toString() || "");
    } catch (error) {
      console.error("Gagal mengambil data log:", error);
    }
  };

  const updateLog = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/plant-logs/${id}`, {
        activity,
        description,
        log_type: logType,
        plantId: parseInt(plantId),
      });
      navigate(`/plants/${plantId}`);
    } catch (error) {
      console.error("Gagal update log:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Edit Log Tanaman</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={updateLog}>

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
                  placeholder="Contoh: Penyiraman"
                  required
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
                  required
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
              <button type="submit" className="button is-success is-fullwidth">
                Simpan Perubahan
              </button>
            </div>
            <div className="field">
              <button
                type="button"
                className="button is-light is-fullwidth"
                onClick={() => navigate(`/plants/${plantId}`)}
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

export default EditPlantLog;
