import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { v4 } from "uuid";
import { createGroup } from "../../services/groupService";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { readRole } from "../../services/roleService";
const ModalGroup = ({ openModal, setOpenModal }) => {
  const [roleList, setRoleList] = useImmer();
  const [_roleList, _setRoleList] = useState();
  const [descGroup, setDescGroup] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [assignRoleByGroup, setAssignRoleByGroup] = useImmer([]);

  const fetchAllRole = async () => {
    const res = await readRole();
    if (+res.EC === 0) {
      setRoleList(res.DT);
      _setRoleList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  const hanleSelectRole = (value) => {
    const findIndex = _roleList.findIndex((item) => {
      return +item.id === +value;
    });
    const arr = [...roleList];

    arr[findIndex].isAssigned = !arr[findIndex].isAssigned;
    setAssignRoleByGroup(arr);
  };
  const handleChaneInput = (value) => {
    setNameGroup(value);
  };
  const handleSaveGroup = async () => {
    const data = assignRoleByGroup;
    const res = await createGroup({
      name: nameGroup,
      desc: descGroup,
      dataGroup: data,
    });
    if (+res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  useEffect(() => {
    fetchAllRole();
  }, []);
  return (
    <>
      <Modal
        show={openModal}
        onHide={() => setOpenModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="group">
                Name group <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                name="group"
                required
                id="disabledInput"
                className={`form-control my-2`}
                value={nameGroup}
                onChange={(e) => handleChaneInput(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="group">
                Description <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                name="desc"
                required
                id="disabledInput"
                className={`form-control my-2`}
                value={descGroup}
                onChange={(e) => setDescGroup(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6">
              {_roleList?.length > 0 &&
                _roleList?.map((role) => {
                  return (
                    <div className=" form-check" key={v4()}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        required
                        value={role.id}
                        id={`list-role-[${role.id}]`}
                        checked={role.isAssigned}
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
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={() => handleSaveGroup()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalGroup;
