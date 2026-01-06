import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils/helpers";
import "./Skeleton.css";

const Skeleton = ({
  variant = "text",
  width,
  height,
  borderRadius,
  className,
  count = 1,
}) => {
  const style = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <span
      key={index}
      className={classNames("skeleton", `skeleton--${variant}`, className)}
      style={style}
      aria-hidden="true"
    />
  ));

  return count > 1 ? <>{skeletons}</> : skeletons[0];
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(["text", "rectangular", "circular"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  count: PropTypes.number,
};

const ProductCardSkeleton = () => (
  <div className="product-card-skeleton" aria-label="Loading product details">
    <Skeleton variant="text" height={32} width="70%" className="skeleton--title" />
    <Skeleton variant="text" height={20} width={60} className="skeleton--subtitle" />
    <Skeleton variant="rectangular" height={120} borderRadius={14} className="skeleton--description" />
    <div className="skeleton-tags">
      <Skeleton variant="rectangular" width={80} height={36} borderRadius={25} />
      <Skeleton variant="rectangular" width={100} height={36} borderRadius={25} />
      <Skeleton variant="rectangular" width={70} height={36} borderRadius={25} />
      <Skeleton variant="rectangular" width={90} height={36} borderRadius={25} />
    </div>
  </div>
);

export { Skeleton, ProductCardSkeleton };
export default Skeleton;
