import React from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash"; //todo use more specific import to cut bundle size

export default function Tags({ tags }) {
  if (!tags) return null;
  return (
    <div className="tags" style={{ marginTop: "10px" }}>
      {tags.map((tag) => (
        <Link key={tag} className="tag" to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Link>
      ))}
    </div>
  );
}
