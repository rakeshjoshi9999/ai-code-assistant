import MarkdownPreview from "@uiw/react-markdown-preview";
import Loader from "./Loader";
import { useEffect, useRef } from "react";

const Review = ({ review, loader }: { review: string; loader: boolean }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when review changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [review]);

  return (
    <div className="h-full w-6/12 relative">
      {loader ? (
        <Loader />
      ) : (
        <div className="markdown-container">
          <MarkdownPreview source={review} />
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default Review;
