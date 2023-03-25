import React, { useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { v4 } from "uuid";
import { cloneDeep } from "lodash";
import { createCategory, getAllCategory } from "../../services/categoryService";
import { toast } from "react-toastify";
import TableCategory from "../table/TableCategory.js";
import slugify from "slugify";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  const { checkRoleCategories } = useContext(UserContext);
  const defaultData = {
    child1: { name: "", slug: "", isValidName: true },
  };
  const [listChild, setListChild] = useImmer(defaultData);
  const [categoryList, setCategoryList] = useState([]);
  const fetchAllCategory = async () => {
    const res = await getAllCategory();
    if (+res.EC === 0) {
      setCategoryList(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  const handleChangeInput = (name, value, key) => {
    if (name === "name") {
      setListChild((draft) => {
        draft[key][name] = value;
        draft[key]["isValidName"] = true;
      });
    } else {
      setListChild((draft) => {
        draft[key][name] = value;
      });
    }
  };
  const handleAddNewInput = () => {
    setListChild((draft) => {
      draft[`child-${v4()}`] = { name: "", slug: "", isValidName: true };
    });
  };
  const handleDeleteInput = (key) => {
    setListChild((draft) => {
      delete draft[key];
    });
  };
  const buildDataToPersist = async () => {
    const _listChild = cloneDeep(listChild);
    let result = [];
    Object.entries(_listChild).map(([key, child]) => {
      return result.push({
        name: child.name,
        slug: slugify(child.slug) || slugify(child.name, "_"),
      });
    });
    const res = await createCategory(result);
    if (+res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  const handleSave = () => {
    let inValid = Object.entries(listChild).find(([key, child]) => {
      return !child.name;
    });
    if (!inValid) {
      buildDataToPersist();
      fetchAllCategory();
      setListChild(defaultData);
    } else {
      toast.error("Input name must not be empty!");
      setListChild((draft) => {
        draft[inValid[0]]["isValidName"] = false;
      });
    }
  };
  useEffect(() => {
    fetchAllCategory();
  }, []);
  useEffect(() => {
    if (checkRoleCategories === false) navigate("/");
  }, [checkRoleCategories]);
  return (
    <div>
      <div className="container">
        <h4>Add a new category ...</h4>
        <div className="gap-3 mb-3 adding role d-flex flex-column">
          {Object.entries(listChild).map(([key, child], index) => {
            return (
              <div className={`row ${key}`} key={`child-${key}`}>
                <div className={`col-12 col-sm-5 `}>
                  <div className={`form-group}`}>
                    <label htmlFor="name">Name </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className={`form-control ${
                        child.isValidName ? "" : "is-invalid"
                      }`}
                      placeholder="Enter your name category"
                      value={child.name}
                      onChange={(e) => {
                        handleChangeInput(e.target.name, e.target.value, key);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-5">
                  <div className="form-group">
                    <label htmlFor="slug">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      className={`form-control`}
                      placeholder="Enter your slug"
                      value={child.slug}
                      onChange={(e) => {
                        handleChangeInput(e.target.name, e.target.value, key);
                      }}
                    />
                  </div>
                </div>
                <div className="gap-2 col-12 col-sm-2 d-flex align-items-end">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAddNewInput()}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.61 19.9999C17.95 20.0099 19.24 19.5099 20.23 18.6099C23.5 15.7499 21.75 10.0099 17.44 9.46995C15.9 0.129949 2.42998 3.66995 5.61998 12.5599"
                        stroke="#45aaf2"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.28011 12.97C6.75011 12.7 6.16011 12.56 5.57011 12.57C0.910109 12.9 0.920108 19.68 5.57011 20.01"
                        stroke="#45aaf2"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.8201 9.88998C16.3401 9.62998 16.9001 9.48998 17.4801 9.47998"
                        stroke="#45aaf2"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.97 20H8.96997"
                        stroke="#45aaf2"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.97 22V18"
                        stroke="#45aaf2"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {index >= 1 && (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteInput(key)}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.61 19.9999C17.95 20.0099 19.24 19.5099 20.23 18.6099C23.5 15.7499 21.75 10.0099 17.44 9.46995C15.9 0.129949 2.42998 3.66995 5.61998 12.5599"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.28011 12.97C6.75011 12.7 6.16011 12.56 5.57011 12.57C0.910109 12.9 0.920108 19.68 5.57011 20.01"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.8201 9.88998C16.3401 9.62998 16.9001 9.48998 17.4801 9.47998"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.3901 18.59L9.56006 21.41"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.3901 21.41L9.56006 18.59"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div>
            <button className=" btn btn-warning" onClick={() => handleSave()}>
              Save
            </button>
          </div>
        </div>
        <TableCategory
          fetchAllCategory={fetchAllCategory}
          categoryList={categoryList}
        ></TableCategory>
      </div>
    </div>
  );
};

export default Categories;
