"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Hompage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/vn/homepage");
  }, [router]);
  return null;
};
export default Hompage;
