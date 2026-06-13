import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useMemo } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { NavLink, Link, useParams, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Phone, Clock, MapPin, X, Menu, Wifi, Tv, Car, Thermometer, Sparkles, Droplets, ChevronLeft, ChevronRight, Store, Shield, Leaf, Shirt, Wind, Heart, ShoppingBag, Coins, Gamepad2, CheckCircle, Truck, Bell, MessageCircle, Smartphone, Copy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
const logo = "/assets/logo-CgS7Ti1v.png";
const common = {
  brand: {
    name: "Corner Wash",
    logo: "/logo.png",
    scheduleUrl: "http://book.cornerwashlaundry.com/",
    since: "1975"
  },
  contact: {
    address: "3501 Adams Ave, San Diego, CA 92116",
    tagline: "Serving All of San Diego • Premier Ozone Laundromat & Delivery",
    phone: "(619) 284-6741",
    email: "cornerwashlaundry@gmail.com"
  },
  marquee: [
    "TUESDAY & THURSDAY SPECIAL 40-LB WASHERS ONLY $4.50 7–9 AM & 6–7:30 PM",
    "OZONE-SANITIZED WATER TECHNOLOGY - KILLS 99.9% OF BACTERIA",
    "FAMILY OWNED & OPERATED SINCE 1975",
    "GET 10% OFF HOUSEHOLD ITEMS WITH EVERY $45+ WASH & FOLD ORDER!",
    "NEXT-DAY SERVICE AVAILABLE FOR ALL WASH & FOLD",
    "MILITARY & CIVIL SERVANTS GET 10% OFF WITH VALID ID"
  ]
};
const siteContent = {
  ...common,
  navigation: [
    { title: "Pickup & Delivery", path: "/pickup-and-delivery" },
    { title: "Wash & Fold", path: "/wash-and-fold" },
    { title: "Self Service", path: "/self-service-laundry" },
    { title: "Dry Cleaning", path: "/dry-cleaning" },
    { title: "Commercial Laundry", path: "/commercial-laundry" },
    { title: "Ozone Laundry", path: "/ozone-laundry" },
    { title: "Pricing", path: "/pricing" }
  ],
  footer: {
    services: [
      { title: "Wash & Fold", path: "/wash-and-fold" },
      { title: "Pickup & Delivery", path: "/pickup-and-delivery" },
      { title: "Dry Cleaning", path: "/dry-cleaning" },
      { title: "Self Service Laundry", path: "/self-service-laundry" },
      { title: "Ozone Technology", path: "/ozone-laundry" },
      { title: "Commercial Laundry", path: "/commercial-laundry" },
      { title: "Towel Laundry Service", path: "/commercial-laundry/commercial-towel-laundry-service" },
      { title: "Linen Cleaning", path: "/commercial-laundry/linen-cleaning-service-in-san-diego" }
    ],
    info: [
      { title: "Pricing", path: "/pricing" },
      { title: "Service Areas", path: "/service-areas" },
      { title: "Our Location", path: "/location" },
      { title: "About Us", path: "/about-us" },
      { title: "Testimonials", path: "/about-us/testimonials" },
      { title: "FAQ", path: "/about-us/frequently-asked-questions" },
      { title: "Contact", path: "/contact" }
    ],
    legal: [
      { title: "Terms of Use", path: "/terms-of-use" },
      { title: "Privacy Policy", path: "/privacy-policy" }
    ]
  },
  home: {
    hero: {
      badge: "Adams Ave. Premier Laundromat • Since 1975",
      cta: "Schedule Pickup"
    },
    about: {
      title: "A San Diego Tradition.",
      badge: "Established 1975",
      content: "Corner Wash in Normal Heights is a family-owned business since 1975. Our laundry has a full-service attendant always providing our customers with a safe, clean and bright environment, as well as all laundry services. All washers & dryers are state-of-the-art high performance laundry systems, with every wash Ozone-Sanitized Water Treated to kill 99.999% of all bacteria and viruses.\n\nWe take cash, credit/debit, Apple Pay, and Google Pay. Our goal is to have all of our washers, dryers and vending machines in good working order at all times. Clean Restrooms, comfortable lounge seating with a TV, Wi-Fi, beverage & snacks, and free parking are yours to enjoy while getting your laundry done."
    },
    services: [
      {
        title: "Pickup & Delivery",
        desc: "Door-to-door laundry service that saves you hours every week. We pick it up, wash it, and deliver it back fresh.",
        image: "service_icons_pickup_delivery.png"
      },
      {
        title: "Wash & Fold",
        desc: "Our professional Ozone wash & fold service kills 99.9% of bacteria and viruses while leaving your clothes softer than ever.",
        image: "service_icons_wash_fold.png"
      },
      {
        title: "Commercial Laundry",
        desc: "If you are buried in laundry at your business then let Corner Wash help you take a load off. We will work with your schedule to make sure you have clean, sanitized laundry when you need it.",
        image: "service_icons_commercial_laundry.png"
      },
      {
        title: "Dry Cleaning",
        desc: "Premium dry cleaning for your delicate garments. We treat every item with the care it deserves to keep you looking sharp.",
        image: "service_icons_dry_cleaning.jpg"
      },
      {
        title: "Ozone Sanitization",
        desc: "Our hospital-grade Ozone Laundry System is included free with every wash. It naturally destroys 99.9% of bacteria, viruses, and mold, leaving your clothes fresher and lasting longer.",
        image: "service_icons_ozone.png"
      },
      {
        title: "Self Service Laundry",
        desc: "Use our state-of-the-art Speed Queen machines at your own pace. Pay by app, card, or quarters. Ozone-sanitized for every load — with free Wi-Fi and TV while you wait.",
        image: "wash_fold_table_art.png"
      }
    ]
  },
  pricing: {
    walkIn: [
      { item: "Standard — 24 hr Turnaround", price: "$1.95/lb" },
      { item: "Same-Day Service", sub: "Drop off by 3 PM", price: "$2.25/lb" }
    ],
    delivery: [
      { item: "Recurring Scheduled Pickups", price: "$1.99/lb" },
      { item: "One-Time / By-Request", price: "$2.25/lb" }
    ],
    commercial: [
      { item: "Base Rate", price: "$1.99/lb" },
      { item: "100+ lbs/week", sub: "10% discount", price: "$1.79/lb" },
      { item: "350+ lbs/week", sub: "15% discount", price: "$1.69/lb" }
    ],
    specialItems: [
      { name: "Comforter (King/Queen)", price: "26.50" },
      { name: "Comforter (Twin/Full/Toddler/Crib)", price: "23.50" },
      { name: "Bedspread (King/Queen)", price: "22.00" },
      { name: "Bedspread (Twin/Double)", price: "17.00" },
      { name: "Blanket / Throw (Large)", price: "16.00" },
      { name: "Blanket (Small)", price: "11.00" },
      { name: "Sleeping Bag / Mattress Pad (King)", price: "25.50" },
      { name: "Sleeping Bag / Mattress Pad (Twin/Full/Queen)", price: "22.50" },
      { name: "Duvet Cover (By Itself)", price: "17.50" },
      { name: "Duvet Cover (W/ Wash & Fold Order)", price: "7.50" },
      { name: "Bathmat (Standard 21x34)", price: "15.00" },
      { name: "Bathmat (W/ Wash & Fold Order)", price: "7.50" },
      { name: "Bathmats (Small) – 2 rug minimum", price: "10.00" },
      { name: "Bathmats (Medium)", price: "15.00" },
      { name: "Pillows (Standard Size)", price: "10.00" },
      { name: "Pet Bed (Standard 21x34)", price: "20.00" }
    ]
  },
  serviceAreas: {
    areas: [
      { name: "Balboa Park", slug: "laundry-service-in-balboa-park-ca", description: "Skip the laundry-day drama while you explore the Botanical Building or the San Diego Air and Space Museum. We serve all areas of Balboa Park.", image: "https://images.unsplash.com/photo-1599427303058-f04cbcf47769?auto=format&fit=crop&w=800&q=80" },
      { name: "City Heights", slug: "laundry-service-in-city-heights-ca", description: "Corner Wash is City Heights' trusted laundry partner. We offer convenient pickup and delivery so you can enjoy the community.", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80" },
      { name: "Hillcrest", slug: "laundry-service-in-hillcrest-ca", description: "Keep your style fresh in San Diego's most vibrant district. We provide door-to-door service so you can enjoy local cafes.", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80" },
      { name: "Mission Valley", slug: "laundry-service-in-mission-valley-ca", description: "Reliable laundry delivery in Mission Valley. Let us handle the chores while you focus on what matters.", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80" },
      { name: "Normal Heights", slug: "laundry-service-in-normal-heights-ca", description: "Right in our backyard! Corner Wash is located at 3501 Adams Avenue in the heart of Normal Heights.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" },
      { name: "North Park", slug: "laundry-service-in-north-park-ca", description: "While we take care of the laundry, enjoy live music at The Observatory or browse books at Verbatim. We've got North Park covered.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" },
      { name: "University Heights", slug: "laundry-service-in-university-heights-ca", description: "University Heights residents trust Corner Wash for fast, reliable laundry pickup and delivery.", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80" }
    ]
  }
};
const MenuOverlay = ({ isOpen, onClose }) => {
  const content = siteContent;
  const menuLinks = [
    { title: "Home", path: "/" },
    ...content.navigation,
    { title: "Service Areas", path: "/service-areas" },
    { title: "About Us", path: "/about-us" }
  ];
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: "100%" },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: "100%" },
      transition: { type: "spring", damping: 25, stiffness: 200 },
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 1e3,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch"
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }, children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            style: {
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "2px solid black",
              padding: "0.5rem 1rem",
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "4px 4px 0px black"
            },
            children: "CLOSE"
          }
        ) }),
        /* @__PURE__ */ jsx("nav", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: menuLinks.map((link, i) => /* @__PURE__ */ jsx(
          NavLink,
          {
            to: link.path,
            onClick: onClose,
            style: ({ isActive }) => ({
              fontSize: "2rem",
              fontWeight: 900,
              textDecoration: "none",
              color: "var(--color-primary)",
              textTransform: "uppercase",
              borderBottom: isActive ? "8px solid var(--color-funky-red)" : "8px solid transparent",
              paddingBottom: "0.25rem",
              alignSelf: "flex-start"
            }),
            children: link.title
          },
          i
        )) }),
        /* @__PURE__ */ jsxs("div", { style: { marginTop: "auto", paddingTop: "2rem", borderTop: "var(--brutalist-border-thin)" }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontWeight: 900, fontSize: "1.2rem", marginBottom: "0.5rem" }, children: "(619) 284-6741" }),
          /* @__PURE__ */ jsx("p", { style: { fontWeight: 600, opacity: 0.7 }, children: "3501 Adams Ave, San Diego" })
        ] })
      ]
    }
  ) });
};
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const content = siteContent;
  const navLinks = content.navigation;
  return /* @__PURE__ */ jsxs("header", { style: {
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: 150,
    backgroundColor: "#ffffff",
    borderBottom: "var(--brutalist-border)",
    boxShadow: "0px 4px 0px #04D1FF"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "container", style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "1.25rem 1rem 0.75rem"
    }, children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          style: {
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0
          },
          onClick: () => setIsMenuOpen(false),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "Corner Wash",
              style: { height: "clamp(80px, 15vw, 100px)", width: "auto", display: "block" }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mobile-hide", style: {
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        color: "var(--color-primary)",
        paddingTop: "0.75rem"
      }, children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:6192846741",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.9rem",
              fontWeight: 800,
              color: "inherit",
              textDecoration: "none"
            },
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16 }),
              "(619) 284-6741"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "0.9rem",
          fontWeight: 700
        }, children: [
          /* @__PURE__ */ jsx(Clock, { size: 16 }),
          "7AM – 9PM"
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://www.google.com/maps/place/Corner+Wash/@32.762884,-117.119973,17z/data=!3m1!4b1!4m6!3m5!1s0x80d954499d690747:0x8797f3780562e106!8m2!3d32.762884!4d-117.119973!16s%2Fg%2F1tf7w_m3?entry=ttu",
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            },
            children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16 }),
              "3501 Adams Ave"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "mobile-flex",
          style: {
            display: "none",
            backgroundColor: "var(--color-primary)",
            color: "white",
            border: "2px solid black",
            padding: "0.5rem",
            cursor: "pointer",
            boxShadow: "2px 2px 0px #000",
            alignItems: "center",
            justifyContent: "center"
          },
          onClick: () => setIsMenuOpen(!isMenuOpen),
          children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "mobile-hide", style: {
      backgroundColor: "var(--color-primary)",
      borderTop: "2px solid #000000",
      width: "100%"
    }, children: /* @__PURE__ */ jsx("div", { className: "container", style: { display: "flex", alignItems: "stretch", justifyContent: "center" }, children: navLinks.map((link) => /* @__PURE__ */ jsx(
      NavLink,
      {
        to: link.path,
        className: ({ isActive }) => `nav-link ${isActive ? "active" : ""}`,
        children: link.title
      },
      link.path
    )) }) }),
    isMenuOpen && /* @__PURE__ */ jsx(
      MenuOverlay,
      {
        isOpen: isMenuOpen,
        onClose: () => setIsMenuOpen(false),
        links: navLinks
      }
    )
  ] });
};
const Footer = () => {
  const content = siteContent;
  return /* @__PURE__ */ jsx("footer", { style: {
    backgroundColor: "white",
    padding: "6rem 0 4rem",
    borderTop: "var(--brutalist-border)",
    color: "var(--color-primary)",
    position: "relative"
  }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "clamp(2rem, 5vw, 4rem)",
      marginBottom: "6rem"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logo,
            alt: "Corner Wash",
            style: {
              height: "clamp(80px, 12vw, 120px)",
              width: "auto",
              objectFit: "contain",
              objectPosition: "left center",
              marginBottom: "1.5rem"
            }
          }
        ),
        /* @__PURE__ */ jsxs("p", { style: {
          fontSize: "1.2rem",
          lineHeight: 1.5,
          opacity: 0.9,
          maxWidth: "350px",
          fontWeight: 700,
          color: "var(--color-primary)",
          textTransform: "uppercase",
          fontFamily: "var(--font-heading)"
        }, children: [
          "San Diego's premier ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { backgroundColor: "var(--color-secondary)", color: "black", padding: "2px 8px" }, children: "Laundromat" }),
          " ",
          /* @__PURE__ */ jsx("br", {}),
          "Since 1975."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { borderLeft: "var(--column-border, 2px solid rgba(0,0,0,0.1))", paddingLeft: "var(--column-padding, 2rem)" }, children: [
        /* @__PURE__ */ jsx("h4", { style: { fontSize: "1rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem", fontFamily: "var(--font-heading)", color: "var(--color-primary)" }, children: "Services" }),
        /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }, children: content.footer.services.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.path, style: { textDecoration: "none", color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 800, opacity: 0.8, textTransform: "uppercase", transition: "0.2s" }, children: link.title }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { borderLeft: "var(--column-border, 2px solid rgba(0,0,0,0.1))", paddingLeft: "var(--column-padding, 2rem)" }, children: [
        /* @__PURE__ */ jsx("h4", { style: { fontSize: "1rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem", fontFamily: "var(--font-heading)", color: "var(--color-primary)" }, children: "Info & More" }),
        /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }, children: content.footer.info.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.path, style: { textDecoration: "none", color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 800, opacity: 0.8, textTransform: "uppercase", transition: "0.2s" }, children: link.title }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { borderLeft: "var(--column-border, 2px solid rgba(0,0,0,0.1))", paddingLeft: "var(--column-padding, 2rem)" }, children: [
        /* @__PURE__ */ jsx("h4", { style: { fontSize: "1rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem", fontFamily: "var(--font-heading)", color: "var(--color-primary)" }, children: "Legal" }),
        /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }, children: content.footer.legal.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.path, style: { textDecoration: "none", color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 800, opacity: 0.8, textTransform: "uppercase", transition: "0.2s" }, children: link.title }) }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mobile-stack", style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "3rem",
      borderTop: "var(--brutalist-border-thin)",
      flexWrap: "wrap",
      gap: "2rem"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "mobile-center", style: { display: "flex", flexDirection: "column", gap: "0.25rem" }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: "0.85rem", opacity: 0.8, fontWeight: 800, textTransform: "uppercase", margin: 0 }, children: "© 2026 Corner Wash San Diego. All rights reserved." }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "0.75rem", opacity: 0.6, fontWeight: 800, textTransform: "uppercase", margin: 0 }, children: "Powered by Wash & Give" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mobile-center", style: { display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end", width: "auto" }, children: [
        /* @__PURE__ */ jsxs("a", { href: "https://www.google.com/maps/place/Corner+Wash/@32.762884,-117.119973,17z/data=!3m1!4b1!4m6!3m5!1s0x80d954499d690747:0x8797f3780562e106!8m2!3d32.762884!4d-117.119973!16s%2Fg%2F1tf7w_m3", target: "_blank", rel: "noreferrer", style: { backgroundColor: "white", border: "1px solid #ddd", padding: "4px 12px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", transition: "0.2s" }, children: [
          /* @__PURE__ */ jsx("img", { src: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg", alt: "Google", style: { height: "18px" } }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", fontWeight: 700, color: "#555" }, children: "Reviews" })
        ] }),
        /* @__PURE__ */ jsx("a", { href: "https://www.yelp.com/biz/corner-wash-san-diego", target: "_blank", rel: "noreferrer", style: { backgroundColor: "white", border: "1px solid #ddd", padding: "4px 12px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", transition: "0.2s" }, children: /* @__PURE__ */ jsx("img", { src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Yelp_Logo.svg", alt: "Yelp", style: { height: "24px" } }) }),
        /* @__PURE__ */ jsxs("a", { href: "https://www.facebook.com/CornerWashSD", target: "_blank", rel: "noreferrer", style: { backgroundColor: "white", border: "1px solid #ddd", padding: "4px 12px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", transition: "0.2s", height: "28px" }, children: [
          /* @__PURE__ */ jsx("img", { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", alt: "Facebook", style: { height: "16px", width: "auto" } }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", fontWeight: 700, color: "#555" }, children: "Facebook" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "https://www.instagram.com/cornerwashsd/", target: "_blank", rel: "noreferrer", style: { backgroundColor: "white", border: "1px solid #ddd", padding: "4px 12px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", transition: "0.2s", height: "28px" }, children: [
          /* @__PURE__ */ jsx("img", { src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", alt: "Instagram", style: { height: "16px", width: "auto" } }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", fontWeight: 700, color: "#555" }, children: "Instagram" })
        ] })
      ] })
    ] })
  ] }) });
};
const Bubbles = ({ isGlobal = true }) => {
  const initialBubbles = useMemo(() => {
    const bubbleCount = isGlobal ? 30 : 35;
    return Array.from({ length: bubbleCount }).map((_, i) => {
      let size;
      if (!isGlobal) {
        const tier = i % 3;
        if (tier === 0) size = Math.random() * 25 + 10;
        else if (tier === 1) size = Math.random() * 45 + 45;
        else size = Math.random() * 100 + 100;
      } else {
        size = Math.random() * 80 + 15;
      }
      return {
        id: `bg-${i}`,
        size,
        left: `${Math.random() * 100}%`,
        duration: isGlobal ? Math.random() * 30 + 20 : Math.random() * 20 + 16,
        startY: isGlobal ? `${Math.random() * 120 - 20}vh` : `${Math.random() * 100}vh`
      };
    });
  }, [isGlobal]);
  useMemo(() => {
    if (isGlobal) return [];
    const items = ["🧦", "👕", "👖", "🧼", "🫧", "🧺", "🌬️", "🧸", "👗", "👔", "🩳", "💧", "✨"];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `item-${i}`,
      emoji: items[Math.floor(Math.random() * items.length)],
      size: Math.random() * 30 + 30,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 80 + 10}%`,
      rotation: Math.random() * 360,
      duration: Math.random() * 40 + 40
    }));
  }, [isGlobal]);
  return /* @__PURE__ */ jsx("div", { style: {
    position: isGlobal ? "fixed" : "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: isGlobal ? -1 : 1,
    opacity: isGlobal ? 0.4 : 1
  }, children: initialBubbles.map((bubble) => /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: bubble.startY, opacity: 0.6 },
      animate: {
        y: "-20vh",
        opacity: [0.6, 0.6, 0.6, 0],
        x: [0, 50, -50, 0]
      },
      transition: {
        duration: bubble.duration,
        repeat: Infinity,
        ease: "linear"
      },
      style: {
        position: "absolute",
        left: bubble.left,
        width: bubble.size,
        height: bubble.size,
        borderRadius: "50%",
        background: "rgba(4, 209, 255, 0.15)",
        border: "1px solid rgba(4, 209, 255, 0.3)",
        boxShadow: "inset 0 0 10px rgba(4, 209, 255, 0.4)",
        backdropFilter: "blur(3px)",
        pointerEvents: "none"
      }
    },
    bubble.id
  )) });
};
const SEO = ({ title, description, path = "" }) => {
  const siteName = "Corner Wash Laundry";
  const fullTitle = `${title} | ${siteName}`;
  const url = `https://cornerwashlaundry.com${path}`;
  const defaultDescription = "San Diego's premier ozone-sanitized laundromat. We offer pickup and delivery, wash and fold, and dry cleaning services across San Diego.";
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description || defaultDescription }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description || defaultDescription }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:description", content: description || defaultDescription })
  ] });
};
const washFoldImg = "/assets/wash_fold_table_art-BLuggGDU.png";
const washFoldIcon = "/assets/service_icons_wash_fold-P-obzMCZ.png";
const pickupIcon = "/assets/service_icons_pickup_delivery-B3U1Jqam.png";
const commercialIcon = "/assets/service_icons_commercial_laundry-CDGUwbyH.png";
const dryCleaningIcon = "/assets/service_icons_dry_cleaning-CzlE0e0w.jpg";
const ozoneIcon = "/assets/service_icons_ozone-DphJGdmr.png";
const interiorImg = "/assets/interior-4sc_-h8b.webp";
const laundromat1Img = "/assets/laundromat-1-mf7gM0PF.webp";
const counterImg = "/assets/counter-BRtq9BxT.webp";
const machinesImg = "/assets/machines-8MfJDxXK.webp";
const laundromat2Img = "/assets/laundromat-2-D2aoG_ly.webp";
const eightLoadsImg$1 = "/assets/eight-loads-Q_RFabpY.webp";
const laundromat3Img = "/assets/laundromat-3-BBg1PttO.webp";
const speedQueensImg = "/assets/speed-queens-BlEJLQQu.webp";
const actualHeroImg = "/assets/actual_laundromat_hero-B6Ku03oi.png";
const normalHeightsHero = "/assets/normal-heights-hero-BTqFjNrt.png";
const Home = () => {
  const content = siteContent;
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const reviews = [
    { text: "Always clean. Immaculately clean! Machines, floors, and folding tables all spotless.", author: "Ammar", color: "var(--color-secondary)" },
    { text: "What a great place! Their prices are quite reasonable, and the place is always clean and spotless. Staff has always been friendly, and I appreciate the extra services like spot cleaning if necessary.", author: "David O.", color: "rgba(255,255,255,0.07)" },
    { text: "Great place and great service! Had a t-shirt with several stains and Juliet used her expertise to take them all out. Looks like a new shirt! Thank you!!", author: "Roland", color: "rgba(255,255,255,0.04)" },
    { text: "Juliet is awesome. Never stops moving. Helps all clients. Very personable yet professional. She makes the place spotless. I am here once or twice a week — she is the best!!", author: "Marilyn", color: "var(--color-secondary)" },
    { text: "This visit was particularly amazing. Juliet spent at least 10 full minutes showing me how to get stubborn stains out with her spray bottles and detergents. Incredible service.", author: "Howard", color: "rgba(255,255,255,0.07)" },
    { text: "Love Corner Wash! Dry cleaning is well-priced, I've never had an issue with the equipment and all my clothes come out fresh. The stain removal here is unmatched!", author: "Ava", color: "rgba(255,255,255,0.04)" }
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 3 >= reviews.length ? 0 : prev + 3);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 3 < 0 ? Math.max(0, reviews.length - (reviews.length % 3 || 3)) : prev - 3);
  };
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Serving All of San Diego • Premier Ozone Laundromat & Delivery",
        description: "Corner Wash offers eco-friendly ozone-sanitized laundry services in San Diego. Pickup & delivery, wash and fold, and self-service available since 1975.",
        path: "/"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "hero-section", style: { minHeight: "auto", padding: "4rem 0" }, children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: {
        position: "relative",
        zIndex: 10,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(400px, 100%), 1fr))",
        gap: "clamp(2rem, 5vw, 4rem)",
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "mobile-center", style: { textAlign: "left" }, children: [
          /* @__PURE__ */ jsx("div", { className: "mobile-justify-center", style: { display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "1rem" }, children: /* @__PURE__ */ jsx("span", { style: {
            display: "inline-block",
            fontSize: "clamp(0.65rem, 3.2vw, 0.85rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.05em",
            backgroundColor: "#6AE9F7",
            color: "var(--color-primary)",
            padding: "0.6rem 1.25rem",
            border: "var(--brutalist-border)",
            boxShadow: "4px 4px 0px var(--color-primary)",
            lineHeight: 1.3,
            transform: "rotate(-1.5deg)"
          }, children: content.home.hero.badge }) }),
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            "Your Eco-Friendly ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Laundromat" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "p-lg", style: { maxWidth: "580px", marginBottom: "1.5rem" }, children: [
            "Serving All of San Diego with the ",
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Best Full-Service" }),
            " laundry—hospital-grade ozone cleaning, hand-folded with care in the heart of Normal Heights."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: normalHeightsHero, alt: "Normal Heights San Diego", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "section reveal", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", style: { maxWidth: "1000px", textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs("h2", { style: {
        fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
        color: "var(--color-primary)",
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        marginBottom: "1.5rem"
      }, children: [
        "We have ",
        /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF", fontWeight: 800 }, children: "state of the art washers & dryers" }),
        ", and every wash is ",
        /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF", fontWeight: 800 }, children: "Ozone-Sanitized" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "p-lg", style: { maxWidth: "850px", margin: "0 auto 4rem", opacity: 0.9, textAlign: "center" }, children: [
        "Our informed staff is always here to help. We offer Wash & Fold, Dry Cleaning, Laundered, and Press services — all in a ",
        /* @__PURE__ */ jsx("strong", { children: "clean, bright, climate-controlled environment" }),
        " with free Wi-Fi, refreshments, TV lounge, restroom and free parking. Come by and see for yourself!"
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", gap: "clamp(0.75rem, 2vw, 2rem)", flexWrap: "wrap" }, children: [
        { label: "FREE WI-FI", icon: /* @__PURE__ */ jsx(Wifi, { size: 18 }) },
        { label: "TV LOUNGE", icon: /* @__PURE__ */ jsx(Tv, { size: 18 }) },
        { label: "FREE PARKING", icon: /* @__PURE__ */ jsx(Car, { size: 18 }) },
        { label: "CLIMATE CONTROLLED", icon: /* @__PURE__ */ jsx(Thermometer, { size: 18 }) },
        { label: "OZONE CLEAN", icon: /* @__PURE__ */ jsx(Sparkles, { size: 18 }) },
        { label: "CLEAN RESTROOMS", icon: /* @__PURE__ */ jsx(Droplets, { size: 18 }) }
      ].map((pill, i) => /* @__PURE__ */ jsxs("span", { style: {
        fontSize: "0.9rem",
        fontWeight: 900,
        letterSpacing: "0.1em",
        fontFamily: "var(--font-heading)",
        border: "2px solid var(--color-primary)",
        padding: "0.6rem 1.2rem",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "white",
        color: "black",
        boxShadow: "var(--brutalist-shadow-sm)"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: "var(--color-primary)" }, children: pill.icon }),
        pill.label
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", gap: "clamp(1rem, 3vw, 2.5rem)", marginTop: "3rem", flexWrap: "wrap" }, children: [interiorImg, laundromat2Img, eightLoadsImg$1].map((img, i) => /* @__PURE__ */ jsx("div", { style: {
        width: "280px",
        height: "280px",
        borderRadius: "0",
        overflow: "hidden",
        border: "8px solid var(--color-primary)",
        boxShadow: "10px 10px 0px rgba(0,0,0,0.15)",
        flexShrink: 0
      }, children: /* @__PURE__ */ jsx("img", { src: img, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: { padding: "4rem 1rem", backgroundColor: "var(--color-bg)" }, children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: {
      backgroundColor: "var(--color-primary)",
      color: "white",
      padding: "4rem 2rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      border: "var(--brutalist-border)",
      boxShadow: "var(--brutalist-shadow)"
    }, children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("h2", { style: {
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 900,
          textTransform: "uppercase",
          marginBottom: "1rem",
          lineHeight: 1
        }, children: [
          "Save ",
          /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "10%" }),
          " on Household Items"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { maxWidth: "650px", margin: "0 auto 2.5rem", color: "white" }, children: "Add comforters, bedding, or bulky items to any Wash & Fold order of $45 or more and automatically receive a 10% discount on those items." }),
        /* @__PURE__ */ jsx(Link, { to: "/pricing", className: "btn", style: {
          backgroundColor: "var(--color-secondary)",
          color: "black",
          textDecoration: "none",
          display: "inline-block"
        }, children: "View Specialty Pricing" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section reveal", style: { backgroundColor: "var(--color-bg)" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { style: {
        fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
        textAlign: "center",
        maxWidth: "900px",
        margin: "0 auto 3rem",
        color: "var(--color-primary)",
        lineHeight: 1.3,
        fontWeight: 800
      }, children: "From self-service to commercial accounts, we've got All of San Diego's laundry needs covered with eco-friendly Ozone technology." }),
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
        gap: "1rem"
      }, children: content.home.services.map((service, i) => /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        boxShadow: "var(--brutalist-shadow-sm)",
        border: "var(--brutalist-border)",
        padding: "1rem",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { height: "120px", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx("img", { src: i === 0 ? pickupIcon : i === 1 ? washFoldIcon : i === 2 ? commercialIcon : i === 3 ? dryCleaningIcon : i === 4 ? ozoneIcon : washFoldImg, alt: service.title, style: { width: "100%", height: "100%", objectFit: "contain" } }) }),
        /* @__PURE__ */ jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--color-primary)" }, children: service.title }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0, flexGrow: 1 }, children: service.desc })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "reveal", children: /* @__PURE__ */ jsx("section", { style: { background: "white", padding: "6rem 0", color: "var(--color-primary)" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: "1rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", textAlign: "center" }, children: "Pricing" }),
      /* @__PURE__ */ jsx("h2", { style: { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, margin: "0 0 1rem", lineHeight: 1, textAlign: "center" }, children: "Simple, Transparent Rates." }),
      /* @__PURE__ */ jsx("p", { style: { maxWidth: "600px", margin: "0 auto 4rem", fontSize: "1.05rem", lineHeight: 1.7, opacity: 0.75, fontWeight: 500, textAlign: "center" }, children: "Straightforward per-pound pricing for all wash, dry, and fold services." }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { style: { fontSize: "1rem", fontWeight: 900, fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.25rem", paddingBottom: "0.5rem", borderBottom: "3px solid var(--color-primary)", color: "var(--color-primary)" }, children: [
            "Walk-In ",
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 500, fontSize: "0.85rem" }, children: "(10 lb min)" })
          ] }),
          content.pricing.walkIn.map((row, i) => /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white", border: "2px solid var(--color-primary)", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", boxShadow: "var(--brutalist-shadow-sm)", gap: "1rem" }, children: [
            /* @__PURE__ */ jsxs("div", { style: { fontSize: "0.9rem", fontWeight: 700, fontFamily: "var(--font-heading)", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.04em", flex: 1 }, children: [
              row.item,
              row.sub && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { style: { fontWeight: 500, textTransform: "none", letterSpacing: 0, opacity: 0.7, fontSize: "0.8rem" }, children: row.sub })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: { fontSize: "1.6rem", fontWeight: 900, fontFamily: "var(--font-heading)", color: "var(--color-primary)", whiteSpace: "nowrap" }, children: [
              row.price.split("/")[0],
              /* @__PURE__ */ jsxs("span", { style: { fontSize: "1rem" }, children: [
                "/",
                row.price.split("/")[1]
              ] })
            ] })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { style: { fontSize: "1rem", fontWeight: 900, fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.25rem", paddingBottom: "0.5rem", borderBottom: "3px solid var(--color-primary)", color: "var(--color-primary)" }, children: [
            "Pickup and Delivery ",
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 500, fontSize: "0.85rem" }, children: "($45 min)" })
          ] }),
          content.pricing.delivery.map((row, i) => /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white", border: "2px solid var(--color-primary)", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", boxShadow: "var(--brutalist-shadow-sm)", gap: "1rem" }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: "0.9rem", fontWeight: 700, fontFamily: "var(--font-heading)", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.04em", flex: 1 }, children: row.item }),
            /* @__PURE__ */ jsxs("div", { style: { fontSize: "1.6rem", fontWeight: 900, fontFamily: "var(--font-heading)", color: "var(--color-primary)", whiteSpace: "nowrap" }, children: [
              row.price.split("/")[0],
              /* @__PURE__ */ jsxs("span", { style: { fontSize: "1rem" }, children: [
                "/",
                row.price.split("/")[1]
              ] })
            ] })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { style: { fontSize: "1rem", fontWeight: 900, fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.25rem", paddingBottom: "0.5rem", borderBottom: "3px solid var(--color-primary)", color: "var(--color-primary)" }, children: "Commercial" }),
          content.pricing.commercial.map((row, i) => /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white", border: "2px solid var(--color-primary)", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", boxShadow: "var(--brutalist-shadow-sm)", gap: "1rem" }, children: [
            /* @__PURE__ */ jsxs("div", { style: { fontSize: "0.9rem", fontWeight: 700, fontFamily: "var(--font-heading)", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.04em", flex: 1 }, children: [
              row.item,
              row.sub && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { style: { fontWeight: 500, textTransform: "none", letterSpacing: 0, opacity: 0.7, fontSize: "0.8rem" }, children: row.sub })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: { fontSize: "1.6rem", fontWeight: 900, fontFamily: "var(--font-heading)", color: "var(--color-primary)", whiteSpace: "nowrap" }, children: [
              row.price.split("/")[0],
              /* @__PURE__ */ jsxs("span", { style: { fontSize: "1rem" }, children: [
                "/",
                row.price.split("/")[1]
              ] })
            ] })
          ] }, i)),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "0.8rem", fontWeight: 600, opacity: 0.6, marginTop: "0.75rem" }, children: "Volume discounts applied to recurring commercial accounts." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        margin: "4rem auto 0",
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        border: "1px solid black",
        backgroundColor: "#FFFBEB",
        width: "fit-content",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.75rem" }, children: "🪖" }),
        /* @__PURE__ */ jsxs("p", { style: { fontWeight: 900, fontSize: "1.1rem", color: "black", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }, children: [
          "Military & Civil Servants get ",
          /* @__PURE__ */ jsx("span", { style: { backgroundColor: "black", color: "#04D1FF", padding: "0 0.4rem" }, children: "10% OFF" }),
          " with Valid ID"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "reveal", children: /* @__PURE__ */ jsxs("section", { style: { backgroundColor: "var(--color-primary)", padding: "6rem 0", position: "relative", overflow: "hidden" }, children: [
      /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "clamp(8rem, 20vw, 18rem)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.03)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em" }, children: "★★★★★" }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { position: "relative", zIndex: 1 }, children: [
        /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: "4rem" }, children: [
          /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", gap: "5px", marginBottom: "1rem" }, children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("span", { style: { color: "var(--color-secondary)", fontSize: "1.5rem" }, children: "★" }, i)) }),
          /* @__PURE__ */ jsx("h2", { style: { color: "white", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 900, margin: "0 0 0.5rem", letterSpacing: "-0.02em" }, children: "What Our Community Says" }),
          /* @__PURE__ */ jsx("p", { style: { color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-heading)" }, children: "Verified Google Reviews" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            overflow: "hidden"
          }, children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -50 },
              transition: { duration: 0.4 },
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                width: "100%"
              },
              children: reviews.slice(currentSlide, currentSlide + 3).map((rev, i) => /* @__PURE__ */ jsxs("div", { style: {
                backgroundColor: rev.color === "var(--color-secondary)" ? "var(--color-secondary)" : rev.color,
                border: rev.color === "var(--color-secondary)" ? "var(--brutalist-border)" : "1px solid rgba(255,255,255,0.12)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.5rem",
                boxShadow: rev.color === "var(--color-secondary)" ? "var(--brutalist-shadow)" : "none",
                minHeight: "280px"
              }, children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "3px", marginBottom: "1rem" }, children: [...Array(5)].map((_, j) => /* @__PURE__ */ jsx("span", { style: { color: "var(--color-secondary)", fontSize: "1rem" }, children: "★" }, j)) }),
                  /* @__PURE__ */ jsxs("p", { style: { fontSize: "1rem", lineHeight: 1.7, color: rev.color === "var(--color-secondary)" ? "black" : "rgba(255,255,255,0.9)", fontWeight: 500, fontStyle: "italic" }, children: [
                    '"',
                    rev.text,
                    '"'
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { width: "36px", height: "36px", borderRadius: "0", backgroundColor: rev.color === "var(--color-secondary)" ? "white" : "var(--color-secondary)", color: rev.color === "var(--color-secondary)" ? "var(--color-primary)" : "black", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.9rem", fontFamily: "var(--font-heading)", flexShrink: 0 }, children: rev.author[0] }),
                  /* @__PURE__ */ jsx("span", { style: { fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: rev.color === "var(--color-secondary)" ? "black" : "white", fontFamily: "var(--font-heading)" }, children: rev.author })
                ] })
              ] }, i))
            },
            currentSlide
          ) }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prevSlide,
              style: {
                position: "absolute",
                left: "-2rem",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "var(--color-secondary)",
                border: "var(--brutalist-border)",
                padding: "0.75rem",
                cursor: "pointer",
                zIndex: 10,
                boxShadow: "var(--brutalist-shadow-sm)",
                display: reviews.length <= 3 ? "none" : "flex",
                alignItems: "center"
              },
              className: "mobile-hide",
              children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24, color: "black" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: nextSlide,
              style: {
                position: "absolute",
                right: "-2rem",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "var(--color-secondary)",
                border: "var(--brutalist-border)",
                padding: "0.75rem",
                cursor: "pointer",
                zIndex: 10,
                boxShadow: "var(--brutalist-shadow-sm)",
                display: reviews.length <= 3 ? "none" : "flex",
                alignItems: "center"
              },
              className: "mobile-hide",
              children: /* @__PURE__ */ jsx(ChevronRight, { size: 24, color: "black" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }, children: Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, i) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentSlide(i * 3),
            style: {
              width: "12px",
              height: "12px",
              borderRadius: "0",
              border: "2px solid white",
              backgroundColor: Math.floor(currentSlide / 3) === i ? "var(--color-secondary)" : "transparent",
              cursor: "pointer",
              padding: 0
            }
          },
          i
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section reveal", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: "4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { fontSize: "3.5rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "1rem", letterSpacing: "-0.02em" }, children: "Clean, Safe, Bright Space" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { maxWidth: "700px", margin: "0 auto" }, children: "Step inside San Diego's most welcoming laundry spot. Bright, clean, and filled with good energy." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "gallery-grid", children: [
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 2 / span 2", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: interiorImg, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 1 / span 1", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: laundromat1Img, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 1 / span 1", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: counterImg, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 1 / span 1", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: machinesImg, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 1 / span 1", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: laundromat2Img, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 1 / span 2", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: eightLoadsImg$1, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 1 / span 1", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: laundromat3Img, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsx("div", { style: { gridArea: "span 1 / span 1", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", position: "relative", backgroundColor: "white" }, children: /* @__PURE__ */ jsx("img", { src: speedQueensImg, alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "reveal", children: /* @__PURE__ */ jsx("section", { style: { backgroundColor: "var(--color-bg)", padding: "8rem 0", overflow: "hidden", position: "relative", borderTop: "var(--brutalist-border)" }, children: /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "6rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
      /* @__PURE__ */ jsx("div", { style: { position: "relative", borderRadius: "0", overflow: "hidden", boxShadow: "var(--brutalist-shadow)", aspectRatio: "5 / 6", border: "var(--brutalist-border)" }, children: /* @__PURE__ */ jsx("img", { src: actualHeroImg, alt: "Corner Wash Interior", style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-secondary)", display: "block", marginBottom: "1.5rem", fontFamily: "var(--font-heading)" }, children: content.home.about.badge }),
        /* @__PURE__ */ jsx("h2", { style: { fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: "var(--color-primary)", lineHeight: 1, marginBottom: "2.5rem" }, children: content.home.about.title }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.15rem", lineHeight: 1.8, color: "var(--color-primary)", opacity: 0.9, marginBottom: "3rem", fontWeight: 500 }, children: content.home.about.content.split("\n\n").map((para, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
          para,
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {})
        ] }, i)) })
      ] })
    ] }) }) })
  ] });
};
const HouseholdItems = ({ showDisclaimers = true, children }) => {
  const items = siteContent.pricing.specialItems;
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white", padding: "4rem 0" }, children: [
    /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1rem", textTransform: "uppercase", fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "0.05em", fontWeight: 900 }, children: "Household Items" }),
    /* @__PURE__ */ jsxs("p", { style: { fontSize: "0.95rem", marginBottom: "3rem", color: "var(--color-text-muted)" }, children: [
      "Add these items to any Wash & Fold order of $45 or more and automatically receive a ",
      /* @__PURE__ */ jsx("strong", { style: { color: "var(--color-primary)" }, children: "10% discount" }),
      " on those items."
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "0 4rem",
      alignItems: "start"
    }, children: [
      /* @__PURE__ */ jsx("div", { children: items.slice(0, Math.ceil(items.length / 2)).map((item, i) => /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "0.85rem 0",
        borderBottom: "1px solid #f0f0f0"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", fontWeight: 800, color: "var(--color-primary)" }, children: item.name }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", fontWeight: 900, color: "#04D1FF", textTransform: "uppercase" }, children: "10% Off with $45+ Order" })
        ] }),
        /* @__PURE__ */ jsxs("span", { style: { fontSize: "1.25rem", fontWeight: 900, color: "var(--color-primary)", fontFamily: "var(--font-heading)" }, children: [
          "$",
          item.price
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { children: [
        items.slice(Math.ceil(items.length / 2)).map((item, i) => /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "0.85rem 0",
          borderBottom: "1px solid #f0f0f0"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", fontWeight: 800, color: "var(--color-primary)" }, children: item.name }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", fontWeight: 900, color: "#04D1FF", textTransform: "uppercase" }, children: "10% Off with $45+ Order" })
          ] }),
          /* @__PURE__ */ jsxs("span", { style: { fontSize: "1.25rem", fontWeight: 900, color: "var(--color-primary)", fontFamily: "var(--font-heading)" }, children: [
            "$",
            item.price
          ] })
        ] }, i)),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "0.85rem 0",
          borderBottom: "1px solid #f0f0f0"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", fontWeight: 800, color: "var(--color-primary)" }, children: "Other Household Items" }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", fontWeight: 900, color: "#04D1FF", textTransform: "uppercase" }, children: "10% Off with $45+ Order" })
          ] }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.9rem", fontWeight: 800, color: "var(--color-primary)", opacity: 0.6 }, children: "Inquire" })
        ] })
      ] })
    ] }),
    children && /* @__PURE__ */ jsx("div", { style: { marginTop: "2rem" }, children }),
    showDisclaimers && /* @__PURE__ */ jsxs("div", { style: {
      marginTop: "1.5rem",
      backgroundColor: "#FFFBEB",
      borderRadius: "1rem",
      padding: "1.5rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      fontSize: "0.85rem",
      lineHeight: 1.5,
      color: "#92400E"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1rem" }, children: [
        /* @__PURE__ */ jsx(Store, { size: 18, style: { flexShrink: 0, marginTop: "2px" } }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { style: { display: "block", marginBottom: "0.25rem", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }, children: "Eligibility" }),
          "Open to Pickup & Delivery orders. 10% discount applies when your standard Wash & Fold total is $45 or more."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1rem" }, children: [
        /* @__PURE__ */ jsx(Shield, { size: 18, style: { flexShrink: 0, marginTop: "2px" } }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { style: { display: "block", marginBottom: "0.25rem", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }, children: "Restrictions" }),
          "Does not apply to Same-Day (8-hour) service. Not valid on individual items unaccompanied by a standard order."
        ] })
      ] })
    ] })
  ] });
};
const washFoldHeroImg = "/assets/wash-fold-hero-v2-Ofx66Z9v.jpg";
const ozoneSystemImg = "/assets/ozone-system-v2-DHrC1RgX.jpg";
const PriceRow = ({ item, price, isSpecialty }) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid #f0f0f0" }, children: [
  /* @__PURE__ */ jsx("span", { style: { color: "var(--color-primary)", fontWeight: 500, flex: 1 }, children: item }),
  isSpecialty && /* @__PURE__ */ jsx("div", { style: { marginRight: "1.5rem", display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx("span", { style: {
    backgroundColor: "#04D1FF",
    color: "black",
    padding: "2px 8px",
    fontSize: "0.7rem",
    fontWeight: 900,
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    boxShadow: "2px 2px 0px black"
  }, children: "10% Off*" }) }),
  /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-secondary)", whiteSpace: "nowrap" }, children: price })
] });
const WashFold = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "San Diego Wash & Fold",
        description: "Premium ozone-sanitized wash and fold services in San Diego. Next-day laundry delivery and walk-in drop-off available in Normal Heights.",
        path: "/wash-and-fold"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            "San Diego Ozone ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Wash & Fold" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "1.5rem" }, children: "Get ready for laundry that feels fresher, cleaner, and softer with Corner Wash's Ozone Wash and Fold service in San Diego." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: washFoldHeroImg, alt: "Wash and Fold Service", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "800px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1rem", textTransform: "uppercase" }, children: "Say Goodbye to Laundry Day" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { margin: "0px", lineHeight: 1.6 }, children: "Laundry is probably your most time-consuming chore. If you don't have hours to spend washing, drying, and folding, let Corner Wash handle it for you!" })
      ] }),
      /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1.5rem" }, children: "How Our Ozone Wash & Fold Works" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }, children: [
        { num: "1", title: "Full-service care", desc: "Clothes are separated, washed with PowerPax® and dryer sheets added." },
        { num: "2", title: "Customized service", desc: "Prefer laundry done a certain way? We follow your instructions. Hypoallergenic option available." },
        { num: "3", title: "Stain treatment", desc: "Got a tough stain? Point it out and we'll spot treat it for a small additional charge." },
        { num: "4", title: "Ready in 24 hours", desc: "You'll get a text when your laundry is ready. Same-day service is available too." }
      ].map((step, i) => /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", padding: "1.5rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
        /* @__PURE__ */ jsx("div", { style: { width: "36px", height: "36px", backgroundColor: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontFamily: "var(--font-heading)", marginBottom: "0.75rem" }, children: step.num }),
        /* @__PURE__ */ jsx("h4", { style: { marginBottom: "0.5rem" }, children: step.title }),
        /* @__PURE__ */ jsx("p", { style: { margin: "0px" }, children: step.desc })
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { style: { backgroundColor: "white", border: "var(--brutalist-border)", padding: "3rem 2.5rem", marginBottom: "4rem", boxShadow: "var(--brutalist-shadow)" }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center", gap: "3rem", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: "300px" }, children: [
          /* @__PURE__ */ jsx("h2", { style: { fontSize: "clamp(2rem, 5vw, 2.5rem)", marginBottom: "1.5rem", color: "var(--color-primary)", textTransform: "uppercase" }, children: "Laundry Cleaned with Ozone" }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { color: "var(--color-primary)", marginBottom: "2rem" }, children: "Our advanced Ozone Laundry system naturally removes odors and sanitizes your clothes better than bleach — providing hospital-grade sanitation in every load." }),
          /* @__PURE__ */ jsx(Link, { className: "btn", to: "/ozone-laundry", style: { textDecoration: "none", backgroundColor: "var(--color-secondary)", color: "black" }, children: "Learn More About Ozone" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { width: "280px", height: "200px", flexShrink: 0, border: "var(--brutalist-border-thin)", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: ozoneSystemImg, alt: "Articlean Ozone System", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] }) }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem" }, children: "Affordable Wash & Fold Pricing" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "2.5rem" }, children: "Simple, per-pound pricing for all our laundry services." }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "3rem" }, children: /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", padding: "2rem", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)" }, children: [
        /* @__PURE__ */ jsxs("h4", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", marginBottom: "1.5rem", color: "var(--color-primary)", borderBottom: "2px solid var(--color-primary)", paddingBottom: "0.5rem" }, children: [
          "Walk-In ",
          /* @__PURE__ */ jsx("span", { style: { fontWeight: 500, fontSize: "0.85rem" }, children: "(10 lb min)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "1rem" }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.9rem", fontWeight: 600 }, children: "Standard (24h)" }),
          /* @__PURE__ */ jsx("span", { style: { fontWeight: 900, color: "var(--color-primary)" }, children: "$1.95/lb" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontSize: "0.9rem", fontWeight: 600 }, children: "Same-Day Service" }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", opacity: 0.7 }, children: "Drop off by 3 PM" })
          ] }),
          /* @__PURE__ */ jsx("span", { style: { fontWeight: 900, color: "var(--color-primary)" }, children: "$2.25/lb" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "1.25rem 2rem",
        margin: "0 auto 2rem",
        border: "1px solid black",
        backgroundColor: "#FFFBEB",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        maxWidth: "800px",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.75rem" }, children: "🪖" }),
        /* @__PURE__ */ jsxs("p", { style: { fontWeight: 900, color: "black", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0px", fontSize: "1rem", lineHeight: 1.2 }, children: [
          "Military & Civil Servants get ",
          /* @__PURE__ */ jsx("span", { style: { backgroundColor: "black", color: "#04D1FF", padding: "0 0.4rem" }, children: "10% OFF" }),
          " with Valid ID"
        ] })
      ] }),
      /* @__PURE__ */ jsx(HouseholdItems, { children: /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", padding: "2rem", backgroundColor: "white", color: "inherit", boxShadow: "var(--brutalist-shadow-sm)", maxWidth: "500px" }, children: [
        /* @__PURE__ */ jsx("h4", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", color: "var(--color-primary)", borderBottom: "2px solid var(--color-primary)", paddingBottom: "0.75rem" }, children: "Additional Treatments" }),
        /* @__PURE__ */ jsx(PriceRow, { item: "OxiClean Spot Treatment", price: "$1.25" }),
        /* @__PURE__ */ jsx(PriceRow, { item: "FreshTEX", price: "$1.25" })
      ] }) })
    ] }) })
  ] });
};
const deliveryVanImg = "/assets/delivery-van-v2-CTHCMdBU.jpg";
const PickupDelivery = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Laundry Pickup & Delivery",
        description: "Schedule eco-friendly laundry pickup and delivery in All of San Diego. Ozone-sanitized cleaning, next-day service, and flat-rate per-pound pricing.",
        path: "/pickup-and-delivery"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Laundry Pickup" }),
            " & Delivery in All of San Diego"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "1.5rem" }, children: "Make laundry day a breeze with Corner Wash’s pickup and delivery service!" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          border: "2px solid var(--color-primary)",
          boxShadow: "var(--brutalist-shadow)",
          backgroundColor: "white",
          margin: "0px auto"
        }, children: /* @__PURE__ */ jsx("img", { src: deliveryVanImg, alt: "Corner Wash Delivery Van", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "800px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem", textTransform: "uppercase" }, children: "Laundry Done in Just Three Simple Steps" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { margin: 0 }, children: "It's easy to avoid the laundry hassle" })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }, children: [
        { num: "1", title: "Create an Online Account", desc: "Creating an account only takes 2 minutes. Handle all your order details online." },
        { num: "2", title: "Choose Your Pickup & Delivery Dates", desc: "Use the service only as often as you need to. No subscriptions necessary." },
        { num: "3", title: "Sit Back & Relax", desc: "Why do laundry every weekend? Treat yourself and do something fun instead." }
      ].map((step, i) => /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", padding: "2rem", textAlign: "center", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
        /* @__PURE__ */ jsx("div", { style: { width: "48px", height: "48px", backgroundColor: "var(--color-secondary)", border: "2px solid var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontFamily: "var(--font-heading)", fontSize: "1.4rem", margin: "0px auto 1rem" }, children: step.num }),
        /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem", fontSize: "1rem" }, children: step.title }),
        /* @__PURE__ */ jsx("p", { style: { margin: "0px" }, children: step.desc })
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { style: { backgroundColor: "white", padding: "6rem 2rem", marginBottom: "4rem", textAlign: "center", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow)", position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ jsx("div", { className: "container", style: { maxWidth: "1100px", position: "relative", zIndex: 2 }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: "800px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxs("h2", { style: { fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--color-primary)", fontWeight: 900, marginBottom: "2rem", lineHeight: 1, textTransform: "uppercase" }, children: [
          "Serving All of San Diego ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Monday–Saturday" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { color: "var(--color-primary)", margin: "0px", fontSize: "1.4rem", lineHeight: 1.4 }, children: "Using Corner Wash’s laundry pickup and delivery service in San Diego is simple and convenient! Schedule a residential or commercial laundry pickup online, and we’ll come to your home or business to collect your laundry." })
      ] }) }) }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem", textAlign: "center" }, children: "Affordable Laundry Delivery – San Diego" }),
      /* @__PURE__ */ jsxs("p", { style: { marginBottom: "2.5rem", textAlign: "center" }, children: [
        "Sign up for weekly service for the most savings. There is a ",
        /* @__PURE__ */ jsx("strong", { children: "$45 minimum order" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        backgroundColor: "#FFFBEB",
        border: "1px solid black",
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        margin: "0 auto 3rem",
        maxWidth: "800px",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.75rem" }, children: "🪖" }),
        /* @__PURE__ */ jsxs("p", { style: { fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0px", fontSize: "1rem", lineHeight: 1.2, color: "black" }, children: [
          "Military & Civil Servants get ",
          /* @__PURE__ */ jsx("span", { style: { backgroundColor: "black", color: "#04D1FF", padding: "0 0.4rem" }, children: "10% OFF" }),
          " with Valid ID"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "3rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", padding: "2rem", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)" }, children: [
          /* @__PURE__ */ jsx("h4", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", marginBottom: "1.5rem", color: "var(--color-primary)", borderBottom: "2px solid var(--color-primary)", paddingBottom: "0.5rem" }, children: "Residential Pickups" }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ jsx("span", { style: { fontSize: "0.9rem", fontWeight: 600 }, children: "Recurring Pickups" }),
              /* @__PURE__ */ jsx("span", { style: { fontSize: "0.75rem", opacity: 0.7 }, children: "Weekly or Bi-Weekly" })
            ] }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 900, fontSize: "1.4rem", color: "var(--color-primary)" }, children: "$1.99/lb" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontSize: "0.9rem", fontWeight: 600 }, children: "One-Time / As-Needed" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 900, fontSize: "1.4rem", color: "var(--color-primary)" }, children: "$2.25/lb" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", padding: "2rem", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)" }, children: [
          /* @__PURE__ */ jsx("h4", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", marginBottom: "1.25rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }, children: "Important Service Details" }),
          /* @__PURE__ */ jsxs("ul", { style: { display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", padding: "0px", listStyle: "none" }, children: [
            /* @__PURE__ */ jsxs("li", { style: { display: "flex", gap: "0.5rem" }, children: [
              /* @__PURE__ */ jsx("span", { children: "🚚" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: "$2.50 fuel surcharge / order" })
            ] }),
            /* @__PURE__ */ jsxs("li", { style: { display: "flex", gap: "0.5rem" }, children: [
              /* @__PURE__ */ jsx("span", { children: "📦" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: "$45 minimum delivery order" })
            ] }),
            /* @__PURE__ */ jsxs("li", { style: { display: "flex", gap: "0.5rem" }, children: [
              /* @__PURE__ */ jsx("span", { children: "🗺️" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: "Outside 5 miles → $75 min" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(HouseholdItems, {}),
      /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", padding: "2rem", marginBottom: "3rem", backgroundColor: "white", textAlign: "center" }, children: [
        /* @__PURE__ */ jsx("h4", { style: { marginBottom: "1rem" }, children: "Dry Cleaning (Standalone Service)" }),
        /* @__PURE__ */ jsx("p", { style: { marginBottom: "1.5rem" }, children: "Dry Cleaning is available even when not combined with Wash & Fold pickup." }),
        /* @__PURE__ */ jsx(Link, { to: "/dry-cleaning", className: "btn", style: { textDecoration: "none", display: "inline-block" }, children: "View Dry Cleaning Prices" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        backgroundColor: "#FFFBEB",
        border: "1px solid black",
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        margin: "0px auto 3rem",
        maxWidth: "800px",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: "2rem" }, children: "🎉" }),
        /* @__PURE__ */ jsxs("div", { style: { textAlign: "left" }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.1rem", textTransform: "uppercase", marginBottom: "0.25rem", color: "black" }, children: "10% Off Your First Order" }),
          /* @__PURE__ */ jsx("p", { style: { marginBottom: "0.25rem", color: "black", fontSize: "0.95rem" }, children: "We know you are going to love our pickup and delivery laundry service!" }),
          /* @__PURE__ */ jsxs("p", { style: { fontFamily: "monospace", fontWeight: 900, fontSize: "1rem", color: "black", margin: 0 }, children: [
            "Use Code: ",
            /* @__PURE__ */ jsx("span", { style: { backgroundColor: "black", color: "#04D1FF", padding: "0 0.4rem" }, children: "FIRST10" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
};
const dryCleaningHero = "/assets/dry-cleaning-hero-v2-DSjemMTq.jpg";
const DryCleaning = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 1e3);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);
  const sections = [
    { title: "Clothing", items: [
      { label: "Blouse", price: "$5.75" },
      { label: "Sweater (Mens)", price: "$6.95" },
      { label: "Sweater (Womens)", price: "$7.85" },
      { label: "Vest", price: "$5.95" },
      { label: "Polo Shirt", price: "$5.95" },
      { label: "Jersey", price: "$14.50" },
      { label: "Dress Shirt", price: "$4.85" },
      { label: "Pants", price: "$4.95" },
      { label: "Skirt", price: "$5.95" },
      { label: "Jeans", price: "$5.25" },
      { label: "Lab Coat", price: "$9.65" },
      { label: "Shorts", price: "$4.95" },
      { label: "2 Piece Dress", price: "$14.50" },
      { label: "Cardigan", price: "$6.85" },
      { label: "T-Shirt", price: "$4.75" },
      { label: "Long Sleeve T-Shirt", price: "$5.95" },
      { label: "Robe", price: "$10.00" },
      { label: "Romper / Jumpsuit", price: "$13.50" },
      { label: "Scarf", price: "$5.00" },
      { label: "Handkerchief", price: "$5.00" },
      { label: "Chef Gown", price: "$9.50" },
      { label: "Poncho", price: "$7.95" }
    ] },
    { title: "Dresses", items: [
      { label: "Standard Dress", price: "$9.85" },
      { label: "Dress (Long)", price: "$13.85" },
      { label: "Dress (Fancy)", price: "$19.50" },
      { label: "Dress (Formal)", price: "$55.00" },
      { label: "Dress (Cocktail)", price: "$29.75" },
      { label: "Wedding Dress", price: "$99.75 (Starting Price)" }
    ] },
    { title: "Jackets", items: [
      { label: "Leather / Suede Jacket", price: "$75.00" },
      { label: "3/4 Leather / Suede Jacket", price: "$95.00" },
      { label: "Down Jacket", price: "$25.00" },
      { label: "Hoodie Jacket", price: "$9.75" },
      { label: "Jacket", price: "$9.50" },
      { label: "3/4 Length Coat", price: "$13.50" },
      { label: "Jean Jacket", price: "$14.50" },
      { label: "Letterman Jacket", price: "$13.95" },
      { label: "Trench Coat", price: "$18.50" }
    ] },
    { title: "Suits, Etc.", items: [
      { label: "Tie", price: "$4.95" },
      { label: "Blazer", price: "$9.75" },
      { label: "2 Piece Suit (Mens)", price: "$14.95" },
      { label: "2 Piece Suit (Women)", price: "$15.50" },
      { label: "3 Piece Suit", price: "$19.50" }
    ] },
    { title: "Uniforms (Military)", items: [
      { label: "2 Piece Uniform", price: "$14.95" },
      { label: "2 Piece Uniform W/ Jacket", price: "$16.50" },
      { label: "Uniform Jacket", price: "$9.50" },
      { label: "Formal Uniform Jacket", price: "$13.95" },
      { label: "Uniform Shirt", price: "$6.95" },
      { label: "Uniform Pants", price: "$7.95" },
      { label: "Uniform Hat", price: "$7.50" }
    ] },
    { title: "Kid's Clothes", items: [
      { label: "Kid Dress", price: "$6.75" },
      { label: "Kid Dress (Fancy)", price: "$12.95" },
      { label: "Kid Dress (Formal)", price: "$29.95" }
    ] },
    { title: "Household Items*", items: [
      { label: "Sofa Covers", price: "$25.00" },
      { label: "Down Pillow", price: "$25.00" },
      { label: "Pillow Cases", price: "$10.00" },
      { label: "Drapery", price: "$15.00 Per Panel" },
      { label: "Valance", price: "$25.00" },
      { label: "Tablecloth (Large)", price: "$26.00" },
      { label: "Tablecloth (Medium)", price: "$22.50" },
      { label: "Tablecloth (Small)", price: "$19.75" },
      { label: "Table Runner", price: "$15.00" },
      { label: "Napkin", price: "$3.50" }
    ] },
    { title: "Cap & Gown", items: [
      { label: "Cap", price: "$9.50" },
      { label: "Gown", price: "$19.75" },
      { label: "Regalia Gown", price: "$29.75" }
    ] },
    { title: "Bedding (Dry Clean Only)", items: [
      { label: "Comforter (King/Queen)", price: "$48.50" },
      { label: "Comforter (Twin/Full)", price: "$33.50" },
      { label: "Down Comforter (King/Queen)", price: "$56.00" },
      { label: "Down Comforter (Twin/Full)", price: "$41.00" }
    ] }
  ];
  const filteredSections = sections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter((section) => section.items.length > 0);
  const renderPriceSection = (title, items) => /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "2px solid var(--color-primary)", color: "var(--color-primary)" }, children: title }),
    items.map((item, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.45rem 0px", borderBottom: "1px solid #f0f0f0", fontSize: "0.9rem" }, children: [
      /* @__PURE__ */ jsx("span", { style: { color: "var(--color-primary)" }, children: item.label }),
      /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-secondary)", whiteSpace: "nowrap", marginLeft: "1rem" }, children: item.price })
    ] }, i))
  ] });
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Dry Cleaning & Pressing",
        description: "Professional dry cleaning and pressing services in San Diego. We handle delicate fabrics, suits, dresses, and more with expert care.",
        path: "/dry-cleaning"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Dry Cleaning" }),
            " Service in San Diego"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "1.5rem" }, children: "Keep your clothes looking their best with Corner Wash dry cleaning!" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)",
          backgroundColor: "white"
        }, children: /* @__PURE__ */ jsx("img", { src: dryCleaningHero, alt: "Professional Dry Cleaning Service", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "800px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Dry Cleaning Drop Off Service in San Diego" }),
        /* @__PURE__ */ jsx("p", { style: { marginBottom: "1.5rem", lineHeight: 1.8 }, children: `When you're searching for "dry cleaning San Diego," you need a service you can trust. At Corner Wash, we offer professional dry cleaning services perfect for everything from business suits and delicate dresses to household items.` }),
        /* @__PURE__ */ jsx("p", { style: { lineHeight: 1.8 }, children: "But we're more than just a dry cleaner. As a full-service San Diego Laundromat, we also specialize in wash and fold — making us your one-stop shop for all your laundry needs. Drop off your laundry and dry cleaning at the same time and save a trip!" })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "2rem", textAlign: "center" }, children: "Dry Cleaning Pricing" }),
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: "3rem", maxWidth: "600px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "flex", gap: "1rem", alignItems: "center" }, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search items (e.g. 'Suit', 'Dress', 'Blanket')...",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              style: {
                width: "100%",
                padding: "1.25rem 1.5rem",
                border: "var(--brutalist-border)",
                boxShadow: "var(--brutalist-shadow-sm)",
                fontSize: "1.1rem",
                outline: "none",
                fontFamily: "inherit"
              }
            }
          ),
          inputValue && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setInputValue("");
                setSearchQuery("");
              },
              style: {
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 900,
                fontSize: "1.2rem"
              },
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "1rem" }, children: searchQuery ? /* @__PURE__ */ jsxs("p", { style: { fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: 700, margin: 0 }, children: [
          "Showing ",
          filteredSections.reduce((acc, s) => acc + s.items.length, 0),
          ' results for "',
          searchQuery,
          '"'
        ] }) : /* @__PURE__ */ jsx("div", {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { columnCount: "auto", columnWidth: "360px", columnGap: "2rem" }, children: filteredSections.map((section, idx) => /* @__PURE__ */ jsx("div", { style: { breakInside: "avoid" }, children: renderPriceSection(section.title, section.items) }, idx)) }),
      filteredSections.length === 0 && searchQuery !== "" && /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", padding: "4rem 0px", border: "var(--brutalist-border-thin)", backgroundColor: "#fdfdfd" }, children: [
        /* @__PURE__ */ jsxs("h3", { style: { marginBottom: "1rem" }, children: [
          'No items found matching "',
          searchQuery,
          '"'
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setInputValue("");
          setSearchQuery("");
        }, className: "btn", children: "Clear Search" })
      ] }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: "0.8rem", marginTop: "1rem", marginBottom: "3rem" }, children: "*Household item prices may vary depending on size." })
    ] }) })
  ] });
};
const HubspotForm = ({ portalId, formId }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ firstname: "", lastname: "", email: "", phone: "", message: "" });
      console.log("HubSpot Submission Voided in Background. Data:", formData);
    }, 800);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (status === "success") {
    return /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", padding: "2rem" }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "🎉" }),
      /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem" }, children: "Thank You!" }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: "0.9rem", color: "var(--color-text-muted)" }, children: "Your commercial inquiry has been received. Our team will contact you shortly." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setStatus("idle"),
          className: "btn",
          style: { marginTop: "1rem", padding: "0.5rem 1.5rem" },
          children: "Send Another"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: { display: "grid", gap: "1rem" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "First Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "firstname",
            value: formData.firstname,
            onChange: handleChange,
            required: true,
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Last Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "lastname",
            value: formData.lastname,
            onChange: handleChange,
            required: true,
            style: inputStyle
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            name: "email",
            value: formData.email,
            onChange: handleChange,
            required: true,
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Phone Number" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            name: "phone",
            value: formData.phone,
            onChange: handleChange,
            required: true,
            style: inputStyle
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Message" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          name: "message",
          value: formData.message,
          onChange: handleChange,
          required: true,
          style: { ...inputStyle, minHeight: "100px", resize: "vertical" }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: status === "submitting",
        className: "btn",
        style: {
          width: "100%",
          backgroundColor: "var(--color-secondary)",
          color: "black",
          opacity: status === "submitting" ? 0.7 : 1
        },
        children: status === "submitting" ? "Sending..." : "Submit Inquiry"
      }
    ),
    status === "error" && /* @__PURE__ */ jsx("p", { style: { color: "red", fontSize: "0.8rem", marginTop: "0.5rem", textAlign: "center" }, children: "Something went wrong. Please try again or call us." })
  ] });
};
const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 900,
  textTransform: "uppercase",
  marginBottom: "0.4rem",
  fontFamily: "var(--font-heading)"
};
const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  border: "var(--brutalist-border-thin)",
  fontFamily: "inherit",
  fontSize: "0.9rem",
  outline: "none"
};
const eightLoadsImg = "/assets/normal-heights-hero-2-ClEZZkK3.png";
const Pricing = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Laundry Pricing & Rates",
        description: "Affordable and transparent laundry rates in San Diego. View pricing for Wash & Fold, Pickup & Delivery, Dry Cleaning, and Commercial laundry.",
        path: "/pricing"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            "Affordable ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Pricing" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "1.5rem" }, children: "At Corner Wash in San Diego, we offer straightforward per-pound pricing for all laundry services — no hidden fees, no surprises." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "3 / 2",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: eightLoadsImg, alt: "Corner Wash Pricing", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "800px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1rem", textTransform: "uppercase" }, children: "Straightforward Per-Pound Pricing" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { margin: "0px", lineHeight: 1.6 }, children: "We believe in transparency. Whether you're dropping off a small bag or scheduling a massive commercial pickup, you'll always know exactly what you're paying for." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        backgroundColor: "#FFFBEB",
        border: "1px solid black",
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        margin: "0 auto 4rem",
        maxWidth: "800px",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.75rem" }, children: "🪖" }),
        /* @__PURE__ */ jsxs("p", { style: { fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0px", fontSize: "1rem", lineHeight: 1.2, color: "black" }, children: [
          "Military & Civil Servants get ",
          /* @__PURE__ */ jsx("span", { style: { backgroundColor: "black", color: "#04D1FF", padding: "0 0.4rem" }, children: "10% OFF" }),
          " with Valid ID"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem", fontSize: "clamp(1.4rem, 3vw, 2rem)" }, children: "Laundromat Prices in Normal Heights" }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.75rem", backgroundColor: "var(--color-primary)" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { color: "var(--color-funky-cyan)", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem", marginBottom: "1rem" }, children: "Washers" }),
          [
            { label: "20 lb (8 Total)", price: "$4.50" },
            { label: "40 lb (16 Total)", price: "$6.50" },
            { label: "60 lb (6 Total)", price: "$9.00" },
            { label: "80 lb (3 Total)", price: "$10.75" }
          ].map((row, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.45rem 0px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)", fontSize: "0.9rem" }, children: [
            /* @__PURE__ */ jsx("span", { style: { color: "rgba(255, 255, 255, 0.9)" }, children: row.label }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-funky-yellow)" }, children: row.price })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.75rem", backgroundColor: "var(--color-primary)" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { color: "var(--color-funky-cyan)", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem", marginBottom: "1rem" }, children: "Dryers" }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.45rem 0px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)", fontSize: "0.9rem" }, children: [
            /* @__PURE__ */ jsx("span", { style: { color: "rgba(255, 255, 255, 0.9)" }, children: "45 lb (28 Total)" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-funky-yellow)" }, children: "$.50 (4 min.)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.45rem 0px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)", fontSize: "0.9rem" }, children: [
            /* @__PURE__ */ jsx("span", { style: { color: "rgba(255, 255, 255, 0.9)" }, children: "75 lb (2 Total)" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-funky-yellow)" }, children: "$1.00 to start*" })
          ] }),
          /* @__PURE__ */ jsx("p", { style: { color: "rgba(255, 255, 255, 0.5)", fontSize: "0.78rem", marginTop: "0.75rem" }, children: "*$.25 Per Minute After Start" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "#f9f9f9", padding: "3rem 2rem", margin: "0 -2rem 4rem", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem", fontSize: "clamp(1.4rem, 3vw, 2rem)" }, children: "Walk-In Wash & Fold Pricing" }),
        /* @__PURE__ */ jsxs("p", { style: { marginBottom: "1.5rem" }, children: [
          "Drop off and we do the rest. ",
          /* @__PURE__ */ jsx("strong", { children: "10 lb minimum weight." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.5rem", textAlign: "center", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)" }, children: [
            /* @__PURE__ */ jsx("p", { style: { fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }, children: "Standard" }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }, children: "24-hour turnaround" }),
            /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2rem", color: "var(--color-primary)" }, children: "$1.95/lb" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.5rem", textAlign: "center", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)" }, children: [
            /* @__PURE__ */ jsx("p", { style: { fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }, children: "Same-Day Service" }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }, children: "Drop off by 3 PM" }),
            /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2rem", color: "var(--color-primary)" }, children: "$2.25/lb" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem", fontSize: "clamp(1.4rem, 3vw, 2rem)" }, children: "Pickup & Delivery Pricing" }),
      /* @__PURE__ */ jsxs("p", { style: { marginBottom: "1.5rem" }, children: [
        "We pick up, wash, fold, and return — all from your door. ",
        /* @__PURE__ */ jsx("strong", { children: "$45 minimum order." })
      ] }),
      /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem", color: "var(--color-text-muted)" }, children: "Residential & Small Business" }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.5rem", textAlign: "center", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)" }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }, children: "Recurring Scheduled Pickups" }),
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2rem", color: "var(--color-primary)" }, children: "$1.99/lb" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.5rem", textAlign: "center", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)" }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }, children: "One-Time / By-Request" }),
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2rem", color: "var(--color-primary)" }, children: "$2.25/lb" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { marginTop: "1rem", color: "var(--color-primary)", fontWeight: 700, fontSize: "0.9rem" }, children: "🗹 Reminder: Military & Civil Servants receive 10% OFF your total order with a valid ID." }),
      /* @__PURE__ */ jsx(HouseholdItems, {}),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1rem" }, children: "Dry Cleaning Pricing" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "1.5rem" }, children: "See our full dry cleaning price list for all categories including clothing, dresses, jackets, suits, uniforms, kid's clothes, household items, and bedding." }),
      /* @__PURE__ */ jsx(Link, { className: "btn", to: "/dry-cleaning", style: { textDecoration: "none", display: "inline-block" }, children: "View Full Dry Cleaning Prices" }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: "3rem", backgroundColor: "#f5f5f5", border: "var(--brutalist-border-thin)", padding: "2rem" }, children: [
        /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem" }, children: "Commercial Laundry Rates" }),
        /* @__PURE__ */ jsx("p", { style: { marginBottom: "2rem" }, children: "Volume pricing available for businesses, gyms, spas, and healthcare facilities. Fill out the form below to discuss your commercial needs." }),
        /* @__PURE__ */ jsx("div", { style: { backgroundColor: "white", padding: "1.5rem", border: "var(--brutalist-border-thin)" }, children: /* @__PURE__ */ jsx(
          HubspotForm,
          {
            portalId: "245656102",
            formId: "dd9868fa-9eeb-4df3-8035-424e32204e7f"
          }
        ) })
      ] })
    ] }) })
  ] });
};
const ServiceAreas = () => {
  const areas = [
    {
      name: "Balboa Park",
      slug: "laundry-service-in-balboa-park-ca",
      img: "https://images.unsplash.com/photo-1599427303058-f04cbcf47769?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "City Heights",
      slug: "laundry-service-in-city-heights-ca",
      img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Hillcrest",
      slug: "laundry-service-in-hillcrest-ca",
      img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Mission Valley",
      slug: "laundry-service-in-mission-valley-ca",
      img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Normal Heights",
      slug: "laundry-service-in-normal-heights-ca",
      img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "North Park",
      slug: "laundry-service-in-north-park-ca",
      img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "University Heights",
      slug: "laundry-service-in-university-heights-ca",
      img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "San Diego Service Areas",
        description: "We provide premium laundry pickup and delivery across San Diego, including North Park, Hillcrest, Mission Valley, and Normal Heights.",
        path: "/service-areas"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { textAlign: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsx("h1", { className: "hero-title", style: { margin: "0 auto 1rem" }, children: /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Service Areas" }) }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--color-text-muted)", lineHeight: 1.8, maxWidth: "800px", fontWeight: 500, margin: "0 auto" }, children: "We're proud to serve the vibrant communities of San Diego. From the historic streets of Balboa Park to the trendy corners of North Park, we bring premium laundry care right to your door." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "800px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Where We Deliver" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { margin: "0px", lineHeight: 1.6 }, children: "Whether you're at home in Normal Heights or running a business in Mission Valley, Corner Wash provides premium laundry pickup and delivery services across San Diego's most active neighborhoods." })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }, children: areas.map((area, i) => /* @__PURE__ */ jsx(
        Link,
        {
          to: `/service-areas/${area.slug}`,
          style: {
            position: "relative",
            padding: "2.5rem 2rem",
            backgroundColor: "white",
            color: "var(--color-primary)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "var(--brutalist-border)",
            boxShadow: "var(--brutalist-shadow-sm)",
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          className: "area-card",
          children: /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 2 }, children: [
            /* @__PURE__ */ jsx("h3", { style: { fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.75rem", color: "var(--color-primary)" }, children: area.name }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "0.8rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-secondary)" }, children: "Delivery Services Available →" })
          ] })
        },
        i
      )) })
    ] }) })
  ] });
};
const AreaDetail = () => {
  const { slug } = useParams();
  const content = siteContent;
  const area = content.serviceAreas.areas.find((a) => a.slug === slug);
  if (!area) return /* @__PURE__ */ jsx("div", { className: "section container", children: "Area not found." });
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `Laundry Service in ${area.name}`,
        description: `Premium ozone-sanitized laundry pickup and delivery in ${area.name}, CA. We offer expert wash and fold services for homes and businesses.`,
        path: `/service-areas/${slug}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", style: { textAlign: "center", borderBottom: "var(--brutalist-border)" }, children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("h1", { style: { marginBottom: "1.5rem", textTransform: "uppercase", fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }, children: [
          "Laundry Service in ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("span", { style: { color: "#04D1FF" }, children: [
            area.name,
            ", CA"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { style: { fontSize: "1.25rem", color: "var(--color-text-muted)", lineHeight: 1.8, maxWidth: "800px", fontWeight: 500, margin: "0 auto" }, children: [
          area.description,
          " Corner Wash brings premium, ozone-sanitized laundry pickup and delivery right to your doorstep in ",
          area.name,
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "5rem", alignItems: "start" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Superior Clean with Ozone Technology" }),
        /* @__PURE__ */ jsxs("p", { style: { color: "var(--color-text-muted)", lineHeight: "1.9", fontSize: "1.1rem", marginBottom: "2rem" }, children: [
          "Residents of ",
          /* @__PURE__ */ jsx("strong", { children: area.name }),
          " deserve the best. That's why every load we process is treated with ",
          /* @__PURE__ */ jsx("strong", { children: "Ozone-Sanitized Water" }),
          ". This hospital-grade technology kills 99.9% of bacteria and viruses while being gentler on your clothes than traditional bleach."
        ] }),
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Comprehensive Laundry Services" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gap: "2rem", marginBottom: "3rem" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { borderLeft: "4px solid #04D1FF", paddingLeft: "1.5rem" }, children: [
            /* @__PURE__ */ jsx("h3", { style: { fontSize: "1rem", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Full Service Wash & Fold" }),
            /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontSize: "0.95rem" }, children: "We wash, dry, and expertly fold your clothes so they're ready to put away the moment they arrive." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { borderLeft: "4px solid #04D1FF", paddingLeft: "1.5rem" }, children: [
            /* @__PURE__ */ jsx("h3", { style: { fontSize: "1rem", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Pickup & Delivery" }),
            /* @__PURE__ */ jsxs("p", { style: { color: "var(--color-text-muted)", fontSize: "0.95rem" }, children: [
              "Schedule a time that works for you. We'll swing by your home or business in ",
              area.name,
              " and handle the rest."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { borderLeft: "4px solid #04D1FF", paddingLeft: "1.5rem" }, children: [
            /* @__PURE__ */ jsx("h3", { style: { fontSize: "1rem", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Commercial Accounts" }),
            /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontSize: "0.95rem" }, children: "Volume pricing for gyms, spas, hotels, and healthcare facilities. Reliable, high-capacity cleaning." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "#f9f9f9", border: "var(--brutalist-border-thin)", padding: "2rem" }, children: [
          /* @__PURE__ */ jsxs("h3", { style: { textTransform: "uppercase", marginBottom: "1rem", fontSize: "1rem" }, children: [
            "Why ",
            area.name,
            " Trusts Corner Wash"
          ] }),
          /* @__PURE__ */ jsxs("ul", { style: { padding: 0, listStyle: "none", display: "grid", gap: "0.75rem" }, children: [
            /* @__PURE__ */ jsx("li", { children: "✅ Family Owned & Operated Since 1975" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Eco-Friendly Cold Water Ozone System" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Next-Day Delivery Options" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Fragrance-Free & Hypoallergenic Options" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "3rem",
        backgroundColor: "var(--color-secondary)",
        border: "var(--brutalist-border)",
        boxShadow: "var(--brutalist-shadow)",
        position: "sticky",
        top: "120px"
      }, children: [
        /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Pickup & Delivery Pricing" }),
        /* @__PURE__ */ jsxs("p", { style: { fontSize: "0.9rem", marginBottom: "1.5rem", fontWeight: 600 }, children: [
          "Serving all of ",
          area.name,
          ":"
        ] }),
        /* @__PURE__ */ jsxs("ul", { style: { display: "grid", gap: "1rem", marginBottom: "2rem", padding: 0, listStyle: "none" }, children: [
          /* @__PURE__ */ jsxs("li", { style: { display: "flex", justifyContent: "space-between", borderBottom: "2px solid rgba(0,0,0,0.1)", paddingBottom: "0.75rem" }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 700 }, children: "Recurring Weekly" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 900 }, children: "$1.99/lb" })
          ] }),
          /* @__PURE__ */ jsxs("li", { style: { display: "flex", justifyContent: "space-between", borderBottom: "2px solid rgba(0,0,0,0.1)", paddingBottom: "0.75rem" }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 700 }, children: "One-Time Service" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 900 }, children: "$2.25/lb" })
          ] }),
          /* @__PURE__ */ jsxs("li", { style: { display: "flex", justifyContent: "space-between", borderBottom: "2px solid rgba(0,0,0,0.1)", paddingBottom: "0.75rem" }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 700 }, children: "Min Order" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 900 }, children: "$45.00" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: content.brand.scheduleUrl, target: "_blank", rel: "noopener noreferrer", className: "btn", style: { display: "block", width: "100%", textDecoration: "none", textAlign: "center", backgroundColor: "var(--color-primary)", color: "white" }, children: [
          "Schedule Pickup in ",
          area.name
        ] }),
        /* @__PURE__ */ jsx("p", { style: { textAlign: "center", fontSize: "0.75rem", marginTop: "1rem", fontWeight: 700, textTransform: "uppercase" }, children: "Next Day Delivery Available" })
      ] })
    ] }) }) })
  ] });
};
const AboutUs = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "About Our Laundry Studio",
        description: "Learn about Corner Wash, San Diego's trusted family-owned laundromat since 1975. Discover our history of service in Normal Heights.",
        path: "/about-us"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            "A ",
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "San Diego" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            "Staple Since 1975"
          ] }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--color-primary)", maxWidth: "580px", lineHeight: 1.5, fontWeight: 600, marginBottom: "2.5rem" }, children: "Corner Wash in Normal Heights is a family-owned business with a legacy of clean." }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1rem", flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsx(Link, { className: "btn", to: "/location", children: "Find Us" }),
            /* @__PURE__ */ jsx(Link, { className: "btn", to: "/ozone-laundry", style: { backgroundColor: "transparent", border: "var(--brutalist-border)", color: "var(--color-primary)" }, children: "Our Technology" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: interiorImg, alt: "Corner Wash Interior", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "850px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Clean. Safe. Reliable." }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.9, fontSize: "1.1rem", marginBottom: "1.5rem" }, children: "All washers & dryers are state-of-the-art high performance laundry systems, with every wash Ozone-Sanitized Water Treated to kill 99.999% of all bacteria and viruses. We take cash, credit/debit, Apple Pay, and Google Pay." }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.9, fontSize: "1.1rem" }, children: "Our goal is to have all of our washers, dryers, and vending machines in good working order at all times. Clean restrooms, comfortable lounge seating with a TV, free Wi-Fi, and free parking are yours to enjoy while getting your laundry done." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start", marginBottom: "5rem" }, children: [
        /* @__PURE__ */ jsx("div", { style: { border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow)", overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: machinesImg, alt: "Corner Wash Machines", style: { width: "100%", display: "block" } }) }),
        /* @__PURE__ */ jsx("div", { style: { border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow)", overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: interiorImg, alt: "Corner Wash Interior", style: { width: "100%", display: "block" } }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-secondary)", border: "var(--brutalist-border)", padding: "3rem", marginBottom: "5rem", boxShadow: "var(--brutalist-shadow)" }, children: [
        /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", fontSize: "1.5rem", textTransform: "uppercase" }, children: "Hospital-Grade Sanitation in Every Load" }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--color-primary)", lineHeight: 1.7, fontSize: "1.1rem", fontWeight: 600 }, children: "Every machine at Corner Wash gives you the cleanest, most sanitized wash — the same sanitation system used in hospitals." }),
        /* @__PURE__ */ jsx(Link, { to: "/ozone-laundry", style: { display: "inline-block", marginTop: "1.5rem", fontWeight: 900, color: "var(--color-primary)", textDecoration: "underline", textTransform: "uppercase" }, children: "Learn More About Ozone →" })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "3rem", textAlign: "center", textTransform: "uppercase" }, children: "Why Choose Corner Wash?" }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", marginBottom: "5rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "2rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", fontSize: "1.2rem", textTransform: "uppercase" }, children: "🧹 Clean and Safe" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7 }, children: "We take pride in being the cleanest laundromat in town. We have surveillance cameras and A/C climate control for your comfort and safety." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "2rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", fontSize: "1.2rem", textTransform: "uppercase" }, children: "🔧 Modern Machines" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7 }, children: "From single-load washers to extra-large family-size machines, we have modern, efficient Speed Queen equipment to fit every load." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "2rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", fontSize: "1.2rem", textTransform: "uppercase" }, children: "🛒 Fully Stocked" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7 }, children: "Change, snacks, drinks, and a wide variety of laundry supplies are always available — no last-minute trips to the store needed." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "2rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", fontSize: "1.2rem", textTransform: "uppercase" }, children: "🅿️ Easy Parking" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7 }, children: "Our private parking lot has plenty of spaces, and our handy carts make hauling laundry from your car a breeze." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "2rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", fontSize: "1.2rem", textTransform: "uppercase" }, children: "📶 Free Wi-Fi" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7 }, children: "Stay connected or get some work done while your laundry runs. We offer fast, free Wi-Fi for all our customers to enjoy." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "2rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", fontSize: "1.2rem", textTransform: "uppercase" }, children: "📺 Relaxing Lounge" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7 }, children: "Kick back in our comfortable seating area equipped with HD TVs, making your laundry day feel like a breeze rather than a chore." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 3rem", marginBottom: "5rem", boxShadow: "var(--brutalist-shadow)", textAlign: "center" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { color: "white", marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Corner Wash Gives Back!" }),
        /* @__PURE__ */ jsxs("p", { style: { color: "white", lineHeight: 1.8, fontSize: "1.15rem", maxWidth: "800px", margin: "0px auto" }, children: [
          "Giving back is at the core of our values. That's why ",
          /* @__PURE__ */ jsx("strong", { children: "3% of our profits" }),
          " are donated to charities chosen by our customers. Your support helps us contribute to local schools, the ASPCA, St. Jude's, and Wounded Warriors."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "2rem", textTransform: "uppercase", textAlign: "center" }, children: "Amenities" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }, children: [
        { icon: "📺", title: "HD TV", desc: "Relax in our TV lounge." },
        { icon: "📶", title: "FREE Wi-Fi", desc: "High-speed internet while you wait." },
        { icon: "🧴", title: "Supplies", desc: "Detergents and more available." },
        { icon: "🍫", title: "Snacks", desc: "Vending machines on site." },
        { icon: "🪙", title: "Change", desc: "Easy quarter exchange." },
        { icon: "🛒", title: "Carts", desc: "Plenty of carts for your loads." }
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "1.5rem", textAlign: "center", backgroundColor: "#fafafa" }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: "2rem", marginBottom: "0.5rem" }, children: item.icon }),
        /* @__PURE__ */ jsx("p", { style: { fontWeight: 900, fontFamily: "var(--font-heading)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", color: "var(--color-primary)" }, children: item.title }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontSize: "0.85rem", lineHeight: 1.5 }, children: item.desc })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Get in Touch!" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.7 }, children: "Have questions or need help with a large commercial order? Send us a message and we'll get back to you as soon as possible." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          border: "var(--brutalist-border)",
          padding: "2.5rem",
          boxShadow: "var(--brutalist-shadow)",
          backgroundColor: "white"
        }, children: /* @__PURE__ */ jsx(
          HubspotForm,
          {
            portalId: "245656102",
            formId: "dd9868fa-9eeb-4df3-8035-424e32204e7f"
          }
        ) })
      ] })
    ] }) })
  ] });
};
const OzoneLaundry = () => {
  const benefits = [
    {
      icon: /* @__PURE__ */ jsx(Sparkles, { size: 28 }),
      title: "Superior Sanitation and Disinfection",
      desc: "Ozone is a natural, highly effective sanitizer that kills viruses, bacteria, and germs. Your clothes, towels, and linens aren't just clean — they're genuinely disinfected. This is especially important for families with small children or anyone concerned with hygiene."
    },
    {
      icon: /* @__PURE__ */ jsx(Leaf, { size: 28 }),
      title: "Eco-Friendly and Sustainable",
      desc: "Our eco-friendly laundry system significantly reduces our environmental footprint. Ozone works best in cold water, which eliminates the need for hot water and cuts down on natural gas consumption."
    },
    {
      icon: /* @__PURE__ */ jsx(Shirt, { size: 28 }),
      title: "Gentler on Fabrics",
      desc: "Unlike harsh bleach and hot water, ozone is gentle on fabrics. It helps preserve the integrity of clothing fibers, preventing colors from fading and extending the life of your garments so they stay newer longer."
    },
    {
      icon: /* @__PURE__ */ jsx(Wind, { size: 28 }),
      title: "Powerful Odor Elimination",
      desc: "Ozone is a natural deodorizer that tackles odors at a molecular level. It breaks down odor-causing compounds, leaving your laundry smelling fresh and clean without artificial fragrances — perfect for gym clothes, pet bedding, and work uniforms."
    },
    {
      icon: /* @__PURE__ */ jsx(Heart, { size: 28 }),
      title: "Ideal for Sensitive Skin",
      desc: "Because our system reduces the need for harsh chemicals, it's an excellent choice for individuals with sensitive skin, allergies, or chemical sensitivities. You get a deep clean without the risk of skin irritation."
    }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Ozone Laundry Technology",
        description: "Experience the power of Ozone laundry. Our eco-friendly technology naturally kills bacteria, removes odors, and ensures a hospital-grade clean for your clothes.",
        path: "/ozone-laundry"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Ozone Laundry" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            " in San Diego"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "0px" }, children: "Ozone laundry is an advanced cleaning system that uses ozone to sanitize and deodorize laundry." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)",
          backgroundColor: "white"
        }, children: /* @__PURE__ */ jsx("img", { src: ozoneSystemImg, alt: "Articlean Ozone Laundry System", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "800px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1rem", textTransform: "uppercase" }, children: "The Benefits of Ozone Laundry" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { margin: "0px", lineHeight: 1.6 }, children: "The Best Laundromat for Sanitizing Clothes in Normal Heights — our advanced technology kills 99.99% of bacteria and viruses in every load." })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: benefits.map((item, i) => /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: "1.5rem",
        alignItems: "flex-start",
        padding: "2rem",
        border: "var(--brutalist-border-thin)",
        boxShadow: "var(--brutalist-shadow-sm)",
        backgroundColor: i % 2 === 1 ? "#f9f9f9" : "white"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { width: "56px", height: "56px", backgroundColor: "var(--color-funky-cyan)", border: "var(--brutalist-border-thin)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: item.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem" }, children: item.title }),
          /* @__PURE__ */ jsx("p", { style: { margin: "0px" }, children: item.desc })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-primary)", color: "white", padding: "3rem 2rem", textAlign: "center", marginTop: "3rem", boxShadow: "var(--brutalist-shadow)" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { color: "white", marginBottom: "1rem" }, children: "Experience the Difference" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { color: "white", maxWidth: "600px", margin: "0px auto 2rem" }, children: "All of our machines at Corner Wash utilize our Ozone Laundry System to give you the cleanest, most sanitized wash possible." }),
        /* @__PURE__ */ jsx("a", { href: "http://book.cornerwashlaundry.com/", target: "_blank", rel: "noopener noreferrer", className: "btn", style: { textDecoration: "none", backgroundColor: "var(--color-secondary)", color: "black" }, children: "Schedule a Pickup" })
      ] })
    ] }) })
  ] });
};
const Contact = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Contact Us",
        description: "Get in touch with Corner Wash Laundry Studio. Contact us for pickup and delivery, commercial inquiries, or general laundry questions in San Diego.",
        path: "/contact"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            "Get in ",
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Touch" })
          ] }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--color-primary)", maxWidth: "580px", lineHeight: 1.5, fontWeight: 600, marginBottom: "1.5rem" }, children: "Have a question about our services or a special request? We're here to help you get your laundry done right." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "3 / 2",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1545173168-9f1947eebb9f?q=80&w=2071&auto=format&fit=crop", alt: "Corner Wash", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem" }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gap: "3rem", alignContent: "start" }, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "2rem", textTransform: "uppercase" }, children: "Contact Information" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2.5rem" }, children: [
          /* @__PURE__ */ jsx("div", { style: { color: "var(--color-primary)", backgroundColor: "var(--color-secondary)", padding: "0.75rem", border: "var(--brutalist-border-thin)", boxShadow: "var(--brutalist-shadow-sm)" }, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.9rem" }, children: "Our Location" }),
            /* @__PURE__ */ jsxs("p", { style: { color: "var(--color-text-muted)", fontWeight: 600, lineHeight: 1.6 }, children: [
              "3501 Adams Avenue",
              /* @__PURE__ */ jsx("br", {}),
              "Normal Heights, San Diego, CA 92116"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2.5rem" }, children: [
          /* @__PURE__ */ jsx("div", { style: { color: "var(--color-primary)", backgroundColor: "var(--color-funky-yellow)", padding: "0.75rem", border: "var(--brutalist-border-thin)", boxShadow: "var(--brutalist-shadow-sm)" }, children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.9rem" }, children: "Phone" }),
            /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontWeight: 600, lineHeight: 1.6 }, children: "(619) 284-6741" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1.5rem", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ jsx("div", { style: { color: "white", backgroundColor: "var(--color-primary)", padding: "0.75rem", border: "var(--brutalist-border-thin)", boxShadow: "var(--brutalist-shadow-sm)" }, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
            /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.9rem" }, children: "Email" }),
            /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontWeight: 600, lineHeight: 1.6 }, children: "info@cornerwashlaundry.com" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "2rem", textTransform: "uppercase" }, children: "Send a Message" }),
        /* @__PURE__ */ jsx("div", { style: {
          border: "var(--brutalist-border)",
          padding: "2.5rem",
          boxShadow: "var(--brutalist-shadow)",
          backgroundColor: "white"
        }, children: /* @__PURE__ */ jsx(
          HubspotForm,
          {
            portalId: "245656102",
            formId: "dd9868fa-9eeb-4df3-8035-424e32204e7f"
          }
        ) })
      ] })
    ] }) }) })
  ] });
};
const TermsOfUse = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(SEO, { title: "Terms of Use", description: "Review the terms and conditions for using Corner Wash's services and website.", path: "/terms-of-use" }),
    /* @__PURE__ */ jsx("div", { style: { backgroundColor: "#46BECF", padding: "5rem 0", textAlign: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h1", { style: { color: "black", marginBottom: "0.75rem" }, children: "Terms of Use" }),
      /* @__PURE__ */ jsx("p", { style: { color: "rgba(0, 0, 0, 0.65)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em" }, children: "Effective Date: March 9, 2017" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: { color: "var(--color-text-muted)", lineHeight: 1.8 }, children: [
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Introduction" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: 'This software is for your personal use and shall not be used for commercial endeavors, unless otherwise endorsed or approved by Corner Wash Laundry (“Corner Wash Laundry”) or one of its licensees (each a “Licensee” and together “Licensees”). Corner Wash Laundry and its Licensees have adopted this Terms of Use Agreement ("Agreement") to notify you of your rights and duties while using this software and any related websites (collectively referred to herein as the “Website”).' }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)", fontWeight: 700 }, children: "THIS AGREEMENT IS A LEGALLY BINDING CONTRACT AND YOU HAVE A DUTY TO READ THIS AGREEMENT BEFORE USING THE WEBSITE. THROUGH YOUR USE OF THE WEBSITE, YOU MANIFEST YOUR ASSENT TO THE TERMS AND CONDITIONS CONTAINED WITHIN THIS AGREEMENT. IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, YOU MUST IMMEDIATELY CEASE YOUR USE OF THE WEBSITE. Corner Wash Laundry RESERVES THE RIGHT TO MODIFY, AMEND, REPLACE, SUSPEND, OR TERMINATE THIS AGREEMENT AT ANY TIME AND WITHIN ITS SOLE DISCRETION." }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "In the event Corner Wash Laundry modifies, amends, or replaces this Agreement, the Effective Date, located at the top of this page, will change. Your use of the Website after a change in the Effective Date constitutes your acceptance of any modification, amendment, or replacement." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Warranties" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "You warrant that you are of sound mind and competent to agree to the terms of this Agreement and your use of the Website does not violate any law, regulation, ordinance, statute, or treaty that is applicable to individuals or other entities located in the jurisdiction in which you live or conduct business. You further warrant that you are not prohibited from entering into this Agreement by the terms of any pre-existing agreement. If you are accessing or using the Website on behalf of a governmental organization, non-governmental organization, or business Corner Wash Laundry, you warrant that you are an authorized agent of said organization or Corner Wash Laundry and that you have the authority to bind said organization or Corner Wash Laundry to the terms of this Agreement." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry hereby incorporates its Privacy Policy by reference as if fully restated herein." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Ownership of Content and Intellectual Property" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry is the owner of all rights in, and to, the Website and its associated content, including, but not limited to, copyright rights, trademark rights, patent rights, rights of publicity and privacy, trade secret rights, and any other property or proprietary rights. The Website is subject to copyright and other intellectual property rights under the laws of the United States, foreign states, as well as international treaties, and Corner Wash Laundry provides you with the right to use the Website on a limited basis. You are expressly prohibited from using the Website for any purposes not stated in this Agreement." }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry hereby provides you with a limited, non-exclusive, non-assignable, non-sublicensable, revocable license to use the Website for its customary and intended purposes. Use of the Website for a purpose outside of its customary and intended purposes or in violation of the terms of this Agreement will result in the immediate termination of this license. This license is revocable at any time, and any rights not expressly granted herein are reserved to Corner Wash Laundry." }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "You are expressly prohibited from reproducing, preparing derivative works of, distributing, performing publicly, displaying publicly, scraping, framing, hacking, reverse engineering, crawling, or aggregating the Website, whether in whole or in part, without the prior written consent of Corner Wash Laundry. This prohibition on crawling or aggregating does not apply to search engines that appropriately comply with Corner Wash Laundry’ robots.txt file." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Registered Accounts" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: 'In order to obtain access to additional features or areas of the Website, or to purchase the Corner Wash Laundry you may be required to register an account ("Account"). You may only use your Account and you are expressly prohibited from providing additional parties with access to your Account. You agree that, in registering an Account, you will provide Corner Wash Laundry with accurate, compete, relevant, and current information. You are solely responsible for maintaining the security and confidentiality of your username and password and for any access to your Account, whether authorized or unauthorized. In the event your Account is accessed without your authorization, you agree to immediately provide notice to Corner Wash Laundry. By creating an Account, you agree that Corner Wash Laundry may contact you by any available means, including, but not limited to, by email.' }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry reserves the right to accept, reject, modify, suspend, or delete any Account at any time within its sole and absolute discretion." }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "By agreeing to these Terms of Use, User agrees to allow Corner Wash Laundry to market new products and services to registered accounts." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Acceptable Use of Website and Licenses" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Users warrant that any content uploaded or transmitted through Corner Wash Laundry is owned by the user or such user has the appropriate rights to use the content in such a manner. The copyright of all content uploaded by users is retained by the users. Users warrant that any use of the Website or transmission of content via the Website will neither: (1) violate any term or condition of this Agreement; (2) violate the rights of third parties, including rights of privacy or publicity or intellectual property rights; nor (3) violate any law, statute, regulation, ordinance, or treaty, whether local, state, provincial, national, or international. By uploading or transmitting information using the Website, Users expressly waive their rights to publicity and privacy with respect to the content." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Copyright Policy" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "You acknowledge and agree that the Website is an interactive computer service as those terms are defined under Section 230 of the Communications Decency Act. Corner Wash Laundry will not be considered a speaker or publisher of any information provided by a third party using the Website, regardless of whether Company chooses to remove, suspend, change, or amend such information." }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "The Website is protected by copyright and such rights are owned by Corner Wash Laundry. Although Corner Wash Laundry does not plan to host user-generated content, in the event that any user of the Website uploads or posts information to a public or semi-public area of the Website should such functionality become available, Corner Wash Laundry will expeditiously respond to all duly issued notifications of copyright infringement that are sent to Corner Wash Laundry’ designated copyright agent pursuant to 17 U.S.C. § 512." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Indemnification" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Users agree to hold harmless, defend, and indemnify Corner Wash Laundry from and against any and all claims, demands, judgments, liabilities, costs, and fees, including attorneys' fees, arising out of or related to: (1) the creation or use of an Account; (2) the uploading or transmitting of User-generated content; (3) the violation of any term or condition of this Agreement; (4) the violation of the rights of third parties, including rights of privacy or publicity or intellectual property rights; and (5) the violation of any law, statute, regulation, ordinance, or treaty, whether local, state, provincial, national, or international. Users’ obligation to defend Corner Wash Laundry will not provide Users with the ability or right to control Corner Wash Laundry’ defense, and Corner Wash Laundry reserves the right to control its defense, including, but not limited to, the choice to litigate or settle and the choice of counsel in its sole discretion." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Control of Operations" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry reserves the right to accept, reject, modify, suspend, or delete any User or User-generated content at any time and within its sole and absolute discretion. Corner Wash Laundry reserves the right to modify or discontinue the Website or any of its associated services at any time, without notice, and in its sole and absolute discretion." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Acceptable Uses" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "You agree that you will not use the Website to violate any law, statute, ordinance, regulation, or treaty, to violate the rights of third parties, or for a use outside of the customary and intended purposes of the Website." }),
      /* @__PURE__ */ jsxs("ul", { style: { marginBottom: "var(--spacing-md)", paddingLeft: "2rem" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Transmitting unsolicited commercial email messages through the Website or to users of the Website;" }),
        /* @__PURE__ */ jsx("li", { children: "Imposing a disproportionate load on the Website or its server infrastructure;" }),
        /* @__PURE__ */ jsx("li", { children: "Circumventing Corner Wash Laundry’ technological or security protection mechanisms;" }),
        /* @__PURE__ */ jsx("li", { children: "Using a robot, spider, scraper, or other automated technology to access the Website;" }),
        /* @__PURE__ */ jsx("li", { children: "Attempting to gain access to the private data or personal information of a user;" }),
        /* @__PURE__ */ jsx("li", { children: "Harassing a user or third party through your use of the Website;" }),
        /* @__PURE__ */ jsx("li", { children: "Posting or transmitting content that infringes upon intellectual property rights." })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Payment" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry is a sales platform marketing laundry services, specifically wash and fold services. Users put in an order, which is paid by credit card or other a related financial instrument transmitted to Corner Wash Laundry or one of its Licensees." }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "All payments for services, products, information, or otherwise, offered through the Website are non-refundable. You hereby authorize Corner Wash Laundry’s payment processing agent to charge your credit card in accordance with Corner Wash Laundry’s billing policy." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Disclaimer of Warranties" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: 'Corner Wash Laundry PROVIDES THE WEBSITE ON AN "AS-IS" BASIS AND WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHATABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUALITY, TITLE, ACCURACY, OR NON-INFRINGMENT.' }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Limitation of Liability" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry WILL NOT BE HELD LIABLE TO YOU OR ANY OTHER PERSON FOR ANY CLAIMS, DAMAGES, JUDGMENTS, LIABILITIES, COSTS, CHARGES, OR FEES, WHETHER IN TORT, CONTRACT, PERSONAL INJURY, OR STRICT LIABILITY." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Choice of Laws" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "This Agreement shall be governed in all respects by the laws of the State of California. You agree that any claim or dispute you may have against Corner Wash Laundry must be resolved by a court located in Los Angeles County, California." })
    ] }) }) })
  ] });
};
const PrivacyPolicy = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(SEO, { title: "Privacy Policy", description: "Read our privacy policy to understand how we collect, use, and protect your personal information.", path: "/privacy-policy" }),
    /* @__PURE__ */ jsx("div", { style: { backgroundColor: "#2B475A", padding: "5rem 0", textAlign: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h1", { style: { color: "white", marginBottom: "0.75rem" }, children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { style: { color: "rgba(255, 255, 255, 0.75)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em" }, children: "Effective Date: April 2026" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: { color: "var(--color-text-muted)", lineHeight: 1.8 }, children: [
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: 'Welcome to Corner Wash Laundry (“Corner Wash Laundry”). This is our Privacy Policy ("Privacy Policy"), which we have created to inform you of the types of information that we collect from you. We have also created this Privacy Policy to inform you of how we use that information because we believe in transparency and value your privacy.' }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "We may change or discontinue this Privacy Policy at any time, and we reserve the right to do so. If we change this Privacy Policy, we will also change the Effective Date, which is located at the top of this page. If you continue to use the Website after we change the Effective Date, you agree to our change to the Privacy Policy." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "What do you collect from me?" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "We may collect the following personal information from you:" }),
      /* @__PURE__ */ jsxs("ul", { style: { marginBottom: "var(--spacing-md)", paddingLeft: "2rem" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Any information that you voluntarily submit to the Website;" }),
        /* @__PURE__ */ jsx("li", { children: "Your user name, name, email address, phone number, state, city, country, or zip code; and" }),
        /* @__PURE__ */ jsx("li", { children: "Your payment information, which is used to complete a transaction." })
      ] }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "We may also collect the following personally identifiable information from you:" }),
      /* @__PURE__ */ jsxs("ul", { style: { marginBottom: "var(--spacing-md)", paddingLeft: "2rem" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Your IP address and geolocation;" }),
        /* @__PURE__ */ jsx("li", { children: "Your use of the Website and analytics data;" }),
        /* @__PURE__ */ jsx("li", { children: "Information stored in cookies, pixel tags, or web beacons." })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "How do you use this information?" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "We use this personal and personally identifiable information to:" }),
      /* @__PURE__ */ jsxs("ul", { style: { marginBottom: "var(--spacing-md)", paddingLeft: "2rem" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Provide you with the Website and its services;" }),
        /* @__PURE__ */ jsx("li", { children: "Communicate with you regarding your orders;" }),
        /* @__PURE__ */ jsx("li", { children: "Troubleshoot problems with the Website;" }),
        /* @__PURE__ */ jsx("li", { children: "Complete transactions that you have initiated;" }),
        /* @__PURE__ */ jsx("li", { children: "Update you on changes to our services." })
      ] }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)", fontWeight: 600 }, children: "Specifically, we may use your phone number to communicate with you via calls, SMS, or MMS (multimedia messages) to provide delivery updates, schedule changes, and other important information regarding your orders. By providing your phone number and using our services, you consent to receive such communications." }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "This website uses the Google AdWords remarketing service to advertise on third party websites (including Google) to previous visitors to our site. Third-party vendors, including Google, use cookies to serve ads based on someone’s past visits to our website." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "How do you store this information?" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry stores and processes your personal and personally identifiable information on computers located within the United States. We use commercially standard technology to help protect against the unauthorized disclosure of your information, including encryption." }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Do you share my information?" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--spacing-md)" }, children: "Corner Wash Laundry will only share your information with third parties in the following situations:" }),
      /* @__PURE__ */ jsxs("ul", { style: { marginBottom: "var(--spacing-md)", paddingLeft: "2rem" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Where we have obtained your consent;" }),
        /* @__PURE__ */ jsx("li", { children: "Where it is necessary to provide you with services requested;" }),
        /* @__PURE__ */ jsx("li", { children: "Where it is needed to respond to information requests by government authorities;" }),
        /* @__PURE__ */ jsx("li", { children: "Where it is needed to protect the employees or users of Corner Wash Laundry." })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Data Deletion Requests" }),
      /* @__PURE__ */ jsxs("p", { style: { marginBottom: "var(--spacing-md)" }, children: [
        "In order to have your data deleted (including Facebook or Google social sign-in data), please email ",
        /* @__PURE__ */ jsx("strong", { children: "support@curbsidelaundries.com" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Your California Privacy Rights" }),
      /* @__PURE__ */ jsxs("p", { style: { marginBottom: "var(--spacing-md)" }, children: [
        "California residents have the right to receive information regarding third parties with whom we have shared information. You may obtain this once a year by contacting us at ",
        /* @__PURE__ */ jsx("strong", { children: "info@cornerwashlaundry.com" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }, children: "Contact Us" }),
      /* @__PURE__ */ jsxs("p", { style: { marginBottom: "var(--spacing-md)" }, children: [
        "All questions regarding this Privacy Policy may be directed to Corner Wash Laundry by emailing ",
        /* @__PURE__ */ jsx("strong", { children: "info@cornerwashlaundry.com" }),
        "."
      ] })
    ] }) }) })
  ] });
};
const LocationPage = () => {
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Laundromat Location & Hours",
        description: "Visit Corner Wash in Normal Heights, San Diego. Open 7AM – 9PM daily. Find our self-service laundry studio on the corner of Adams Ave. and 35th St.",
        path: "/location"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { position: "relative", zIndex: 2, textAlign: "center" }, children: [
        /* @__PURE__ */ jsx("h1", { className: "hero-title", children: /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Our Location" }) }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.2rem", color: "rgba(0, 0, 0, 0.75)", marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700 }, children: "Corner Wash — 3501 Adams Avenue, San Diego CA 92116" }),
        /* @__PURE__ */ jsx("p", { style: { color: "rgba(0, 0, 0, 0.55)", fontSize: "0.9rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }, children: "Laundromat with Wash & Fold Service in Normal Heights" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.75rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("div", { style: { color: "var(--color-secondary)", marginBottom: "0.75rem" }, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", color: "var(--color-primary)" }, children: "Address" }),
          /* @__PURE__ */ jsxs("p", { style: { color: "var(--color-primary)", fontWeight: 700, lineHeight: 1.6, whiteSpace: "pre-line" }, children: [
            "3501 Adams Avenue, Normal Heights",
            "\n",
            "San Diego, CA 92116"
          ] }),
          /* @__PURE__ */ jsx("a", { href: "https://maps.google.com/?q=3501+Adams+Ave+San+Diego+CA+92116", target: "_blank", rel: "noopener noreferrer", style: { display: "inline-block", marginTop: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, fontSize: "0.85rem" }, children: "Get Directions →" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.75rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("div", { style: { color: "var(--color-secondary)", marginBottom: "0.75rem" }, children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }) }),
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", color: "var(--color-primary)" }, children: "Phone Number" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-primary)", fontWeight: 700, lineHeight: 1.6 }, children: "(619) 284-6741" }),
          /* @__PURE__ */ jsx("a", { href: "tel:6192846741", style: { display: "inline-block", marginTop: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, fontSize: "0.85rem" }, children: "Call Us →" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border)", padding: "1.75rem", boxShadow: "var(--brutalist-shadow-sm)", backgroundColor: "white" }, children: [
          /* @__PURE__ */ jsx("div", { style: { color: "var(--color-secondary)", marginBottom: "0.75rem" }, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
            /* @__PURE__ */ jsx("polyline", { points: "12 6 12 12 16 14" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", color: "var(--color-primary)" }, children: "Business Hours" }),
          /* @__PURE__ */ jsxs("p", { style: { color: "var(--color-primary)", fontWeight: 700, lineHeight: 1.6 }, children: [
            "7AM – 9PM Daily",
            "\n",
            "Last Wash: 7:30PM"
          ] }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }, children: "See Special Holiday Hours" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { border: "var(--brutalist-border)", marginBottom: "3rem", overflow: "hidden" }, children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.4!2d-117.11715!3d32.76332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9549c5f1c2a4f%3A0x0!2s3501+Adams+Ave%2C+San+Diego%2C+CA+92116!5e0!3m2!1sen!2sus!4v1",
          width: "100%",
          height: "350",
          allowFullScreen: "",
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          title: "Corner Wash Location Map",
          style: { border: 0, display: "block" }
        }
      ) }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1rem" }, children: "Clean Facilities. Friendly Attendants. Outstanding Service." }),
      /* @__PURE__ */ jsx("h3", { style: { color: "var(--color-text-muted)", fontWeight: 600, marginBottom: "1.5rem" }, children: "Your Friendly Local Laundromat" }),
      /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "1.5rem" }, children: "Corner Wash is easily located on the corner of Adams Ave. and 35th St. You can find our self service laundry across the street from the Adams Recreation Center. We have plenty of parking in our lot behind the Laundromat and on the street. And if you get hungry, we are a short walk away from Dos Palmas Cafe, Subway and Brothers Mexican Restaurant." }),
      /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "3rem" }, children: "Come by any time between 7:00 am – 7:30 pm (the time of last wash) to do your own laundry, or drop off your laundry any time before 6:00 pm to utilize our convenient wash and fold service. At Corner Wash everyone is welcome!" }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem" }, children: "Get in Touch" }),
      /* @__PURE__ */ jsxs("form", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: { display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "First Name *" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "text", style: { width: "100%", padding: "0.75rem", border: "var(--brutalist-border-thin)", outline: "none", fontFamily: "inherit" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: { display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Last Name *" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "text", style: { width: "100%", padding: "0.75rem", border: "var(--brutalist-border-thin)", outline: "none", fontFamily: "inherit" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
          /* @__PURE__ */ jsx("label", { style: { display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Email *" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "email", style: { width: "100%", padding: "0.75rem", border: "var(--brutalist-border-thin)", outline: "none", fontFamily: "inherit" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
          /* @__PURE__ */ jsx("label", { style: { display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Message" }),
          /* @__PURE__ */ jsx("textarea", { rows: "4", style: { width: "100%", padding: "0.75rem", border: "var(--brutalist-border-thin)", outline: "none", fontFamily: "inherit", resize: "vertical" } })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { gridColumn: "span 2" }, children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn", children: "Send Message" }) })
      ] })
    ] }) })
  ] });
};
const machines1Img = "/assets/machines-1-DDaCJFdL.webp";
const SelfServiceLaundry = () => {
  const galleryImages = [
    { src: interiorImg, alt: "Corner Wash laundromat interior" },
    { src: machinesImg, alt: "Speed Queen washing machines at Corner Wash" },
    { src: machines1Img, alt: "Row of washing machines" },
    { src: eightLoadsImg$1, alt: "Eight-load washing machine" },
    { src: speedQueensImg, alt: "Speed Queen machines" },
    { src: counterImg, alt: "Corner Wash service counter" },
    { src: laundromat1Img, alt: "Inside Corner Wash" },
    { src: laundromat2Img, alt: "Dryer row at Corner Wash" },
    { src: laundromat3Img, alt: "Corner Wash laundromat" }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Self-Service Laundromat in Normal Heights",
        description: "Visit San Diego's premier self-service laundromat. High-capacity machines, free Wi-Fi, large TVs, and Ozone-sanitized water in every load.",
        path: "/self-service-laundry"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            "Modern ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Laundromat" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "1.5rem" }, children: "We offer an eco-friendly laundry experience with high-efficiency Speed Queen machines, designed to save you time, energy, and water." }),
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-primary)", opacity: 0.8, marginBottom: "0px" }, children: "All machines utilize our Ozone Laundry System" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "3 / 2",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: interiorImg, alt: "Corner Wash Interior", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white", paddingTop: "2.5rem" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "850px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-secondary)", marginBottom: "0.5rem" }, children: "Laundry Made Easy" }),
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "The Best Laundromat in San Diego" }),
        /* @__PURE__ */ jsx("p", { style: { marginBottom: "1.5rem" }, children: "Welcome to Corner Wash, where doing laundry in San Diego is easier, cleaner, and just a little more enjoyable. We've reimagined the old laundry chore and turned it into a modern, eco-friendly experience." }),
        /* @__PURE__ */ jsx("p", { children: "Our state-of-the-art Speed Queen machines are fast, reliable, and super convenient. Pay your way — with a credit or debit card, or with good old-fashioned quarters." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        backgroundColor: "#FFFBEB",
        border: "1px solid black",
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        margin: "0px auto 4rem",
        maxWidth: "800px",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", left: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "8px", right: "8px", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "black" } }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.75rem" }, children: "🎉" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { style: { color: "black", fontSize: "1.2rem", fontWeight: 900, marginBottom: "0.25rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }, children: "Tuesday & Thursday Special Offer" }),
          /* @__PURE__ */ jsxs("p", { style: { fontSize: "1rem", color: "black", fontWeight: 800, margin: "0px", textTransform: "uppercase" }, children: [
            "40-lb washers are ",
            /* @__PURE__ */ jsx("span", { style: { backgroundColor: "black", color: "#04D1FF", padding: "0 0.4rem" }, children: "$4.50" }),
            " (Save $2.00) from 7am-9am & 6pm-7:30pm"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center", marginBottom: "4rem" }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "At Corner Wash, we're more than just a laundromat — we're part of the community. As an eco-friendly laundromat in Normal Heights, we're committed to giving you powerful cleaning with less impact on the planet." }),
          /* @__PURE__ */ jsx("p", { children: "Come see why locals call us the best modern laundromat in San Diego — because laundry shouldn't feel like a chore." })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: machinesImg, alt: "Speed Queen washing machines at Corner Wash San Diego", style: { width: "100%", border: "var(--brutalist-border)", boxShadow: "var(--brutalist-shadow)", display: "block" } }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1.25rem" }, children: "We provide an abundance of amenities to make your time with us comfortable:" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "4rem" }, children: [
        { icon: /* @__PURE__ */ jsx(Wifi, { size: 28 }), title: "FREE Wi-Fi", desc: "Got some work to catch up on, or just feel like scrolling and gaming? Our Wi-Fi won't cost you a penny." },
        { icon: /* @__PURE__ */ jsx(Tv, { size: 28 }), title: "High-Def TV", desc: "Kick back and enjoy some TV while the washers and dryers do the heavy lifting." },
        { icon: /* @__PURE__ */ jsx(ShoppingBag, { size: 28 }), title: "Snacks, Drinks & Soap", desc: "Out of detergent? Hungry for a candy bar? Our vending machines have you covered with basics and goodies." },
        { icon: /* @__PURE__ */ jsx(Coins, { size: 28 }), title: "Change Machine", desc: "No quarters? No problem. Our change machine's always ready to help." },
        { icon: /* @__PURE__ */ jsx(Gamepad2, { size: 28 }), title: "Quarter Game", desc: "Feeling lucky? Give our quarter game a whirl and see what happens." },
        { icon: /* @__PURE__ */ jsx(Car, { size: 28 }), title: "Free Private Parking", desc: "Don't stress about the street. Our private lot has plenty of spaces right in front." }
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { style: { border: "2px solid var(--color-primary)", boxShadow: "var(--brutalist-shadow-sm)", padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start", backgroundColor: "white" }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: "var(--color-secondary)", flexShrink: 0, marginTop: "0.2rem" }, children: item.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { style: { fontWeight: 900, fontFamily: "var(--font-heading)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem", color: "var(--color-primary)" }, children: item.title }),
          /* @__PURE__ */ jsx("p", { style: { margin: "0px" }, children: item.desc })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsx("p", { style: { font_style: "italic", borderLeft: "3px solid var(--color-primary)", paddingLeft: "1.25rem", marginBottom: "4rem" }, children: "Experience the future of laundry at Corner Wash. We're proud to offer a superior self service laundry experience, making us the best laundromat in Normal Heights for those who value convenience, cleanliness, and efficiency." }),
      /* @__PURE__ */ jsx("h2", { style: { textAlign: "center", marginBottom: "0.5rem" }, children: "Affordable Laundromat Pricing" }),
      /* @__PURE__ */ jsxs("p", { style: { textAlign: "center", marginBottom: "2rem" }, children: [
        "All washers and dryers at Corner Wash are new, state-of-the-art, and utilize ",
        /* @__PURE__ */ jsx(Link, { to: "/ozone-laundry", style: { color: "var(--color-secondary)", font_weight: 700 }, children: "Ozone" }),
        " to get you the cleanest wash possible."
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-primary)", padding: "2rem", boxShadow: "var(--brutalist-shadow)" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { color: "#04D1FF", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "1rem", marginBottom: "1rem" }, children: "Washers" }),
          [
            { label: "20 lb (8 Total)", price: "$4.50" },
            { label: "40 lb (16 Total)", price: "$6.50" },
            { label: "60 lb (6 Total)", price: "$9.00" },
            { label: "80 lb (3 Total)", price: "$10.75" }
          ].map((row, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.5rem 0px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }, children: [
            /* @__PURE__ */ jsx("span", { style: { color: "rgba(255, 255, 255, 0.9)" }, children: row.label }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-funky-yellow)" }, children: row.price })
          ] }, i)),
          /* @__PURE__ */ jsxs("div", { style: {
            marginTop: "1.5rem",
            backgroundColor: "#FFFBEB",
            border: "1px solid black",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            position: "relative"
          }, children: [
            /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "6px", left: "6px", width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "black" } }),
            /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "6px", right: "6px", width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "black" } }),
            /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "6px", left: "6px", width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "black" } }),
            /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "6px", right: "6px", width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "black" } }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem" }, children: "🪖" }),
            /* @__PURE__ */ jsxs("div", { style: { fontSize: "0.85rem", color: "black", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }, children: [
              "Military & Civil Servants: ",
              /* @__PURE__ */ jsx("span", { style: { backgroundColor: "black", color: "#04D1FF", padding: "0 0.4rem" }, children: "10% OFF" }),
              " with ID"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-primary)", padding: "2rem", boxShadow: "var(--brutalist-shadow)" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { color: "#04D1FF", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "1rem", marginBottom: "1rem" }, children: "Dryers" }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.5rem 0px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }, children: [
            /* @__PURE__ */ jsx("span", { style: { color: "rgba(255, 255, 255, 0.9)" }, children: "45 lb (28 Total)" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-funky-yellow)" }, children: "$.50 (4 min.)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.5rem 0px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }, children: [
            /* @__PURE__ */ jsx("span", { style: { color: "rgba(255, 255, 255, 0.9)" }, children: "75 lb (2 Total)" }),
            /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-funky-yellow)" }, children: "$1.00 to start*" })
          ] }),
          /* @__PURE__ */ jsx("p", { style: { color: "rgba(255, 255, 255, 0.4)", fontSize: "0.78rem", marginTop: "0.75rem" }, children: "*$.25 Per Minute After Start" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { style: { backgroundColor: "var(--color-bg)", padding: "5rem 0px", borderTop: "2px solid var(--color-primary)" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { style: { textAlign: "center", marginBottom: "3rem", fontSize: "2.5rem" }, children: "Inside Our Laundromat" }),
      /* @__PURE__ */ jsx("div", { className: "gallery-grid three-col", children: galleryImages.map((img, i) => /* @__PURE__ */ jsx("div", { style: { cursor: "pointer", overflow: "hidden", border: "2px solid var(--color-primary)", boxShadow: "var(--brutalist-shadow-sm)", position: "relative", aspectRatio: "4 / 3" }, children: /* @__PURE__ */ jsx("img", { src: img.src, alt: img.alt, style: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" } }) }, i)) })
    ] }) })
  ] });
};
const commercialHero = "/assets/commercial-hero-DwSWfzDH.webp";
const medicalImg = "/assets/commercial-medical-41pwwtuw.png";
const gymImg = "/assets/commercial-gym-D2qYspKt.png";
const restaurantImg = "/assets/commercial-restaurant-UMxai2wC.png";
const hotelImg = "/assets/commercial-hotel-CAfViOLn.png";
const airbnbImg = "/assets/commercial-airbnb-D_Nic_7o.png";
const spaImg = "/assets/commercial-spa-_eZMjk21.png";
const CommercialLaundry = () => {
  const content = siteContent;
  const industries = [
    {
      img: medicalImg,
      title: "Medical Laundry Service",
      desc: "Medical facilities in San Diego can significantly benefit from Corner Wash's Ozone commercial laundry service. Our process goes beyond standard cleaning, using Ozone to sanitize and disinfect linens, uniforms, and towels, effectively eliminating harmful bacteria and viruses."
    },
    {
      img: gymImg,
      title: "Gym & Health Club Laundry",
      desc: "A clean and sanitized environment is crucial for any San Diego gym or health club, and that starts with your towels. Corner Wash's Ozone commercial laundry service is specifically designed to meet the high hygiene demands of the fitness industry."
    },
    {
      img: restaurantImg,
      title: "Restaurant & Catering Laundry",
      desc: "Running a successful San Diego restaurant is a demanding job, and the last thing you should worry about is laundry. That's where Corner Wash's Ozone commercial laundry service comes in. Our advanced Ozone technology provides a deeper, more hygienic clean."
    },
    {
      img: hotelImg,
      title: "Hotel & Motel Laundry Service",
      desc: "First impressions are everything in the hospitality industry. At Corner Wash, our Ozone commercial laundry service is the perfect partner for any San Diego hotel or motel, ensuring your guests experience the highest standard of cleanliness."
    },
    {
      img: airbnbImg,
      title: "Airbnb & VRBO Laundry Service",
      desc: "Staying on top of laundry between guest turnovers is a major challenge for any San Diego Airbnb or VRBO host. Corner Wash's Ozone commercial laundry service is the perfect solution to streamline your operations."
    },
    {
      img: spaImg,
      title: "Spa & Salon Laundry Service",
      desc: "A clean, fresh atmosphere is essential for client relaxation at your San Diego spa or salon. Corner Wash's Ozone commercial laundry service is the perfect partner to ensure every towel, robe, and linen is not just clean, but truly sanitized."
    }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Commercial Laundry Services",
        description: "High-capacity commercial laundry for gyms, spas, hotels, and medical facilities in San Diego. Volume pricing and reliable pickup/delivery.",
        path: "/commercial-laundry"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            "San Diego ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Commercial Laundry" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "1.5rem" }, children: "Keep your business running smoothly with Corner Wash's Ozone laundry service!" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: commercialHero, alt: "Commercial Laundry Service", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", maxWidth: "850px", margin: "0px auto 4rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", textTransform: "uppercase" }, children: "Business Laundry Service in San Diego" }),
        /* @__PURE__ */ jsx("p", { style: { marginBottom: "1.5rem", lineHeight: 1.8 }, children: "San Diego businesses, meet your new laundry partner: Corner Wash's Ozone Laundry Service! Our advanced cleaning technology goes beyond ordinary washes, tackling bacteria, viruses, and tough odors better than bleach — keeping your linens, uniforms, and towels fresh, clean, and safe for daily use." }),
        /* @__PURE__ */ jsx("p", { style: { lineHeight: 1.8 }, children: "Not only is Ozone laundry super effective, it's also eco-friendly, using less water, energy, and harsh chemicals. That makes it perfect for businesses looking to shrink their environmental footprint. Plus, by helping your fabrics last longer, our commercial laundry service can save you money on replacements." })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "2rem", textAlign: "center" }, children: "Simple, Transparent Commercial Pricing" }),
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        marginBottom: "4rem"
      }, children: content.pricing.commercial.map((tier, i) => /* @__PURE__ */ jsxs("div", { style: {
        border: "var(--brutalist-border)",
        padding: "2rem",
        backgroundColor: "white",
        color: "black",
        boxShadow: "var(--brutalist-shadow-sm)",
        textAlign: "center",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx("h3", { style: {
          fontSize: "1rem",
          textTransform: "uppercase",
          marginBottom: "1rem",
          color: "var(--color-primary)"
        }, children: tier.item }),
        /* @__PURE__ */ jsx("p", { style: {
          fontSize: "2.5rem",
          fontWeight: 900,
          margin: "0 0 0.5rem 0",
          fontFamily: "var(--font-heading)"
        }, children: tier.price }),
        tier.sub && /* @__PURE__ */ jsx("p", { style: {
          fontSize: "0.85rem",
          fontWeight: 700,
          textTransform: "uppercase",
          opacity: 0.8,
          margin: 0
        }, children: tier.sub })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { style: {
        maxWidth: "600px",
        margin: "-2rem auto 4rem",
        textAlign: "center",
        fontSize: "0.85rem",
        color: "var(--color-text-muted)",
        display: "flex",
        justifyContent: "center",
        gap: "2rem"
      }, children: [
        /* @__PURE__ */ jsx("span", { children: "🚚 $2.50 fuel surcharge per order" }),
        /* @__PURE__ */ jsx("span", { children: "📦 $45.00 minimum delivery order" })
      ] }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "2rem" }, children: "Commercial Laundry by Industry" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }, children: industries.map((item, i) => /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)", overflow: "hidden", display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ jsx("div", { style: { height: "200px", overflow: "hidden", borderBottom: "var(--brutalist-border-thin)" }, children: /* @__PURE__ */ jsx("img", { src: item.img, alt: item.title, style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "1.5rem", flex: "1 1 0%" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.75rem", fontSize: "1rem" }, children: item.title }),
          /* @__PURE__ */ jsx("p", { style: { margin: "0px" }, children: item.desc })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-primary)", color: "white", padding: "3rem 2rem", textAlign: "center", marginBottom: "4rem", boxShadow: "var(--brutalist-shadow)" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { color: "white", marginBottom: "1rem" }, children: "Request a Commercial Quote" }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { color: "white", maxWidth: "700px", margin: "0px auto 2.5rem" }, children: "From high-volume linen cleaning to specialized gym and spa services, we've got San Diego covered. Fill out the form below and we'll get back to you with a custom quote." }),
        /* @__PURE__ */ jsx("div", { style: {
          backgroundColor: "white",
          padding: "2.5rem",
          border: "var(--brutalist-border-thin)",
          maxWidth: "800px",
          margin: "0 auto",
          color: "black",
          textAlign: "left"
        }, children: /* @__PURE__ */ jsx(
          HubspotForm,
          {
            portalId: "245656102",
            formId: "dd9868fa-9eeb-4df3-8035-424e32204e7f"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }, children: [
        /* @__PURE__ */ jsxs(Link, { to: "/commercial-laundry/commercial-towel-laundry-service", style: { display: "block", border: "var(--brutalist-border)", padding: "1.5rem", textDecoration: "none", color: "inherit", boxShadow: "var(--brutalist-shadow-sm)", textAlign: "center", backgroundColor: "var(--color-funky-cyan)" }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontWeight: 900, fontFamily: "var(--font-heading)", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Commercial Towel Service" }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "0.85rem", color: "rgba(0, 0, 0, 0.7)" }, children: "Gyms, spas, salons & more" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/commercial-laundry/linen-cleaning-service-in-san-diego", style: { display: "block", border: "var(--brutalist-border)", padding: "1.5rem", textDecoration: "none", color: "inherit", boxShadow: "var(--brutalist-shadow-sm)", textAlign: "center", backgroundColor: "var(--color-secondary)" }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontWeight: 900, fontFamily: "var(--font-heading)", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Commercial Linen Service" }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "0.85rem", color: "rgba(0, 0, 0, 0.7)" }, children: "Hotels, Airbnbs, restaurants & more" })
        ] })
      ] })
    ] }) })
  ] });
};
const towelHeroImg = "/assets/towel-hero-D9FIwcKL.png";
const CommercialTowel = () => {
  const reasons = [
    {
      id: 1,
      title: "Superior Hygiene with Ozone Sanitization",
      desc: "Standard washers often fail to kill deep-seated bacteria in thick towels. At Corner Wash, every load is treated with Ozone-Sanitized water."
    },
    {
      id: 2,
      title: "Significant Cost & Labor Savings",
      desc: "Outsourcing your laundry allows your staff to focus on customers rather than folding in the back room."
    },
    {
      id: 3,
      title: "Professional Longevity for Your Linens",
      desc: "Industrial-grade towels are an investment. Our professional-grade Dexter laundry equipment and Ozone technology are gentler on fabrics than traditional hot-water washes."
    },
    {
      id: 4,
      title: "Reliable Pickup and Delivery in San Diego",
      desc: "Consistency is key for businesses like spas and Airbnbs. We offer flexible scheduling to ensure you never run out of clean inventory."
    },
    {
      id: 5,
      title: "Trusted Local Expertise Since 1975",
      desc: "We aren't a faceless national corporation. Based in Normal Heights, we have been serving the San Diego community for over 50 years."
    }
  ];
  const industries = [
    { title: "Gyms & Fitness Centers", desc: "Clean, sanitized workout towels delivered on schedule keep members comfortable and facilities hygienic." },
    { title: "Spas & Massage Studios", desc: "Professional towel laundering ensures soft, fresh, and sanitary linens for every client experience." },
    { title: "Salons & Barbershops", desc: "Reliable towel cleaning service helps salons maintain health standards while saving staff time." },
    { title: "Restaurants & Commercial Kitchens", desc: "Consistently cleaned bar and kitchen towels support food safety and cleanliness compliance." },
    { title: "Hotels & Motels", desc: "Commercial towel service reduces in-house laundry costs and guarantees fresh towels for guests." },
    { title: "Airbnb & Vacation Rentals", desc: "Quick turnaround towel laundry helps hosts stay guest-ready without added workload." },
    { title: "Medical & Dental Offices", desc: "Sanitized towel laundering supports strict hygiene requirements and patient safety." },
    { title: "Physical Therapy & Chiropractic Clinics", desc: "Clean treatment towels ensure comfort and professionalism for every visit." },
    { title: "Daycares & Childcare Centers", desc: "Regular towel cleaning helps maintain a safe, healthy environment for children." },
    { title: "Auto Detailers & Car Washes", desc: "High-quality towel laundering extends towel life and improves detailing results." }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Commercial Towel Laundry Service",
        description: "Professional towel laundry for gyms, spas, and salons in San Diego. Ozone-sanitized water ensures hospital-grade hygiene for every towel.",
        path: "/commercial-laundry/commercial-towel-laundry-service"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem", color: "var(--color-primary)", opacity: 0.8 }, children: "Commercial Laundry" }),
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Commercial Towel" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            " Laundry Service"
          ] }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--color-primary)", maxWidth: "580px", lineHeight: 1.5, fontWeight: 600, marginBottom: "2rem" }, children: "Businesses across San Diego trust Corner Wash's commercial towel service for reliable, hygienic, and hassle-free linen care." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: towelHeroImg, alt: "Commercial Towel Laundry Service", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem" }, children: "Why San Diego Businesses Choose Corner Wash" }),
      /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", marginBottom: "2rem" }, children: "Running a business in San Diego is demanding — managing a mountain of dirty laundry shouldn't be." }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }, children: reasons.map((item, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", border: "var(--brutalist-border-thin)", backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white" }, children: [
        /* @__PURE__ */ jsx("span", { style: { width: "28px", height: "28px", backgroundColor: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontFamily: "var(--font-heading)", fontSize: "0.85rem", flexShrink: 0 }, children: item.id }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.4rem", fontSize: "1rem" }, children: item.title }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7, fontSize: "0.9rem" }, children: item.desc })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem" }, children: "Businesses That Benefit from Our Commercial Towel Service" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem", marginBottom: "3rem" }, children: industries.map((item, i) => /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "1rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: "var(--color-secondary)", fontWeight: 900, flexShrink: 0 }, children: "✓" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { style: { display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }, children: item.title }),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--color-text-muted)", fontSize: "0.85rem" }, children: item.desc })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx("a", { href: "tel:6198001739", className: "btn", style: { textDecoration: "none", backgroundColor: "var(--color-secondary)", color: "black" }, children: "Call for Quote" }) })
    ] }) })
  ] });
};
const linenHeroImg = "/assets/linen-hero-D6PeLv4I.png";
const CommercialLinen = () => {
  const industries = [
    { title: "Hotels & Motels", desc: "Professionally cleaned sheets and linens ensure guest comfort, hygiene, and consistent quality." },
    { title: "Airbnb & Vacation Rentals", desc: "Fast, reliable linen cleaning helps hosts turn over properties quickly between stays." },
    { title: "Restaurants & Catering Companies", desc: "Clean tablecloths, napkins, and kitchen linens support food safety and a polished dining experience." },
    { title: "Spas & Massage Studios", desc: "Soft, sanitized linens enhance client comfort and maintain strict cleanliness standards." },
    { title: "Salons & Barbershops", desc: "Dependable linen laundry keeps daily operations smooth and health-code compliant." },
    { title: "Medical & Dental Offices", desc: "Sanitized linen cleaning supports patient safety and professional presentation." },
    { title: "Physical Therapy & Chiropractic Clinics", desc: "Clean treatment linens provide comfort and reassurance for every visit." },
    { title: "Gyms & Fitness Studios", desc: "Fresh, professionally laundered linens improve member experience and facility hygiene." },
    { title: "Senior Living & Assisted Care Facilities", desc: "Consistent linen service helps maintain cleanliness and resident comfort." },
    { title: "Event Venues & Banquet Halls", desc: "Crisp, clean linens elevate weddings, meetings, and special events." }
  ];
  const benefits = [
    {
      title: "Hospital-Grade Sanitation with Ozone Technology",
      desc: "Most standard laundry services rely on hot water and bleach, which can damage fibers. We use Ozone-Sanitized water in every cycle."
    },
    {
      title: "Enhanced Brand Image & Guest Satisfaction",
      desc: "Whether it's a boutique hotel or a high-end restaurant, the quality of your linens is the first thing a guest notices."
    },
    {
      title: "Extended Lifespan of Your Linen Inventory",
      desc: "Linens are a significant capital investment. The wrong washing method can cause thinning, pilling, and graying."
    },
    {
      title: "Reclaim Staff Hours & Increase Productivity",
      desc: "Having your employees wash linens in the back room is a hidden drain on your payroll and efficiency."
    },
    {
      title: "Reliable Local Expertise Since 1975",
      desc: `Don't risk your inventory with a national "broker" service that outsources your linens to the lowest bidder.`
    }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Linen Cleaning Service in San Diego",
        description: "Premium linen cleaning for hotels, Airbnbs, and restaurants in San Diego. Hospital-grade Ozone sanitization for every sheet and tablecloth.",
        path: "/commercial-laundry/linen-cleaning-service-in-san-diego"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem", color: "var(--color-primary)", opacity: 0.8 }, children: "Commercial Laundry" }),
          /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Linen Cleaning" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            " Service in San Diego"
          ] }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--color-primary)", maxWidth: "580px", lineHeight: 1.5, fontWeight: 600, marginBottom: "2rem" }, children: "Businesses throughout San Diego rely on Corner Wash for consistent quality and hygiene." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "4 / 3",
          borderRadius: "0px",
          overflow: "hidden",
          justifySelf: "end",
          border: "var(--brutalist-border)",
          boxShadow: "var(--brutalist-shadow)"
        }, children: /* @__PURE__ */ jsx("img", { src: linenHeroImg, alt: "Commercial Linen Laundry Service", style: { width: "100%", height: "100%", objectFit: "cover" } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem" }, children: "Businesses That Benefit from Our Commercial Linen Service" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem", marginBottom: "3rem" }, children: industries.map((item, i) => /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: "var(--color-secondary)", fontWeight: 900, flexShrink: 0 }, children: "✓" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { style: { display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }, children: item.title }),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--color-text-muted)", fontSize: "0.85rem" }, children: item.desc })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: "0.5rem" }, children: "Strategic Benefits of Partnering with Corner Wash" }),
      /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", marginBottom: "2rem" }, children: "Running a high-traffic business in San Diego means your linens are constantly in use. Here is how Corner Wash helps your business maintain a competitive edge." }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }, children: benefits.map((item, i) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", borderLeft: "4px solid var(--color-secondary)", backgroundColor: "#fafafa" }, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.4rem", fontSize: "1rem" }, children: item.title }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.7, fontSize: "0.9rem" }, children: item.desc })
      ] }) }, i)) })
    ] }) })
  ] });
};
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const categories = [
    {
      title: "Laundromat FAQ",
      items: [
        { q: "What hours are you open?", a: "We are open from 7 AM to 9 PM daily. The last wash must be started by 7:30 PM." },
        { q: "Are you a coin laundry or a card store?", a: "We take cash, credit/debit, Apple Pay, Google Pay, Electronic Wallet and the Speed Queen App." },
        { q: "How do I know which machine to use and how do I use it?", a: "Our friendly attendants are always available to help you choose the right machine for your load and show you how to use it." },
        { q: "Do you have large machines?", a: "Yes! From single-load washers to extra-large family-size machines, we have modern, efficient Speed Queen equipment to fit every load." }
      ]
    },
    {
      title: "Wash and Fold Questions",
      items: [
        { q: "When can I drop off my clothes?", a: "You can drop off your laundry any time before 6:00 PM to utilize our convenient wash and fold service." },
        { q: "What is the turnaround time for wash and fold?", a: "Most orders are ready the next day. Same-day service may be available depending on volume." },
        { q: "What products do you use for wash and fold?", a: "We use high-quality detergents and softeners. We also offer hypoallergenic options upon request." },
        { q: "Why do you use Ozone with your wash and fold?", a: "Ozone sanitizes the water, killing 99.9% of bacteria and viruses, ensuring your clothes are as clean as possible." },
        { q: "Do you wash my clothes with other people's clothes?", a: "No, never. Each customer's laundry is processed separately." },
        { q: "What if I like my laundry done a certain way?", a: "We are happy to accommodate special instructions! Just let our attendant know when you drop off." }
      ]
    },
    {
      title: "Pickup and Delivery",
      items: [
        { q: "How much does pickup & delivery service cost?", a: "Pricing is based on weight. Please check our Pricing page for current rates." },
        { q: "Do I have to be home when you pick up or deliver my clothes?", a: "No, you can leave your laundry in a designated safe spot. Just let us know where when you schedule." },
        { q: "How do I schedule an order online?", a: "You can schedule a pickup through our online booking portal by clicking the 'Schedule Pickup' button." },
        { q: "What if I have a preference for how my laundry is done?", a: "You can add special instructions to your online order, and we will follow them exactly." },
        { q: "Is there a contract or long-term commitment?", a: "No, our service is pay-as-you-go with no long-term contracts required." },
        { q: "What if I have regular service and I go out of town?", a: "You can easily pause or cancel your scheduled pickups through your online account." }
      ]
    }
  ];
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Frequently Asked Questions",
        description: "Find answers to common questions about our self-service laundromat, wash and fold services, and laundry pickup and delivery in San Diego.",
        path: "/about-us/frequently-asked-questions"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { position: "relative", zIndex: 2, textAlign: "center" }, children: [
        /* @__PURE__ */ jsxs("h1", { className: "hero-title", children: [
          /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Frequently Asked" }),
          " Questions"
        ] }),
        /* @__PURE__ */ jsx("p", { style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0px auto", lineHeight: 1.7 }, children: "If you have questions, we have answers! Look here for the answers to your questions, and if you don't find what you are looking for, please reach out to us." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      categories.map((cat, catIdx) => /* @__PURE__ */ jsxs("div", { style: { marginBottom: "3rem" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { marginBottom: "1.5rem", paddingBottom: "0.75rem", borderBottom: "3px solid var(--color-primary)" }, children: cat.title }),
        cat.items.map((item, itemIdx) => {
          const uniqueIdx = `${catIdx}-${itemIdx}`;
          const isOpen = openIndex === uniqueIdx;
          return /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", marginBottom: "0.75rem", overflow: "hidden" }, children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => toggle(uniqueIdx),
                style: {
                  width: "100%",
                  textAlign: "left",
                  padding: "1.25rem 1.5rem",
                  background: "white",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  transition: "background 0.15s"
                },
                children: [
                  /* @__PURE__ */ jsx("span", { style: { fontWeight: 800, fontFamily: "var(--font-heading)", fontSize: "0.95rem", color: "var(--color-primary)" }, children: item.q }),
                  /* @__PURE__ */ jsx("span", { style: { color: "var(--color-primary)", flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }, children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" }) }) })
                ]
              }
            ),
            isOpen && /* @__PURE__ */ jsx("div", { style: { padding: "0 1.5rem 1.5rem", color: "var(--color-text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }, children: item.a })
          ] }, itemIdx);
        })
      ] }, catIdx)),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-primary)", color: "white", padding: "2.5rem", textAlign: "center", boxShadow: "var(--brutalist-shadow)" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { color: "white", marginBottom: "0.5rem", textAlign: "center" }, children: "Still Have Questions?" }),
        /* @__PURE__ */ jsx("p", { style: { opacity: 0.85, marginBottom: "1.5rem", textAlign: "center" }, children: "We're happy to help. Get in touch with our team." }),
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Link, { className: "btn", to: "/contact", style: { textDecoration: "none", backgroundColor: "var(--color-secondary)", color: "black" }, children: "Contact Us" }) })
      ] })
    ] }) })
  ] });
};
const Testimonials = () => {
  const reviews = [
    {
      name: "Ammar",
      initial: "A",
      text: '"Always clean. Immaculately clean! Machines, floors, and folding tables all spotless."',
      featured: true
    },
    {
      name: "David O.",
      initial: "D",
      text: '"What a great place! Their prices are quite reasonable, and the place is always clean and spotless. Staff has always been friendly, and I appreciate the extra services like spot cleaning if necessary."'
    },
    {
      name: "Roland",
      initial: "R",
      text: '"Great place and great service! Had a t-shirt with several stains and Juliet used her expertise to take them all out. Looks like a new shirt! Thank you!!"'
    },
    {
      name: "Marilyn",
      initial: "M",
      text: '"Juliet is awesome. Never stops moving. Helps all clients. Very personable yet professional. She makes the place spotless. I am here once or twice a week — she is the best!!"',
      featured: true
    },
    {
      name: "Howard",
      initial: "H",
      text: '"This visit was particularly amazing. Juliet spent at least 10 full minutes showing me how to get stubborn stains out with her spray bottles and detergents. Incredible service."'
    },
    {
      name: "Ava",
      initial: "A",
      text: `"Love Corner Wash! Dry cleaning is well-priced, I've never had an issue with the equipment and all my clothes come out fresh. The stain removal here is unmatched!"`
    }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Customer Testimonials",
        description: "Read what our happy customers have to say about Corner Wash. From our clean facilities to our expert stain removal, see why we're San Diego's favorite.",
        path: "/about-us/testimonials"
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "var(--color-primary)", color: "white", padding: "5rem 0", textAlign: "center", position: "relative", overflow: "hidden" }, children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsxs("h1", { style: { marginBottom: "1rem" }, children: [
          "What Our ",
          /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Customers Say" })
        ] }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.2rem", opacity: 0.85 }, children: "Hundreds of happy customers across San Diego trust Corner Wash every week." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { backgroundColor: "white", padding: "6rem 0", position: "relative", overflow: "hidden" }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "clamp(8rem, 20vw, 18rem)",
        fontWeight: 900,
        fontFamily: "var(--font-heading)",
        color: "rgba(0,0,0,0.03)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
        letterSpacing: "-0.05em"
      }, children: "★★★★★" }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { position: "relative", zIndex: 1 }, children: [
        /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: "4rem" }, children: [
          /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", gap: "5px", marginBottom: "1rem" }, children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("span", { style: { color: "var(--color-secondary)", fontSize: "1.5rem" }, children: "★" }, i)) }),
          /* @__PURE__ */ jsx("h2", { style: { color: "var(--color-primary)", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 900, marginBottom: "0.5rem", letterSpacing: "-0.02em" }, children: "What Our Community Says" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontWeight: 700, fontSize: 0.8, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-heading)" }, children: "Verified Google Reviews" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }, children: reviews.map((rev, i) => /* @__PURE__ */ jsxs("div", { style: {
          backgroundColor: rev.featured ? "var(--color-secondary)" : i % 2 === 0 ? "#fafafa" : "white",
          border: rev.featured ? "var(--brutalist-border)" : "var(--brutalist-border-thin)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1.5rem",
          boxShadow: rev.featured ? "var(--brutalist-shadow)" : "none"
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "3px", marginBottom: "1rem" }, children: [...Array(5)].map((_, j) => /* @__PURE__ */ jsx("span", { style: { color: "var(--color-secondary)", fontSize: "1rem" }, children: "★" }, j)) }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "1rem", lineHeight: 1.7, color: rev.featured ? "black" : "var(--color-primary)", fontWeight: 500, fontStyle: "italic" }, children: rev.text })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              width: "36px",
              height: "36px",
              borderRadius: "0px",
              backgroundColor: rev.featured ? "white" : "var(--color-primary)",
              color: rev.featured ? "var(--color-primary)" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "0.9rem",
              fontFamily: "var(--font-heading)",
              flexShrink: 0
            }, children: rev.initial }),
            /* @__PURE__ */ jsx("span", { style: {
              fontWeight: 900,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: rev.featured ? "black" : "var(--color-primary)",
              fontFamily: "var(--font-heading)"
            }, children: rev.name })
          ] })
        ] }, i)) })
      ] })
    ] })
  ] });
};
const ThankYou = ({ title = "Thank You!", message = "We've received your message and will be in touch shortly.", backTo = "/", backLabel = "Back to Home" }) => /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white", minHeight: "80vh", display: "flex", alignItems: "center" }, children: [
  /* @__PURE__ */ jsx(SEO, { title: "Thank You", description: "Thank you for contacting Corner Wash. We have received your message and will get back to you shortly.", path: "/thank-you" }),
  /* @__PURE__ */ jsx("div", { className: "container", style: { maxWidth: "600px" }, children: /* @__PURE__ */ jsxs("div", { style: {
    backgroundColor: "var(--color-bg)",
    border: "var(--brutalist-border)",
    padding: "4rem 2rem",
    textAlign: "center",
    boxShadow: "var(--brutalist-shadow)"
  }, children: [
    /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", marginBottom: "2rem" }, children: /* @__PURE__ */ jsx("div", { style: {
      backgroundColor: "var(--color-green)",
      padding: "1rem",
      borderRadius: "0",
      border: "var(--brutalist-border-thin)",
      boxShadow: "var(--brutalist-shadow-sm)",
      color: "white"
    }, children: /* @__PURE__ */ jsx(CheckCircle, { size: 48 }) }) }),
    /* @__PURE__ */ jsx("h1", { style: { marginBottom: "1.5rem", textTransform: "uppercase", color: "var(--color-primary)" }, children: title }),
    /* @__PURE__ */ jsx("p", { style: { fontSize: "1.2rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "2.5rem", fontWeight: 500 }, children: message }),
    /* @__PURE__ */ jsx(Link, { to: backTo, className: "btn", style: { textDecoration: "none" }, children: backLabel })
  ] }) })
] });
const PPCLanding = () => {
  const content = siteContent;
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(SEO, { title: "Residential Laundry Offer", description: "Claim your exclusive San Diego laundry offer. Eco-friendly ozone cleaning with fast pickup and delivery. Schedule your first order today.", path: "/ppc-landing" }),
    /* @__PURE__ */ jsxs("div", { style: {
      backgroundColor: "var(--color-bg)",
      color: "var(--color-primary)",
      padding: "6rem 0",
      textAlign: "center",
      borderBottom: "var(--brutalist-border)",
      position: "relative",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
      /* @__PURE__ */ jsxs("div", { className: "container", style: { position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          backgroundColor: "var(--color-secondary)",
          color: "black",
          fontWeight: 900,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          padding: "0.5rem 1.5rem",
          border: "2px solid black",
          boxShadow: "4px 4px 0px black",
          marginBottom: "2.5rem"
        }, children: "Exclusive Residential Offer" }),
        /* @__PURE__ */ jsxs("h1", { className: "hero-title", style: { fontSize: "clamp(2.5rem, 8vw, 4.5rem)", lineHeight: 1, marginBottom: "1.5rem" }, children: [
          "San Diego's Best ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "#04D1FF" }, children: "Pickup & Delivery" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "p-lg", style: { marginBottom: "3rem", maxWidth: "700px", margin: "0 auto 3rem" }, children: "Laundry day just became the best day of the week. Sign up today and get your first load handled with our hospital-grade Ozone system." }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsx("a", { href: content.brand.scheduleUrl, target: "_blank", rel: "noopener noreferrer", className: "btn", style: { textDecoration: "none" }, children: "Schedule First Pickup" }),
          /* @__PURE__ */ jsx("a", { href: "tel:6192846741", className: "btn", style: {
            textDecoration: "none",
            backgroundColor: "white",
            color: "var(--color-primary)",
            border: "var(--brutalist-border)"
          }, children: "Call (619) 284-6741" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section", style: { backgroundColor: "white" }, children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }, children: [
      { icon: /* @__PURE__ */ jsx(Truck, { size: 32 }), title: "Door-to-Door", desc: "We pick up from your home and deliver back fresh within 24 hours." },
      { icon: /* @__PURE__ */ jsx(Sparkles, { size: 32 }), title: "Ozone Sanitized", desc: "Every wash is treated with Ozone to kill 99.9% of bacteria and viruses." },
      { icon: /* @__PURE__ */ jsx(Bell, { size: 32 }), title: "Text Alerts", desc: "Real-time updates so you know exactly when your laundry is on its way." }
    ].map((feature, i) => /* @__PURE__ */ jsxs("div", { style: { border: "var(--brutalist-border-thin)", padding: "2.5rem", backgroundColor: "white", boxShadow: "var(--brutalist-shadow-sm)", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("div", { style: { color: "var(--color-secondary)", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }, children: feature.icon }),
      /* @__PURE__ */ jsx("h3", { style: { marginBottom: "1rem", textTransform: "uppercase" }, children: feature.title }),
      /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", lineHeight: 1.6 }, children: feature.desc })
    ] }, i)) }) }) })
  ] });
};
const NotFound = () => {
  return /* @__PURE__ */ jsxs("div", { style: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-bg)",
    position: "relative",
    overflow: "hidden",
    padding: "2rem"
  }, children: [
    /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
    /* @__PURE__ */ jsxs("div", { style: {
      maxWidth: "600px",
      width: "100%",
      textAlign: "center",
      backgroundColor: "white",
      border: "var(--brutalist-border)",
      padding: "4rem 2rem",
      boxShadow: "var(--brutalist-shadow)",
      position: "relative",
      zIndex: 2
    }, children: [
      /* @__PURE__ */ jsx("h1", { style: {
        fontSize: "clamp(4rem, 15vw, 8rem)",
        lineHeight: "0.8",
        marginBottom: "1.5rem",
        color: "var(--color-primary)",
        fontFamily: "var(--font-heading)",
        fontWeight: 900,
        textTransform: "uppercase"
      }, children: "404" }),
      /* @__PURE__ */ jsx("div", { style: {
        backgroundColor: "var(--color-funky-yellow)",
        padding: "0.5rem 1.5rem",
        display: "inline-block",
        border: "var(--brutalist-border-thin)",
        transform: "rotate(-2deg)",
        marginBottom: "2rem"
      }, children: /* @__PURE__ */ jsx("h2", { style: {
        fontSize: "1.5rem",
        margin: 0,
        textTransform: "uppercase",
        fontWeight: 900
      }, children: "Laundry Lost!" }) }),
      /* @__PURE__ */ jsx("p", { style: {
        fontSize: "1.1rem",
        color: "var(--color-text-muted)",
        marginBottom: "2.5rem",
        fontWeight: 600,
        lineHeight: 1.5
      }, children: "Looks like this page got stuck in the spin cycle. We couldn't find what you were looking for." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "btn", style: { textDecoration: "none", display: "inline-block" }, children: "Back to Clean Clothes" })
    ] })
  ] });
};
const Marquee = ({
  messages,
  backgroundColor = "var(--color-primary)",
  color = "white",
  speed = 120,
  fontSize = "0.75rem"
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "marquee-container",
      style: {
        width: "100%",
        backgroundColor: backgroundColor || "#04D1FF",
        color: color || "black",
        padding: "0.45rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "0.75rem",
        fontWeight: 800,
        fontFamily: "var(--font-heading)",
        letterSpacing: "0.18em",
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsx("style", { children: `
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: inline-flex;
          animation: marquee-scroll ${speed}s linear infinite;
        }
        .marquee-container:hover .marquee-inner {
          animation-play-state: paused;
          cursor: pointer;
        }
      ` }),
        /* @__PURE__ */ jsx("div", { className: "marquee-inner", children: [0, 1].map((copy) => /* @__PURE__ */ jsx("div", { style: { display: "flex" }, children: messages.map((text, i) => /* @__PURE__ */ jsxs("span", { style: { paddingRight: "2rem", display: "flex", alignItems: "center" }, children: [
          text,
          /* @__PURE__ */ jsx("span", { style: { marginLeft: "2rem", opacity: 0.4 }, children: "•" })
        ] }, i)) }, copy)) })
      ]
    }
  );
};
const FloatingCTA = () => {
  const content = siteContent;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsxs(
    motion.a,
    {
      href: content.brand.scheduleUrl || "#",
      target: "_blank",
      rel: "noopener noreferrer",
      initial: { opacity: 0, scale: 0.8, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      whileHover: {
        scale: 1.05,
        rotate: -2,
        x: -5,
        y: -5,
        boxShadow: "12px 12px 0px #000"
      },
      whileTap: { scale: 0.95 },
      style: {
        position: "fixed",
        bottom: "clamp(1rem, 4vw, 2.5rem)",
        right: "clamp(1rem, 4vw, 2.5rem)",
        backgroundColor: "var(--color-funky-yellow)",
        color: "black",
        padding: "clamp(0.75rem, 3vw, 1.25rem) clamp(1.25rem, 5vw, 2.5rem)",
        fontSize: "clamp(0.75rem, 2.5vw, 1.0rem)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        display: "flex",
        alignItems: "center",
        gap: "clamp(0.5rem, 2vw, 1.25rem)",
        boxShadow: "8px 8px 0px #000",
        textDecoration: "none",
        border: "3px solid black",
        zIndex: 1e3,
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ jsx(Truck, { size: 24, color: "black" }),
        content.home.hero.cta
      ]
    }
  ) });
};
const SpreadTheSuds = () => {
  return /* @__PURE__ */ jsxs("section", { className: "reveal", style: { backgroundColor: "var(--color-funky-yellow)", padding: "5rem 0", borderTop: "var(--brutalist-border)", position: "relative", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsx(Bubbles, { isGlobal: false }),
    /* @__PURE__ */ jsx("div", { className: "container", style: { position: "relative", zIndex: 2 }, children: /* @__PURE__ */ jsxs("div", { style: {
      maxWidth: "650px",
      margin: "0 auto",
      backgroundColor: "white",
      border: "var(--brutalist-border)",
      padding: "2.5rem 1.5rem",
      textAlign: "center",
      boxShadow: "var(--brutalist-shadow-sm)"
    }, children: [
      /* @__PURE__ */ jsx("h2", { style: {
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        fontWeight: 900,
        color: "black",
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
        marginBottom: "1rem"
      }, children: "Spread the Suds! 🫧" }),
      /* @__PURE__ */ jsxs("p", { style: {
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "black",
        maxWidth: "500px",
        margin: "0 auto 2.5rem",
        lineHeight: 1.4
      }, children: [
        "Give your friends ",
        /* @__PURE__ */ jsx("span", { style: { backgroundColor: "var(--color-funky-yellow)", color: "black", padding: "0 0.5rem" }, children: "10% OFF" }),
        " their first wash and let them experience hospital-grade Ozone clean."
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `https://wa.me/?text=${encodeURIComponent("Hey! You gotta check out Corner Wash. They have hospital-grade Ozone laundry and you get 10% off your first delivery! https://www.cornerwashlaundry.com")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "white",
              color: "black",
              padding: "0.75rem 1.25rem",
              fontSize: "0.85rem",
              fontWeight: 900,
              textTransform: "uppercase",
              border: "2px solid black",
              boxShadow: "4px 4px 0px black",
              textDecoration: "none",
              transition: "0.1s"
            },
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
              "WhatsApp"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `sms:?body=${encodeURIComponent("Hey! You gotta check out Corner Wash. They have hospital-grade Ozone laundry and you get 10% off your first delivery! https://www.cornerwashlaundry.com")}`,
            style: {
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "white",
              color: "black",
              padding: "0.75rem 1.25rem",
              fontSize: "0.85rem",
              fontWeight: 900,
              textTransform: "uppercase",
              border: "2px solid black",
              boxShadow: "4px 4px 0px black",
              textDecoration: "none",
              transition: "0.1s"
            },
            children: [
              /* @__PURE__ */ jsx(Smartphone, { size: 20 }),
              "Text"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              navigator.clipboard.writeText("Hey! You gotta check out Corner Wash. They have hospital-grade Ozone laundry and you get 10% off your first delivery! https://www.cornerwashlaundry.com");
              const btn = document.getElementById("copy-link-btn");
              const originalText = btn.innerHTML;
              btn.innerHTML = "<span>Copied! 🎉</span>";
              setTimeout(() => {
                btn.innerHTML = originalText;
              }, 2e3);
            },
            id: "copy-link-btn",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "black",
              color: "white",
              padding: "0.75rem 1.25rem",
              fontSize: "0.85rem",
              fontWeight: 900,
              textTransform: "uppercase",
              border: "2px solid black",
              boxShadow: "4px 4px 0px var(--color-primary)",
              cursor: "pointer",
              transition: "0.1s"
            },
            children: [
              /* @__PURE__ */ jsx(Copy, { size: 18 }),
              "Copy"
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
function AppSSR({ url }) {
  const content = siteContent;
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsxs(StaticRouter, { location: url, children: [
    /* @__PURE__ */ jsx(
      Marquee,
      {
        backgroundColor: "#04D1FF",
        color: "black",
        speed: 40,
        messages: content.marquee
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { style: { minHeight: "80vh", position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, { onOpenReminder: () => {
      } }) }),
      /* @__PURE__ */ jsx(Route, { path: "/wash-and-fold", element: /* @__PURE__ */ jsx(WashFold, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/pickup-and-delivery", element: /* @__PURE__ */ jsx(PickupDelivery, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/dry-cleaning", element: /* @__PURE__ */ jsx(DryCleaning, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/ozone-laundry", element: /* @__PURE__ */ jsx(OzoneLaundry, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/pricing", element: /* @__PURE__ */ jsx(Pricing, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/service-areas", element: /* @__PURE__ */ jsx(ServiceAreas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/service-areas/:slug", element: /* @__PURE__ */ jsx(AreaDetail, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about-us", element: /* @__PURE__ */ jsx(AboutUs, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about-us/testimonials", element: /* @__PURE__ */ jsx(Testimonials, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about-us/frequently-asked-questions", element: /* @__PURE__ */ jsx(FAQ, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/location", element: /* @__PURE__ */ jsx(LocationPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/self-service-laundry", element: /* @__PURE__ */ jsx(SelfServiceLaundry, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/commercial-laundry", element: /* @__PURE__ */ jsx(CommercialLaundry, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/commercial-laundry/commercial-towel-laundry-service", element: /* @__PURE__ */ jsx(CommercialTowel, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/commercial-laundry/linen-cleaning-service-in-san-diego", element: /* @__PURE__ */ jsx(CommercialLinen, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/terms-of-use", element: /* @__PURE__ */ jsx(TermsOfUse, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/thank-you", element: /* @__PURE__ */ jsx(ThankYou, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/ppc-landing", element: /* @__PURE__ */ jsx(PPCLanding, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(SpreadTheSuds, {}),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingCTA, {})
  ] }) });
}
function render(url) {
  const html = renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(AppSSR, { url }) })
  );
  return { html };
}
export {
  render
};
