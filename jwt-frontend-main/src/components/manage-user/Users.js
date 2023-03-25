import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteUser, getUserWithPaginate } from "../../services/userService";
import ReactPaginate from "react-paginate";
import ModalUser from "../modal/ModalUser";
import TableUser from "../table/TableUser";
import { useImmer } from "use-immer";
import _ from "lodash";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const UsersStyle = styled.div``;
const Users = () => {
  const navigate = useNavigate();
  const { checkRoleUsers } = useContext(UserContext);
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useImmer(1);
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});
  const limit = 6;
  const fetchDataPaginate = async () => {
    const res = await getUserWithPaginate(currentPage, limit);
    if (res && +res?.EC === 0) {
      const { totalPage, users } = res?.DT;
      setTotalPage(totalPage);
      if (totalPage > 0 && users.length === 0) {
        setCurrentPage(totalPage);
        await getUserWithPaginate(totalPage, limit);
      }
      if (totalPage > 0 && users.length > 0) {
        setListUser(users);
      }
    }
  };
  useEffect(() => {
    fetchDataPaginate();
  }, [currentPage]);
  useEffect(() => {
    if (!checkRoleUsers) navigate("/");
  }, [checkRoleUsers]);
  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const res = await deleteUser(user.id);
        if (res && +res.EC === 0) {
          await fetchDataPaginate();
        } else {
          toast.error(res.EC);
        }
      }
    });
  };
  const handleOpenModalCreate = async () => {
    setIsShowModalCreate(true);
    setActionModalUser("CREATE");
  };
  const handleOpenModalEdit = async (user) => {
    setIsShowModalCreate(true);
    setActionModalUser("EDIT");
    setDataModalUser(user);
  };
  const handleClose = () => {
    setIsShowModalCreate(false);
    setDataModalUser({});
    setActionModalUser("");
  };
  //Modal User
  const handleSearchEmail = (e) => {
    const _listUser = _.cloneDeep(listUser);
    let term = e.target.value;
    const searchListUser = _listUser.filter((item) => {
      return item.email.includes(term);
    });
    if (term) {
      setListUser(searchListUser);
    } else {
      fetchDataPaginate();
    }
  };
  return (
    <UsersStyle className="container manage-users-container">
      <ModalUser
        action={actionModalUser}
        // userData, setUserData
        isShowModalCreate={isShowModalCreate}
        handleClose={() => handleClose()}
        fetchDataPaginate={fetchDataPaginate}
        dataModalUser={dataModalUser}
      ></ModalUser>
      <div className="py-3 users-header d-flex justify-content-between">
        <h3>Table user</h3>
        <div className="gap-3 actions d-flex ">
          <button
            className="btn btn-success"
            onClick={() => fetchDataPaginate()}
          >
            Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModalCreate()}
          >
            Add new user
          </button>
        </div>
      </div>
      <div className="table-user">
        <div className="mb-3 col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search your email"
            onChange={(e) => handleSearchEmail(e)}
          />
        </div>
        <TableUser
          handleDeleteUser={handleDeleteUser}
          handleOpenModalEdit={handleOpenModalEdit}
          listUser={listUser}
        ></TableUser>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={+currentPage - 1}
        />
      </div>
    </UsersStyle>
  );
};

export default Users;
