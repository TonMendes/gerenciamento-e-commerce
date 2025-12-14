const { DataTypes, Model } = require('sequelize');
const sequelize = require('./serverSQL');

class Usuario extends Model {}
Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
});

class Pedido extends Model {}
Pedido.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDENTE'
    },
    valor_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    }
}, {
    sequelize,
    modelName: 'Pedido',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
});

class ItemPedido extends Model {}
ItemPedido.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    produto_mongodb_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ItemPedido',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
});

Usuario.hasMany(Pedido, {
    foreignKey: {
        name: 'usuario_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Pedido.belongsTo(Usuario, {
    foreignKey: {
        name: 'usuario_id',
        allowNull: false
    }
});

Pedido.hasMany(ItemPedido, {
    foreignKey: {
        name: 'pedido_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
ItemPedido.belongsTo(Pedido, {
    foreignKey: {
        name: 'pedido_id',
        allowNull: false
    }
});

sequelize.sync({ alter: true });

module.exports = { Usuario, Pedido, ItemPedido };
