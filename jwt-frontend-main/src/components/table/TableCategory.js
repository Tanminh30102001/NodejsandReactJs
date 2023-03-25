import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { deleteCategory, getAllCategory } from "../../services/categoryService";
import Swal from "sweetalert2";
const TableCategory = ({ categoryList, fetchAllCategory }) => {
  const hanldeDeleteCategory = (category) => {
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
        const res = await deleteCategory(category.id);
        if (res && +res.EC === 0) {
          await fetchAllCategory();
          toast.success(res.EM);
        } else {
          toast.error(res.EM);
        }
      }
    });
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.length > 0 ? (
            categoryList.map((category) => {
              return (
                <tr key={v4()}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td className="gap-2 d-flex d-flex-col justify-content-center align-items-center">
                    <svg
                      style={{ cursor: "pointer" }}
                      onClick={() => hanldeDeleteCategory(category)}
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
            })
          ) : (
            <tr key={v4()}>
              <td>Not found users</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableCategory;
