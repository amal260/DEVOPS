module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let UserSchema = new Schema({
        nom: { type: String, require: true},
        prenom: { type: String, require: true},
        password:{type:String,require:true},
        email: { type: String,require:true},
        ROLE: { type: String, require: true},
    },
    {
        timestamps: true
    });
    UserSchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const User = mongoose.model('User', UserSchema);
    return User;
}