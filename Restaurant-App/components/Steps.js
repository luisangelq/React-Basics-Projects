import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useRestaurant from "../hooks/useRestaurant";

const Steps = () => {
  const router = useRouter();

  const { step, handleStep } = useRestaurant();
  const steps = [
    { step: 1, name: "Menu", url: "/" },
    { step: 2, name: "Cart", url: "/cart" },
    { step: 3, name: "Total", url: "/total" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
        handleStep(1);
    } else if (router.pathname === "/cart") {
        handleStep(2);
    } else if (router.pathname === "/total") {
        handleStep(3);
    }
    }, [router.pathname]);

  return (
    <>
      <div className="grid grid-cols-3 ">
        {steps.map((step) => (
          <Link key={step.step} href={step.url}>
            <button
              className="text-2xl font-bold py-5"
            >
              {step.name}
            </button>
          </Link>
        ))}
      </div>

      <div className="bg-gray-300 rounded-full mb-10 h-2">
        <div
          className={`rounded-full bg-amber-500 text-xs leading-none h-2 w-${step}/3`}
        ></div>
      </div>
    </>
  );
};

export default Steps;
