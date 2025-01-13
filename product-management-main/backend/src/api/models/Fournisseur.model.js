module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let FournisseurSchema = new Schema({
        nom: { type: String, require: true},
        localisation: { type: String,require:true},
    },
    {
        timestamps: true
    });
    FournisseurSchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const Fournisseur = mongoose.model('Fournisseur', FournisseurSchema);
    return Fournisseur;
}