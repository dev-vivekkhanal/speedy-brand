// react
import React, { useRef, useState } from "react";
// routing
import { Link, useParams } from "react-router-dom";
// mui
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
// framer motion animation
import { motion } from "framer-motion";
// text editor
import JoditEditor from "jodit-react";

const WritePage = () => {
  // local variables
  const [content, setContent] = useState();
  const [showToneStatus, setShowToneStatus] = useState(false);
  const [selectedTone, setSelectedTone] = useState(null);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const editorRef = useRef(null);
  const params = useParams();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="font-inter  text-[#1e1e1e] "
    >
      {/* header */}
      <div className="sticky top-0 z-10 border bg-white p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-5">
        {/* title */}
        <h1 className=" font-semibold text-2xl flex items-center gap-2 ">
          <Link to="/">
            <ArrowBackIosRoundedIcon className="text-accentColor" />
          </Link>
          <span>Compose Blog</span>
        </h1>

        <div className="flex gap-5 items-center justify-between sm:justify-end ">
          {/* Chosose tone dropdown */}
          <div className="relative">
            <span className="mr-2 font-semibold">Selected Tone:</span>
            <button
              className={`min-w-[120px] flex items-center justify-between ${
                selectedTone ? "" : "font-medium text-accentColor"
              } `}
              onClick={() => setShowToneStatus(true)}
            >
              <span className="text-sm   ">
                {selectedTone ? selectedTone : "Choose tone"}
              </span>

              <span>
                <KeyboardArrowDownRoundedIcon />
              </span>
            </button>
            {showToneStatus && (
              <>
                <div className="absolute right-0 border shadow-lg  z-30 top-[100%] bg-white">
                  {[
                    "Informative",
                    "Formal",
                    "Humorous ",
                    "Inspirational",
                    "Friendly",
                    "Curious",
                    "Pessimistic ",
                    "Optimistic",
                  ]?.map((tones) => {
                    return (
                      <button
                        key={tones}
                        onClick={() => {
                          setShowToneStatus(false);
                          setSelectedTone(tones);
                        }}
                        className="block p-2 px-3 hover:bg-gray-100 text-left transition-all w-full"
                      >
                        {tones}
                      </button>
                    );
                  })}
                </div>
                <div
                  onClick={() => setShowToneStatus(false)}
                  className="fixed inset-0 z-20 "
                ></div>
              </>
            )}
          </div>

          {/* generate blog btn */}
          <button
            onClick={() => {
              if (selectedTone) {
                setShowTextEditor(true);
              } else {
                setShowTextEditor(false);
              }
            }}
            className={`flex gap-2 p-3 px-8   text-lg font-semibold transition-all  text-white ${
              selectedTone
                ? "bg-accentColor active:scale-95"
                : " bg-gray-400 cursor-not-allowed"
            }`}
          >
            Generate
          </button>
        </div>
      </div>

      {/* selected topic */}
      <h1 className="p-5 font-semibold text-xl text-center border-b">
        {
          JSON.parse(localStorage?.getItem("topicsData"))[
            JSON.parse(localStorage?.getItem("topicsData"))?.findIndex(
              (topic) => topic.id == params?.topic_id
            )
          ]?.topic
        }
      </h1>

      <div className="  p-5 pt-10">
        {showTextEditor ? (
          <JoditEditor
            ref={editorRef}
            value={content}
            //   config={editor}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              // setContent(newContent);
            }}
          />
        ) : (
          <div>
            <span className="flex justify-center items-center ">
              <ReportProblemIcon
                className="text-gray-300 scale-125 mb-5"
                fontSize="large"
              />
            </span>
            <h1 className="text-gray-400  text-center text-xl">
              Select a tone and click on generate
            </h1>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WritePage;
