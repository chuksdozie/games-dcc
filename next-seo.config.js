// next-seo.config.js
const title = "Games - FC 25";
const description = "Keeping track of friendly games in a fun way.";

export default {
  title,
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://games.devchuks.com/", // Replace with your event's URL
    title,
    description,
    images: [
      {
        url: "https://keyrounds.tn/_next/image?url=https%3A%2F%2Fmedia.keyrounds.tn%2Fpublic%2Fmedia%2Fgames%2F309bd940-cbd3-444c-ab0a-ac6f9e38528d.webp&w=828&q=100", // Replace with your event's banner image URL
        width: 800,
        height: 800,
        alt: "Anonymous",
      },
    ],
    site_name: "Games",
  },
  twitter: {
    // handle: "@timeout_event", // Replace with your Twitter handle
    // site: "@timeout_event",
    // cardType: "summary_large_image",
  },
};
