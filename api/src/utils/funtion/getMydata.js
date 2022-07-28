const { Videogame, Genre, Platform } = require("../../db.js");
const { Op } = require("sequelize");

async function getMyData(name) {
  let noName = [];
  if (!name) {
    noName= Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          // ----
          model: Platform,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return noName;
  } else {
    withNames = Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Platform,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    return withNames;
  }
}
module.exports = getMyData;
