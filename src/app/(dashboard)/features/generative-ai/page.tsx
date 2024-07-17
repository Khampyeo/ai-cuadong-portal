"use client";

import Link from "next/link";
import BreadcrumbCustom from "@/app/components/breadcrumb/BreadcrumbCustom";
import Item from "./components/Item";

const GeneraticAi = () => {
  return (
    <div>
      <BreadcrumbCustom
        items={[
          {
            title: <Link href={"/"}>Home</Link>,
          },
          {
            title: "Generative AI",
          },
        ]}
      />
      <div className="mt-12 flex items-center flex-col ">
        <h1 className="font-semibold text-2xl">Generative AI</h1>
        <div className="flex justify-center gap-12 mt-24">
          <Item
            title="Create with your model"
            img="/img/supergirl.jpg"
            link="/features/generative-ai/model"
          />
          <Item
            title="Create with default model"
            img="/img/spongebob.jpg"
            link="/features/generative-ai/image"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneraticAi;
