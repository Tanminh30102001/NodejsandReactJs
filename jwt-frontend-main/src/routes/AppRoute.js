import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/404/NotFoundPage";
import Layout from "../components/layout/Layout";
import Login from "../components/login/Login";
import Users from "../components/manage-user/Users";
import Register from "../components/register/Register";
import PrivateRoute from "./PrivateRoute";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Triangle } from "react-loader-spinner";
import Roles from "../components/roles/Roles";
import Groups from "../components/group/Groups";
import Posts from "../components/post/Posts";
import AddNewPost from "../components/post/AddNewPost";
import Categories from "../components/category/Categories";
import DetailPost from "../components/post/DetailPost";
import HomePage from "../components/home/HomePage";
import UpdatePost from "../components/post/UpdatePost";
import CategoryPage from "../components/category/CategoryPage";
import AuthorPage from "../components/author/AuthorPage";
import SearchPost from "../components/post/SearchPost";
const AppRoute = () => {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route
        element={
          !user.isLoading ? (
            <PrivateRoute></PrivateRoute>
          ) : (
            <div className="position-absolute top-50 start-50">
              <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          )
        }
      >
        <Route element={<Layout></Layout>}>
          <Route path={"/"} element={<HomePage></HomePage>}></Route>
          <Route path="/users" element={<Users></Users>}></Route>
          <Route path="/roles" element={<Roles></Roles>}></Route>
          <Route path="/groups" element={<Groups></Groups>}></Route>
          <Route path="/posts" element={<Posts></Posts>}></Route>
          <Route
            path="/post/add-new"
            element={<AddNewPost></AddNewPost>}
          ></Route>
          <Route
            path="/post/detail/:slug"
            element={<DetailPost></DetailPost>}
          ></Route>
          <Route
            path="/post/update/:slug"
            element={<UpdatePost></UpdatePost>}
          ></Route>
          <Route
            path="/post/search"
            element={<SearchPost></SearchPost>}
          ></Route>
          <Route path="/categories" element={<Categories></Categories>}></Route>
          <Route
            path="/category/:slug"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route
            path="/author/:username"
            element={<AuthorPage></AuthorPage>}
          ></Route>
        </Route>
      </Route>
      <Route path={"/login"} element={<Login></Login>}></Route>
      <Route path={"/register"} element={<Register></Register>}></Route>
      <Route path={"*"} element={<NotFoundPage></NotFoundPage>}></Route>
      {/* {!user.isLoading && user.isAuthenticated ? (
        <></>
      ) : (
        <Route element={<p>Loading</p>}></Route>
      )} */}
    </Routes>
  );
};

export default AppRoute;
