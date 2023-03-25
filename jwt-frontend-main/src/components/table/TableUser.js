import React from "react";
import { v4 } from "uuid";

const TableUser = ({ listUser, handleOpenModalEdit, handleDeleteUser }) => {
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Group</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.length > 0 ? (
            listUser.map((user) => {
              return (
                <tr key={v4()}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user?.Group?.name || ""}</td>
                  <td className="gap-2 d-flex d-flex-col justify-content-center align-items-center">
                    <svg
                      style={{ cursor: "pointer" }}
                      width="30"
                      onClick={() => handleOpenModalEdit(user)}
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.99609 8.5H11.4961"
                        stroke="#f7b731"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.99609 16.5H7.99609"
                        stroke="#f7b731"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.4961 16.5H14.4961"
                        stroke="#f7b731"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.9961 12.03V16.11C21.9961 19.62 21.1061 20.5 17.5561 20.5H6.43609C2.88609 20.5 1.99609 19.62 1.99609 16.11V7.89C1.99609 4.38 2.88609 3.5 6.43609 3.5H14.4961"
                        stroke="#f7b731"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.0761 4.13006L15.3661 7.84006C15.2261 7.98006 15.0861 8.26006 15.0561 8.46006L14.8561 9.88006C14.7861 10.3901 15.1461 10.7501 15.6561 10.6801L17.0761 10.4801C17.2761 10.4501 17.5561 10.3101 17.6961 10.1701L21.4061 6.46006C22.0461 5.82006 22.3461 5.08006 21.4061 4.14006C20.4561 3.19006 19.7161 3.49006 19.0761 4.13006Z"
                        stroke="#f7b731"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5461 4.65991C18.8661 5.78991 19.7461 6.66991 20.8661 6.97991"
                        stroke="#f7b731"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteUser(user)}
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

export default TableUser;
