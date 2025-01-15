const bcrypt = require('bcrypt');
const User = require('../../../models/user');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        // --------------------------------------------
        // Verificar si el usuario existe
        // --------------------------------------------
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // --------------------------------------------
        // Comparar la contraseña ingresada con la almacenada
        // --------------------------------------------
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Intento de logueo: ${user}`);
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // --------------------------------------------
        // Login exitoso
        // --------------------------------------------
        console.log(`logueo exitoso: ${user}`);
        res.json({ message: 'Login exitoso', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { login };

