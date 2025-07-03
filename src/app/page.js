"use client"
import Image from "next/image";
import { motion } from "motion/react";
import { HeroNavbar } from "../components/HeroNavbar";
import { cn } from "./lib/utils";
import { LayoutGridDemo } from '../components/LayoutGridDemo'
import { TimelineDemo } from '../components/TimeLineDemo'
import { WobbleCardDemo } from '../components/WobbleCardDemo'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, snap } from "gsap";
import { StickyScrollRevealDemo } from '../components/StickyScrollRevealDemo'
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import Footer from '../components/Footer'
import { ContainerTextFlipDemo } from '../components/ContainerTextFlipDemo'

gsap.registerPlugin(ScrollTrigger);



export default function Home() {

  const HeroRef = useRef()
  const marqueeHolderRef = useRef()
  const marqueeContents=['Generate.','Teach.','Assess.']




  useGSAP(() => {

    const sections = gsap.utils.toArray('.section')
    console.log(sections)
    sections.forEach((val, idx) => {
      var color = val.getAttribute('data-color')

      // gsap.to(HeroRef.current,{
      //   backgroundColor:color,
      //   scrollTrigger:{
      //     trigger:val,
      //     start:"top 5%",
      //     end:"bottom 20%",
      //     markers:true,
      //     toggleActions:"play none play reverse"
      //   }
      // })
      ScrollTrigger.create({
        trigger: val,
        start: 'top 60%',
        end: "bottom 60%",

        markers: false,
        immediateRender: false,
        // toggleActions:"play none none reverse",
        onEnter: () => {
          console.log(color)
          gsap.to(HeroRef.current, {
            backgroundColor: color,
            duration: 1.2
          })

          gsap.to('.sub_section_2', {
            backgroundColor: color,
            duration: 1.2
          })
        },

        // onLeave:()=>{
        //   gsap.to(HeroRef.current, {
        //     backgroundColor: color,
        //     duration: 1.2
        //   })
        // },

        // onLeaveback:()=>{
        //   gsap.to(HeroRef.current, {
        //     backgroundColor: color,
        //     duration: 1.2
        //   })
        // },

        onEnterBack: () => {
          gsap.to(HeroRef.current, {
            backgroundColor: color,
            duration: 1.2
          })

          gsap.to('.sub_section_2', {
            backgroundColor: color,
            duration: 1.2
          })
        },



      })
    })
  })



  useGSAP(() => {
    const marquees = gsap.utils.toArray(".marquee_item");

    const loop = horizontalLoop(marquees, {
      repeat: -1,

      paddingRight: 0,
      speed: 3,
      draggable: true
    });


    /*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
   function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => {
    // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container =
        center === true
          ? items[0].parentNode
          : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: (i) => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
          : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] +
                (tl.duration() * widths[i]) / 2 / totalWidth -
                timeOffset
            );
          });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond
            },
            0
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                )
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable
          ? tl.time(times[curIndex], true)
          : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio,
        startProgress,
        draggable,
        dragSnap,
        lastSnap,
        initChangeX,
        wasPlaying,
        align = () =>
          tl.progress(
            wrap(startProgress + (draggable.startX - draggable.x) * ratio)
          ),
        syncIndex = () => tl.closestIndex(true);
      typeof InertiaPlugin === "undefined" &&
        console.warn(
          "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
        );
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 &&
            (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
}

  })



  return (



    <div className="w-full min-h-[100vh]  hero  " ref={HeroRef} >
      <HeroNavbar>
        <div
          className="relative mx-auto py-2 flex max-w-7xl flex-col  justify-center section  " data-color='white'>



          <div
            className="absolute inset-y-0 left-0 h-[90%] w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div
              className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>
          <div
            className="absolute inset-y-0 right-0 h-[90%] w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div
              className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>



          <div className="px-4 py-0  md:py-0">

            <div className="min-h-[120vh] md:mx-20 mt-0 md:w-[50%] flex flex-col justify-center">
              <h1
                className="relative z-10  max-sm:mx-auto max-sm:text-center max-w-4xl  text-5xl font-semibold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                {`Smarter Tools for Smarter`
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
                  ))}<span><ContainerTextFlipDemo /></span>
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
                className=" z-10  max-sm:mx-auto max-w-xl max-sm:text-center py-4 text-left text-lg font-normal text-neutral-600 dark:text-neutral-400">
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
                className="relative  max-sm:mx-auto z-10 mt-8  gap-4">
                <button
                  className="w-60 transform rounded-lg max-sm:mx-auto  bg-[#001219] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Get Started
                </button>

              </motion.div>






            </div>

            <div ref={marqueeHolderRef} className="relative mt-16  p-0 m-0 h-[30vh] whitespace-nowrap  overflow-x-hidden  text-9xl flex flex-row item-center">
              {Array(2).fill().map((_,idx)=>
                <div className="marquee_item text-[#001219]" key={idx}>
                  {marqueeContents.map((val,idx)=>{
                    return <p key={idx}>{val}</p>
                  })}
                  
                  
                </div>
              
              )}
              
            
            </div>








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
              className="relative z-10 mt-24  rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div
                className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                <img
                  src="https://assets.aceternity.com/templates/startup-2.webp"
                  alt="Landing page preview"
                  className="aspect-[16/9] h-auto w-full object-cover"
                  height={1000}
                  width={1000} />
              </div>
            </motion.div>
          </div>



        </div>


        {/* SECTION 2 */}


        <div className="section relative flex flex-col  min-h-[100vh] w-full dark:bg-[#2f3e46] items-center md:px-20 py-20 " data-color='#001219'>
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_0.2px,transparent_0.55px),linear-gradient(to_bottom,#e4e4e7_0.2px,transparent_0.55px)]",
            )}
          />
          {/* Radial gradient for the container to give a faded look */}

          <div className="sub_section_2 pointer-events-none absolute  inset-0 flex justify-center items-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-white"></div>

          <div className="w-[100%] min-h-[100vh] md:px-20 max-sm:px-5 flex lg:flex-row justify-center items-center md:flex-col max-sm:flex-col sm:flex-col bg-neutral-900 ">
            <div className="lg:w-[40%] md:w-[100%] max-sm:w-[100%] float-left max-sm:float-none ">
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

          <TimelineDemo />




          {/* Masonry Cards */}
          <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-6">
              <div className="sm:self-end col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-5 lg:col-start-3">
                {/* Card */}
                <a className="group relative block rounded-xl overflow-hidden focus:outline-hidden" href="#">
                  <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                    <img className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                      src="https://tinyurl.com/25xbcpr8" alt="Masonry Cards Image" />
                  </div>
                  <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                    <div className="text-sm font-semibold text-gray-800 rounded-lg bg-white p-4 md:text-xl">
                      Workplace personalities
                    </div>
                  </div>
                </a>
                {/* End Card */}
              </div>
              {/* End Col */}

              <div className="sm:self-end col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3">
                {/* Card */}
                <a className="group relative block rounded-xl overflow-hidden focus:outline-hidden" href="#">
                  <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                    <img className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                      src="https://tinyurl.com/ev69rn66" alt="Masonry Cards Image" />
                  </div>
                  <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                    <div className="text-sm font-semibold text-gray-800 rounded-lg bg-white p-4 md:text-xl">
                      Women in engineering
                    </div>
                  </div>
                </a>
                {/* End Card */}
              </div>
              {/* End Col */}

              <div className="col-span-12 md:col-span-4">
                {/* Card */}
                <a className="group relative block rounded-xl overflow-hidden focus:outline-hidden" href="#">
                  <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                    <img className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                      src="https://tinyurl.com/mr2xxpj9" alt="Masonry Cards Image" />
                  </div>
                  <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                    <div className="text-sm font-semibold text-gray-800 rounded-lg bg-white p-4 md:text-xl">
                      Pride 2021
                    </div>
                  </div>
                </a>
                {/* End Card */}
              </div>
              {/* End Col */}

              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                {/* Card */}
                <a className="group relative block rounded-xl overflow-hidden focus:outline-hidden" href="#">
                  <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                    <img className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                      src="https://tinyurl.com/yc6prza6" alt="Masonry Cards Image" />
                  </div>
                  <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                    <div className="text-sm font-semibold text-gray-800 rounded-lg bg-white p-4 md:text-xl">
                      Data at Preline
                    </div>
                  </div>
                </a>
                {/* End Card */}
              </div>
              {/* End Col */}

              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                {/* Card */}
                <a className="group relative block rounded-xl overflow-hidden focus:outline-hidden" href="#">
                  <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                    <img className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                      src="https://tinyurl.com/muyajp7d" alt="Masonry Cards Image" />
                  </div>

                  <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                    <div className="text-sm font-semibold text-gray-800 rounded-lg bg-white p-4 md:text-xl">
                      Empowered management
                    </div>
                  </div>
                </a>
                {/* End Card */}
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Masonry Cards */}
        </div>


        <WobbleCardDemo />







        {/* Features */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 md:mx-20 mt-[10%] ">
          {/* Grid */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              {/* Grid */}
              <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
                <div className="col-span-4">
                  <img className="rounded-xl" src="https://tinyurl.com/yanx9yjb" alt="Features Image" />
                </div>
                {/* End Col */}

                <div className="col-span-3">
                  <img className="rounded-xl" src="https://tinyurl.com/3f44barc" alt="Features Image" />
                </div>
                {/* End Col */}

                <div className="col-span-5">
                  <img className="rounded-xl" src="https://images.unsplash.com/photo-1600194992440-50b26e0a0309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80" alt="Features Image" />
                </div>
                {/* End Col */}
              </div>
              {/* End Grid */}
            </div>
            {/* End Col */}

            <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
              <div className="space-y-6 sm:space-y-8">
                {/* Title */}
                <div className="space-y-2 md:space-y-4">
                  <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                    Collaborative tools to design user experience
                  </h2>
                  <p className="text-gray-500">
                    Use our tools to explore your ideas and make your vision come true. Then share your work easily.
                  </p>
                </div>
                {/* End Title */}

                {/* List */}
                <ul className="space-y-2 sm:space-y-4">
                  <li className="flex gap-x-3">
                    <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <div className="grow">
                      <span className="text-sm sm:text-base text-gray-500">
                        <span className="font-bold">Less routine</span> – more creativity
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-x-3">
                    <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <div className="grow">
                      <span className="text-sm sm:text-base text-gray-500">
                        Hundreds of thousands saved
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-x-3">
                    <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <div className="grow">
                      <span className="text-sm sm:text-base text-gray-500">
                        Scale budgets <span className="font-bold">efficiently</span>
                      </span>
                    </div>
                  </li>
                </ul>
                {/* End List */}
              </div>
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Features */}



        <div className="w-full text-white bg-[#001219]" data-color='#001219'>

          {/* FAQ */}
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 md:mx-20 text-white">
            {/* Grid */}
            <div className="grid md:grid-cols-5 gap-10">
              <div className="md:col-span-2">
                <div className="max-w-xs">
                  <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">Frequently<br />asked questions</h2>
                  <p className="mt-1 hidden md:block text-gray-100">Answers to the most frequently asked questions.</p>
                </div>
              </div>
              {/* End Col */}

              <div className="md:col-span-3">
                {/* Accordion */}
                <div className="hs-accordion-group divide-y divide-gray-100">
                  <div className="hs-accordion pb-3 active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                    <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-hidden focus:text-gray-500" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                      Can I cancel at anytime?
                      <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-100 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-100 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                      <p className="text-gray-100">
                        Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.
                      </p>
                    </div>
                  </div>

                  <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                    <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-hidden focus:text-gray-500" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                      My team has credits. How do we use them?
                      <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                      <p className="text-gray-600">
                        Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.
                      </p>
                    </div>
                  </div>

                  <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                    <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-hidden focus:text-gray-500" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                      How does Preline's pricing work?
                      <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                      <p className="text-gray-600">
                        Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.
                      </p>
                    </div>
                  </div>

                  <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-four">
                    <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-hidden focus:text-gray-500" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four">
                      How secure is Preline?
                      <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-four" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four">
                      <p className="text-gray-600">
                        Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.
                      </p>
                    </div>
                  </div>

                  <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-five">
                    <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-hidden focus:text-gray-500" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five">
                      How do I get access to a theme I purchased?
                      <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-five" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five">
                      <p className="text-gray-600">
                        If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.
                      </p>
                    </div>
                  </div>


                </div>
                {/* End Accordion */}
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End FAQ */}




          <Footer />


        </div>
      </HeroNavbar>
    </div>


  );
}




