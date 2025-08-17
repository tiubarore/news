import { useState, useEffect } from "react";
import Home from "./pages/Home";

const App = () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [news, setNews] = useState([]);
  const [categories] = useState([
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ]);

  const [countries] = useState([
    { code: "us", name: "United States" },
    { code: "it", name: "Italy" },
    { code: "es", name: "Spain" },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // GNews API requires either 'q' search parameter or 'category'
        const url = new URL("https://gnews.io/api/v4/top-headlines");
        url.searchParams.append("category", selectedCategory.toLowerCase());
        url.searchParams.append("country", selectedCountry.toLowerCase());
        url.searchParams.append("apikey", api_key);
        url.searchParams.append("max", "10"); // Limit to 10 articles

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`GNews API error: ${res.status}`);
        }

        const data = await res.json();
        setNews(data);
      } catch (error) {
        setError(error.message);
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, selectedCountry, api_key]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-semibold text-3xl text-center py-5">
        News from around the world
      </h1>
      <Home
        categories={categories}
        countries={countries}
        news={news}
        isLoading={isLoading}
        error={error}
        setSelectedCategory={setSelectedCategory}
        setSelectedCountry={setSelectedCountry}
        selectedCategory={selectedCategory}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default App;
