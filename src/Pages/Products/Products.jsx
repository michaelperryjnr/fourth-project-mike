import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { BsCart, BsEnvelope } from "react-icons/bs";
import DefaultLayout from "../../Layout/DefaultLayout";
import SideBar from "./SideBar";
import Data from "../../data";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState(Data.categories);
  const [products, setProducts] = useState(Data.products);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get("search") || "";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const pageFromUrl = searchParams.get("page");
    return pageFromUrl ? parseInt(pageFromUrl) : 1;
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handleCategoryToggle = (category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchQuery("");

    if (searchParams.get("category") === category) {
      newParams.delete("category");
      newParams.delete("subcategory");
    } else {
      newParams.set("category", category);
      newParams.delete("subcategory");
    }

    newParams.set("page", "1");
    setCurrentPage(1);
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (searchValue) => {
    const newParams = new URLSearchParams(searchParams);

    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }

    newParams.set("page", "1");
    setCurrentPage(1);
    setSearchParams(newParams);
  };

  const handleSubCategoryToggle = (subCategory) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete("search");
    setSearchQuery("");

    if (searchParams.get("subcategory") === subCategory) {
      newParams.delete("subcategory");
    } else {
      newParams.set("subcategory", subCategory);
    }

    newParams.set("page", "1");
    setCurrentPage(1);
    setSearchParams(newParams);
  };

  const toggleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const categoryQuery = searchParams.get("category");
  const idQuery = searchParams.get("id");
  const subCategoryQuery = searchParams.get("subcategory");
  const nameQuery = searchParams.get("name");

  useEffect(() => {
    setIsFilterLoading(true);

    const timer = setTimeout(() => {
      setIsFilterLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    setSearchQuery(searchFromUrl || "");
  }, [searchParams]);

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  const normalizeText = (text) => {
    if (!text) return "";
    return text.toLowerCase().replace(/[\s-]+/g, "");
  };

  const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      const normalizedQuery = normalizeText(searchQuery);
      const normalizedName = normalizeText(product.name);
      const normalizedCategory = normalizeText(product.categories[0].name);
      const normalizedSubCategory = normalizeText(
        product.categories[0].subcategories[0].name
      );
      const normalizedDescription = normalizeText(product.details.description);

      if (
        !normalizedName.includes(normalizedQuery) &&
        !normalizedDescription.includes(normalizedQuery) &&
        !normalizedCategory.includes(normalizedQuery) &&
        !normalizedSubCategory.includes(normalizedQuery)
      ) {
        return false;
      }
    }

    if (categoryQuery) {
      const normalizedCategoryQuery = normalizeText(categoryQuery);
      const normalizedCategory = normalizeText(product.categories[0].name);

      if (normalizedCategory !== normalizedCategoryQuery) {
        return false;
      }
    }

    if (subCategoryQuery) {
      const normalizedSubCategoryQuery = normalizeText(subCategoryQuery);

      if (
        !product.categories[0].subcategories ||
        product.categories[0].subcategories.length === 0
      ) {
        return false;
      }

      const matches = product.categories[0].subcategories.some(
        (subcategory) => {
          const normalizedSubCategory = normalizeText(subcategory.name);
          return normalizedSubCategory === normalizedSubCategoryQuery;
        }
      );

      if (!matches) {
        return false;
      }
    }

    if (idQuery && product.id !== Number.parseInt(idQuery)) {
      return false;
    }

    if (nameQuery) {
      const normalizedNameQuery = normalizeText(nameQuery);
      const normalizedName = normalizeText(product.name);

      if (!normalizedName.includes(normalizedNameQuery)) {
        return false;
      }
    }

    return true;
  });

  const latestProducts = products.slice(0, 4);

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const handlePageChange = (page) => {
    setIsFilterLoading(true);
    const newParams = new URLSearchParams(searchParams);

    newParams.set("page", page.toString());

    setSearchParams(newParams);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageFromUrl = parseInt(searchParams.get("page") || "1");

    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, pageFromUrl - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(1)}
            disabled={pageFromUrl === 1}
            className={`px-3 py-1 rounded-md ${
              pageFromUrl === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            First
          </button>

          {pageFromUrl > 1 && (
            <button
              onClick={() => handlePageChange(pageFromUrl - 1)}
              className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Prev
            </button>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded-md ${
                pageFromUrl === number
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}

          {pageFromUrl < totalPages && (
            <button
              onClick={() => handlePageChange(pageFromUrl + 1)}
              className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Next
            </button>
          )}

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={pageFromUrl === totalPages}
            className={`px-3 py-1 rounded-md ${
              pageFromUrl === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Last
          </button>
        </nav>
        <div className="ml-4 text-sm text-gray-500 self-center">
          Page {pageFromUrl} of {totalPages}
        </div>
      </div>
    );
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  // No items found component
  const NoItemsFound = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        No items found
      </h3>
      <p className="text-gray-600 mb-6">
        However, we can get that for you. We specialize in custom military and
        tactical equipment. Send us an enquiry and we'll help you find exactly
        what you need.
      </p>
      <Link
        to="/contactus"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        <BsEnvelope className="mr-2" /> Send Enquiry
      </Link>
    </div>
  );

  return (
    <DefaultLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - now handles both mobile and desktop */}
              <SideBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSearchParams={setSearchParams}
                categories={categories}
                activeCategory={activeCategory}
                toggleCategory={toggleCategory}
                categoryQuery={categoryQuery}
                subCategoryQuery={subCategoryQuery}
                latestProducts={latestProducts}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
                handleCategoryToggle={handleCategoryToggle}
                handleSubCategoryToggle={handleSubCategoryToggle}
                handleSearchSubmit={handleSearchSubmit}
              />

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Our Products
                  </h1>
                  <p className="text-gray-600">
                    Browse our extensive collection of military and tactical
                    equipment. With over 15 years of experience, we specialize
                    in high-quality military uniforms, tactical gear, and
                    customized solutions.
                  </p>
                </div>

                {/* Products Grid */}
                {isFilterLoading ? (
                  <LoadingSpinner />
                ) : filteredProducts.length === 0 ? (
                  <NoItemsFound />
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {currentProducts.map((product, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <Link to={`/product/${product.slug}`} className="block">
                          <div className="relative w-full pb-[100%] overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                              src={product.image || "/placeholder.jpg"}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900 overflow-hidden text-ellipsis line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 overflow-hidden text-ellipsis line-clamp-3">
                              {product.details.description}
                            </p>
                            <div className="flex justify-between items-start gap-2 flex-col">
                              <span className="text-xs text-gray-500">
                                {product.categories[0].name +
                                  " | " +
                                  (product.categories[0].subcategories &&
                                  product.categories[0].subcategories[0]
                                    ? product.categories[0].subcategories[0]
                                        .name
                                    : "No subcategory")}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
                              >
                                <span>Add to Inquiry</span>
                                <BsCart className="ml-1 h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Pagination */}
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Products;
