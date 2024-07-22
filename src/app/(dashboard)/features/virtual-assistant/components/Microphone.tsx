"use client";

import MicOffIcon from "@/../public/icon/icon_mic__off.svg";
import MicOnIcon from "@/../public/icon/icon_mic__on.svg";

type Props = {
  start: () => void;
  stop: () => void;
  isListening: boolean;
  isStartVirtual: boolean;
};
const Microphone = ({ start, stop, isListening, isStartVirtual }: Props) => {
  const handleMicrophone = () => {
    if (!isListening && isStartVirtual) {
      start();
    } else {
      stop();
    }
  };
  return (
    <div className="relative">
      <div
        className={`relative z-20 h-14 w-14 rounded-full transition-all duration-300 border-1 flex items-center justify-center cursor-pointer shadow-xl
            ${isListening ? "bg-primary-color" : "bg-white"}
            `}
        onClick={handleMicrophone}
      >
        {isListening ? (
          <MicOnIcon className={"text-white"} />
        ) : (
          <MicOffIcon className={"text-[#b2b1b1]"} />
        )}
      </div>
      {isListening && (
        <div className="absolute z-10 top-0 h-14 w-14 flex justify-center items-center rounded-full bg-slate-200 dark:bg-slate-600 animate-bouncee"></div>
      )}
    </div>
  );
};
export default Microphone;
