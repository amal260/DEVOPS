const slugify = require('slugify');
const db = require('../../database/db.config');
const Article = db.articles;

exports.create=(req, res) => {
    const {nom,tva,quantite,prix_vente,localisation,fournisseur} = req.body;
    if(!nom || !localisation || !tva || !quantite || !prix_vente || !fournisseur ){
        return res.status(400).send({
            message : 'content can not be empty!'
         })
    }
    const newArticle = new Article({
        nom : nom,
        localisation : localisation,
        tva : tva ,
        quantite : quantite,
        prix_vente : prix_vente,
        fournisseur : fournisseur
    });
    newArticle.save(newArticle).then((data) =>{
        res.status(200).send({
            message : 'successfully created Article!'
        })
    }).catch(err =>{
        console.log(err);
    });
}
exports.findAll = (req, res)=> {
    Article.find({  
    }).then((data)=>{
      res.send(data);
    }).catch((err) =>{
        console.log(err);
    });
}
exports.delete = (req , res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({message:"content is required"});
    }
    Article.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Article not found"});
        }
        res.status(200).send({message:"Article was deleted successfully"});
    });
}
exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    Article.findById(id).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.update =(req, res) =>{
    const id = req.params.id;
    const {nom,tva,quantite,prix_vente,localisation,fournisseur} = req.body;
    if(!id || !nom || !localisation || !tva || !quantite || !prix_vente || !fournisseur ){
        res.status(400).send({ message: "content is required "});
    }
    Article.findByIdAndUpdate(id,
        {
            nom : nom,
            localisation : localisation,
            tva : tva ,
            quantite : quantite,
            prix_vente : prix_vente,
            fournisseur : fournisseur
        },
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Article with id=${id}`});
        }
        res.status(200).send({ message: `Article was successfully updated`});
        }).catch((err) =>{
            console.log(err);
        });
}
exports.findByFournisseur = (req, res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    Article.find({fournisseur:id}).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}