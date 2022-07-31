const mongoose = require('mongoose')

const paisSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

// "trigger"
paisSchema.pre('save', async function (next) {
    const registro = this
    console.log('(trigger) Registro creado/modificado:', registro)

    next()
})

const Pais = mongoose.model('Pais', paisSchema)

module.exports = Pais