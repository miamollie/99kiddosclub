import React from "react";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { Link } from "gatsby";
import Tags from "./Tags";

export default function PostPreview({ imgSrc, excert, slug, title, tags }) {
  return (
    <article className="card">
      <div className="card-image">
        <figure className="image">
          <PreviewCompatibleImage
            imageInfo={{
              image: imgSrc,
            }}
          />
        </figure>
      </div>
      <div className="card-content">
        <Link className="title has-text-primary is-size-4" to={slug}>
          {title}
        </Link>
        <div className="media">
          <div className="content">
            {excert}
            <br />
            <br />
            <footer className="card-footer">
              <Tags tags={tags} />
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
