import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useImmer } from "use-immer";
import { v4 } from "uuid";
import { UserContext } from "../../context/UserContext";
import { fecthAllGroup } from "../../services/groupService";
import {
  assignRoleToGroup,
  getRoleByGroup,
  readRole,
} from "../../services/roleService";
import ModalGroup from "../modal/ModalGroup";
const GroupsStyle = styled.div``;
const Groups = () => {
  const navigate = useNavigate();
  const { checkRoleGroups } = useContext(UserContext);
  const [groupList, setGroupList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [selectGroup, setSelectGroup] = useState();
  const [assignRoleByGroup, setAssignRoleByGroup] = useImmer([]);
  const [openModal, setOpenModal] = useState(false);
  const fetchGroups = async () => {
    const res = await fecthAllGroup();
    if (res && +res.EC === 0) {
      setGroupList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  const fetchAllRole = async () => {
    const res = await readRole();
    if (+res.EC === 0) {
      setRoleList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  const buildDataRolesByGroup = (groupRole, allRole) => {
    let result = [];
    if (allRole && allRole.length > 0) {
      allRole.map((aRole) => {
        aRole.isAssigned = false;
        if (groupRole && groupRole.length > 0) {
          aRole.isAssigned = groupRole.some((gRole) => {
            return gRole.url === aRole.url;
          });
        }
        return result.push({
          id: aRole.id,
          url: aRole.url,
          desc: aRole.desc,
          isAssigned: aRole.isAssigned,
        });
      });
    }

    return result;
  };
  const filterRoleIdByGroup = () => {
    const resultRoleByGroup = [];
    assignRoleByGroup.forEach((item) => {
      if (item.isAssigned) {
        resultRoleByGroup.push({
          roleID: +item.id,
          groupID: +selectGroup,
        });
      }
    });
    return resultRoleByGroup;
  };
  const handleChaneGroup = async (value) => {
    setSelectGroup(value);
    const res = await getRoleByGroup(value);
    if (res && res.EC === 0) {
      let result = buildDataRolesByGroup(res.DT, roleList);
      setAssignRoleByGroup(result);
    } else {
      console.log(res.EM);
    }
  };
  const hanleSelectRole = (value) => {
    const findIndex = assignRoleByGroup.findIndex((item) => {
      return +item.id === +value;
    });
    if (findIndex > -1)
      setAssignRoleByGroup((draft) => {
        draft[findIndex].isAssigned = !draft[findIndex].isAssigned;
      });
  };
  const handleSaveGroup = async () => {
    const data = filterRoleIdByGroup();
    const res = await assignRoleToGroup(data);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
    }
    if (+res.EC === 1) {
      toast.warning(res.EM);
    }
  };
  useEffect(() => {
    if (checkRoleGroups === false) navigate("/");
  }, [checkRoleGroups]);
  useEffect(() => {
    fetchGroups();
    fetchAllRole();
  }, []);
  return (
    <GroupsStyle>
      <div className="container">
        <ModalGroup
          openModal={openModal}
          setOpenModal={setOpenModal}
        ></ModalGroup>
        <div className="mt-3 title d-flex justify-content-between">
          <h3>Group role: </h3>
          <button
            className="btn btn-warning"
            onClick={() => setOpenModal(true)}
          >
            Add new group
          </button>
        </div>
        <div className="select-group">
          <div className="form-group col-12 col-sm-6">
            <label htmlFor="group">
              Select group <span className="text-danger">(*)</span>
            </label>
            <select
              className="my-2 form-select"
              aria-label="Default select example"
              name="group"
              defaultValue={""}
              onChange={(e) => handleChaneGroup(e.target.value)}
            >
              {!selectGroup && <option value={""}>Please select group</option>}
              {groupList?.length > 0 &&
                groupList.map((group) => {
                  return (
                    <option key={+group.id} value={+group.id}>
                      {group.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <hr />
          {selectGroup && (
            <div className="role">
              {assignRoleByGroup.length > 0 &&
                assignRoleByGroup.map((role) => {
                  return (
                    <div className="my-2 form-check" key={v4()}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={role.id}
                        id={`list-role-[${role.id}]`}
                        checked={role.isAssigned}
                        disabled={+selectGroup === 1} //dev
                        onChange={(e) => hanleSelectRole(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`list-role-[${role.id}]`}
                      >
                        {role.desc}
                      </label>
                    </div>
                  );
                })}
              <div>
                <button
                  className="my-3 btn btn-warning"
                  disabled={+selectGroup === 1}
                  onClick={() => handleSaveGroup()}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </GroupsStyle>
  );
};

export default Groups;
