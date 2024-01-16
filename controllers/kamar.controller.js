const kamarModel =require('../models/index').kamar
const Op = require('sequelize').Op

exports.getAllkamar = async (request, response) => {
    let kamars = await kamarModel.findAll()
    return response.json({
        success:true,
        data:kamars,
        message: 'yippe kamar ke load'
    })
}

exports.findkamar = async (request,response) => {
    let keyword = request.body.keyword
    let kamars = await kamarModel.findAll({
        where: {
            [Op.or]: [
                { nomor_kamar: keyword }, 
                { id_tipe_kamar: keyword }
            ]
        }
    })
    return response.json({
        success: true,
        data: kamars,
        message: 'kamar ke load ippe'
    })
}

exports.addkamar = (request,response) => {
    let newkamar = {
        nomor_kamar: request.body.nomor_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar
    }

    kamarModel.create(newkamar)
    .then(result => {
        return response.json({
            success: true,
            data:result,
            message: 'ippe kamar baru'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.updatekamar = (request, response) => {
    let datakamar = {
        nomor_kamar: request.body.nomor_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar
    }
    let idkamar = request.params.id
    kamarModel.update(datakamar, {where: {id: idkamar } })
    .then(result =>{
        return response.json({
            success:true,
            message: 'data diupdate wir'
        })

    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.deletekamar = (request,response) => {
    let idkamar = request.params.id
    kamarModel.destroy({ where: { id:idkamar}})
    .then(result => {
        return response.json({
            success: true,
            message: 'aa jangan dong delete kamar'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message:error.message
        })
    })
}