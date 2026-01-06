import React from "react";
import { useProductGenerator } from "../hooks";
import { CATEGORIES } from "../constants";
import { Button, Input, Select, ProductCardSkeleton } from "./ui";
import ProductCard from "./ProductCard";
import "./ProductForm.css";

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L14.5 8.5L20 12L14.5 15.5L12 21L9.5 15.5L4 12L9.5 8.5L12 3Z" />
  </svg>
);

const ProductForm = () => {
  const {
    productName,
    category,
    generatedData,
    loading,
    error,
    fieldErrors,
    setProductName,
    setCategory,
    handleSubmit,
    resetResult,
  } = useProductGenerator();

  const handleRegenerate = () => {
    resetResult();
    handleSubmit();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Product Name"
          id="productName"
          value={productName}
          onChange={setProductName}
          placeholder="e.g., Smart Watch"
          error={fieldErrors.productName}
          required
          maxLength={50}
          disabled={loading}
        />

        <Select
          label="Category"
          id="category"
          value={category}
          onChange={setCategory}
          options={CATEGORIES}
          placeholder="Select a category"
          error={fieldErrors.category}
          required
          disabled={loading}
        />

        {error && (
          <div className="form-error" role="alert">
            <span className="form-error__icon">⚠</span>
            <span className="form-error__message">{error}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          loading={loading}
         
        >
          {loading ? "Generating..." : "Generate Details"}
        </Button>
      </form>

      {loading && <ProductCardSkeleton />}
      
      {generatedData && !loading && (
        <ProductCard data={generatedData} onRegenerate={handleRegenerate} />
      )}
    </div>
  );
};
export default ProductForm;