import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils";

const PlantList = () => {
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
      console.error("Gagal mengambil data tanaman:", error);
    }
  };

  const deletePlant = async (id) => {
    if (!id) return;
    if (!window.confirm("Yakin ingin menghapus tanaman ini?")) return;

    try {
      await axios.delete(`${BASE_URL}/plants/${id}`);
      fetchPlants(); // refresh list
    } catch (error) {
      console.error("Gagal menghapus tanaman:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <h1 className="title">Daftar Tanaman</h1>
        <button onClick={handleLogout} className="button is-danger is-small">
          Logout
        </button>
      </div>

      <Link to="/plants/add" className="button is-success mb-3">
        Tambah Tanaman Baru
      </Link>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Spesies</th>
            <th>ID User</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {plants.length === 0 ? (
            <tr>
              <td colSpan="5" className="has-text-centered">
                Belum ada data tanaman.
              </td>
            </tr>
          ) : (
            plants.map((plant, index) => (
              <tr key={plant.id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/plants/${plant.id}`} className="has-text-link">
                    {plant.name || "-"}
                  </Link>
                </td>
                <td>{plant.species || "-"}</td>
                <td>{plant.userId || "-"}</td>
                <td>
                  <Link
                    to={`/plants/edit/${plant.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePlant(plant.id)}
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

export default PlantList;
