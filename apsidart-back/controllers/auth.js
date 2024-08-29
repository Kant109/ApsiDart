const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../firebaseConfig');

exports.signup = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then( hashPwd => {
        const user = new User({email: req.body.email, password: hashPwd});
        saveWithFirebase(user)
        .then(res.status(201).json({message :"Enregistrement de l'utilisateur terminé !"}))
        .catch(res.status(400).json({message :"Un problème est apparu lors de l'enregistrement de l'utilisateur..."}))
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({error})
    });

};

exports.login = (req, res, next)=>{
    findWithFirebase({email: req.body.email})
    .then(user => {
        if (!user){
            return res.status(401).json({message : "email ou mot de passe incorrect 1"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then( valid =>{
           if (!valid){
            return res.status(401).json({message : "email ou mot de passe incorrect"})
           }
           res.status(200).json({
            userID : user._id,
            role : user.role,
            token:jwt.sign(
                {userId: user._id},
                'My_secret_string',
                {expiresIn:'24h'}
            )
           });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error})})
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({error})})
    };


function findWithFirebase(email) {

    db.collection('user').doc('2srFwIG3bQLbXrnWKfwY').get()
    .then(doc => {
    if (doc.exists) {
        console.log('Document data:', doc.data());
        return doc;
    } else {
        console.log('No such document!');
    }
    })
    .catch(error => {
        console.error('Error getting document:', error);
    });

}

function saveWithFirebase(user){

    const usersRef = db.ref('user');
    return usersRef.child("1234").set(user);

}

