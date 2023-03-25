const db = require("../models");

const getGroups = async () => {
  try {
    const data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      EM: "Get group successfully!",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service",
      EC: 1,
      DT: {},
    };
  }
};
const createGroupApi = async (rawGroupData) => {
  try {
    const { name, desc, dataGroup } = rawGroupData;
    const filterDataCheck = dataGroup.filter((item) => {
      return item.isAssigned === true;
    });
    if (rawGroupData) {
      const group = await db.Group.create({
        name,
        desc,
      });
      const formatData = [];
      filterDataCheck.forEach((item) =>
        formatData.push({
          groupID: +group.id,
          roleID: +item.id,
        })
      );
      await db.Group_Role.bulkCreate(formatData);
      return {
        EM: "Create group successfully",
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
module.exports = { getGroups, createGroupApi };
