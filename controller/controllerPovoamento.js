const { Usuario } = require('../model/modelosSQL');
const { Produto } = require('../model/modelosNoSQL');

exports.povoar = async function(req, res) {
    try {
        await Usuario.destroy({ where: {} });
        await Produto.deleteMany({});

        await Usuario.create({
            nome: 'Maria Figueira',
            email: 'maria.figueira@email.com',
            senha: 'senha123'
        });

        await Usuario.create({
            nome: 'João Silva',
            email: 'joao.silva@email.com',
            senha: 'senha456'
        });

        await Usuario.create({
            nome: 'Ana Costa',
            email: 'ana.costa@email.com',
            senha: 'senha789'
        });

        await Produto.create({
            nome: 'Smartphone Samsung A5',
            preco: 1999.99,
            estoque: 50,
            detalhes: {
                marca: 'Samsung',
                modelo: 'A5',
                tela: '6.5 polegadas',
                bateria: '4000mAh'
            }
        });

        await Produto.create({
            nome: 'Tablet Xiaomi',
            preco: 1200.99,
            estoque: 30,
            detalhes: {
                marca: 'Xiaomi',
                modelo: 'Pad 5',
                tela: '11 polegadas',
                armazenamento: '128GB'
            }
        });

        await Produto.create({
            nome: 'Notebook Ultra',
            preco: 3500.62,
            estoque: 5,
            detalhes: {
                marca: 'ComputeWell',
                modelo: 'Ultra',
                processador: 'Intel i7',
                ram: '16GB',
                armazenamento: '512GB SSD'
            }
        });

        await Produto.create({
            nome: 'Fone de Ouvido Bluetooth',
            preco: 99.78,
            estoque: 100,
            detalhes: {
                marca: 'SoundMax',
                tipo: 'Over-ear',
                bateria: '30 horas',
                cancelamentoRuido: 'Sim'
            }
        });

        await Produto.create({
            nome: 'Smartwatch Fit',
            preco: 499.99,
            estoque: 75,
            detalhes: {
                marca: 'FitTech',
                tela: '1.4 polegadas',
                resistenciaAgua: 'IP68',
                bateria: '7 dias'
            }
        });

        await Produto.create({
            nome: 'Câmera Digital Pro',
            preco: 2458.54,
            estoque: 2,
            detalhes: {
                marca: 'PhotoPro',
                resolucao: '24MP',
                video: '4K',
                zoom: '10x ótico'
            }
        });

        await Produto.create({
            nome: 'Console de Videogame XBox',
            preco: 3500.85,
            estoque: 25,
            detalhes: {
                marca: 'Microsoft',
                modelo: 'Series X',
                armazenamento: '1TB',
                resolucao: '4K'
            }
        });

        await Produto.create({
            nome: 'Monitor LED 24"',
            preco: 899.99,
            estoque: 40,
            detalhes: {
                marca: 'ViewTech',
                tamanho: '24 polegadas',
                resolucao: 'Full HD',
                taxa: '75Hz'
            }
        });

        await Produto.create({
            nome: 'iPhone 13',
            preco: 4500.00,
            estoque: 15,
            detalhes: {
                marca: 'Apple',
                modelo: '13',
                armazenamento: '128GB',
                camera: '12MP dupla'
            }
        });

        await Produto.create({
            nome: 'Notebook Gamer PC',
            preco: 6500.00,
            estoque: 8,
            detalhes: {
                marca: 'GameTech',
                processador: 'Intel i9',
                ram: '32GB',
                placa: 'RTX 3060'
            }
        });

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao povoar banco de dados:', error);
        res.status(500).send('Erro ao povoar banco de dados');
    }
};
