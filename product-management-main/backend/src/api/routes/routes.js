const { users } = require('../../database/db.config');

module.exports = app => {
    const router = require('express').Router();
    
    // Fournisseur routes

    const FournisseurController = require('../controller/Fournisseur.controller');
    router.post('/fournisseur',FournisseurController.create)
    router.get('/fournisseur',FournisseurController.findAll);
    router.get('/fournisseur/:id',FournisseurController.findOne);
    router.put('/fournisseur/:id',FournisseurController.update);
    router.delete('/fournisseur/:id',FournisseurController.delete);

    //User routes

    const UserController = require('../controller/User.controller');
    router.post('/users',UserController.create)
    router.get('/users',UserController.findAll);
    router.get('/users/:id',UserController.findOne);
    router.put('/users/:id',UserController.update);
    router.delete('/users/:id',UserController.delete);
    router.post('/users/login',UserController.login);


    // article routes

    const ArticleController = require('../controller/Article.controller');
    router.post('/article',ArticleController.create)
    router.get('/article',ArticleController.findAll);
    router.get('/article/:id',ArticleController.findOne);
    router.put('/article/:id',ArticleController.update);
    router.delete('/article/:id',ArticleController.delete);
    router.get('/article/fournisseur/:id',ArticleController.findByFournisseur);
    

    app.use('/api/',router);
}