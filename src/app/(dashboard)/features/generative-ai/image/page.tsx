"use client";

import { useState } from "react";
import Link from "next/link";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Image, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import BreadcrumbCustom from "@/app/components/breadcrumb/BreadcrumbCustom";
import { GetVideoTrainedByImageDto } from "@/types/generative-ai";

const GenerateVideoAI = () => {
  const [form] = useForm();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = () => {
    form.validateFields().then((values: GetVideoTrainedByImageDto) => {
      const formData = new FormData();
      if (file) {
        formData.append("text", values.text);
        formData.append("file", file);
        formData.append("language", values.language);
      }
    });
  };

  const handleImageUpload = async (event: UploadChangeParam) => {
    const file = event.file as RcFile;
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
            title: "With Image",
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
                  setFile(undefined);
                  form.resetFields();
                  setImagePreview(null);
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
              className="w-full flex flex-col justify-center items-center"
            >
              <div className="flex flex-col justify-center items-center w-full max-w-[40rem] text-center">
                <div className="w-full">
                  <h2 className="font-semibold text-xl mb-5">1. Input text</h2>
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
                  <h2 className="font-semibold text-xl mb-5">3. Input image</h2>
                  <Form.Item
                    className="flex-1"
                    name={"file"}
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                      Array.isArray(e) ? e : e && e.fileList
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please upload a file!",
                      },
                    ]}
                  >
                    <Dragger
                      name="file"
                      multiple={false}
                      beforeUpload={() => false}
                      accept=".png,.jpg,.jpeg"
                      maxCount={1}
                      className="w-full"
                      onChange={handleImageUpload}
                      showUploadList={false}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag image to this area to upload
                      </p>
                    </Dragger>
                  </Form.Item>
                  {imagePreview && (
                    <Image
                      alt="Image preview"
                      className="!h-full overflow-hidden"
                      src={imagePreview}
                    />
                  )}
                </div>
              </div>
            </Form>
            <Button
              size="large"
              type="primary"
              className="font-semibold mt-10 "
              onClick={handleSubmit}
            >
              Generate
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
