"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import BreadcrumbCustom from "@/app/components/breadcrumb/BreadcrumbCustom";
import { GetVideoTrainedByModelDto } from "@/types/generative-ai";

const GenerateVideoAI = () => {
  const [form] = useForm<GetVideoTrainedByModelDto>();
  const [url, setUrl] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    form.validateFields().then((values: GetVideoTrainedByModelDto) => {
      const formData = new FormData();
      formData.append("text", values.text);
      formData.append("video_id", values.video_id);
      formData.append("language", values.language);
    });
  };

  return (
    <div>
      <BreadcrumbCustom
        items={[
          {
            title: <Link href={"/"}>Home</Link>,
          },
          {
            title: <Link href={"/features/generative-ai"}>Generatic AI</Link>,
          },
          {
            title: "With Model Training",
          },
        ]}
      />
      <div className="mt-20">
        <div className="flex justify-center relative">
          {url && (
            <div className="absolute left-0 bottom-1/2 translate-y-1/2">
              <Button
                className="absolute left-0"
                onClick={() => {
                  setUrl(undefined);
                  form.resetFields();
                }}
              >
                Back
              </Button>
            </div>
          )}
          <h1 className="font-semibold text-3xl">Create video with text</h1>
        </div>
        {!url ? (
          <div className="mt-10 flex flex-col justify-center items-center">
            <Form
              form={form}
              className="w-full flex flex-col justify-center items-center max-w-[40rem] text-center"
            >
              <div className="w-full">
                <h2 className="font-semibold text-xl mb-5">
                  1. Input text to generate
                </h2>
                <Form.Item
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "This field is required.",
                    },
                  ]}
                  name={"text"}
                >
                  <Input size="large" />
                </Form.Item>
              </div>
              <div className="w-full">
                <h2 className="font-semibold text-xl mb-5">
                  2. Choose language
                </h2>
                <Form.Item
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "This field is required.",
                    },
                  ]}
                  name={"language"}
                >
                  <Select
                    placeholder="Choose"
                    size="large"
                    options={[
                      {
                        value: "vi",
                        label: "Vietnamese",
                      },
                      {
                        value: "en",
                        label: "English",
                      },
                    ]}
                  ></Select>
                </Form.Item>
              </div>
              <div className="w-full">
                <h2 className="font-semibold text-xl mb-5">
                  3. Input model to generate
                </h2>
                <Form.Item
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "This field is required.",
                    },
                  ]}
                  name={"video_id"}
                >
                  <Input size="large" />
                </Form.Item>
              </div>
            </Form>
            <Button
              size="large"
              type="primary"
              className="font-semibold mt-20"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        ) : (
          <div className="mt-20 flex justify-center">
            <video id="videoPlayer" width="600" controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateVideoAI;
