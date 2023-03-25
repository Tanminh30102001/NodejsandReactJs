const db = require("../models");

const getGroupWithRole = async (user) => {
  //scope
  const role = await db.Role.findAll({
    attributes: ["url", "desc", "id"],
    include: {
      model: db.Group,
      where: { id: user.groupID },
      attributes: ["name", "desc", "id"], // find in table mapping
      through: { attributes: [] }, //remove data default of sequelize
    },
    raw: true,
    nest: true,
  });
  return role ? role : {};
};

module.exports = { getGroupWithRole };
