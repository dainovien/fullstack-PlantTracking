import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetailPlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchPlant();
    fetchLogs();
  }, []);

  const fetchPlant = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/plants/${id}`);
      setPlant(response.data);
    } catch (error) {
      console.error("Gagal mengambil data tanaman:", error);
    }
  };

    const fetchLogs = async () => {
    try {
        const response = await axios.get("http://localhost:5000/plant-logs", {
        params: { plantId: Number(id) },
        });
        setLogs(response.data);
    } catch (error) {
        console.error("Gagal mengambil data log tanaman:", error);
    }
    };

  const deleteLog = async (logId) => {
    if (!window.confirm("Yakin ingin menghapus log ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/plant-logs/${logId}`);
      fetchLogs(); // Refresh logs setelah hapus
    } catch (error) {
      console.error("Gagal menghapus log:", error);
    }
  };

  if (!plant) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="title">{plant.name}</h1>
      <p><strong>Spesies:</strong> {plant.species || "-"}</p>

      <h2 className="subtitle mt-5">Log Tanaman</h2>
      {logs.length === 0 ? (
        <p>Belum ada log untuk tanaman ini.</p>
      ) : (
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Aktivitas</th>
              <th>Jenis Log</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id}>
                <td>{index + 1}</td>
                <td>{log.activity || "-"}</td>
                <td>{log.log_type || "-"}</td>
                <td>{log.description || "-"}</td>
                <td>
                  <button
                    className="button is-warning is-small mr-2"
                    onClick={() => navigate(`/logs/edit/${log.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="button is-danger is-small"
                    onClick={() => deleteLog(log.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="buttons mt-4">
        <button
          className="button is-link"
          onClick={() => navigate(`/logs/add?plantId=${id}`)}
        >
          Tambah Log Baru
        </button>
        <button
          className="button is-light"
          onClick={() => navigate("/plants")}
        >
          Kembali ke Daftar Tanaman
        </button>
      </div>
    </div>
  );
};

export default DetailPlant;
