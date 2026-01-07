import "./ProductsSkeleton.css";

const ProductsSkeleton = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-image shimmer"></div>

          <div className="skeleton-content">
            <div className="skeleton-line shimmer"></div>
            <div className="skeleton-line short shimmer"></div>

            <div className="skeleton-price shimmer"></div>
            <div className="skeleton-button shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
