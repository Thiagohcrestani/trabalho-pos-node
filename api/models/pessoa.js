const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String},
    telefone: {type: Number},
    email: {type: String},
    status: {type: String},
},
{
    timestamps: true
});

mongoose.model('Pessoa', pessoaSchema);