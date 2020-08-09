import React, { useEffect, useState } from "react";
import { useFilters } from "./hooks/useFilters";
import { graphql, useStaticQuery } from "gatsby";
import Filters from "./Filters";
import PostPreview from "./PostPreview";

function BlogRoll() {
  const data = useStaticQuery(query);
  const { edges: posts, group: allTags } = data.allMarkdownRemark;
  const [activePosts, setActivePosts] = useState(posts);
  const initialFilters = allTags.map((t) => t.fieldValue);
  const { activeFilters, isActive, toggle, selectAll, clearAll } = useFilters({
    initialFilters,
  });

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
  }, [posts, activeFilters]);

  return (
    <div className="columns is-multiline">
      <Filters
        filters={allTags}
        isActive={isActive}
        toggle={toggle}
        selectAll={selectAll}
        clearAll={clearAll}
      />
      {!activePosts.length ? (
        <div>
          <h3>No posts found</h3>
        </div>
      ) : (
        activePosts.map(({ node: post }) => (
          <div className="is-parent column is-4" key={post.id}>
            <PostPreview
              slug={post.fields.slug}
              title={post.frontmatter.title}
              imgSrc={post.frontmatter.featuredimage}
              excert={post.excerpt}
              tags={post.frontmatter.tags}
            />
          </div>
        ))
      )}
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
          excerpt(pruneLength: 150)
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
