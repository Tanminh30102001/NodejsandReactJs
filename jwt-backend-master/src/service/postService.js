const db = require("../models");
var cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

//upload file to cloudinary
const uploadFromBuffer = (request) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "foo",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(request.data).pipe(cld_upload_stream);
  });
};

const updatePostApi = async (file, data) => {
  let { url, public_id } = file !== undefined && (await uploadFromBuffer(file));
  const dataPost = JSON.parse(data);
  const totalData = {
    ...dataPost,
    categoryID: +dataPost.categoryID,
    photoURL: file !== undefined ? url : dataPost.photoURL,
    status: "ACTIVE",
    publicID: file !== undefined ? public_id : dataPost.publicID,
  };
  try {
    let post = await db.Post.findOne({
      where: { postID: dataPost.postID },
    });
    if (post) {
      file !== undefined &&
        cloudinary.uploader.destroy(
          dataPost.publicID,
          function (error, result) {
            console.log(result, error);
          }
        );
      const res = await db.Post.update(totalData, {
        where: {
          postID: dataPost.postID,
        },
      });
      console.log(
        "🚀 ~ file: postService.js ~ line 47 ~ updatePostApi ~ res",
        res
      );
      return {
        EM: "Update post successfully",
        EC: 0,
        DT: {},
      };
      // if (deleteImage) {
      // }
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
const createNewPost = async (file, data) => {
  let { url, public_id } = await uploadFromBuffer(file);
  const dataPost = JSON.parse(data);
  const totalData = {
    ...dataPost,
    categoryID: +dataPost.categoryID,
    photoURL: url,
    status: "ACTIVE",
    publicID: public_id,
  };
  try {
    await db.Post.create(totalData);
    return {
      EM: "Create post successfully",
      EC: 0,
      DT: {},
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

const readPostApi = async () => {
  try {
    const data = await db.Post.findAll({
      attributes: [
        "postID",
        "userID",
        "categoryID",
        "name",
        "slug",
        "photoURL",
        "publicID",
        "hot",
        "content",
        "createdAt",
      ],
      include: [
        {
          model: db.User,
          attributes: ["id", "email", "username", "groupID"],
        },
        {
          model: db.Category,
          attributes: ["id", "name", "slug"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      EM: "Get all post successful!",
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

const readPostIemBySlugApi = async (slug) => {
  try {
    const data = await db.Post.findOne({
      where: { slug },
      attributes: [
        "postID",
        "name",
        "slug",
        "photoURL",
        "publicID",
        "hot",
        "content",
        "createdAt",
      ],
      include: [
        {
          model: db.User,
          attributes: ["id", "email", "username", "groupID"],
        },
        {
          model: db.Category,
          attributes: ["id", "name", "slug"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      EM: "Get all post successful!",
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

const readHotPostApi = async () => {
  try {
    const data = await db.Post.findAll({
      where: { hot: false },
      attributes: [
        "postID",
        "name",
        "slug",
        "photoURL",
        "publicID",
        "hot",
        "content",
        "createdAt",
      ],
      include: [
        {
          model: db.User,
          attributes: ["id", "email", "username", "groupID"],
        },
        {
          model: db.Category,
          attributes: ["id", "name", "slug"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      EM: "Get all post successful!",
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
const readRelatedApi = async (categoryID) => {
  try {
    const data = await db.Post.findAll({
      where: { categoryID },
      attributes: [
        "postID",
        "name",
        "slug",
        "photoURL",
        "publicID",
        "hot",
        "content",
        "createdAt",
      ],
      include: [
        {
          model: db.User,
          attributes: ["id", "email", "username", "groupID"],
        },
        {
          model: db.Category,
          attributes: ["id", "name", "slug"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      EM: "Get all post successful!",
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
const readPostByCategoryApi = async (slug) => {
  try {
    const data = await db.Post.findAll({
      attributes: [
        "postID",
        "name",
        "slug",
        "photoURL",
        "publicID",
        "hot",
        "content",
        "createdAt",
      ],
      include: [
        {
          model: db.User,
          attributes: ["id", "email", "username", "groupID"],
        },
        {
          model: db.Category,
          where: {
            slug,
          },
          attributes: ["id", "name", "slug"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      EM: "Get all post successful!",
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
const readPostByUsernameApi = async (username) => {
  try {
    const data = await db.Post.findAll({
      attributes: [
        "postID",
        "name",
        "slug",
        "photoURL",
        "publicID",
        "hot",
        "content",
        "createdAt",
      ],
      include: [
        {
          model: db.User,
          where: {
            username,
          },
          attributes: ["id", "email", "username", "groupID"],
        },
        {
          model: db.Category,
          attributes: ["id", "name", "slug"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      EM: "Get all post successful!",
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
const searchPostApi = async (keyword) => {
  try {
    const listPost = await db.Post.findAll({
      attributes: [
        "postID",
        "name",
        "slug",
        "photoURL",
        "publicID",
        "hot",
        "content",
        "createdAt",
      ],
      include: [
        {
          model: db.User,
          attributes: ["id", "email", "username", "groupID"],
        },
        {
          model: db.Category,
          attributes: ["id", "name", "slug"],
        },
      ],
      raw: true,
      nest: true,
    });
    const searchListPost = listPost.filter((item) => {
      return item.slug.toLowerCase().includes(keyword.toLowerCase());
    });
    return {
      EM: "Get post by keyword successful!",
      EC: 0,
      DT: searchListPost,
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

const deletePostApi = async ({ postID, publicID }) => {
  try {
    const post = await db.Post.findOne({
      where: { postID },
    });
    if (post) {
      cloudinary.uploader.destroy(publicID, function (error, result) {
        // console.log(result, error);
      });
      await db.Post.destroy({
        where: { postID },
      });
      return {
        EM: "Delete post successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Post doesn't exist",
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

module.exports = {
  createNewPost,
  readPostApi,
  readHotPostApi,
  readRelatedApi,
  readPostIemBySlugApi,
  updatePostApi,
  deletePostApi,
  readPostByCategoryApi,
  readPostByUsernameApi,
  searchPostApi,
};
