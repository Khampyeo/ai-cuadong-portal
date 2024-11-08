"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Flex, message } from "antd";
import BreadcrumbCustom from "@/app/components/breadcrumb/BreadcrumbCustom";
import Microphone from "./components/Microphone";
import Subtitle from "./components/Subtitle";
import VirtualVideo from "./components/VirtualVideo";

const GeneraticAi = () => {
  const [isSubtitle, setIsSubtitle] = useState(false);

  const [text, setText] = useState("");

  return (
    <div>
      <BreadcrumbCustom
        items={[
          {
            title: <Link href={"/"}>Home</Link>,
          },
          {
            title: "Virtual Assistant",
          },
        ]}
      />
      <Flex gap={8} justify="center" className="mt-5">
        <div className="relative flex items-center flex-col text-text-primary">
          <div className=""></div>
          <div className="mt-5"></div>
        </div>
        <div className="">
          <Button
            type={isSubtitle ? "primary" : "default"}
            onClick={() => setIsSubtitle(!isSubtitle)}
          >
            Subtitle
          </Button>
          {isSubtitle && (
            <div className="mt-5">
              <Subtitle transcript={text} />
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default GeneraticAi;
