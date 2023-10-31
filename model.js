const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pet', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });  

  function definePetModel(sequelize) {
    return sequelize.define('pet', {
      codigo_pet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_pet: {
        type: DataTypes.STRING,
      },
      genero_pet: {
        type: DataTypes.STRING,
      },
    }, {
      tableName: 'pets',
      timestamps: false,
    });
  }

sequelize.sync()
  .then(() => console.log('Tabela Animal criada no banco'))
  .catch(console.error);

module.exports = Pet;