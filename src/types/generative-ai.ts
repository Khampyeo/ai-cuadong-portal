export type GetVideoTrainedByModelDto = {
  text: string;
  video_id: string;
  language: "vi" | "en";
};

export type GetVideoTrainedByImageDto = {
  text: string;
  file: File;
  language: "vi" | "en";
};

export type TrainingModelDto = {
  id: string;
  name: string;
  status: "pending" | "training" | "done" | "error";
};
