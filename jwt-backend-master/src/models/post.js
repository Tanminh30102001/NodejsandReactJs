"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "userID" });
      Post.belongsTo(models.Category, { foreignKey: "categoryID" });
    }
  }
  Post.init(
    {
      categoryID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      photoURL: DataTypes.STRING,
      publicID: DataTypes.STRING,
      hot: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
