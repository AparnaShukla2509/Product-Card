import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatProductData } from "../utils/helpers";
import { Button } from "./ui";
import "./ProductCard.css";

const ProductCard = ({ data, onRegenerate }) => {
  const [showShareToast, setShowShareToast] = useState(false);
  const handleCopy = async () => {
    const formattedText = formatProductData(data);
  };

  return (
    <div className="product-card animate-fade-in">
      <div className="product-card__header">
        <h3 className="product-card__title">{data.title}</h3>
        <div className="product-card__actions">  
        </div>
      </div>

      <div className="product-card__description">
        <p>{data.description}</p>
      </div>

      <div className="product-card__tags">
        <span className="product-card__tags-label"></span>
        <div className="product-card__tags-list">
          {data.tags.map((tag, idx) => (
            <span key={idx} className="product-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {onRegenerate && (
        <div className="product-card__footer">
          
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onRegenerate: PropTypes.func,
};
export default ProductCard;