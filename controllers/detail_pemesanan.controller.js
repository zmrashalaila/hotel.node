const detail_pemesananModel =require('../models/index').detail_pemesanan
const Op = require('sequelize').Op

exports.getAlldetail_pemesanan = async (request, response) => {
    let detail_pemesanans = await detail_pemesananModel.findAll()
    return response.json({
        success:true,
        data:detail_pemesanans,
        message: 'yippe detail_pemesanan ke load'
    })
}

exports.finddetail_pemesanan = async (request,response) => {
    let keyword = request.body.keyword
    let detail_pemesanans = await detail_pemesananModel.findAll({
        where: {
            [Op.or]: [
                {id_pemesanan: keyword},
                {id_kamar: keyword},
                {tgl_akses:{[Op.substring]: keyword}},
                {harga: keyword}
            ]
        }
    })
    return response.json({
        success: true,
        data: detail_pemesanans,
        message: 'detail_pemesanan ke load ippe'
    })
}

exports.adddetail_pemesanan = (request,response) => {
    let newdetail_pemesanan = {
        id_pemesanan: request.body.id_pemesanan,
        id_kamar: request.body.id_kamar,
        tgl_akses: request.body.tgl_akses,
        harga: request.body.harga
    }

    detail_pemesananModel.create(newdetail_pemesanan)
    .then(result => {
        return response.json({
            success: true,
            data:result,
            message: 'ippe detail_pemesanan baru'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.updatedetail_pemesanan = (request, response) => {
    let datadetail_pemesanan = {
        id_pemesanan: request.body.id_pemesanan,
        id_kamar: request.body.id_kamar,
        tgl_akses: request.body.tgl_akses,
        harga: request.body.harga
    }
    let iddetail_pemesanan = request.params.id
    detail_pemesananModel.update(datadetail_pemesanan, {where: {id: iddetail_pemesanan } })
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

exports.deletedetail_pemesanan = (request,response) => {
    let iddetail_pemesanan = request.params.id
    detail_pemesananModel.destroy({ where: { id:iddetail_pemesanan}})
    .then(result => {
        return response.json({
            success: true,
            message: 'aa jangan dong delete detail_pemesanan'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message:error.message
        })
    })
}