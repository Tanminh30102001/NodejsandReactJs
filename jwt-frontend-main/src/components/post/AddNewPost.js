import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { getAllCategory } from "../../services/categoryService";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import slugify from "slugify";
import { createPost } from "../../services/postService";
Quill.register("modules/imageUploader", ImageUploader);
const AddNewPostStyle = styled.div`
  .check-hot {
    font-size: 20px;
  }
`;
const AddNewPost = () => {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [fileImg, setFileImg] = useState("");
  const [base64Img, setBase64Img] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [hot, setHot] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultData = {
    name: "",
    slug: "",
    photoURL: "",
    categoryID: "",
    userID: "",
    hot: false,
    content: "",
  };
  const [dataPost, setDataPost] = useImmer(defaultData);
  const fetchAllCategory = async () => {
    const res = await getAllCategory();
    if (+res.EC === 0) {
      setCategoryList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  const handleChaneInput = (value, name) => {
    setDataPost((draft) => {
      draft[name] = value;
    });
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=8c6562419aad39522a13d6c6dcc52351",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleChangeFile = async (e) => {
    if (e.target && e.target.files[0]) {
      let strToReplace = await toBase64(e.target.files[0]);
      let strImg = strToReplace?.replace(/^data:image\/[a-z]+;base64/, "");
      setBase64Img(strImg);
      setFileImg(e?.target?.files[0]);
    }
  };
  const handleSavePost = async () => {
    console.log(name.length);
    if (name.length < 5 || name.length > 10) {
      toast.error(
        "Your name has been greater than 5 character and less than 10 character"
      );
      setLoading(false);
    } else {
      setLoading(true);
      const formData = new FormData();
      const data = {
        ...dataPost,
        name: name,
        slug: slug || slugify(name),
        userID: user?.account?.id,
        content,
        hot,
      };
      formData.append("file", fileImg);
      formData.append("data", JSON.stringify(data));
      const res = await createPost(formData);
      if (+res.EC === 0) {
        toast.success("Upload post succesful!");
        setLoading(false);
        setFileImg("");
        setBase64Img("");
        setDataPost(defaultData);
        setContent("");
        setName("");
        setSlug("");
      } else {
        toast.error(res.EM);
      }
    }
  };
  useEffect(() => {
    fetchAllCategory();
  }, []);
  return (
    <AddNewPostStyle className="container">
      <h3 className="my-2">Add new posts</h3>
      <div className="add-post">
        <div className="row">
          <div className="my-3 col-12 col-sm-6 form-group">
            <label htmlFor="name">
              Title <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="name"
              className={`form-control mt-1 mt-sm-2`}
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-3 col-12 col-sm-6 form-group">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              name="slug"
              required
              className={`form-control mt-1 mt-sm-2`}
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
            />
          </div>
          {user?.account.groupID === 1 && (
            <div className="my-3 mt-auto col-12 col-sm-6 form-group">
              <div className="gap-3 form-check d-flex align-items-center form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  required
                  name="hot"
                  value={hot}
                  onClick={() => setHot(!hot)}
                />
                <label
                  className="form-check-label check-hot"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Feature
                </label>
              </div>
            </div>
          )}

          <div className="my-3 col-12 col-sm-6 form-group">
            <label htmlFor="formFile" className="form-label">
              Choose default image
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="photoURL"
              required
              onChange={(e) => handleChangeFile(e)}
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <div className="my-3 col-12 col-sm-6 form-group">
            <label htmlFor="categoryID">Category</label>
            <select
              className="my-2 form-select"
              aria-label="Default select example"
              name="categoryID"
              defaultValue={""}
              required
              onChange={(e) => handleChaneInput(+e.target.value, e.target.name)}
            >
              {!dataPost.categoryID && (
                <option value="">Please select category</option>
              )}
              {categoryList.length > 0 &&
                categoryList.map((item) => {
                  return (
                    <option value={+item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 col-sm-6 form-group">
            {base64Img && (
              <img
                src={`data:image/jpeg;base64${base64Img}`}
                alt=""
                className="img-thumbnail"
              />
            )}
          </div>
          <div className="my-3 col-12 form-group">
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-content-center justify-content-center">
        {!loading ? (
          <button
            className="my-3 btn btn-warning"
            style={{ width: "105.76px" }}
            onClick={() => handleSavePost()}
          >
            Save
          </button>
        ) : (
          <button class="btn my-3 btn-primary" disabled>
            <span class="spinner-grow spinner-grow-sm"></span>
            Loading..
          </button>
        )}
      </div>
    </AddNewPostStyle>
  );
};

export default AddNewPost;
