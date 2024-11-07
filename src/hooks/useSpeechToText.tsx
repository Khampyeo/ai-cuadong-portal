import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type UseSpeechToTextResult = {
  transcript: string;
  listening: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  browserSupportsSpeechRecognition: boolean;
};

const useSpeechToText = (): UseSpeechToTextResult => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  const startListening = () => setIsListening(true);
  const stopListening = () => setIsListening(false);

  return {
    transcript,
    listening: isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  };
};

export default useSpeechToText;
