import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories } from '@/lib/api';
import { Product, Category } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Products = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minPrice: 0,
    maxPrice: 500,
    sort: 'newest',
    featured: false,
    bestseller: false,
    new: false
  });
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const { data: products, isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts
  });
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1]
    });
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setFilters({
      ...filters,
      category: filters.category === categoryId ? '' : categoryId
    });
  };
  
  const handleSortChange = (sort: string) => {
    setFilters({
      ...filters,
      sort
    });
  };
  
  const handleFilterToggle = (filter: 'featured' | 'bestseller' | 'new') => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };
  
  const resetFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: 0,
      maxPrice: 500,
      sort: 'newest',
      featured: false,
      bestseller: false,
      new: false
    });
  };
  
  // Filter and sort products
  const filteredProducts = products
    ? products
        .filter(product => 
          (filters.category ? product.category === filters.category : true) &&
          (filters.search ? product.name.toLowerCase().includes(filters.search.toLowerCase()) : true) &&
          (product.price >= filters.minPrice && product.price <= filters.maxPrice) &&
          (filters.featured ? product.featured : true) &&
          (filters.bestseller ? product.bestseller : true) &&
          (filters.new ? product.new : true)
        )
        .sort((a, b) => {
          if (filters.sort === 'priceLow') {
            return a.price - b.price;
          } else if (filters.sort === 'priceHigh') {
            return b.price - a.price;
          } else if (filters.sort === 'name') {
            return a.name.localeCompare(b.name);
          } else if (filters.sort === 'newest') {
            // In a real app, would sort by date added
            return 0;
          } else {
            return 0;
          }
        })
    : [];
  
  const hasActiveFilters = 
    filters.category !== '' || 
    filters.search !== '' || 
    filters.minPrice > 0 || 
    filters.maxPrice < 500 || 
    filters.featured || 
    filters.bestseller || 
    filters.new;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-display font-bold">All Products</h1>
            
            <div className="flex items-center gap-4">
              {/* Mobile filter toggle */}
              <Button 
                variant="outline" 
                size="sm"
                className="md:hidden flex items-center gap-2"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              {/* Sort dropdown */}
              <div className="hidden sm:block">
                <select 
                  className="border rounded-md p-2 text-sm bg-white"
                  value={filters.sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filters</h3>
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs text-blue-500">
                        Reset All
                      </Button>
                    )}
                  </div>
                  
                  {/* Search */}
                  <div className="relative mb-6">
                    <Input 
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories?.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox 
                            id={`category-${category.id}`}
                            checked={filters.category === category.id}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                            className="mr-2 h-4 w-4"
                          />
                          <Label 
                            htmlFor={`category-${category.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[filters.minPrice, filters.maxPrice]} 
                        max={500} 
                        step={10} 
                        value={[filters.minPrice, filters.maxPrice]}
                        onValueChange={handlePriceChange}
                        className="mb-4"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>${filters.minPrice}</span>
                        <span>${filters.maxPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Other filters */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Product Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="filter-featured"
                          checked={filters.featured}
                          onCheckedChange={() => handleFilterToggle('featured')}
                          className="mr-2 h-4 w-4"
                        />
                        <Label 
                          htmlFor="filter-featured"
                          className="text-sm cursor-pointer"
                        >
                          Featured
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="filter-bestseller"
                          checked={filters.bestseller}
                          onCheckedChange={() => handleFilterToggle('bestseller')}
                          className="mr-2 h-4 w-4"
                        />
                        <Label 
                          htmlFor="filter-bestseller"
                          className="text-sm cursor-pointer"
                        >
                          Best Seller
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="filter-new"
                          checked={filters.new}
                          onCheckedChange={() => handleFilterToggle('new')}
                          className="mr-2 h-4 w-4"
                        />
                        <Label 
                          htmlFor="filter-new"
                          className="text-sm cursor-pointer"
                        >
                          New Arrival
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {isMobileFiltersOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-lg transform transition-transform animate-slide-in-right">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsMobileFiltersOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    {/* Mobile filters content */}
                    <div className="mb-6">
                      {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={resetFilters} className="mb-4 w-full">
                          Reset All Filters
                        </Button>
                      )}
                      
                      {/* Search */}
                      <div className="relative mb-6">
                        <Input 
                          placeholder="Search products..."
                          value={filters.search}
                          onChange={(e) => setFilters({...filters, search: e.target.value})}
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      
                      {/* Sort (mobile only) */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3">Sort By</h4>
                        <select 
                          className="border rounded-md p-2 text-sm bg-white w-full"
                          value={filters.sort}
                          onChange={(e) => handleSortChange(e.target.value)}
                        >
                          <option value="newest">Newest</option>
                          <option value="priceLow">Price: Low to High</option>
                          <option value="priceHigh">Price: High to Low</option>
                          <option value="name">Name: A to Z</option>
                        </select>
                      </div>
                      
                      {/* Categories */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3">Categories</h4>
                        <div className="space-y-2">
                          {categories?.map((category) => (
                            <div key={category.id} className="flex items-center">
                              <Checkbox 
                                id={`mobile-category-${category.id}`}
                                checked={filters.category === category.id}
                                onCheckedChange={() => handleCategoryChange(category.id)}
                                className="mr-2 h-4 w-4"
                              />
                              <Label 
                                htmlFor={`mobile-category-${category.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {category.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Price Range */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3">Price Range</h4>
                        <div className="px-2">
                          <Slider 
                            defaultValue={[filters.minPrice, filters.maxPrice]} 
                            max={500} 
                            step={10} 
                            value={[filters.minPrice, filters.maxPrice]}
                            onValueChange={handlePriceChange}
                            className="mb-4"
                          />
                          <div className="flex items-center justify-between text-sm">
                            <span>${filters.minPrice}</span>
                            <span>${filters.maxPrice}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Other filters */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">Product Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox 
                              id="mobile-filter-featured"
                              checked={filters.featured}
                              onCheckedChange={() => handleFilterToggle('featured')}
                              className="mr-2 h-4 w-4"
                            />
                            <Label 
                              htmlFor="mobile-filter-featured"
                              className="text-sm cursor-pointer"
                            >
                              Featured
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox 
                              id="mobile-filter-bestseller"
                              checked={filters.bestseller}
                              onCheckedChange={() => handleFilterToggle('bestseller')}
                              className="mr-2 h-4 w-4"
                            />
                            <Label 
                              htmlFor="mobile-filter-bestseller"
                              className="text-sm cursor-pointer"
                            >
                              Best Seller
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox 
                              id="mobile-filter-new"
                              checked={filters.new}
                              onCheckedChange={() => handleFilterToggle('new')}
                              className="mr-2 h-4 w-4"
                            />
                            <Label 
                              htmlFor="mobile-filter-new"
                              className="text-sm cursor-pointer"
                            >
                              New Arrival
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t">
                      <Button 
                        className="w-full" 
                        onClick={() => setIsMobileFiltersOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="col-span-3">
              {isProductsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              ) : (
                <>
                  {/* Results count */}
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </p>
                    
                    {hasActiveFilters && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={resetFilters}
                        className="hidden md:flex items-center gap-1 h-8 text-xs"
                      >
                        <X className="h-3 w-3" /> Clear Filters
                      </Button>
                    )}
                  </div>
                  
                  {/* Products grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
