import { useEffect, useRef } from "react";
import { Odometer } from "odometer_countup"

//types
import type { LandingCountUptype } from "@/types/shared";

function LandingCountUp({ numberValue, subTitle, svgSrc }: LandingCountUptype) {
  const countupRef = useRef<HTMLParagraphElement | null>(null);
  let countUpAnim;
  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current!, numberValue,{
        plugin: new Odometer({ duration: 2,lastDigitDelay:2 }),
    });
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }
  useEffect(() => {
    initCountUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div key={subTitle} className="flex flex-col items-center gap-y-1">
      <img src={svgSrc} className="w-[80px]" alt="logo-student" />
      <p ref={countupRef} style={{direction:"ltr"}} className="mt-1 text-center text-xl font-semibold dir-ltr">
        0
      </p>
      <p className="text-center text-lg font-semibold">{subTitle}</p>
    </div>
  );
}

export { LandingCountUp };
