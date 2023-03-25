import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserAccount } from "../services/userService";
const UserContext = createContext({});
const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const defaultUserData = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(defaultUserData);
  const [checkRoleUsers, setCheckRoleUsers] = useState();
  const [checkRoleCategories, setCheckRoleCategories] = useState();
  const [checkRoleGroups, setCheckRoleGroups] = useState();
  const [checkRoleRoles, setCheckRoleRoles] = useState();
  const [checkRolePosts, setCheckRolePosts] = useState();
  const [listRole, setListRole] = useState([]);
  const login = (userData) => {
    setUser({ ...userData, isLoading: false });
  };
  const logoutContext = () => {
    setUser({ ...defaultUserData, isLoading: false });
  };
  const fetchUser = async () => {
    let res = await getUserAccount();
    if (+res?.EC === -1) {
      setUser({ ...defaultUserData, isLoading: false });
      navigate("/login");
    }
    if (res && +res?.EC === 0) {
      setUser({
        isLoading: false,
        isAuthenticated: true,
        access_token: res.DT.access_token,
        account: {
          id: res.DT.id,
          role: res.DT.role,
          email: res.DT.email,
          username: res.DT.username,
          groupID: res.DT.groupID,
        },
      });
      setListRole(res?.DT.role);
    }
  };
  const isRoleUsers = () => {
    const roleUsers =
      listRole?.length > 0 &&
      listRole?.some((item) => {
        return (
          item.url === "/user/read" ||
          item.url === "/user/delete" ||
          item.url === "/user/update" ||
          item.url === "/user/create"
        );
      });
    setCheckRoleUsers(roleUsers);
  };
  const isRoleCategory = () => {
    const roleCategry =
      listRole?.length > 0 &&
      listRole?.some((item) => {
        return item.url === "/category/read" || item.url === "/category/create";
      });
    setCheckRoleCategories(roleCategry);
  };
  const isRoleGroups = () => {
    const roleGroup =
      listRole?.length > 0 &&
      listRole?.some((item) => {
        return item.url === "/group/read" || item.url === "/group/create";
      });
    setCheckRoleGroups(roleGroup);
  };
  const isRoleRoles = () => {
    const roleRoles =
      listRole?.length > 0 &&
      listRole?.some((item) => {
        return (
          item.url === "/role/read" ||
          item.url === "/role/create" ||
          item.url === "/role/update" ||
          item.url === "/role/delete" ||
          item.url === "/role/by-group" ||
          item.url === "/role/assign-to-group"
        );
      });
    setCheckRoleRoles(roleRoles);
  };
  const isRolePosts = () => {
    const rolePosts =
      listRole?.length > 0 &&
      listRole?.some((item) => {
        return (
          item.url === "/post/read" ||
          item.url === "/post/delete" ||
          item.url === "/post/update" ||
          item.url === "/post/create" ||
          item.url === "/post/read/hot"
        );
      });
    setCheckRolePosts(rolePosts);
  };

  useEffect(() => {
    isRoleUsers();
    isRoleCategory();
    isRoleGroups();
    isRoleRoles();
    isRolePosts();
  }, [listRole]);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logoutContext,
        fetchUser,
        setUser,
        defaultUserData,
        checkRoleUsers,
        checkRoleRoles,
        checkRoleGroups,
        checkRoleCategories,
        checkRolePosts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
