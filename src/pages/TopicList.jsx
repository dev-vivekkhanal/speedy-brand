// react
import React, { useEffect, useRef, useState } from "react";
// mui
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// mock json
import { convertHexToRGBA } from "../helpers/hexToRgba";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TopicList = () => {
  // local variables
  const categoryList = ["All", "ICP", "Mission", "Product", "Custom"];
  const colorArr = [
    "#f5c322",
    "#18c499",
    "#f53636",
    "#fcd658",

    "#3dd7b0",
    "#f5c322",
    "#3dd7b0",
    "#f53636",
    "#fcd658",
    "#f5c322",
    "#18c499",
    "#f53636",
    "#fcd658",
    "#3dd7b0",
    "#f5c322",
    "#3dd7b0",
    "#f53636",
    "#fcd658",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedTopics, setDisplayedTopics] = useState();
  const [addTopicModalStatus, setAddTopicModalStatus] = useState(false);
  const topicRef = useRef(null);
  const keywordsRef = useRef(null);

  // update displayed topics using filter when category is changed
  useEffect(() => {
    if (selectedCategory === "All") {
      setDisplayedTopics(JSON.parse(localStorage?.getItem?.("topicsData")));
    } else {
      setDisplayedTopics(
        JSON.parse(localStorage?.getItem?.("topicsData"))?.filter(
          (topic) => topic.category === selectedCategory
        )
      );
    }

    return () => {
      setDisplayedTopics();
    };
  }, [selectedCategory]);
  // add new topic to the local storage and to diplayed data if the selected category is "Custom"
  const submitAddTopic = (e) => {
    e.preventDefault();
    setSelectedCategory("Custom");
    if (selectedCategory === "Custom") {
      setDisplayedTopics([
        ...displayedTopics,
        {
          id: Math.floor(Date.now() / 1000),
          topic: topicRef?.current?.value,
          keywords: keywordsRef?.current?.value?.split(","),
          category: "Custom",
        },
      ]);
    }

    localStorage?.setItem(
      "topicsData",
      JSON?.stringify([
        ...JSON.parse(localStorage?.getItem("topicsData")),
        {
          id: Math.floor(Date.now() / 1000),
          topic: topicRef?.current?.value,
          keywords: keywordsRef?.current?.value?.split(","),
          category: "Custom",
        },
      ])
    );
    // clearing value after use
    topicRef.current.value = "";
    keywordsRef.current.value = "";
    setAddTopicModalStatus(false);
  };

  // delete topic
  const deleteTopicHandler = (topic) => {
    localStorage?.setItem(
      "topicsData",
      JSON?.stringify(
        JSON.parse(localStorage?.getItem("topicsData"))?.filter(
          (filtered_value) => filtered_value.id !== topic?.id
        )
      )
    );
    setDisplayedTopics(
      displayedTopics?.filter(
        (filtered_value) => filtered_value.id !== topic?.id
      )
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="font-inter  text-[#1e1e1e] "
    >
      {/* header */}
      <div className="sticky top-0 z-10 border bg-white p-5 pb-0 md:pb-5">
        {/* title */}
        <h1 className=" font-semibold text-2xl ">Categories</h1>

        <div className="p-5  flex flex-col md:flex-row justify-between md:items-end gap-5">
          {/* category selector */}
          <div className="flex items-center gap-2 flex-wrap justify-start">
            {categoryList?.map((cat, cat_index) => {
              return (
                <button
                  key={cat_index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 lg:px-10 pb-1  font-semibold  transition-all  ${
                    cat === selectedCategory
                      ? "border-b-4 border-b-accentColor text-accentColor "
                      : "border-b-4 border-b-transparent "
                  } `}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* add topic btn */}
          <div className="">
            <button
              onClick={() => setAddTopicModalStatus(true)}
              className="flex gap-2 p-3  bg-accentColor text-lg font-semibold transition-all active:scale-95 ml-auto"
            >
              <span className="text-white">Add Topic</span>
              <span>
                <ArrowForwardIosRoundedIcon
                  className="text-white"
                  fontSize="small"
                />
              </span>
            </button>

            {/* add topic overlay */}
            {addTopicModalStatus && (
              <>
                <div
                  onClick={() => setAddTopicModalStatus(false)}
                  className="fixed inset-0 z-10 bg-black bg-opacity-20 transition-all"
                ></div>

                <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]  bg-white p-5 z-20 rounded-lg shadow-3xl border w-[400px]">
                  <h1 className="text-lg font-semibold  mb-5">Add Topic</h1>

                  <form>
                    <div>
                      <label
                        htmlFor="topic"
                        className="text-sm text-gray-500 font-medium block"
                      >
                        Topic Title
                      </label>
                      <input
                        ref={topicRef}
                        type="text"
                        name="topic"
                        className="block border outline-none w-full p-2 mt-1 "
                      />
                    </div>

                    <div className="my-5">
                      <label
                        htmlFor="keywords"
                        className="text-sm text-gray-500 font-medium block"
                      >
                        Keywords (comma separated)
                      </label>
                      <textarea
                        ref={keywordsRef}
                        name="keywords"
                        id=""
                        rows="3"
                        className="block border outline-none w-full p-2 mt-1 "
                      ></textarea>
                    </div>

                    <button
                      onClick={submitAddTopic}
                      className="flex gap-2 p-3 px-10 bg-accentColor text-lg font-semibold transition-all active:scale-95 ml-auto"
                    >
                      <span className="text-white">Add </span>
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* main body */}
      <div className="p-5">
        <h2 className="bg-[#f9fbfc] border font-semibold py-3 px-5">
          {selectedCategory === "Custom"
            ? "Your Topics"
            : " Recommended Topics"}
        </h2>

        <motion.div layout className="border-x  ">
          <AnimatePresence>
            {displayedTopics?.map((topic, topic_index) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.1, delay: topic_index * 0.05 }}
                  key={topic?.id}
                  className="p-5 border-b flex flex-col md:flex-row gap-5 items-center"
                >
                  <div className="flex-1">
                    <h1 className="text-xl font-semibold mb-3">
                      {topic?.topic}
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      {topic?.keywords?.map((keyword, i) => {
                        return (
                          <span
                            key={i}
                            style={{
                              backgroundColor: convertHexToRGBA(colorArr[i], 5),
                              borderColor: colorArr[i],
                              color: colorArr[i],
                            }}
                            className={`font-semibold border-2 px-3 py-1 rounded-lg  `}
                          >
                            {keyword}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* write btn */}
                  <div className="flex gap-2  items-center ml-auto">
                    <Link
                      to={`/write/` + topic?.id}
                      className="flex gap-2 p-3  bg-accentColor text-lg font-semibold transition-all active:scale-95"
                    >
                      <span className="text-white">Write</span>
                      <span>
                        <ArrowForwardIosRoundedIcon
                          className="text-white"
                          fontSize="small"
                        />
                      </span>
                    </Link>

                    {/* delete btn Container*/}
                    <div className="relative group">
                      <button
                        onClick={() => deleteTopicHandler(topic)}
                        className="p-3  bg-gray-200 text-lg font-semibold transition-all active:scale-95 text-gray-400 hover:text-red-500 hover:bg-white "
                      >
                        <DeleteRoundedIcon className="" />
                      </button>
                      {/* delete tooltip */}
                      <div className="absolute bottom-[100%] translate-x-[-30%] p-2 bg-black text-white rounded-lg hidden group-hover:block transition-all">
                        <p className="text-xs w-max font-medium">
                          Delete Topic
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopicList;
