"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Flex, message } from "antd";
import BreadcrumbCustom from "@/app/components/breadcrumb/BreadcrumbCustom";
import useSpeechToText from "@/hooks/useSpeechToText";
import useAvatar from "@/hooks/useVirtualAssistant";
import Microphone from "./components/Microphone";
import Subtitle from "./components/Subtitle";
import VirtualVideo from "./components/VirtualVideo";

const GeneraticAi = () => {
  const [isSubtitle, setIsSubtitle] = useState(false);
  const {
    startSession,
    stopSession,
    isLoading,
    isOpen,
    myAvatarVideoEleRef,
    pcId,
    sendMessage,
    messageReceived,
  } = useAvatar();
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechToText();

  const [text, setText] = useState("");
  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  useEffect(() => {
    setText(messageReceived);
  }, [messageReceived]);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition)
      message.error("Browser not support speech recognition!");
  }, [browserSupportsSpeechRecognition]);

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
          <div className="">
            <VirtualVideo
              isLoading={isLoading}
              isOpen={isOpen}
              startSession={startSession}
              stopSession={() => {
                stopSession();
                stopListening();
              }}
              myAvatarVideoEleRef={myAvatarVideoEleRef}
            />
          </div>
          <div className="mt-5">
            <Microphone
              start={() => {
                startListening();
              }}
              stop={() => {
                if (transcript) {
                  sendMessage({
                    pc_id: pcId!,
                    input_text: transcript,
                    use_gpt: "true",
                    conversation_histories: [],
                    request_type: "question",
                  });
                }
                stopListening();
                setTimeout(() => {
                  resetTranscript();
                }, 1000);
              }}
              isListening={listening}
              isStartVirtual={isOpen}
            />
          </div>
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
