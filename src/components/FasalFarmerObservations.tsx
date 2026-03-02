"use client";
import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Post-it note style themes
// Added 'text' property to match border color family but ensuring readability (darker shades)

const THEMES = [
  {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    border: "border-yellow-300 dark:border-yellow-700/80",
    text: "text-yellow-700 dark:text-yellow-500",
    separator: "border-yellow-300/50 dark:border-yellow-700/50",
  },
  {
    bg: "bg-green-100 dark:bg-green-900/20",
    border: "border-green-300 dark:border-green-700/80",
    text: "text-green-700 dark:text-green-500",
    separator: "border-green-300/50 dark:border-green-700/50",
  },
  {
    bg: "bg-background dark:bg-blue-900/20",
    border: "border-[var(--grid-line)] dark:border-blue-700/80",
    text: "dark:text-blue-500",
    separator: "border-[var(--grid-line)] dark:border-blue-700/50",
  },
  {
    bg: "bg-rose-100 dark:bg-rose-900/20",
    border: "border-rose-300 dark:border-rose-700/80",
    text: "text-rose-700 dark:text-rose-500",
    separator: "border-rose-300/50 dark:border-rose-700/50",
  },
  {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    border: "border-purple-300 dark:border-purple-700/80",
    text: "text-purple-700 dark:text-purple-500",
    separator: "border-purple-300/50 dark:border-purple-700/50",
  },
  {
    bg: "bg-orange-100 dark:bg-orange-900/20",
    border: "border-orange-300 dark:border-orange-700/80",
    text: "text-orange-700 dark:text-orange-500",
    separator: "border-orange-300/50 dark:border-orange-700/50",
  },
];
// Real Data extracted from user images + new additions

