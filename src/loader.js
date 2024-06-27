//-Inicia o server
const server = require('./config/server');

//-Inicia o Banco de Dados
require('./config/database');

//-Inicia as Rotas
require('./config/routes')(server);