const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },

    role: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente'
    },

    name: { 
        type: String, 
        required: true 
    },

    birthdate: { 
        type: Date, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Email no válido'
        ]
    },

    password: { 
        type: String, 
        required: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            'La contraseña debe tener una mayúscula, una minúscula, un número y un símbolo'
        ],
        select: false 
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String

    
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model('User', userSchema);