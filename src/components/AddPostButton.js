import React from "react";
import { Link } from "gatsby";

const AddPostButton = () => {
  return (
    <div
      className="buttons"
      style={{ position: "fixed", right: 0, margin: "15px" }}
    >
      <Link className="button is-rounded" to="/admin">
        + Add Post
      </Link>
    </div>
  );
};

export default AddPostButton;
