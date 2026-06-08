import UserService from '../services/UserService.js';

export const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserService.getUser(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserService.deleteUser(req.params.id);
    if (deleted) {
      res.json({ message: 'Usuario eliminado', usuario: deleted });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

