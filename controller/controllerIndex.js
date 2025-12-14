const { Produto } = require('../model/modelosNoSQL');

exports.tela_principal = async function(req, res) {
    try {
        const produtos = await Produto.find({}, { nome: 1, preco: 1, estoque: 1 }).limit(8);

        let contexto = {
            titulo_pagina: 'Tech Loja',
            paginaAtual: 'home',
            produtos: produtos
        };
        res.render('index', contexto);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos');
    }
};
