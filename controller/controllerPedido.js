const { Usuario, Pedido, ItemPedido } = require('../model/modelosSQL');
const { Produto } = require('../model/modelosNoSQL');

exports.listar = async function(req, res) {
    try {
        const pedidos = await Pedido.findAll({
            where: {
                status: ['CONCLUIDO', 'CANCELADO', 'SUSPENSO']
            },
            include: [
                {
                    model: Usuario,
                    attributes: ['nome']
                },
                {
                    model: ItemPedido,
                    attributes: ['id']
                }
            ]
        });

        const pedidosFormatados = pedidos.map(pedido => {
            return {
                id: pedido.id,
                dataCompra: pedido.criada_em.toLocaleDateString('pt-BR'),
                nomeUsuario: pedido.Usuario.nome,
                dataAtualizacao: pedido.atualizada_em.toLocaleDateString('pt-BR'),
                valorTotal: pedido.valor_total,
                produtosDistintos: pedido.ItemPedidos.length,
                status: pedido.status
            };
        });

        let contexto = {
            titulo_pagina: 'Gerenciamento de Pedidos',
            paginaAtual: 'pedidos',
            pedidos: pedidosFormatados
        };
        res.render('gerenciamentoPedidos', contexto);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).send('Erro ao listar pedidos');
    }
};

exports.alterar_status = async function(req, res) {
    try {
        const { id, status } = req.params;
        const novoStatus = status.toUpperCase();

        const pedido = await Pedido.findByPk(id, {
            include: [ItemPedido]
        });

        const statusAnterior = pedido.status;

        if (statusAnterior !== 'CANCELADO' && novoStatus === 'CANCELADO') {
            for (const item of pedido.ItemPedidos) {
                const produto = await Produto.findById(item.produto_mongodb_id);
                const novoEstoque = produto.estoque + item.quantidade;
                await Produto.findByIdAndUpdate(produto._id, { estoque: novoEstoque });
                console.log('Estoque restaurado:', produto.nome, 'de', produto.estoque, 'para', novoEstoque);
            }
        }

        await Pedido.update({ status: novoStatus }, { where: { id: id } });

        res.redirect('/pedidos');
    } catch (error) {
        console.error('Erro ao alterar status do pedido:', error);
        res.status(500).send('Erro ao alterar status do pedido');
    }
};
