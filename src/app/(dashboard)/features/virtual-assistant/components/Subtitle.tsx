"use client";

import { useEffect, useRef } from "react";

type Props = {
  transcript: string;
};
const Subtitle = ({ transcript }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const lineHeight = parseInt(getComputedStyle(element).lineHeight, 10);
    const maxHeight = lineHeight * 4;

    while (element.scrollHeight > maxHeight) {
      element.textContent = element.textContent!.substring(1).trim();
    }
  }, [transcript]);

  return (
    <div className="w-[20rem] rounded-lg h-[8rem]  p-3 overflow-y-auto">
      <p ref={textRef} className="text-text-primary text-base limited-text">
        {transcript}
      </p>
    </div>
  );
};

export default Subtitle;
