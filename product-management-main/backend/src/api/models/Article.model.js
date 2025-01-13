module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let ArticleSchema = new Schema({
        fournisseur: { type: mongoose.Schema.Types.ObjectId, ref :'Fournisseur',require:true},
        nom: { type: String, require: true},
        tva: { type: Number,require:true},
        quantite: { type: Number,require:true},
        prix_vente: { type: Number,require:true},
        localisation: { type:String,require:true},
    },
    {
        timestamps: true
    });
    ArticleSchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const Article = mongoose.model('Article', ArticleSchema);
    return Article;
}