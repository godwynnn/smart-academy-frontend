"use client"
import Image from "next/image";
import { motion } from "motion/react";
import { HeroNavbar } from "../components/HeroNavbar";
import { cn } from "./lib/utils";
import { LayoutGridDemo } from '../components/LayoutGridDemo'
import {TimelineDemo} from '../components/TimeLineDemo'

export default function Home() {
  return (

    <div className="w-full min-h-[100vh] bg-white">
      <HeroNavbar>
        <div
          className="relative mx-auto py-10 flex max-w-7xl flex-col items-center justify-center">



          <div
            className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div
              className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>
          <div
            className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div
              className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
            <div
              className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
          <div className="px-4 py-10 md:py-20">
            <h1
              className="relative z-10 mx-20 max-w-4xl  text-2xl font-semibold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
              {"Smarter Tools for Smarter Classrooms"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block">
                    {word}
                  </motion.span>
                ))}
            </h1>
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.8,
              }}
              className=" z-10 mx-20 max-w-xl py-4 text-left text-lg font-normal text-neutral-600 dark:text-neutral-400">
              Transform Ideas into Assessments Instantly.
              Build Better Lessons, Faster With AI on Your Side,Turn Your Curriculum into Engaging Lessons.
            </motion.p>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 1,
              }}
              className="relative mx-20 z-10 mt-8  gap-4">
              <button
                className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Get Started
              </button>

            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 1.2,
              }}
              className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div
                className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                <img
                  src="https://images01.nicepagecdn.com/page/14/88/website-mockup-preview-148818.jpg"
                  alt="Landing page preview"
                  className="aspect-[16/9] h-auto w-full object-cover"
                  height={1000}
                  width={1000} />
              </div>
            </motion.div>
          </div>



        </div>


        {/* SECTION 2 */}


        <div className="relative flex flex-col min-h-[100vh] w-full items-center p-10 bg-[#001219] dark:bg-[#212529]">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_0.2px,transparent_0.55px),linear-gradient(to_bottom,#e4e4e7_0.2px,transparent_0.55px)]",
            )}
          />
          {/* Radial gradient for the container to give a faded look */}

          <div className="pointer-events-none absolute  inset-0 flex justify-center items-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-white"></div>

          <div className="w-[100%] h-[100vh] ">
            <div className="w-[40%] inline-block float-left">
              <p className="relative z-20 bg-gradient-to-b from-neutral-100 to-neutral-200 bg-clip-text py-8 text-2xl font-semibold text-transparent sm:text-4xl">
                Perfect for Teachers, Tutors,<br /> and Homeschoolers
              </p>

              <p className="text-white text-1xl">
                Our engine ensures all generated materials are aligned with your chosen education standards—be it national curricula, international benchmarks, or custom learning paths.
                Eliminate the manual burden of content creation, so you can focus on what matters most—teaching, learning, and growing.
              </p>

            </div>
            <LayoutGridDemo />
          </div>

            <TimelineDemo/>
        </div>








      </HeroNavbar>
    </div>

  );
}




