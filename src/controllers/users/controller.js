const bcrypt = require('bcrypt');
const User = require('../../models/user');

// -------------------------------------
// Get users
// -------------------------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error getting users' });
  }
};

// -------------------------------------
// Validate user data
// -------------------------------------
const validateUserData = async (body) => {
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { valid: false, message: 'El usuario con este correo electrónico ya existe.' };
    }

    if (!name || !email || !password) {
        return { valid: false, message: 'Todos los campos son requeridos.' };
    }

    return { valid: true };
};

// -------------------------------------
// Create user
// -------------------------------------
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const validation = await validateUserData(req.body);
        if (!validation.valid) {
          return res.status(400).json({ message: validation.message });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });

    } catch (error) {
        console.error(error);

        if (error.code == 11000) {
          return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        res.status(500).json({ message: 'Error al crear el usuario.' });
    }
};

module.exports = { getUsers, createUser };

