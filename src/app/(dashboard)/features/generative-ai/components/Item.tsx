import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  img: string;
  link: string;
};

const Item = ({ title, img, link }: Props) => {
  const router = useRouter();
  return (
    <div
      className="min-h-96 w-72 bg-white shadow-md rounded-lg overflow-hidden flex flex-col text-base cursor-pointer hover:shadow-xl"
      onClick={() => router.push(link)}
    >
      <Image
        src={img}
        width={500}
        height={500}
        className="w-full h-60 object-cover bg-center"
        alt="Picture of the author"
      />
      <div className="p-4 text-center font-semibold">
        <h1>{title}</h1>
        <p className="text-sm text-[#8a8aa3] font-normal">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="mt-auto text-right font-semibold text-primary-color p-4">
        Try for free
      </div>
    </div>
  );
};

export default Item;
