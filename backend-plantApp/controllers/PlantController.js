import Plant from "../models/Plant.js";

// GET all plants
export const getPlants = async (req, res) => {
  try {
    const plants = await Plant.findAll();
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET plant by ID
export const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      where: { id: req.params.id },
    });
    if (!plant) return res.status(404).json({ msg: "Plant tidak ditemukan" });
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// CREATE new plant
export const createPlant = async (req, res) => {
  const { name, species, userId } = req.body;
  if (!name || !userId)
    return res.status(400).json({ msg: "Name dan userId wajib diisi" });

  try {
    await Plant.create({
      name,
      species,
      userId,
    });
    res.status(201).json({ msg: "Tanaman berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE plant by ID
export const updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      where: { id: req.params.id },
    });
    if (!plant) return res.status(404).json({ msg: "Plant tidak ditemukan" });

    const { name, species, userId } = req.body;

    await Plant.update(
      { name, species, userId },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ msg: "Tanaman berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE plant by ID
export const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      where: { id: req.params.id },
    });
    if (!plant) return res.status(404).json({ msg: "Plant tidak ditemukan" });

    await Plant.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({ msg: "Tanaman berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
