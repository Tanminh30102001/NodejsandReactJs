import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
const SearchInput = () => {
  // const fetchPos
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/post/search?keyword=${slugify(searchValue)}`);
      setSearchValue("");
    }
  };
  return (
    <input
      type="text"
      name="key-post"
      className="form-control"
      placeholder="Search your post..."
      style={{ width: "300px" }}
      value={searchValue}
      onKeyPress={(e) => handleEnter(e)}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};

export default SearchInput;
