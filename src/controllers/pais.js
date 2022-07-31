const Pais = require('../models/pais')

const getPaises = async () => {
    try {
        const registros = await Pais.find({})
        return registros
    } catch (error) {
        console.error(error)
    }
}

const getPaisById = async ({ _id }) => {
    try {
        const registro = await Pais.findOne({ _id })
        if (!registro) {
            return { error: 'Registro no encontrado!' }
        }
        return registro
    } catch (error) {
        console.error(error)
    }
}

const insertPais = async ({ nombre }) => {
    const registro = new Pais({
        nombre
    })
    try {
        await registro.save()
        return registro
    } catch (error) {
        console.error(error)
    }

}

const udpatePaisById = async (_id, datosParaModificar) => {
    //primero validamos que los campos que quiera actualizar sean validos..
    const updates = Object.keys(datosParaModificar)

    const allowedUpdates = ['nombre']

    // si fueran mas columnas, sería algo como:
    // const allowedUpdates = ['nombre', 'apellido', 'fechaNacimiento', 'etc']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return { error: 'Campos para actualizar inválidos!' }
    }

    try {
        const registro = await Pais.findOne({ _id })
        if (!registro) {
            return { error: 'Registro no encontrado!' }
        }
        updates.forEach((update) => registro[update] = datosParaModificar[update])
        await registro.save()

        return registro
    } catch (error) {
        console.error(error)
    }
}

// OJO: esto borra TODOS los registros 
const deleteAllPaises = async () => {
    try {
        const registros = await Pais.deleteMany({})
        // return registros
    } catch (error) {
        console.error(error)
    }
}

const deletePaisById = async ({ _id }) => {
    try {
        const registro = await Pais.findOneAndDelete({ _id })
        return registro
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getPaises,
    getPaisById,
    insertPais,
    udpatePaisById,
    deleteAllPaises,
    deletePaisById
}