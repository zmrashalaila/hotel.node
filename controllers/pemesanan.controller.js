const pemesananModel =require('../models/index').pemesanan
const Op = require('sequelize').Op

exports.getAllpemesanan = async (request, response) => {
    let pemesanans = await pemesananModel.findAll()
    return response.json({
        success:true,
        data:pemesanans,
        message: 'yippe pemesanan ke load'
    })
}

exports.findpemesanan = async (request,response) => {
    let keyword = request.body.keyword
    let pemesanans = await pemesananModel.findAll({
        where: {
            [Op.or]: [
                {nomor_pemesanan: keyword},
                {nama_pemesan:{[Op.substring]: keyword}},
                {email_pemesan:{[Op.substring]: keyword}},
                {tgl_pemesanan:{[Op.substring]: keyword}},
                {tgl_check_in:{[Op.substring]: keyword}},
                {tgl_check_out:{[Op.substring]:keyword}},
                {nama_tamu:{[Op.substring]:keyword}},
                {id_tipe_kamar: keyword},
                {status_pemesanan:{[Op.substring]:keyword}},
                {id_user: keyword}
            ]
        }
    })
    return response.json({
        success: true,
        data: pemesanans,
        message: 'pemesanan ke load ippe'
    })
}

exports.addpemesanan = (request,response) => {
    let newpemesanan = {
        nomor_pemesanan: request.body.nomor_pemesanan,
        nama_pemesan: request.body.nama_pemesan,
        email_pemesan: request.body.email_pemesan,
        tgl_pemesanan: request.body.tgl_pemesanan,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        jumlah_kamar: request.body.jumlah_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar,
        status_pemesanan: request.body.status_pemesanan,
        id_user: request.body.id_user     
    }

    pemesananModel.create(newpemesanan)
    .then(result => {
        return response.json({
            success: true,
            data:result,
            message: 'ippe pemesanan baru'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.updatepemesanan = (request, response) => {
    let datapemesanan = {
        nomor_pemesanan: request.body.nomor_pemesanan,
        nama_pemesan: request.body.nama_pemesan,
        email_pemesan: request.body.email_pemesan,
        tgl_pemesanan: request.body.tgl_pemesanan,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        jumlah_kamar: request.body.jumlah_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar,
        status_pemesanan: request.body.status_pemesanan,
        id_user: request.body.id_user     
    }
    let idpemesanan = request.params.id
    pemesananModel.update(datapemesanan, {where: {id: idpemesanan } })
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

exports.deletepemesanan = (request,response) => {
    let idpemesanan = request.params.id
    pemesananModel.destroy({ where: { id:idpemesanan}})
    .then(result => {
        return response.json({
            success: true,
            message: 'aa jangan dong delete pemesanan'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message:error.message
        })
    })
}