"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/brand-logo.png";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Image src={logo} width={200} alt="Evan Hoizey Logo"></Image>
      <div className="flex flex-col gap-4 items-center w-[90%]">
        <h2 className="font-bold text-3xl font-heading text-emerald-950">
          Welcome to my{" "}
          <span className="font-black text-emerald-950">react playground</span>{" "}
          !
        </h2>
        <div className="w-full h-fit p-4 flex flex-col items-center gap-4 bg-emerald-800 rounded-xl shadow-xl">
          <h3 className="font-heading font-bold text-2xl text-emerald-950">
            My latest work
          </h3>
          <div className="flex gap-4 items-start">
            <p className="max-w-[70%] font-body text-lg text-emerald-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
              quam blanditiis, dicta explicabo repudiandae quasi saepe non eaque
              sint laborum necessitatibus, a asperiores, hic ipsa voluptatibus
              amet quo aliquid numquam.
            </p>
            <Link
              href={"/tabs"}
              style={{ transition: "all 0.2s ease-in-out" }}
              className="bg-emerald-950 flex gap-2 items-center h-fit w-fit text-nowrap p-4 text-white hover:text-emerald-600 font-black rounded-lg font-heading shadow-xl hover:-translate-y-1"
            >
              <Icon icon="iconamoon:home-fill" />
              <span>Dynamic Tabs Selector</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
