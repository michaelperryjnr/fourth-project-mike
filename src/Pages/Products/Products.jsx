"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  BsSearch,
  BsCart,
  BsFilter,
  BsChevronDown,
  BsChevronRight,
  BsEnvelope,
  BsX,
} from "react-icons/bs";
import DefaultLayout from "../../Layout/DefaultLayout";
import SideBarContactUs from "./SideBarContactUs";
import SideBarLatestProducts from "./SideBarLatestProducts";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const toggleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const categoryQuery = searchParams.get("category");
  const idQuery = searchParams.get("id");
  const subCategoryQuery = searchParams.get("subCategory");
  const nameQuery = searchParams.get("name");

  // Initial page load effect
  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (
      categoryQuery ||
      subCategoryQuery ||
      idQuery ||
      nameQuery ||
      searchQuery
    ) {
      setIsFilterLoading(true);

      // Simulate loading delay, temp till db fetch is added
      const timer = setTimeout(() => {
        setIsFilterLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [categoryQuery, subCategoryQuery, idQuery, nameQuery, searchQuery]);

  // this useEffect to reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryQuery, subCategoryQuery, idQuery, nameQuery, searchQuery]);

  const categories = [
    {
      id: 1,
      name: "Military",
      subcategories: [
        "Uniforms",
        "Tactical Uniforms",
        "Military Beret, Cap & Hat",
        "Ceremonial Uniforms",
        "Military Boots",
        "Bulletproof vest / Equipment",
        "Military Bags",
        "Protective Knee Cap",
      ],
    },
    {
      id: 2,
      name: "Police",
      subcategories: [
        "Police Uniforms",
        "Police Boots",
        "Ceremonial Uniforms",
        "Bulletproof vest / Equipment",
        "Reflective Clothing",
        "Protective Knee Cap",
      ],
    },
    {
      id: 3,
      name: "School Uniform",
      subcategories: ["High School", "College", "Polo T-shirts"],
    },
    {
      id: 4,
      name: "Private Security",
      subcategories: [
        "Security Officer Uniforms",
        "Sequence Tactical Jacket",
        "Reflective Clothing",
      ],
    },
    {
      id: 5,
      name: "Tactical Wear/Gear",
      subcategories: ["Tactical Glasses", "Tactitcal Gloves", "Tacitcal Belts"],
    },
    {
      id: 6,
      name: "Workwear",
      subcategories: [
        "Work clothing",
        "Chef Clothing",
        "Hotel Uniforms",
        "Aviation Uniforms",
        "Workwear Shirts",
      ],
    },
  ];

  const products = [
    {
      id: 1,
      name: "ACU Camo Military Uniforms",
      image:
        "https://www.corhunter-garment.com/uploads/202337095/small/acu-military-uniform7366b4a7-b5f9-4a14-bc6d-3b09569c915d.jpg",
      category: "Military Combat Uniform",
      subcategory: "ACU uniform",
      description:
        "Customization: Min. Order: 500 Sets. Material: 65% Polyester 35% Cotton. Feature: Ripstop.",
      url: "/product/acu-camo-military-uniforms",
    },
    {
      id: 2,
      name: "BDU Military Uniform",
      image:
        "https://www.corhunter-garment.com/uploads/202237095/small/bdu-military-uniform58106687049.jpg",
      category: "Military Combat Uniform",
      subcategory: "BDU uniform",
      description:
        "65% polyester and 35% cotton, plaid camouflage, light, durable, breathable, protective",
      url: "/product/bdu-military-uniform",
    },
    {
      id: 3,
      name: "Frog Suit G2 Military Dress Uniforms",
      image:
        "https://www.corhunter-garment.com/uploads/202237095/small/frog-suit-g2-military-dress-uniforms21056765128.jpg",
      category: "Military Combat Uniform",
      subcategory: "Frog Suit",
      description:
        "Customization: Min. Order: 1000 Sets. Material: 65% Polyester 35% Cotton. Feature: Anti-Static.",
      url: "/product/frog-suit-g2-military-dress-uniforms",
    },
    {
      id: 4,
      name: "ACU Camouflage Combat Uniforms",
      image:
        "https://www.corhunter-garment.com/uploads/202337095/small/acu-camouflage-combat-uniforms-tc65-35-fabric78a70e99-1fdf-42ea-b456-15c85fdb6521.jpg",
      category: "Military Combat Uniform",
      subcategory: "ACU uniform",
      description:
        "Customization: Min. Order: 1000 Sets. Material: 65% Polyester 35% Cotton. Feature: Breathable.",
      url: "/product/acu-camouflage-combat-uniforms",
    },
    {
      id: 5,
      name: "ACU Digital Ocean Camouflage Uniforms",
      image:
        "https://www.corhunter-garment.com/uploads/202337095/small/acu-digital-ocean-camouflage-uniforms6ac2c9a1-81f8-4273-b6c2-e1e3d8727d54.jpg",
      category: "Military Combat Uniform",
      subcategory: "ACU uniform",
      description:
        "Customization: Min. Order: 1000 Sets. Material: 65% Polyester 35% Cotton. Feature: Breathability.",
      url: "/product/acu-digital-ocean-camouflage-uniforms",
    },
    {
      id: 6,
      name: "Custom Black Python Camouflage ACU Uniform",
      image:
        "https://www.corhunter-garment.com/uploads/202337095/small/custom-black-python-camouflage-acu-uniform88317719-8e1b-407d-8286-d5038cdcb922.jpg",
      subcategory: "ACU uniform",
      description:
        "Customization: Min. Order: 1000 Sets. Material: 65% Polyester 35% Cotton. Feature: Durable.",
      url: "/product/custom-black-python-camouflage-acu-uniform",
    },
    {
      id: 7,
      name: "In Stock ACU Uniform Digital Jungle Camouflage",
      image:
        "https://www.corhunter-garment.com/uploads/202337095/small/in-stock-acu-uniform-digital-jungle272109db-3d8f-4bdd-adf5-38da06afd89c.jpg",
      category: "Military Combat Uniform",
      subcategory: "ACU uniform",
      description:
        "Customization: Min. Order: 1000 Sets. Material: 65% Polyester 35% Cotton. Feature: Waterproof.",
      url: "/product/in-stock-acu-uniform-digital-jungle",
    },
    {
      id: 8,
      name: "G3 Outdoor Training Frog Suit Physical Fitness Uniform",
      image:
        "https://www.corhunter-garment.com/uploads/37095/small/g3-outdoor-training-frog-suit-physicalfb262.jpg",
      category: "Military Combat Uniform",
      subcategory: "Frog Suit",
      description:
        "Camouflage tactical frog suit, made of elastic fabric, breathable and skin-friendly, soft and comfortable.",
      url: "/product/g3-outdoor-training-frog-suit-physical",
    },
    {
      id: 9,
      name: "Python Pattern Camouflage Long-sleeved Soldier Outdoor Frog Uniform",
      image:
        "https://www.corhunter-garment.com/uploads/37095/small/desert-python-pattern-camouflage-long-sleeved5c8de.jpg",
      category: "Military Combat Uniform",
      subcategory: "Frog Suit",
      description:
        "Camouflage tactical frog suit, made of elastic fabric, breathable and skin-friendly, soft and comfortable.",
      url: "/product/desert-python-pattern-camouflage-long-sleeved",
    },
  ];

  // Helper function to normalize text for searching
  const normalizeText = (text) => {
    if (!text) return "";
    return text.toLowerCase().replace(/[\s-]+/g, "");
  };

  const filteredProducts = products.filter((product) => {
    // First filter by search query if it exists
    if (searchQuery) {
      const normalizedQuery = normalizeText(searchQuery);
      const normalizedName = normalizeText(product.name);
      const normalizedDescription = normalizeText(product.description);

      if (
        !normalizedName.includes(normalizedQuery) &&
        !normalizedDescription.includes(normalizedQuery)
      ) {
        return false;
      }
    }

    // Then filter by category if it exists
    if (categoryQuery) {
      const normalizedCategoryQuery = normalizeText(categoryQuery);
      const normalizedCategory = normalizeText(product.category);

      if (normalizedCategory !== normalizedCategoryQuery) {
        return false;
      }
    }

    // Then filter by subcategory if it exists
    if (subCategoryQuery) {
      const normalizedSubCategoryQuery = normalizeText(subCategoryQuery);
      const normalizedSubCategory = normalizeText(product.subcategory);

      if (normalizedSubCategory !== normalizedSubCategoryQuery) {
        return false;
      }
    }

    // Then filter by id if it exists
    if (idQuery && product.id !== Number.parseInt(idQuery)) {
      return false;
    }

    // Then filter by name if it exists
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
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
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
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            First
          </button>

          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
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
                currentPage === number
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Next
            </button>
          )}

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Last
          </button>
        </nav>
        <div className="ml-4 text-sm text-gray-500 self-center">
          Page {currentPage} of {totalPages}
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
        {/* Mobile filter dialog */}
        <div
          className={`fixed inset-0 flex z-[100] lg:hidden ${
            mobileFiltersOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>

          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition-all transform ease-in-out duration-300">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <BsX className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile filters */}
            <div className="mt-4 border-t border-gray-200">
              <div className="px-4 py-6">
                <h3 className="font-medium text-gray-900">Categories</h3>
                <ul className="mt-4 space-y-4">
                  {categories.map((category) => (
                    <li key={category.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/products?category=${encodeURIComponent(
                            category.name
                          )}`}
                          className={`text-gray-600 hover:text-indigo-600 ${
                            categoryQuery === category.name
                              ? "text-indigo-600 font-medium"
                              : ""
                          }`}
                        >
                          {category.name}
                        </Link>
                        {category.subcategories.length > 0 && (
                          <button
                            onClick={() => toggleCategory(category.name)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            {activeCategory === category.name ? (
                              <BsChevronDown size={16} />
                            ) : (
                              <BsChevronRight size={16} />
                            )}
                          </button>
                        )}
                      </div>

                      {activeCategory === category.name &&
                        category.subcategories.length > 0 && (
                          <ul className="ml-4 space-y-2">
                            {category.subcategories.map(
                              (subcategory, index) => (
                                <li key={index}>
                                  <Link
                                    to={`/products?category=${encodeURIComponent(
                                      category.name
                                    )}&subcategory=${encodeURIComponent(
                                      subcategory
                                    )}`}
                                    className={`text-gray-500 hover:text-indigo-600 ${
                                      categoryQuery === category.name &&
                                      subCategoryQuery === subcategory
                                        ? "text-indigo-600 font-medium"
                                        : ""
                                    }`}
                                  >
                                    {subcategory}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                >
                  <span className="font-medium flex items-center">
                    <BsFilter className="w-5 h-5 mr-2" /> Filters
                  </span>
                  <BsChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileFiltersOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Sidebar */}
              <aside
                className={`lg:w-1/4 ${
                  mobileFiltersOpen ? "block" : "hidden lg:block"
                }`}
              >
                <div className="sticky top-8 space-y-6">
                  {/* Search */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          if (e.target.value) {
                            setSearchParams({ search: e.target.value });
                          } else {
                            setSearchParams({});
                          }
                        }}
                      />
                      <BsSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
                      Categories
                    </h2>
                    <ul className="space-y-1">
                      {categories.map((category) => (
                        <li key={category.id} className="py-1">
                          <div
                            className="flex items-center justify-between cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => toggleCategory(category.name)}
                          >
                            <span
                              className={`font-medium ${
                                categoryQuery === category.name
                                  ? "text-indigo-600"
                                  : ""
                              }`}
                            >
                              {category.name}
                            </span>
                            {category.subcategories.length > 0 &&
                              (activeCategory === category.name ? (
                                <BsChevronDown className="h-4 w-4" />
                              ) : (
                                <BsChevronRight className="h-4 w-4" />
                              ))}
                          </div>

                          {activeCategory === category.name &&
                            category.subcategories.length > 0 && (
                              <ul className="ml-4 mt-1 space-y-1">
                                {category.subcategories.map(
                                  (subcategory, index) => (
                                    <li key={index} className="py-1">
                                      <Link
                                        to={`/products?category=${encodeURIComponent(
                                          category.name
                                        )}&subcategory=${encodeURIComponent(
                                          subcategory
                                        )}`}
                                        className={`text-gray-600 hover:text-indigo-600 transition-colors ${
                                          categoryQuery === category.name &&
                                          subCategoryQuery === subcategory
                                            ? "text-indigo-600 font-medium"
                                            : ""
                                        }`}
                                      >
                                        {subcategory}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Latest Products */}
                  <SideBarLatestProducts />

                  {/* Contact Us */}
                  <SideBarContactUs />
                </div>
              </aside>

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
                    {currentProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <Link to={product.url} className="block">
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
                              {product.description}
                            </p>
                            <div className="flex justify-between items-start gap-2 flex-col">
                              <span className="text-xs text-gray-500">
                                {product.subcategory}
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
