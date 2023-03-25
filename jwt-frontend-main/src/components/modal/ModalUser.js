import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fecthAllGroup } from "../../services/groupService";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useImmer } from "use-immer";
import { createUser, updateUser } from "../../services/userService";
const ModalUser = (props) => {
  const {
    isShowModalCreate,
    handleClose,
    fetchDataPaginate,
    dataModalUser,
    action,
    ...rest
  } = props;
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "Male",
    group: "",
  };
  const defaultValidInput = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  // console.log(dataModalUser?.Group?.id);
  const [groupList, setGroupList] = useState([]);
  const [userData, setUserData] = useImmer(defaultUserData);
  const [validInput, setValidInput] = useImmer(defaultValidInput);
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fecthAllGroup();
      if (res && +res.EC === 0) {
        setGroupList(res.DT);
        if (res.DT.length > 0) {
          setUserData((draft) => {
            draft.group = +res.DT[0].id;
          });
        }
      }
    };
    fetchGroups();
  }, []);
  useEffect(() => {
    if (action === "EDIT") {
      setUserData({
        id: dataModalUser.id,
        email: dataModalUser.email,
        phone: dataModalUser.phone,
        username: dataModalUser.username,
        password: "",
        address: dataModalUser.address,
        sex: dataModalUser.sex,
        group: dataModalUser?.Group?.id,
      });
    } else {
      setUserData(defaultUserData);
    }
  }, [dataModalUser]);
  const checkValidInput = () => {
    if (action === "EDIT") return true;
    let arr = ["email", "password", "phone", "username"];
    let check = true;
    for (let index = 0; index < arr.length; index++) {
      if (!userData[arr[index]]) {
        toast.error(`Empty input ${arr[index]}`);
        setValidInput((draft) => {
          draft[arr[index]] = false;
        });
        check = false;
        break;
      } else {
        setValidInput((draft) => {
          draft[arr[index]] = true;
        });
      }
    }
    return check;
  };
  const handleChaneInput = (value, name) => {
    setUserData((draft) => {
      draft[name] = value;
    });
  };
  const handleConfirmUser = async () => {
    if (checkValidInput()) {
      if (action === "EDIT") {
        const res = await updateUser(userData);
        if (res.EC === 0) {
          toast.success(res.EM);
          await fetchDataPaginate();
        }
      }
      if (action === "CREATE") {
        const res = await createUser(userData);
        if (res.EC === 0) {
          toast.success(res.EM);
          setUserData(defaultUserData);
          await fetchDataPaginate();
        }
      }
    }
    //
  };
  return (
    <>
      <Modal
        {...rest}
        onHide={handleClose}
        show={isShowModalCreate}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {action === "CREATE" ? "Create new user" : "Update user"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-modal row">
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="email">
                Email <span className="text-danger">(*)</span>
              </label>
              <input
                type="email"
                name="email"
                disabled={action === "EDIT" && true}
                id="disabledInput"
                className={`form-control ${
                  validInput.email ? "" : "is-invalid"
                }`}
                value={userData.email}
                onChange={(e) =>
                  handleChaneInput(e.target.value, e.target.name)
                }
              />
            </div>
            <div className="py-2 col-12 col-sm-6 form-group">
              <label htmlFor="phone">
                Phone <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                name="phone"
                disabled={action === "EDIT" && true}
                id="disabledInput"
                className={`form-control ${
                  validInput.phone ? "" : "is-invalid"
                }`}
                value={userData.phone}
                onChange={(e) =>
                  handleChaneInput(e.target.value, e.target.name)
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="username">
                Username <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                name="username"
                className={`form-control ${
                  validInput.username ? "" : "is-invalid"
                }`}
                value={userData.username}
                onChange={(e) =>
                  handleChaneInput(e.target.value, e.target.name)
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label htmlFor="password">
                    Password <span className="text-danger">(*)</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      validInput.password ? "" : "is-invalid"
                    }`}
                    value={userData.password}
                    onChange={(e) =>
                      handleChaneInput(e.target.value, e.target.name)
                    }
                  />
                </>
              )}
            </div>
            <div className="py-2 col-12 col-sm-12 form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                className={`form-control ${
                  validInput.address ? "" : "is-invalid"
                }`}
                value={userData.address}
                onChange={(e) =>
                  handleChaneInput(e.target.value, e.target.name)
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="sex">sex</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="sex"
                defaultValue={dataModalUser?.sex}
                onChange={(e) =>
                  handleChaneInput(e.target.value, e.target.name)
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="group">
                Group <span className="text-danger">(*)</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="group"
                defaultValue={dataModalUser?.Group?.id}
                onClick={(e) =>
                  handleChaneInput(+e.target.value, e.target.name)
                }
              >
                {groupList?.length > 0 &&
                  groupList.map((group) => {
                    return (
                      <option key={group.id} value={+group.id}>
                        {group.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmUser();
            }}
          >
            {action === "EDIT" ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
