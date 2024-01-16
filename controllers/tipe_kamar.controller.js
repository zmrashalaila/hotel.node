const tipe_kamarModel =require('../models/index').tipe_kamar
const Op = require('sequelize').Op

exports.getAlltipe_kamar = async (request, response) => {
    let tipe_kamars = await tipe_kamarModel.findAll()
    return response.json({
        success:true,
        data:tipe_kamars,
        message: 'yippe tipe_kamar ke load'
    })
}

exports.findtipe_kamar = async (request,response) => {
    let keyword = request.body.keyword
    let tipe_kamars = await tipe_kamarModel.findAll({
        where: {
            [Op.or]: [
                {nama_tipe_kamar:{[Op.substring]: keyword}},
                {harga: keyword},
                {deskripsi:{[Op.substring]: keyword}},
                {foto:{[Op.substring]: keyword}}
            ]
        }
    })
    return response.json({
        success: true,
        data: tipe_kamars,
        message: 'tipe_kamar ke load ippe'
    })
}

exports.addtipe_kamar = (request,response) => {
    let newtipe_kamar = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.body.foto
    }

    tipe_kamarModel.create(newtipe_kamar)
    .then(result => {
        return response.json({
            success: true,
            data:result,
            message: 'ippe tipe_kamar baru'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.updatetipe_kamar = (request, response) => {
    let datatipe_kamar = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.body.foto
    }
    let idtipe_kamar = request.params.id
    tipe_kamarModel.update(datatipe_kamar, {where: {id: idtipe_kamar } })
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

exports.deletetipe_kamar = (request,response) => {
    let idtipe_kamar = request.params.id
    tipe_kamarModel.destroy({ where: { id:idtipe_kamar}})
    .then(result => {
        return response.json({
            success: true,
            message: 'aa jangan dong delete tipe_kamar'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message:error.message
        })
    })
}