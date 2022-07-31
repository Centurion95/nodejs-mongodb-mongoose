const mongoose = require('mongoose')

const estadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    id_pais: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Pais' //como una FK
    }
}, {
    timestamps: true
})

// "trigger"
estadoSchema.pre('save', async function (next) {
    const registro = this
    console.log('(trigger) Registro creado/modificado:', registro)

    next()
})

const Estado = mongoose.model('Estado', estadoSchema)

module.exports = Estado