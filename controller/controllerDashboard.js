const { Produto } = require('../model/modelosNoSQL');

exports.dashboard = async function(req, res) {
    try {
        const totalProdutos = await Produto.countDocuments({});

        const baixoEstoque = await Produto.countDocuments({ estoque: { $lt: 10 } });

        const computadores = await Produto.countDocuments({
            nome: { $regex: /computador|pc|notebook/i }
        });

        const moveis = await Produto.countDocuments({
            nome: { $regex: /celular|iphone|tablet|smartphone/i }
        });

        const faixa0a100 = await Produto.countDocuments({ preco: { $gte: 0, $lte: 100 } });
        const faixa101a1000 = await Produto.countDocuments({ preco: { $gte: 101, $lte: 1000 } });
        const faixa1001a5000 = await Produto.countDocuments({ preco: { $gte: 1001, $lte: 5000 } });
        const faixaAcima5000 = await Produto.countDocuments({ preco: { $gt: 5000 } });

        let contexto = {
            titulo_pagina: 'Dashboard de Produtos',
            paginaAtual: 'dashboard',
            totalProdutos: totalProdutos,
            baixoEstoque: baixoEstoque,
            computadores: computadores,
            moveis: moveis,
            faixa0a100: faixa0a100,
            faixa101a1000: faixa101a1000,
            faixa1001a5000: faixa1001a5000,
            faixaAcima5000: faixaAcima5000
        };
        res.render('dashboardProdutos', contexto);
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        res.status(500).send('Erro ao buscar dados do dashboard');
    }
};
