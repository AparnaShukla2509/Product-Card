import { useState, useCallback } from "react";
import { generateContent } from "../api/generateContent";
import { validateProductForm } from "../utils/helpers";
import { ERROR_MESSAGES } from "../constants";

const useProductGenerator = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const resetForm = useCallback(() => {
    setProductName("");
    setCategory("");
    setGeneratedData(null);
    setError("");
    setFieldErrors({});
  }, []);

  const resetResult = useCallback(() => {
    setGeneratedData(null);
    setError("");
  }, []);

  const handleProductNameChange = useCallback((value) => {
    setProductName(value);
    if (fieldErrors.productName) {
      setFieldErrors((prev) => ({ ...prev, productName: "" }));
    }
  }, [fieldErrors.productName]);

  const handleCategoryChange = useCallback((value) => {
    setCategory(value);
    if (fieldErrors.category) {
      setFieldErrors((prev) => ({ ...prev, category: "" }));
    }
  }, [fieldErrors.category]);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    setError("");
    setFieldErrors({});

    const validation = validateProductForm(productName, category);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return false;
    }

    setLoading(true);
    setGeneratedData(null);

    try {
      const data = await generateContent(productName.trim(), category);
      setGeneratedData(data);
      return true;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.GENERATION_FAILED;
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [productName, category]);

  return {
    productName,
    category,
    generatedData,
    loading,
    error,
    fieldErrors,
    setProductName: handleProductNameChange,
    setCategory: handleCategoryChange,
    handleSubmit,
    resetForm,
    resetResult,
    isFormValid: productName.trim() && category,
  };
};

export default useProductGenerator;