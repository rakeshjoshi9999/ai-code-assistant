import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Review from "./components/review";
import Header from "./components/header";

function App() {
  const [loader, setLoader] = useState<"idle" | "loading" | "loaded">("idle");
  const [review, setReview] = useState<string>(
    `#### Review\nAdd code and click on Generate Review to generate review\n\n`
  );

  const isLoading = loader === "loading";

  const handleGenerateReview = async (code: string) => {
    try {
      setLoader("loading");
      setReview(``); // reset previous review

      const response = await fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(await response.text()); // handle non-200 responses
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) throw new Error("No response body");

      let fullText = "";
      setLoader("loaded");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        // Update UI progressively like ChatGPT
        setReview((prev) => prev + chunk);
      }
    } catch (err) {
      alert("Something went wrong while generating review.");
      console.error(err);
      setLoader("idle");
    }
  };

  return (
    <div className="section">
      <div className="header">
        <Header />
      </div>
      <div className="h-full w-full flex overflow-hidden">
        <Editor loader={isLoading} onGenerateReview={handleGenerateReview} />
        <Review loader={isLoading} review={review} />
      </div>
    </div>
  );
}

export default App;
