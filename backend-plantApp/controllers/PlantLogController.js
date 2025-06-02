import PlantLog from "../models/PlantLog.js";

// GET all plant logs
export const getPlantLogs = async (req, res) => {
  const { plantId } = req.query;
  try {
    let logs;
    if (plantId) {
      logs = await PlantLog.findAll({ where: { plantId } });
    } else {
      logs = await PlantLog.findAll();
    }
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil log" });
  }
};


// GET plant log by ID
export const getPlantLogById = async (req, res) => {
  try {
    const log = await PlantLog.findOne({
      where: { id: req.params.id }
    });
    if (!log) return res.status(404).json({ msg: "Log tanaman tidak ditemukan" });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// CREATE new plant log
export const createPlantLog = async (req, res) => {
  const { activity, description, log_type, plantId } = req.body;
  if (!activity || !log_type || !plantId) {
    return res.status(400).json({ msg: "activity, log_type, dan plantId wajib diisi" });
  }

  try {
    await PlantLog.create({
      activity,
      description,
      log_type,
      plantId,
    });
    res.status(201).json({ msg: "Log tanaman berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE plant log by ID
export const updatePlantLog = async (req, res) => {
  try {
    const log = await PlantLog.findOne({
      where: { id: req.params.id }
    });
    if (!log) return res.status(404).json({ msg: "Log tanaman tidak ditemukan" });

    const { activity, description, log_type, plantId } = req.body;

    await PlantLog.update(
      { activity, description, log_type, plantId },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ msg: "Log tanaman berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE plant log by ID
export const deletePlantLog = async (req, res) => {
  try {
    const log = await PlantLog.findOne({
      where: { id: req.params.id }
    });
    if (!log) return res.status(404).json({ msg: "Log tanaman tidak ditemukan" });

    await PlantLog.destroy({
      where: { id: req.params.id }
    });

    res.status(200).json({ msg: "Log tanaman berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
