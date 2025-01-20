// next-seo.config.js
const title = "Anonymous - Engage with True Anonymity";
const description = "Communicate securely and anonymously in real-time.";

export default {
  title,
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayf-anonymous.vercel.app/", // Replace with your event's URL
    title,
    description,
    images: [
      {
        url: "https://ik.imagekit.io/akf2tcskl/pngegg%20(29)_zEhlifDkh.png?updatedAt=1724186047623", // Replace with your event's banner image URL
        width: 800,
        height: 800,
        alt: "Anonymous",
      },
    ],
    site_name: "Anonymous",
  },
  twitter: {
    // handle: "@timeout_event", // Replace with your Twitter handle
    // site: "@timeout_event",
    // cardType: "summary_large_image",
  },
};
