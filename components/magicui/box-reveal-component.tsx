"use client";
import BoxReveal from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BoxRevealDemo = () => {
  const [delay, setDelay] = useState(false);
  const router = useRouter();

  const handleRedirectDashboard = () => {
    setDelay(true);
    setTimeout(() => {
      router.push(`/dashboard`);
      setDelay(false);
    }, 1400);
  };

  return (
    <div className="h-full w-full max-w-[38rem] items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"transparent"} duration={0.5}>
        <div className="flex items-center justify-between gap-8 pt-4 py-2 pr-3">
    
          <h1
            className={cn(
              GeistMono.variable,
              "font-mono text-7xl font-bold pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#784fe0] to-[#000] bg-clip-text text-center  leading-none tracking-tighter text-transparent select-none mb-3"
            )}
          >
            Praxis AI
          </h1>
          <svg
            className="-mt-3 hover:rotate-180 transition-transform duration-500 ease-in-out cursor-pointer"
            width="80"
            height="80"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <g clip-path="url(#clip0_234_943)">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M200 50V4.37114e-06L100 0V49.9803C99.9893 22.3751 77.6077 4.37114e-06 50 4.37114e-06H2.18557e-06V100H50C22.3858 100 -1.20706e-06 122.386 0 150L2.18557e-06 200H100L100 150C100 177.614 122.386 200 150 200H200L200 100H150.02C177.625 99.9893 200 77.6077 200 50Z"
                fill="url(#paint0_linear_234_943)"
              />{" "}
            </g>{" "}
            <defs>
              {" "}
              <linearGradient
                id="paint0_linear_234_943"
                x1="27.5"
                y1="19"
                x2="149"
                y2="174.5"
                gradientUnits="userSpaceOnUse"
              >
                {" "}
                <stop stop-color="#784fe0" />{" "}
                <stop offset="1" stop-color="##000" />{" "}
              </linearGradient>{" "}
              <clipPath id="clip0_234_943">
                {" "}
                <rect width="200" height="200" fill="white" />{" "}
              </clipPath>{" "}
            </defs>{" "}
          </svg>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#transparent"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1.3rem]">
          Boost your{" "}
          <span className="text-[#784fe0]">
            interview skills and confidence 🚀
          </span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#transparent"} duration={0.5}>
        <div className="mt-[1.5rem]">
          <div className="flex flex-col items-left gap-2">
            <p>
              -&gt;
              <span className={cn(GeistMono.variable, "font-mono font-bold")}>
                {" "}
                Customized Questions:
              </span>{" "}
              Tailored to
              <span className="font-semibold text-[#5046e6]"> role</span>,
              <span className="font-semibold text-[#5046e6]">
                {" "}
                job description
              </span>
              , and
              <span className="font-semibold text-[#5046e6]">
                {" "}
                experience level
              </span>
              . <br />
            </p>
            <p>
              -&gt;
              <span className={cn(GeistMono.variable, "font-mono font-bold")}>
                {" "}
                Interactive Recording:
              </span>{" "}
              Record and review your interview responses.
            </p>
            <p>
              -&gt;
              <span className={cn(GeistMono.variable, "font-mono font-bold")}>
                {" "}
                Detailed Feedback:
              </span>{" "}
              Get ratings and constructive feedback on your performance.
            </p>
          </div>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#transparent"} duration={0.5}>
        <Button
          className="mt-[1.6rem]"
          variant="gooeyLeft"
          onClick={handleRedirectDashboard}
          loadingText="Exploring"
          isLoading={delay}
        >
          Explore
        </Button>
      </BoxReveal>
    </div>
  );
};

export default BoxRevealDemo;
