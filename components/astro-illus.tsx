import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Astro = ({ className }: { className: string }) => {
  return (
    <div className={cn("absolute", className)}>
      <Image src="/astro.svg" width={600} height={600} className="opacity-40" alt="astro" />
    </div>
  );
};

export default Astro;
