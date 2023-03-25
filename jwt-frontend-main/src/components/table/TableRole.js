import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { v4 } from "uuid";
import { deleteRole, readRole } from "../../services/roleService";

const TableRole = ({ listRole, fetchAllRole }) => {
  const handleDeleteRole = async (role) => {
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
        const res = await deleteRole(role.id);
        if (res && +res.EC === 0) {
          await fetchAllRole();
          toast.success(res.EM);
        } else {
          toast.error(res.EM);
        }
      }
    });
  };
  return (
    <table className="table table-hover table-bordered">
      <thead className="table-primary">
        <tr>
          <th scope="col">#</th>
          <th scope="col">URL</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {listRole?.length > 0 &&
          listRole.map((role) => {
            return (
              <tr key={v4()}>
                <td>{role.id}</td>
                <td>{role.url}</td>
                <td>{role.desc}</td>
                <td className="gap-2 d-flex d-flex-col justify-content-center align-items-center">
                  <svg
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteRole(role)}
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8.5H13.5"
                      stroke="#eb3b5a"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 16.5H8"
                      stroke="#eb3b5a"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 16.5H14.5"
                      stroke="#eb3b5a"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H13.5"
                      stroke="#eb3b5a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.3086 8.18957L21.1886 4.30957"
                      stroke="#eb3b5a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M21.1886 8.18957L17.3086 4.30957"
                      stroke="#eb3b5a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableRole;
