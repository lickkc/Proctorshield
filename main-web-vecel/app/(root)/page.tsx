import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "Guard AI - Advanced Security Solutions",
  description: "Guard AI offers cutting-edge AI-powered security for a safer future.",
  openGraph: {
    type: "website",
    url: "https://github.com/Hiteshydv001/Guard-AI.git",
    title: "Guard AI - Advanced Security Solutions",
    description: "Guard AI offers cutting-edge AI-powered security for a safer future.",
    images: [
      {
        url: "https://github.com/Hiteshydv001/Guard-AI/raw/main/demo/guard_eye_logo.png",
        width: 1200,
        height: 630,
        alt: "Guard AI - Advanced Security Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/Hiteshydv001/Guard-AI.git",
    title: "Guard AI - Advanced Security Solutions",
    description: "Guard AI offers cutting-edge AI-powered security for a safer future.",
    images: [
      "https://github.com/Hiteshydv001/Guard-AI/raw/main/demo/guard_eye_logo.png",
    ],
  },
};

async function getAnimations() {
  const animationDataPaths = [
    { path: "/s1.json", text: "Intelligent Proctoring Solutions" },
    { path: "/s2.json", text: "Real-time Monitoring & Analysis" },
    { path: "/security-dark.json", text: "Advanced Security Measures" },
  ];

  const data = await Promise.all(
    animationDataPaths.map(async (item) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${item.path}`, {
          cache: 'force-cache',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const animation = await response.json();
        return { animation, text: item.text };
      } catch (error) {
        console.error(`Error loading animation ${item.path}:`, error);
        throw error;
      }
    })
  );
  return data;
}

export default async function Home() {
  const animations = await getAnimations();
  return (
    <>
      <HeroSection initialAnimations={animations} />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
