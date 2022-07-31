const Estado = require('../models/estado')

const getEstados = async () => {
    try {
        const registros = await Estado.find({})
        return registros
    } catch (error) {
        console.error(error)
    }
}

const getEstadoById = async ({ _id }) => {
    try {
        const registro = await Estado.findOne({ _id })
        if (!registro) {
            return { error: 'Registro no encontrado!' }
        }
        return registro
    } catch (error) {
        console.error(error)
    }
}

const insertEstado = async ({ nombre, id_pais }) => {
    const registro = new Estado({
        nombre,
        id_pais
    })
    try {
        await registro.save()
        return registro
    } catch (error) {
        console.error(error)
    }

}

const udpateEstadoById = async (_id, datosParaModificar) => {
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
        const registro = await Estado.findOne({ _id })
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
const deleteAllEstados = async () => {
    try {
        const registros = await Estado.deleteMany({})
        // return registros
    } catch (error) {
        console.error(error)
    }
}

const deleteEstadoById = async ({ _id }) => {
    try {
        const registro = await Estado.findOneAndDelete({ _id })
        return registro
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getEstados,
    getEstadoById,
    insertEstado,
    udpateEstadoById,
    deleteAllEstados,
    deleteEstadoById
}