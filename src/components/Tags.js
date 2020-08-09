import React from "react";

export default function Tags({ tags }) {
  if (!tags) return null;
  return (
    <div className="tags" style={{ marginTop: "10px" }}>
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
