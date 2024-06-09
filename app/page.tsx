import SortableListDemo from "@/components/clutui/sortable-list-component";
import BoxRevealDemo from "@/components/magicui/box-reveal-component";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-10 pt-10 flex flex-col justify-center">
      {/* <div className="absolute top-16 right-6">
     
          </div> */}
      <div className="min-h-[70vh] flex items-center justify-between gap-18">
        <div className="w-[65%] h-[75vh] pl-8 pt-6">
          <BoxRevealDemo />
        </div>
        <div className="w-[60%] h-[60vh] flex items-center justify-center pt-6">
          {/* <Image
            src="/flygirl-unscreen.gif"
            alt="illustration"
            width={1600}
            height={1600}
            className="bg-transparent"
          /> */}
          <SortableListDemo />
        </div>
      </div>
    </main>
  );
}
