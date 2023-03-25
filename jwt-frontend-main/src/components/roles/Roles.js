import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useImmer } from "use-immer";
import { v4 } from "uuid";
import { cloneDeep } from "lodash";
import { createRole, deleteRole, readRole } from "../../services/roleService";
import TableRole from "../table/TableRole";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Roles = () => {
  const navigate = useNavigate();
  const { checkRoleRoles } = useContext(UserContext);
  const defaultData = {
    child1: { url: "", desc: "", isValidUrl: true },
  };
  const [listRole, setListRole] = useState({});
  const [listChild, setListChild] = useImmer(defaultData);
  const handleChangeInput = (name, value, key) => {
    if (value && name === "url") {
      setListChild((draft) => {
        draft[key][name] = value;
        draft[key]["isValidUrl"] = true;
      });
    }
    setListChild((draft) => {
      draft[key][name] = value;
    });
  };
  const handleAddNewInput = () => {
    setListChild((draft) => {
      draft[`child-${v4()}`] = { url: "", desc: "", isValidUrl: true };
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
        url: child.url,
        desc: child.desc,
      });
    });
    const res = await createRole(result);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      fetchAllRole();
    } else if (+res.EC === 1) {
      toast.warn(res.EM);
      fetchAllRole();
    }
  };
  const handleSave = () => {
    let inValid = Object.entries(listChild).find(([key, child]) => {
      return child && !child.url;
    });
    if (!inValid) {
      buildDataToPersist();
      setListChild(defaultData);
    } else {
      toast.error("Input URL must not be empty!");
      setListChild((draft) => {
        draft[inValid[0]]["isValidUrl"] = false;
      });
    }
  };
  const fetchAllRole = async () => {
    const res = await readRole();
    if (+res.EC === 0) {
      setListRole(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  useEffect(() => {
    fetchAllRole();
  }, []);
  useEffect(() => {
    if (!checkRoleRoles) navigate("/");
  }, [checkRoleRoles]);
  return (
    <div className="container">
      <div className="mt-3">
        <h4>Add a new role ...</h4>
        <div className="gap-3 adding role d-flex flex-column">
          {Object.entries(listChild).map(([key, child], index) => {
            return (
              <div className={`row ${key}`} key={`child-${key}`}>
                <div className={`col-12 col-sm-5 `}>
                  <div className={`form-group}`}>
                    <label htmlFor="url">URL </label>
                    <input
                      type="text"
                      name="url"
                      className={`form-control ${
                        child.isValidUrl ? "" : "is-invalid"
                      }`}
                      placeholder="Enter your url address"
                      value={child.url}
                      onChange={(e) => {
                        handleChangeInput(e.target.name, e.target.value, key);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-5">
                  <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <input
                      type="text"
                      name="desc"
                      className={`form-control`}
                      placeholder="Enter your desc address"
                      value={child.desc}
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
        <hr />
        <div className="mt-3">
          <h4>List current role</h4>
          <TableRole
            listRole={listRole}
            fetchAllRole={fetchAllRole}
          ></TableRole>
        </div>
      </div>
    </div>
  );
};

export default Roles;
