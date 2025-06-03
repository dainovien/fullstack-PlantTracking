import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils";

const PlantLogList = () => {
  const [plantLogs, setPlantLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlantLogs();
  }, []);

  const fetchPlantLogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/plantlogs`);
      setPlantLogs(response.data);
    } catch (error) {
      console.error("Gagal mengambil data log tanaman:", error);
    }
  };

  const deletePlantLog = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`${BASE_URL}/plantlogs/${id}`);
      fetchPlantLogs();
    } catch (error) {
      console.error("Gagal menghapus log tanaman:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <h1 className="title">Daftar Log Tanaman</h1>
        <button onClick={handleLogout} className="button is-danger is-small">
          Logout
        </button>
      </div>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Plant ID</th>
            <th>Catatan</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {plantLogs.length === 0 ? (
            <tr>
              <td colSpan="5" className="has-text-centered">
                Belum ada log tanaman.
              </td>
            </tr>
          ) : (
            plantLogs.map((log, index) => (
              <tr key={log.id}>
                <td>{index + 1}</td>
                <td>{log.plantId || "-"}</td>
                <td>{log.note || "-"}</td>
                <td>
                  {log.date ? new Date(log.date).toLocaleDateString() : "-"}
                </td>
                <td>
                  <button
                    onClick={() => deletePlantLog(log.id)}
                    className="button is-small is-danger"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlantLogList;
