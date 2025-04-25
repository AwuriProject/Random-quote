import { useState, useEffect } from "react";
import "./App.css";
import { RxSwitch } from "react-icons/rx";
import { CiBookmark } from "react-icons/ci";

const API_KEY = import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-Api-Key": API_KEY,
  },
};

const api_url = `https://api.api-ninjas.com/v1/quotes`;

function App() {
  const [result, setResult] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchRandomQuote = async function () {
    try {
      const res = await fetch(api_url, API_OPTIONS);
      const data = await res.json();
      console.log(data[0]);
      setResult(data[0].quote.trim());
    } catch (error) {
      console.error(`Error fetching quotes: ${error}`);
      setErrorMessage(`Error fetching quotes. Please try again later!`);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    if (darkMode) {
      document.querySelector(".content").classList.add("dark");
    } else {
      document.querySelector(".content").classList.remove("dark");
    }
  }, [darkMode]);

  const handleQuote = () => {
    fetchRandomQuote();
  };

  return (
    <main>
      <div className="content bg-white dark:bg-gray-800 dark:text-white text-black rounded-2xl w-sm h-100 md:w-2xl">
        <div className="flex-content icon">
          <button className="cursor-pointer" onClick={handleDarkMode}>
            <RxSwitch fontSize={30} />
          </button>

          <div className="flex justify-center items-center cursor-pointer">
            <CiBookmark fontSize={30} />
          </div>
        </div>
        <div className="random__quote inset-shadow-md">
          <p>{errorMessage ? errorMessage : result}</p>
        </div>
        <div className="flex items-center justify-center">
          <a href="#" className="btn inset-shadow-md" onClick={handleQuote}>
            Get Quote
          </a>
        </div>
      </div>
    </main>
  );
}

export default App;
