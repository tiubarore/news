import { useState, useEffect } from "react";
import Home from "./pages/Home";

const App = () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const type = "top-headlines";
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [news, setNews] = useState([]);
  const [categories] = useState([
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sport",
    "technology",
  ]);
  const [countries] = useState(["us", "it", "es"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const url = `https://newsapi.org/v2/${type}?country=${selectedCountry}&category=${selectedCategory}`;

        const res = await fetch(url, {
          headers: {
            "X-Api-Key": api_key,
          },
        });

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        setNews(data);
      } catch (error) {
        setError(error.message);
        console.error("NewsAPI Error:", error);
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
        news={news}
        isLoading={isLoading}
        error={error}
        setSelectedCategory={setSelectedCategory}
        countries={countries}
        setSelectedCountry={setSelectedCountry}
        selectedCategory={selectedCategory}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default App;
