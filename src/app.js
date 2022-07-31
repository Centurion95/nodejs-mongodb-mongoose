const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)

const { getPaises, getPaisById, insertPais, udpatePaisById, deleteAllPaises, deletePaisById } = require('./controllers/pais')
const { getEstados, getEstadoById, insertEstado, udpateEstadoById, deleteAllEstados, deleteEstadoById } = require('./controllers/estado')

const main = async () => {
    //en este proyecto de prueba -> con esto borramos todos los registros...
    await deleteAllPaises()
    await deleteAllEstados() //esta colección hace referencia al _id de Pais

    //vamos a insertar algunos registros..
    const registro1 = await insertPais({ nombre: 'Paraguay' })
    const registro2 = await insertPais({ nombre: 'Argentina' })
    const registro3 = await insertPais({ nombre: 'Brasil' })

    //hacemos select de toda la coleccion..
    console.log('registros', await getPaises())

    //para hacer select de 1 solo documento..
    const getRegistroById = await getPaisById(registro1._id)
    console.log('getRegistroById', getRegistroById)

    //para eliminar, por ejemplo el segundo registro:
    const registroEliminado = await deletePaisById(registro2._id)
    console.log('registroEliminado', registroEliminado)
    console.log('registros', await getPaises()) //verificamos la eliminacion..

    //y para hacer update de un registro..
    const registroModificado = await udpatePaisById(registro3._id, { nombre: 'ACTUALIZADO' })
    console.log('registroModificado', registroModificado)
    console.log('registros', await getPaises()) //verificamos la modificacion..



    //aqui vamos a insertar algunos registros cuyo "FK" está en la primera colección..
    //vamos a insertar algunos registros..
    await insertEstado({ nombre: 'Alto Paraguay', id_pais: registro1._id })
    await insertEstado({ nombre: 'Alto Paraná', id_pais: registro1._id })
    await insertEstado({ nombre: 'Amambay', id_pais: registro1._id })

    await insertEstado({ nombre: 'Mato Grosso', id_pais: registro3._id })
    await insertEstado({ nombre: 'Minas Gerais', id_pais: registro3._id })

    //hacemos select de toda la coleccion..
    console.log('registros2', await getEstados())

    //--->luego sería el mismo mecanismo para:
    //para hacer select de 1 solo documento..
    //para eliminar, por ejemplo el segundo registro:
    //y para hacer update de un registro..
}

main()