const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 return sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
     allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
     allowNull: false
    },
    released: {
      type: DataTypes.STRING,
      
    },
   rating: {
      type: DataTypes.STRING,
      
    },
    createdInDb: { // Que debería hacer con esto
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },{timestamps : false});
};
/* ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas * */