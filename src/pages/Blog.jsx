import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import Section from "../components/ui/Section";
import "./Blog.css";

function Blog() {
  if (!siteConfig.blog.show || siteConfig.blog.posts.length === 0) {
    return (
      <Section eyebrow="Blog" title="Coming soon">
        <div className="blog-empty">
          <p>
            I&apos;m planning to write here soon — about React, Python, mobile
            development, and lessons from building production apps.
          </p>
          <p className="text-dim">
            Once posts are live, you&apos;ll see them on this page.
          </p>
          <Link to="/" className="btn btn-secondary blog-empty-cta">
            Back home
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section
      eyebrow="Blog"
      title="Articles"
      subtitle="Notes on what I'm building and learning."
    >
      <div className="blog-grid">
        {siteConfig.blog.posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <p className="blog-card-date">{post.date}</p>
            <h3 className="blog-card-title">
              <a href={post.url} target="_blank" rel="noreferrer">
                {post.title}
              </a>
            </h3>
            <p className="blog-card-excerpt">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default Blog;
