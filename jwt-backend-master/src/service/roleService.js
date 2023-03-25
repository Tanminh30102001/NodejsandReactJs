const db = require("../models");

const createNewRole = async (data) => {
  let resultRoleExist = [];
  try {
    let currentRole = await db.Role.findAll({
      attributes: ["url"],
      raw: true,
    });
    //filter role doesn't exist
    const results = data.filter(
      ({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2)
    );
    //filter role exist
    const roleAlreadyExist = data.filter(
      ({ url: url1 }) => !results.some(({ url: url2 }) => url1 === url2)
    );
    roleAlreadyExist.map((item) => {
      resultRoleExist.push(item.url);
    });
    let formatString = JSON.stringify(resultRoleExist)
      .substring(1, JSON.stringify(resultRoleExist).length - 1)
      .replace(/["]/g, "")
      .replace(/[,]/g, ", ");
    if (roleAlreadyExist.length > 0) {
      const bulkRole = await db.Role.bulkCreate(results);
      let listIDRole = [];
      const addRoleToDev = [];
      bulkRole.map((item) => {
        listIDRole.push(item.id);
      });
      listIDRole.map((item) => {
        addRoleToDev.push({
          roleID: item,
          groupID: 1, //dev
        });
      });
      await db.Group_Role.bulkCreate(addRoleToDev);
      return {
        EM: `Role ${formatString} alrady exist!`,
        EC: 1,
        DT: {},
      };
    } else {
      const bulkRole = await db.Role.bulkCreate(data, {
        raw: true,
        nest: true,
      });
      let listIDRole = [];
      const addRoleToDev = [];
      bulkRole.map((item) => {
        listIDRole.push(item.id);
      });
      listIDRole.map((item) => {
        addRoleToDev.push({
          roleID: item,
          groupID: 1, //dev
        });
      });
      await db.Group_Role.bulkCreate(addRoleToDev);
      return {
        EM: "Create role successfully",
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

const getAllRole = async () => {
  try {
    const data = await db.Role.findAll({
      order: [["id", "DESC"]], //ASC
    });
    return {
      EM: `Get all role successful`,
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

const deleteRoleApi = async (id) => {
  // deleteRole;
  try {
    const role = await db.Role.findOne({
      where: { id },
    });
    if (role) {
      await role.destroy();
      return {
        EM: "Delete role successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Role doesn't exist",
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

const getRoleByGroupApi = async (groupID) => {
  try {
    if (!groupID) {
      return {
        EM: "Not found any role",
        EC: 1,
        DT: [],
      };
    } else {
      let role = await db.Role.findAll({
        include: {
          model: db.Group,
          where: { id: groupID },
          attributes: ["name", "desc"],
        },
        raw: true,
        nest: true,
      });
      return {
        EM: "Get role by group succesfully!",
        EC: 0,
        DT: role,
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const assignRoleToGroupApi = async (data) => {
  try {
    if (data && data.length > 0) {
      await db.Group_Role.destroy({
        where: { groupID: data[0].groupID },
      });
      await db.Group_Role.bulkCreate(data);
      return {
        EM: "Assign role to group successful!",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Must be assign 1 role to group!",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  createNewRole,
  getAllRole,
  deleteRoleApi,
  getRoleByGroupApi,
  assignRoleToGroupApi,
};
