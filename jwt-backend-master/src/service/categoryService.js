const db = require("../models");

const createNewCategory = async (data) => {
  let resultCategoryExist = [];
  try {
    let currentCategory = await db.Category.findAll({
      attributes: ["name"],
      raw: true,
    });
    //filter role doesn't exist
    const results = data.filter(
      ({ name: name1 }) =>
        !currentCategory.some(({ name: name2 }) => name1 === name2)
    );
    //filter role exist
    const categoryAlreadyExist = data.filter(
      ({ name: name1 }) => !results.some(({ name: name2 }) => name1 === name2)
    );
    categoryAlreadyExist.map((item) => {
      resultCategoryExist.push(item.name);
    });
    let formatString = JSON.stringify(resultCategoryExist)
      .substring(1, JSON.stringify(resultCategoryExist).length - 1)
      .replace(/["]/g, "")
      .replace(/[,]/g, ", ");
    if (categoryAlreadyExist.length > 0) {
      await db.Category.bulkCreate(results);
      return {
        EM: `Role ${formatString} alrady exist!`,
        EC: 1,
        DT: {},
      };
    } else {
      await db.Category.bulkCreate(data);
      return {
        EM: "Create category successful!",
        EC: 0,
        DT: {},
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const readCategoryApi = async (data) => {
  try {
    const data = await db.Category.findAll({
      attributes: ["id", "name", "slug"],
    });
    return {
      EM: `Get all category successful`,
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const deleteCategoryApi = async (id) => {
  try {
    const category = await db.Category.findOne({
      where: { id },
    });
    if (category) {
      await db.Category.destroy({
        where: { id },
      });
      return {
        EM: "Delete category successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Category doesn't exist",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = { createNewCategory, readCategoryApi, deleteCategoryApi };