const farmers = [
  {
    id: 1,
    name: "Chandra Shekar Reddy",
    crop: "Pomegranate Farmer",
    tags: [
      "42 Years Old Farmer",
      "2+ Years with Fasal",
      "App Usage - 10 Mins/Day",
      "High Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["facebook", "whatsapp", "youtube"],
    observations: [
      "He is only using the main page and directing only to data of soil moisture and sensor data.",
      "Unaware of most of the options, he did not even try to explore the app as he was very impatient to go through the app.",
      "Uses app everyday for 10min mainly for soil moisture data and water management, Impatient to through the app.",
      "Click expectations are different. Interactions are mostly Pinch and zoom on Gauges, Click.",
      "Thinks the app is developed for people managing their farms from another location.",
      "According to him device is adding no value as he is getting wrong CB values.",
      "Difficulty in understanding the data and hence questioning the very existence of it.",
      "Difficulty in understanding basic navigations.",
      "He learns about farming methods via Zoom calls with advisors, Farming WhatsApp groups.",
      "Not aware of other features like activity management and he thinks he needs training!",
      "Disease identification via picture would be helpful for him. - Lens like example",
      "He was not able to clearly interpret the value out of gauges and confused as it was too small for him",
    ],
  },
  {
    id: 2,
    name: "Chinna Nagaraju",
    crop: "Pomegranate Farmer",
    tags: [
      "36 Years Old Farmer",
      "2+ Years with Fasal",
      "App Usage - 15 Mins/Day",
      "High Farming Knowledge",
      "High Tech Literacy",
    ],
    socials: ["facebook", "whatsapp", "youtube"],
    observations: [
      "He was unable to go back using our back button multiple times.",
      "He was able to understand the graph values properly & expect more technical details.",
      "He uses app multiple times a day but for shorter period of time.",
      "He has a great knowledge in farming & Chemicals & Trains other farmers for pomegranate farming.",
      "He is more interested in organic farming & has a negative attitude towards pesticides.",
      "He is expecting a learning guide for lesser knowledgeable farmers to understand the data properly.",
      "He is expecting Fasal training center to be placed in his region so that farmers can come, learn & clear their doubts.",
      "He is a tech savvy farmer and wants an automated irrigation system which he can operate from his smartphone from anywhere.",
      "He stocks his supplies 6 months or a year early.",
      "He is facing no difficulty in understanding the information available on the app.",
    ],
  },
  {
    id: 3,
    name: "Desari Venkatesh",
    crop: "Pomegranate Farmer",
    tags: [
      "42 Years Old Farmer",
      "1 Month with Fasal",
      "App Usage - 10 Mins/Day",
      "High Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["facebook", "whatsapp", "youtube"],
    observations: [
      "He uses our app only for irrigation advisories, Disease advisory.",
      "He sits whole day in the farm.",
      "He doesn't understand English. Which makes it difficult to read the chemical name that we provide.",
      "Demo hasn't been done fully yet! he doesn't know what are CB values.",
      "Behavior is now biased because CSE told him to get a new phone because of poor RAM Management : He gave a reason for not exploring the app because he has faulty phone (Biased Opinion).",
      "He is getting influenced by local shop vendors with respect to pesticides as they are recommending somethings else and validating it with benefitted farmers by that particular pesticide. However he has the motivation to use what we are recommending as he suggested Fasal should open their own pesticide shops where he can just go and get the recommended pesticide by our app.",
      "He checks alerts and performs activities based on what we suggest. He checks spraying from alerts and does it.",
      "He did not explore himself because he doesn't know what it is and he expects a demo from a person to make him understand.",
      "He is a very good listener.",
    ],
  },
  {
    id: 4,
    name: "Srinivas",
    crop: "Pomegranate Farmer",
    tags: [
      "45 Years Old Farmer",
      "20 days with Fasal",
      "App Usage - 15 Mins/Day",
      "High Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["whatsapp", "youtube"],
    observations: [
      "He is very new to farming, just started farming & this is his first crop.",
      "Checks app everyday to check rainfall and water management.",
      "Learning new practices or about farming from youtube. No experience from our app on other features.",
      "Got to know about Fasal from YouTube videos. Understands data what we provide about soil moisture and follows the suggestion on farm.",
      "Less understanding of soil moisture sensors in turn leading to confusion about irrigation decisions, whether to do it or not.",
      "He was unable to go back using our back button multiple times.",
      "He wanted to have all the data on home screen.",
    ],
  },
  {
    id: 5,
    name: "Chandra Shekar Reddy",
    crop: "Pomegranate Farmer",
    tags: [
      "45 Years Old Farmer",
      "1 Year with Fasal",
      "App Usage - 10 Mins/Day",
      "High Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["facebook", "whatsapp", "youtube"],
    observations: [
      "He has a very strong belief about organic & traditional farming as he in farming from last 20 years.",
      "He is not associated with any WhatsApp groups related to POM.",
      "He uses fasal app only for pest advisories.",
      "He checks soil moisture by his hand then takes the decision that he should irrigate the field or not as he does not trust our soil moisture readings because of the volume of business he does.",
      "Non explorative & fear induced behavior.",
      "Negative attitude towards BT Gore and his way of farming.",
      "He doesn't use fertilizer much, uses organic fertilizers such as sugar cane waste, cow dung waste.",
      "Doesn't add activities as he doesn't have time because he roams around farms till evening. Maintains a dairy for all the expenses.",
      "If he faces an issue he calls CS. He did not even try to raise a ticket.",
      "Rainfall should be particular to plot, range should be lesser & nearby to plot. If there are chances of rainfall, then only it should be shown.",
      "Water, Humidity, Primary, Rain alerts. He check but doesn't follow.",
    ],
  },
  {
    id: 6,
    name: "Narender",
    crop: "Pomegranate Farmer",
    tags: [
      "49 Years Old Farmer",
      "1 Year with Fasal",
      "App Usage - 10 Mins/Day",
      "High Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["whatsapp"],
    observations: [
      "He was not able to find the alert that he received.",
      "Alerts for thrips should come properly with chemical name in the time.",
      "They note everything in note books or diaries.",
      "He did know what it is for and where it is but not easy to fill in and easy to check again as they are used to note books.",
      "He did not get any chemical suggestion for thrips except for the oil suggestions and he knows that it wont be controlled with just the oil. Chemical suggestion we showed says it will effect the honey bees and he is not ready to spray that.",
    ],
  },
  {
    id: 7,
    name: "K Nagarjuna",
    crop: "Pomegranate Farmer",
    tags: [
      "49 Years Old Farmer",
      "1 Year with Fasal",
      "App Usage - 10 times/Day",
      "High Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["whatsapp"],
    observations: [
      "He uses app very religiously and consumes every offering by Fasal",
      "He is confused about dosage of spray pesticide and hence he requested an addon to our pest advisory. - due to this there is a bit of damage on lead of crop.",
      "He checks the pest alert and compare with his own experiences and practices and performs a mixed approach in the farm",
      "He expects to sit at home and let the device work for him by providing right information.",
      "User Statement : I can not sleep until I use the app even at midnight",
      "He uses the app for water management through soil moisture sensors.",
    ],
  },
  {
    id: 8,
    name: "Narayan Swami",
    crop: "Pomegranate Farmer",
    tags: [
      "49 Years Old Farmer",
      "2 months with Fasal",
      "App Usage - 2 Times/Day",
      "High Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["whatsapp"],
    observations: [
      "He is not able read and write.",
      "He was able to understand visual cues (icons such as irrigation icon, pest icon etc. )",
      "His daughter reads everything to him and make him understand.",
      "Dependency level is high : He can understand things only when it is told by somebody else in this case his daughter.",
      "He estimates how much spray is required as he is being doing farming from ages.",
      "Watches on youtube based on his suggestions but not by typing.",
    ],
  },
  {
    id: 9,
    name: "P Sudhir",
    crop: "Pomegranate Farmer",
    tags: [
      "28 Years Old Farmer",
      "1 Year with Fasal",
      "App Usage - 15 Times/Day",
      "Medium Farming Knowledge",
      "Low Tech Literacy",
    ],
    socials: ["facebook", "whatsapp", "youtube"],
    observations: [
      "He uses our app only for water management & notification/action items or alerts.",
      "When should I put water if the CB value is RED or 15cb. Understanding gap of values.",
      "Updates activities daily and easy to use. While updating he found difficulty in adding covers into which category of activity.",
      'He did not understand the message terms like "Risk of" he thinks it will happen and compares it with his own knowledge and takes action.',
      "Shows 1CB if the water is put for 1hr or 3hrs. Did not understand how much water is being used. Want to know how much time the water is active on plot. (scenario: He calls his father and says put water for 3hrs and he puts it for 1 hr and leaves. But this person how does he know that it is actually put for 3hrs).",
      "He doesn't follow chemicals suggestions from us at all as he observed for 6 months and thinks those are unwanted.",
      "Misguiding information about disease and pest. COC is not good for plants in flowering stage but we suggest it.",
      "He is the only one using the Fasal app. There are labors but the don't have access to app.",
      "Confirmation Bias on disease pest due to fear of loss of crop.",
      "He doesn't consider advisories. He checks what we suggest and searches in google and checks if it harmful for honeybees and makes a decision. Cost is not an issue to purchase the chemical in general.",
      "He dint observe stage wise segregation in crop cycle.",
      "Help being raised to person(CS). He has idea about the feature but dint raise anytime coz he dint get any problem, but a farmer he knows did raise a request.",
      "Forecast is being checked on app 14days and 24 hours. IOS weather app - accurate data. Feels both data are same.",
      "He Does not understand Delta T value in spraying & whole spraying section.",
      "MM is not being understood by fellow farmers and they were not able to quantify the rain volume.",
    ],
  },
  {
    id: 10,
    name: "Ediga Prabhakar",
    crop: "Pomegranate Farmer",
    tags: [
      "28 Years Old Farmer",
      "1 Year with Fasal",
      "App Usage - 15 Times/Day",
      "Low Farming Knowledge",
      "Medium Tech Literacy",
    ],
    socials: ["facebook", "whatsapp", "youtube"],
    observations: [
      "Software Engineer cum farmer & has recently purchased Fasal device from a referral by P Sudhir(POM Farmer) & has a very less knowledge about POM Farming.",
      "He is associated with WhatsApp groups related to POM Farming Knowledge & he regularly uses YouTube to gain POM farming knowledge.",
      "He prefers watching videos instead of reading articles.",
      "Misleading chemical recommendation related to pest and disease",
      "He has received Mislead spraying Information once.",
      "Checks Humidity and temperature. water management & Spray. Rainfall how much and also timing.",
      "Familiar with activity section but still follows book keeping old style as it is convenient for others as well who does not have access to the app.",
      "Informs any issue directly to CS. CS team themselves raises issue from customer's account. He did not even try to raise a request by himself.",
      "Notification are understood clearly. He takes action from the notification or alerts. Once the activity is done he marks it done.",
      "Water irrigation level is given based on CB and weather information. once irrigation is done he marks it as done.",
      "He explains problem to the local shop and follows what they suggest.",
      "Once there was a network problem and solar panel theft issue.",
      "He explains problem to the local shop and follows what they suggest.",
      "Expects advance pesticides which are new in the market which does not affect defoliation.",
      "Basic pesticides information we provide which in his sense doesn't work, thinks wrong information from his confirmation bias. Searches about technical name in you tube.",
      "Does all activities on his own, understands information in his own language as he feels it is more comfortable.",
      'Google is easy to access for weather as i have been used to it form long time. "he says im addicted to using google."',
      "No idea about pomo farming, learns form youtube, BT, shops. Google PDFs",
    ],
  },
];
const TAP_SPRING = {
  type: "spring",
  stiffness: 600,
  damping: 25,
  mass: 0.5,
} as const;

export default function FasalFarmerObservations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const directionRef = useRef<1 | -1>(1);

  const nextFarmer = () => {
    directionRef.current = 1;
    setCurrentIndex((prev) => (prev + 1) % farmers.length);
  };

  const prevFarmer = () => {
    directionRef.current = -1;
    setCurrentIndex((prev) => (prev - 1 + farmers.length) % farmers.length);
  };

  const currentFarmer = farmers[currentIndex];
  const currentTheme = THEMES[currentIndex % THEMES.length];
  const hasSocial = (platform: string) => currentFarmer.socials.includes(platform);

  return (
    <div className="w-full bg-[var(--background)] border border-[var(--grid-line)] overflow-hidden flex flex-col md:flex-row h-auto md:h-[800px]">

      {/* LEFT COLUMN: Profile Card */}
      <div className="w-full md:w-[320px] lg:w-[360px] bg-[var(--background)] text-[var(--foreground)] p-6 md:p-8 flex flex-col shrink-0 relative border-b md:border-b-0 md:border-r border-[var(--grid-line)]">

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          {/* ← Prev: fill enters from LEFT */}
          <motion.button
            onClick={prevFarmer}
            whileTap={{ scale: 0.82, transition: TAP_SPRING }}
            className="group relative p-2.5 md:p-3 border border-[var(--grid-line)] overflow-hidden hover:text-[var(--background)]"
            aria-label="Previous Farmer"
          >
            <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-[300ms] ease-spring-bouncy" />
            <ArrowLeft className="w-5 h-5 relative z-10 transition-transform duration-[300ms] ease-spring-bouncy group-hover:-translate-x-[3px]" />
          </motion.button>

          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {currentIndex + 1} / {farmers.length}
          </span>

          {/* → Next: fill enters from RIGHT */}
          <motion.button
            onClick={nextFarmer}
            whileTap={{ scale: 0.82, transition: TAP_SPRING }}
            className="group relative p-2.5 md:p-3 border border-[var(--grid-line)] overflow-hidden hover:text-[var(--background)]"
            aria-label="Next Farmer"
          >
            <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[100%] group-hover:translate-x-0 transition-transform duration-[300ms] ease-spring-bouncy" />
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-[300ms] ease-spring-bouncy group-hover:translate-x-[3px]" />
          </motion.button>
        </div>

        {/* Avatar */}
        <div className="mx-auto mb-6 md:mb-8 relative">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neutral-300 dark:text-neutral-700"
          >
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-xl font-bold tracking-tight mb-1 leading-none">
            {currentFarmer.name}
          </h3>
          <p className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400">
            {currentFarmer.crop}
          </p>
        </div>

        <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex flex-col items-center">
          {currentFarmer.tags.map((tag, i) => (
            <div
              key={i}
              className="w-full max-w-[260px] border border-[var(--grid-line)] text-[var(--foreground)] px-4 py-2.5 text-[10px] font-bold text-center uppercase tracking-wider"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="mt-auto text-center pt-6 border-t border-[var(--grid-line)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4 text-neutral-400">
            {currentFarmer.name.split(" ").pop()} Uses
          </p>
          <div className="flex justify-center gap-6 text-[var(--foreground)]">
            {hasSocial("facebook") && (
              <Facebook className="w-5 h-5 stroke-[1.5] opacity-80 hover:opacity-100 cursor-pointer" />
            )}
            {hasSocial("whatsapp") && (
              <MessageCircle className="w-5 h-5 stroke-[1.5] opacity-80 hover:opacity-100 cursor-pointer" />
            )}
            {hasSocial("youtube") && (
              <Youtube className="w-5 h-5 stroke-[1.5] opacity-80 hover:opacity-100 cursor-pointer" />
            )}
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="mt-8 md:hidden flex justify-between items-center pt-4 border-t border-[var(--grid-line)]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Field Notes & Observations
          </span>
          <span className="font-bold font-mono text-[10px] uppercase text-neutral-800 dark:text-neutral-400">
            {currentFarmer.name}
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Observations Grid */}
      <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] flex flex-col h-[600px] md:h-full overflow-hidden">

        {/* Header (Desktop only) */}
        <div className="hidden md:flex p-8 pb-4 border-b border-[var(--grid-line)] justify-between items-end z-10 shrink-0">
          <h4 className="text-[var(--foreground)] font-mono text-xs tracking-widest opacity-80">
            Field Notes & Observations
          </h4>
          <span className="font-bold font-mono text-sm">{currentFarmer.name}</span>
        </div>

        {/* Scrollable Grid Area */}
        <div className="p-4 md:p-8 py-6 overflow-y-auto hover-scrollbar flex-1">
          <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto justify-center max-w-fit">
            <AnimatePresence mode="popLayout">
              {currentFarmer.observations.map((obs, i) => (
                <motion.div
                  key={`${currentIndex}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                    delay: i * 0.04,
                  }}
                  className={`p-6 border ${currentTheme.bg} ${currentTheme.border} transition-colors flex flex-col justify-between min-h-[160px] shadow-sm`}
                >
                  <p className="font-sans font-light text-[16px] leading-relaxed text-[var(--foreground)]">
                    {obs}
                  </p>
                  <div
                    className={`mt-4 flex flex-wrap gap-y-2 justify-between items-center text-[10px] font-mono uppercase tracking-widest ${currentTheme.text}`}
                  >
                    <span>#{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="whitespace-nowrap text-left">Gyan Prakash</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
