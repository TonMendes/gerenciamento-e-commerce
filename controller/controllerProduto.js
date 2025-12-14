const { Produto } = require('../model/modelosNoSQL');
const { Usuario, Pedido, ItemPedido } = require('../model/modelosSQL');

exports.detalhes = async function(req, res) {
    try {
        const produto = await Produto.findById(req.params.id);

        let contexto = {
            titulo_pagina: 'Detalhes do Produto',
            paginaAtual: 'home',
            produto: produto
        };
        res.render('detalhesProduto', contexto);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).send('Erro ao buscar produto');
    }
};

exports.tela_comprar = async function(req, res) {
    try {
        const produto = await Produto.findById(req.params.id, { nome: 1, preco: 1, estoque: 1 });

        let contexto = {
            titulo_pagina: 'Finalização da Compra',
            paginaAtual: 'home',
            produto: produto
        };
        res.render('finalizacaoCompra', contexto);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).send('Erro ao buscar produto');
    }
};

exports.confirmar_compra = async function(req, res) {
    try {
        const produto = await Produto.findById(req.params.id);
        const quantidade = parseInt(req.body.quantidade);

        const usuario = await Usuario.findOne();

        const valorTotal = produto.preco * quantidade;

        const pedido = await Pedido.create({
            status: 'CONCLUIDO',
            valor_total: valorTotal,
            usuario_id: usuario.id
        });

        await ItemPedido.create({
            quantidade: quantidade,
            preco_unitario: produto.preco,
            produto_mongodb_id: produto._id.toString(),
            pedido_id: pedido.id
        });

        const novoEstoque = produto.estoque - quantidade;
        await Produto.findByIdAndUpdate(produto._id, { estoque: novoEstoque });
        console.log('Estoque atualizado:', produto.nome, 'de', produto.estoque, 'para', novoEstoque);

        let contexto = {
            titulo_pagina: 'Compra Finalizada',
            paginaAtual: 'home',
            usuario: usuario
        };
        res.render('confirmacaoCompra', contexto);
    } catch (error) {
        console.error('Erro ao confirmar compra:', error);
        res.status(500).send('Erro ao confirmar compra');
    }
};
