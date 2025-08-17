import { useState, useEffect } from "react";
import Home from "./pages/Home";
const App = () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const type = "top-headlines";
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("us");
  // const api_url_base = "https://newsapi.org/v2/${type}?country=us&apiKey=";
  const api_url = `https://newsapi.org/v2/${type}?country=${selectedCountry}&category=${selectedCategory}&apiKey=`;
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sport",
    "technology",
  ]);

  const [countries, setCountries] = useState(["us", "it", "es"]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${api_url}${api_key}`);
        if (!res.ok) throw new Error("Error fetching data");
        const data = await res.json();
        setNews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [selectedCategory, selectedCountry]);
  return (
    <div className="max-h-lg px-20">
      <h1 className="font-semibold text-3xl text-center py-5">
        News from around the world
      </h1>
      <Home
        categories={categories}
        setCategories={setCategories}
        news={news}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setSelectedCategory={setSelectedCategory}
        countries={countries}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
};
export default App;
