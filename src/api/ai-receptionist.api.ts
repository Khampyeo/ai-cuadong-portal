import { fetchApi } from "@/config/fetchApi";
import { TrainingModelDto } from "@/types/generative-ai";

const BASE_URL = "/AI-model";

export const generateTalkingFace = async (formData: FormData) => {
  const response = await fetchApi<Response>(
    `${BASE_URL}/geneface/generate-talking-face`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response;
};

export const generateSadtalkerTalkingFace = async (formData: FormData) => {
  const response = await fetchApi<Response>(
    `${BASE_URL}/sadtalker/generate-talking-face`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response;
};

export const importPreprocessTrainingTalkingModelVideo = async (
  formData: FormData
) => {
  const response = await fetchApi<Response>(
    `${BASE_URL}/geneface/preprocess-training-data`,
    { method: "POST", body: formData }
  );
  return response;
};

export const trainingTalkingModelVideo = async (formData: FormData) => {
  const response = await fetchApi<Response>(
    `${BASE_URL}/geneface/train-model`,
    {
      method: "POST",
      body: formData,
    }
  );
  return response;
};

export const getTalkingTrainedModel = async () => {
  const response = await fetchApi<TrainingModelDto[]>(
    `${BASE_URL}/geneface/trained-models`,
    {
      method: "GET",
    }
  );
  return response;
};
