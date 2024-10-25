import useTranslation from "next-translate/useTranslation";
import React from "react";

interface TabItemProps {
  tab: number;
  progress: number;
  handleListItem: (index: number) => void;
  index: number;
  title: string;
}

const TabItem: React.FC<TabItemProps> = ({
  tab,
  progress,
  handleListItem,
  index,
  title,
  ...props
}) => {
  const { t, lang } = useTranslation("tabs");

  return (
    <li
      onClick={() => handleListItem(index)}
      style={{ transition: "all 0.1s ease-in-out" }}
      className={`cursor-pointer flex gap-2 border-none rounded-lg p-2 ${tab === index ? "lg:border lg:bg-emerald-400" : "lg:hover:bg-emerald-400"}`}
    >
      <button className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <span
            style={{ transition: "all 0.2s ease-in-out" }}
            className={`rounded-lg ${tab === index ? "font-bold bg-emerald-800 text-white" : "bg-emerald-300"} w-16 lg:w-8 inline-block p-4 lg:p-1 lg:mr-1`}
          >
            {index}
          </span>
          <h3 className="font-bold text-emerald-950 hidden lg:block">
            {title}
          </h3>
        </div>
        {tab === index && (
          <div className="flex lg:flex-col lg:gap-2">
            {tab !== 4 && (
              <p className="hidden lg:block italic text-emerald-600 font-body text-left">
                {t("legend")}
              </p>
            )}
            <div className="absolute bottom-2 left-2 right-2 lg:static h-2 bg-emerald-800 rounded-lg">
              <div
                style={{
                  width: `${progress}%`,
                  transition: "width 0.1s ease-in-out",
                }}
                className={`bar h-2 bg-emerald-500 rounded-lg`}
              ></div>
            </div>
          </div>
        )}
      </button>
    </li>
  );
};

export default TabItem;
