const userModel =require('../models/index').user
const Op = require('sequelize').Op
const jsonwebtoken = require("jsonwebtoken")
const md5 = require('md5')
const SECRET_KEY="secretcode";

exports.login = async(request, response) => {
    try{
        const params = {
            email: request.body.email,
            password: md5(request.body.password),
        };
         const findUser = await userModel.findOne({where: params});
         if(findUser == null){
            return response.status(400).json({
                message: "email or password doesnt match",
            });
         }
         console.log(findUser);
         let tokenPayLoad = {
            id_user: findUser.id,
            email: findUser.email,
            role: findUser.role,
            nama_user: findUser.nama_user,
         };
         tokenPayLoad = JSON.stringify(tokenPayLoad);
         let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);

         return response.status(200).json({
            message: "Success Login",
            data: { 
                token: token,
                id_user: findUser.id_user,
                nama_user: findUser.nama_user,
                email: findUser.email,
                role: findUser.role,
            },
         });
    }
    catch (error){
        console.log(error);
        return response.status(400).json({
            message: error,
        })
    }
}

exports.LoginRegister = async (request, response) => {
    const email = request.body.email;
    let user = await userModel.findAll({
        where: {role: "customer", email: email},
    });
    if (user.length === 0){
        let newUser = {
            nama_user : request.body.nama_user,
            foto: request.body.linkFoto,
            email : email,
            role: "customer",

        };

    if(newUser.nama_user === "" || newUser.email === ""){
        return response.status(400).json({
            success: false,
            message: "harus diisi semua",
        });
    }
    else{
        userModel
        .create(newUser)
        .then((result) =>{
            return response.json({
                success: true,
                data: result,
                message: "new user has been inserted",
            });
        })
        .catch((error)=>{
            return response.status(400).json({
                success: false,
                message: error.message,
            })
        })
    }
    }
    else{
    return response.json({
        success: true,
        data: user,
        message: "user sudah ada dan berhasil login",
    });
    }
}

exports.getAlluser = async (request, response) => {
    let users = await userModel.findAll()
    return response.json({
        success:true,
        data:users,
        message: 'yippe user ke load'
    })
}

exports.finduser = async (request,response) => {
    let keyword = request.body.keyword
    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                {nama_user:{[Op.substring]: keyword}},
                {foto:{[Op.substring]: keyword}},
                {email:{[Op.substring]: keyword}},
                {password:{[Op.substring]: keyword}},
                {role:{[Op.substring]:keyword}}
            ]
        }
    })
    return response.json({
        success: true,
        data: users,
        message: 'user ke load ippe'
    })
}

exports.adduser = (request,response) => {
    let Newuser = {
        nama_user: request.body.nama_user,
        foto: request.body.foto,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role
    }

    userModel.create(Newuser)
    .then(result => {
        return response.json({
            success: true,
            data:result,
            message: 'ippe user baru'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.updateuser = (request, response) => {
    let datauser = {
        nama_user: request.body.nama_user,
        foto: request.body.foto,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role
    }
    let iduser = request.params.id
    userModel.update(datauser, {where: {id: iduser } })
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

exports.deleteuser = (request,response) => {
    let iduser = request.params.id
    userModel.destroy({ where: { id:iduser}})
    .then(result => {
        return response.json({
            success: true,
            message: 'aa jangan dong delete user'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message:error.message
        })
    })
}