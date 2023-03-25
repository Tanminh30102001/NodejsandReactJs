import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import styled from "styled-components";
import _ from "lodash";
import { useImmer } from "use-immer";
import { getAllCategory } from "../../services/categoryService";
import { getPostItem, updatePost } from "../../services/postService";
import { UserContext } from "../../context/UserContext";
const UpdatePostStyle = styled.div`
  .check-hot {
    font-size: 20px;
  }
`;
const UpdatePost = () => {
  const { user } = useContext(UserContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [hot, setHot] = useState();
  const [name, setname] = useState("");
  const [slugg, setSlugg] = useState("");
  const [postInfo, setPostInfo] = useImmer({});
  const [fileImg, setFileImg] = useState("");
  const [base64Img, setBase64Img] = useState("");
  const [content, setContent] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const _postInfo = _.cloneDeep(postInfo);
  const fetchPostInfo = async () => {
    const res = await getPostItem(slug);
    if (+res.EC === 0) {
      setPostInfo(res.DT);
      setContent(res.DT.content);
      setHot(res.DT.hot === 1 ? true : false);
      setname(res.DT.name);
      setSlugg(res.DT.slug);
      setCategoryID(res.DT.Category.id);
    } else {
      console.log(res.EM);
    }
  };
  const fetchAllCategory = async () => {
    const res = await getAllCategory();
    if (+res.EC === 0) {
      setCategoryList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
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
  const handleSavePost = async () => {
    setLoading(true);
    const formData = new FormData();
    const data = {
      postID: postInfo.postID,
      userID: postInfo.User.id,
      createdAt: postInfo.createdAt,
      publicID: postInfo.publicID,
      photoURL: postInfo.photoURL,
      content,
      name,
      slug: slugify(slug || name),
      categoryID,
      hot,
    };
    formData.append("file", fileImg);
    formData.append("data", JSON.stringify(data));
    const res = await updatePost(formData);
    if (+res.EC === 0) {
      toast.success("Update post succesful!");
      setLoading(false);
      navigate("/posts");
    } else {
      toast.error(res.EM);
    }
  };
  useEffect(() => {
    fetchAllCategory();
    fetchPostInfo();
  }, []);
  return (
    <UpdatePostStyle className="container">
      <h3 className="my-2">Update post: {_postInfo.name}</h3>
      <div className="add-post">
        <div className="row">
          <div className="my-3 col-12 col-sm-6 form-group">
            <label htmlFor="name">
              Title <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className={`form-control mt-1 mt-sm-2`}
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="my-3 col-12 col-sm-6 form-group">
            <label htmlFor="slug">
              Slug <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="slug"
              required
              className={`form-control mt-1 mt-sm-2`}
              value={slugg}
              onChange={(e) => setSlugg(e.target.value)}
            />
          </div>
          {user?.account.groupID === 1 && (
            <div className="my-3 mt-auto col-12 col-sm-6 form-group">
              <div className="gap-3 form-check d-flex align-items-center form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  name="hot"
                  required
                  checked={hot}
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
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="categoryID">Category</label>
            <select
              className="my-2 form-select"
              aria-label="Default select example"
              name="categoryID"
              required
              defaultValue={_postInfo?.Category?.id}
              onChange={(e) => setCategoryID(+e.target.value)}
            >
              {_postInfo &&
                categoryList.length > 0 &&
                categoryList.map((item) => {
                  return (
                    <option
                      value={+item.id}
                      key={item.id}
                      selected={item.id === +_postInfo?.Category?.id}
                    >
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 col-sm-6 form-group">
            {base64Img ? (
              <img
                src={`data:image/jpeg;base64${base64Img} `}
                alt=""
                className="img-thumbnail"
              />
            ) : (
              <img src={postInfo?.photoURL} alt="" className="img-thumbnail" />
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
            Update
          </button>
        ) : (
          <button class="btn my-3 btn-primary" disabled>
            <span class="spinner-grow spinner-grow-sm"></span>
            Loading..
          </button>
        )}
      </div>
    </UpdatePostStyle>
  );
};

export default UpdatePost;
