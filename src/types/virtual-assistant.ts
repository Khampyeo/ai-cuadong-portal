type GetOfferConnectionParams = {
  sdp: string;
  type: string;
  video_transforms: string;
};

type TriggerNewMsgParams = {
  question: string;
  langCode: "en" | "vi";
  pcId: string;
  useGpt: boolean;
  conversation_histories?: Array<Object>;
};
