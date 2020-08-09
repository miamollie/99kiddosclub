import React, { useEffect, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { useFilters } from "./hooks/useFilters";
import Filters from "./Filters";

function BlogRoll() {
  const data = useStaticQuery(query);
  const { edges: posts, group: allTags } = data.allMarkdownRemark;
  const [activePosts, setActivePosts] = useState(posts);
  const initialFilters = allTags.map((t) => t.fieldValue);
  const { activeFilters, isActive, toggle, selectAll, clearAll } = useFilters({
    initialFilters,
  });

  //todo move to lib and test, usecallback
  function filterPosts(arr, activeFilters) {
    return arr.filter(
      ({
        node: {
          frontmatter: { tags },
        },
      }) => {
        return tags.some((t) => activeFilters.includes(t));
      }
    );
  }

  useEffect(() => {
    setActivePosts(filterPosts(posts, activeFilters));
  }, [posts, activeFilters]); //usememo over the dep array..???

  return (
    <div className="columns is-multiline">
      <Filters
        filters={allTags}
        isActive={isActive}
        toggle={toggle}
        selectAll={selectAll}
        clearAll={clearAll}
      />
      {!activePosts.length
        ? "no posts"
        : activePosts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification`}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Read post →
                  </Link>
                </p>
              </article>
            </div>
          ))}
    </div>
  );
}

export default BlogRoll;

const query = graphql`
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            templateKey
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
