"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User);
      Project.belongsTo(models.Category);
      Project.belongsToMany(models.User, { through: "Project_User" });
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      photoURL: DataTypes.STRING,
      publicID: DataTypes.STRING,
      hot: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
