import React from "react";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import AniLink from "gatsby-plugin-transition-link/AniLink";

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
        <AniLink
          cover
          duration={1}
          bg="
            url(https://i2.wp.com/files.123freevectors.com/wp-content/original/165341-pastel-rainbow-curved-stripes-background.jpg)
            center / cover   /* position / size */
            no-repeat        /* repeat */
            fixed            /* attachment */
            padding-box      /* origin */
            content-box      /* clip */
            white            /* color */
          "
          className="title has-text-primary is-size-4"
          to={slug}
        >
          {title}
        </AniLink>
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
