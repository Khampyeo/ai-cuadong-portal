"use client";
import styles from "./common.module.scss";
import Link from "next/link";
import BreadcrumbCustom from "@/app/components/breadcrumb/BreadcrumbCustom";
const Chatbot = () => {
  return (
    <div className={styles.chatbot_container}>
      <BreadcrumbCustom
        items={[
          {
            title: <Link href={"/"}>Home</Link>,
          },
          {
            title: "Chatbot",
          },
        ]}
      />
      <div className={styles.iframe_container}>
        <iframe
          src={"https://saavagaipackagewebdev.z23.web.core.windows.net/"}
          className={styles.iframe}
          style={{ border: "none" }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
export default Chatbot;
