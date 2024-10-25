"use client";

import { useEffect, useRef, useState } from "react";
import Video from "next-video";
import video1 from "/videos/video1.mp4";
import video2 from "/videos/video2.mp4";
import video3 from "/videos/video3.mp4";
import TabItem from "@/components/Tab";
import useTranslation from "next-translate/useTranslation";

let interval: string | number | NodeJS.Timer | undefined = undefined;

export default function Home() {
  const [tab, setTab] = useState(1);
  const [nextTab, setNextTab] = useState(2);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(10);
  const [running, setRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animating, setAnimating] = useState(false); // New state for animation control
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t, lang } = useTranslation("tabs");

  function handleListItem(value = 1) {
    setTab(value); // Switch tab after animation
    setProgress(0);
  }

  function handlePauseButton() {
    setRunning(!running);
  }

  useEffect(() => {
    let animationFrameId = 0;

    const updateProgress = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  useEffect(() => {
    if (isNaN(progress)) {
      setProgress(0);
    }
    if (tab === 4 && progress === 0) {
      setIsPlaying(false);
    }
  }, [progress]);

  useEffect(() => {
    if (running && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 1000 / duration);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (progress >= 99.25) {
      tab === 4 ? handleListItem(1) : handleListItem(tab + 1);

      if (tab === 3) {
        setRunning(true);
        setIsPlaying(false);
      }
    }
  }, [progress]);

  const tabContent = (currentTab = tab) => {
    switch (currentTab) {
      case 1:
        return (
          <Video
            ref={videoRef}
            src={video1}
            autoPlay={currentTab === tab}
            muted
            controls={false}
            className="w-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        );
      case 2:
        return (
          <Video
            ref={videoRef}
            src={video2}
            autoPlay={currentTab === tab}
            muted
            controls={false}
            className="w-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        );
      case 3:
        return (
          <Video
            ref={videoRef}
            src={video3}
            autoPlay={currentTab === tab}
            muted
            controls={false}
            className="w-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        );
      case 4:
        return (
          <div className="w-full flex flex-col gap-4 aspect-video p-4">
            <h2 className="font-bold text-2xl font-heading">
              {t("textTab.title")}
            </h2>
            <p className="font-body text-lg">{t("textTab.content")}</p>
            <button
              style={{ transition: "all 0.1s ease-in-out" }}
              className="w-48 bg-emerald-500 shadow-md hover:bg-emerald-400 active:shadow-sm active:bg-emerald-600 font-heading text-emerald-800 font-bold py-2 px-4 rounded-xl w-fit"
              onClick={() => handlePauseButton()}
            >
              {running ? t("textTab.stopButton") : t("textTab.startButton")}
            </button>
          </div>
        );
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <>
      <div className="flex gap-4 flex-col m-auto items-center">
        <h1 className="text-3xl font-black text-emerald-950 font-heading text-center">
          React DTS
          <span className="hidden md:block">(Dynamic Tab Selector)</span>
        </h1>
        <div className="flex flex-col lg:flex-row gap-2 m-auto">
          {/* TAB SELECTOR */}
          <div className="bg-emerald-600 lg:bg-gradient-to-br border border-emerald-600 from-emerald-600 to-emerald-500 rounded-lg w-[95vw] lg:w-[24rem] h-fit drop-shadow-xl">
            <ul className="flex lg:flex-col gap-2 px-2 pt-4 pb-8 justify-evenly lg:justify-start">
              <h2 className="font-bold text-emerald-950 pl-2 hidden lg:inline-block">
                Tabs group
              </h2>
              {/* tab 1 */}
              <TabItem
                tab={tab}
                progress={progress}
                handleListItem={handleListItem}
                index={1}
                title="Video 1"
              />
              {/* tab 2 */}
              <TabItem
                tab={tab}
                progress={progress}
                handleListItem={handleListItem}
                index={2}
                title="Video 2"
              />
              {/* tab 3 */}
              <TabItem
                tab={tab}
                progress={progress}
                handleListItem={handleListItem}
                index={3}
                title="Video 3"
              />
              {/* tab 4 */}
              <TabItem
                tab={tab}
                progress={progress}
                handleListItem={() => handleListItem(4)}
                index={4}
                title={t("textTab.title")}
              />
            </ul>
          </div>
          {/* TAB CONTENT */}
          <div className="flex flex-col bg-emerald-100 w-[95vw] lg:max-w-[48rem] lg:w-[50vw] h-fit lg:aspect-video rounded-lg drop-shadow-2xl overflow-hidden relative">
            <div
              className={`text-emerald-950 transition-transform duration-600 animate-fade-left`}
            >
              {tabContent(tab)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
