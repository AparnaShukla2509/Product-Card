export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const formatProductData = (data) => {
  return `${data.title}\n\n${data.description}\n\nTags: ${data.tags.join(", ")}`;
};

export const validateProductForm = (productName, category) => {
  const errors = {};
  
  if (!productName?.trim()) {
    errors.productName = "Product name is required";
  } else if (productName.trim().length < 2) {
    errors.productName = "Product name must be at least 2 characters";
  } else if (productName.trim().length > 50) {
    errors.productName = "Product name must be less than 50 characters";
  }
  
  if (!category) {
    errors.category = "Please select a category";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};