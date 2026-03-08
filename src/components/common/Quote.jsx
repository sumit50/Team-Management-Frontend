// import React, {useState, useEffect} from "react";
// import {getQuote} from "../../services/quote";

// const Quote = () => {
//   const [quote, setQuote] = useState(null);

//   useEffect(() => {
//     const fetchQuote = async () => {
//       // Set a timeout so quote fetching doesn't block the page
//       const timeoutId = setTimeout(() => {
//         console.warn("Quote fetch timed out");
//       }, 6000);

//       try {
//         const data = await getQuote();
//         clearTimeout(timeoutId);

//         if (Array.isArray(data) && data.length > 0) {
//           const randomQuote = data[Math.floor(Math.random() * data.length)];
//           setQuote(randomQuote);
//         } else if (data && !Array.isArray(data)) {
//           // If API returns a single object
//           setQuote(data);
//         }
//       } catch (error) {
//         clearTimeout(timeoutId);
//         console.error("Error fetching quote:", error);
//       }
//     };
//     fetchQuote();
//   }, []);

//   if (!quote) return null;

//   return (
//     <div className="hidden lg:block text-slate-500 text-sm max-w-md italic text-right mr-4 self-center">
//       "{quote.quote}"
//       {quote.author && (
//         <span className="block text-xs not-italic text-slate-400">
//           - {quote.author}
//         </span>
//       )}
//     </div>
//   );
// };

// export default Quote;
