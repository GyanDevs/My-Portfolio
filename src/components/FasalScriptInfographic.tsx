"use client"; /** * FasalScriptInfographic * Vertical Scroll Layout for "The Script". * Simulates a conversation/script document. * Refined: No bold, no green, hidden scrollbar, smaller heading. */
export default function FasalScriptInfographic() {
  return (
    <div className="w-full border border-[var(--grid-line)] mb-12 flex flex-col bg-background">
      {" "}
      {/* Header Section */}{" "}
      <div className="border-b border-[var(--grid-line)] p-6 md:p-10 flex items-center gap-6">
        {" "}
        <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shrink-0 hidden md:flex text-[var(--foreground)]">
          {" "}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className="text-[var(--foreground)]"
          >
            {" "}
            {/* Script / Document Icon - Neutralized */}{" "}
            <path
              d="M8 4H24C25.1046 4 26 4.89543 26 6V26C26 27.1046 25.1046 28 24 28H8C6.89543 28 6 27.1046 6 26V6C6 4.89543 6.89543 4 8 4Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <path
              d="M10 10H22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
            <path
              d="M10 14H22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
            <path
              d="M10 18H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
            <path
              d="M10 22H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
          </svg>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1">
            {" "}
            Field Visit{" "}
          </h3>{" "}
          <p className="text-[18px] font-bold tracking-tight text-[var(--foreground)]">
            {" "}
            The Conversation Script{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* Scrollable Script Content - No Scrollbar */}{" "}
      <div className="max-h-[500px] overflow-y-auto no-scrollbar p-6 md:p-10 space-y-8">
        {" "}
        {/* Q1 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            Hi &lt;farmer name&gt; How are you?{" "}
          </p>{" "}
          <div className="pl-8 space-y-3 border-l pointer-events-none border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
            <p className="text-[16px] bg-white dark:bg-neutral-800 p-4 border border-[var(--grid-line)] inline-block text-neutral-500">
              {" "}
              <span className="font-mono block mb-1 text-[13px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Context
              </span>{" "}
              We are from Fasal, we are here to understand how you use our
              product so that we can understand your problems and what you want
              more to improve in our product.{" "}
            </p>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q2 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            What apps do you use on an everyday basis on your mobile?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q3 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            From how much time have you been using our Fasal device?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q4 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            How much time did you spend to understand or learn to use our
            application?{" "}
          </p>{" "}
          <div className="pl-8 space-y-3 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
            <div className="pl-4 border-l border-[var(--grid-line)] border-dashed">
              {" "}
              <p className="text-neutral-500 dark:text-neutral-400 text-[16px] mb-1">
                Was it easy or hard?
              </p>{" "}
              <p className="text-neutral-600 dark:text-neutral-400 italic text-[16px]  text-neutral-500">
                {" "}
                [Answer from farmer]{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q5 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            What crops have you used our device and current crop?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q6 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            You might be using our app everyday?{" "}
          </p>{" "}
          <div className="pl-8 space-y-4 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
            <ul className="list-disc pl-5 text-[16px] text-neutral-500 dark:text-neutral-400 space-y-2 font-light">
              {" "}
              <li>
                If yes - How many times approximate in a day do you use and why?
              </li>{" "}
              <li>
                If no - Why don&apos;t you use it and what is not motivating you
                from using our application?
              </li>{" "}
            </ul>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q7 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            So, What features do you use on the app most &amp; why?{" "}
          </p>{" "}
          <div className="pl-8 space-y-4 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
            <div className="bg-white dark:bg-neutral-800 p-6 border border-[var(--grid-line)]">
              {" "}
              <p className="font-bold text-[18px] mb-2">Feature 1</p>{" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400  leading-snug">
                What is it for? Why do you use it? How did you find it? How did
                you get to know about it?
              </p>{" "}
              <div className="mt-4 text-neutral-600 dark:text-neutral-400 italic text-[16px] border-t border-[var(--grid-line)] pt-4  text-neutral-500">
                {" "}
                [Answer from farmer]{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q8 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            How easy is the information/data provided on our app to read?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <ul className="list-disc pl-5 text-[16px] text-neutral-500 dark:text-neutral-400 space-y-2 font-light">
              {" "}
              <li>Is it useful [give us a scenario, how did it help?]</li>{" "}
              <li>
                If not useful [tell us the scenario, how it did not help?]
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q9 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            Tell us if you have faced or facing any issues with our app?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q10 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            Do you know that these features are also available in our app?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q11 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            How do you solve any issues you face with our device or app
            currently?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q12 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            Which weather app you use on daily basis and why?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q13 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            How do you currently know about farming news and learn about farming
            practices?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Q14 */}{" "}
        <div className="space-y-3">
          {" "}
          <p className="text-[18px] font-medium text-neutral-500 dark:text-neutral-400 flex gap-3">
            {" "}
            <span className="text-neutral-400 font-mono text-[13px]">
              Q:
            </span>{" "}
            How has Fasal improved your farming practices?{" "}
          </p>{" "}
          <div className="pl-8 border-l border-[var(--grid-line)] ml-1">
            {" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 italic font-light">
              {" "}
              [Answer from farmer]{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
