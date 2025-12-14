const mongoose = require('./serverNoSQL');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    estoque: {
        type: Number,
        required: true,
        min: 0
    },
    detalhes: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: {
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em'
    }
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = { Produto };
