## Configuração do MySQL

```sql
CREATE SCHEMA ecommerce;

CREATE USER IF NOT EXISTS 'fullstack'@'localhost' IDENTIFIED BY 'senha_fullstack';

ALTER USER 'fullstack'@'localhost' IDENTIFIED BY 'senha_fullstack';

GRANT ALL PRIVILEGES ON ecommerce.* TO 'fullstack'@'localhost';

FLUSH PRIVILEGES;
```

## Executar o projeto

```bash
npm install
npm start
```

Acesse: http://localhost:3000

