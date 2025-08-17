import News from "../components/News";

const Home = ({
  news,
  error,
  isLoading,
  categories,
  setSelectedCategory,
  selectedCategory,
  countries,
  setSelectedCountry,
  selectedCountry,
}) => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 pb-16 md:pb-4">
      {/* <div className="flex justify-center gap-2 mb-4">
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`px-3 py-1 text-sm rounded-full ${
              selectedCountry === country
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {country.toUpperCase()}
          </button>
        ))}
      </div> */}
      {/* Categories - Sticky Header for PWA */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm py-3 border-b border-gray-100">
        <div className="flex overflow-x-auto scrollbar-hide pb-2 space-x-2 px-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-lg hover:cursor-pointer text-sm font-medium transition-all
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
                active:scale-95 transform transition-transform
              `}
              aria-label={`Show ${category} news`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mt-4">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:gap-4">
            {news.articles?.map((notizia) => (
              <News
                key={notizia.url}
                notizia={notizia}
                isLoading={isLoading}
                error={error}
              />
            ))}
          </div>
        )}
      </main>

      {/* PWA Install Prompt Area (optional) */}
      <div className="pwa-install-prompt hidden md:block"></div>
    </div>
  );
};

export default Home;
