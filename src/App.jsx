// react
import { useLayoutEffect } from "react";
// routing
import { Routes, Route, Navigate } from "react-router-dom";
// pages and components
import WritePage from "./pages/WritePage";
import TopicList from "./pages/TopicList";
// mock data
import topicsData from "./helpers/topicsData.json";
// framer motion animation
import { AnimatePresence } from "framer-motion";

function App() {
  // store initial data in local storage
  useLayoutEffect(() => {
    localStorage?.setItem("topicsData", JSON.stringify(topicsData));
    return () => {
      localStorage?.clear();
    };
  }, []);

  return (
    <div className="cursor-default">
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<TopicList />} />
          <Route path="write/:topic_id" element={<WritePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
