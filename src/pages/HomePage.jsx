import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RollText, RollLink } from '../components/RollLink';
import { SplineHero } from '../components/SplineHero';
import { featuredProjects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import quickAccessMangrovesImg from '../assets/quick-access-mangroves.png';
import app01Avatar from '../assets/edp-thumbs/app-01-avatar.jpg';
import app02Chatbot from '../assets/edp-thumbs/app-02-chatbot.jpg';
import app03Enviroportal from '../assets/edp-thumbs/app-03-enviroportal.png';
import app04AirQualityPortal from '../assets/edp-thumbs/app-04-air-quality-portal.jpg';
import app05AbuDhabiNature from '../assets/edp-thumbs/app-05-abu-dhabi-nature.jpg';
import cat01Ecosystem from '../assets/edp-thumbs/cat-01-ecosystem.jpg';
import cat02Groundwater from '../assets/edp-thumbs/cat-02-groundwater.png';
import cat03Soil from '../assets/edp-thumbs/cat-03-soil.png';
import cat04WasteManagement from '../assets/edp-thumbs/cat-04-waste-management.png';
import about01EnvironmentalData from '../assets/about-01-environmental-data.jpg';
import about02GeospatialIntelligence from '../assets/about-02-geospatial-intelligence.jpg';
import about03DigitalApplications from '../assets/about-03-digital-applications.jpg';
import aboutPlatformBg from '../assets/about-platform-bg.png';
import datasetsCardBg from '../assets/datasets-card-bg.png';
import cat3d01Ecosystem from '../assets/cat-3d-01-ecosystem.png';
import cat3d02Groundwater from '../assets/cat-3d-02-groundwater.png';
import cat3d03Soil from '../assets/cat-3d-03-soil.png';
import cat3d04WasteManagement from '../assets/cat-3d-04-waste-management.png';

gsap.registerPlugin(ScrollTrigger);

const QUICK_ACCESS_APPS = [
  { name: 'Avatar', image: app01Avatar },
  { name: 'Chatbot', image: app02Chatbot },
  { name: 'Enviroportal', image: app03Enviroportal },
  { name: 'Air Quality Portal', image: app04AirQualityPortal }
];

const QUICK_ACCESS_LINKS = [
  { title: 'Explore Applications', subtitle: "Explore EAD's digital environmental applications", to: '/work' },
  { title: 'Browse Data Catalogue', subtitle: 'Discover and access environmental datasets', to: '/work/index' },
  { title: 'Environmental Insights', subtitle: 'Explore maps and analytics', to: '/about' },
  { title: 'Latest Datasets', subtitle: 'Access recently updated environmental data', to: '/work/index' },
  { title: 'News & Updates', subtitle: 'Discover environmental news and platform updates', to: '/contact' }
];

const FEATURED_APPLICATIONS = [
  {
    id: 'enviroportal',
    icon: 'portal',
    category: 'Environmental Portal',
    title: 'Enviroportal',
    description:
      "Explore environmental information and resources through EAD's Enviroportal.",
    image: app03Enviroportal,
    to: '/work'
  },
  {
    id: 'avatar',
    icon: 'assistant',
    category: 'AI Assistant',
    title: 'Avatar',
    description:
      'An AI-powered digital avatar designed to enhance environmental information access and user interaction.',
    image: app01Avatar,
    to: '/work'
  },
  {
    id: 'air-quality',
    icon: 'air',
    category: 'Air Quality',
    title: 'Air Quality Portal',
    description:
      'Explore real-time air quality information and monitoring insights across Abu Dhabi.',
    image: app04AirQualityPortal,
    to: '/work'
  },
  {
    id: 'abu-dhabi-nature',
    icon: 'biodiversity',
    category: 'Biodiversity',
    title: 'Abu Dhabi Nature',
    description:
      "Discover Abu Dhabi's biodiversity, natural environments, and wildlife information.",
    image: app05AbuDhabiNature,
    to: '/work'
  },
  {
    id: 'chatbot',
    icon: 'chatbot',
    category: 'AI Tool',
    title: 'Chatbot',
    description:
      'An AI-powered chatbot supporting access to environmental information through conversational assistance.',
    image: app02Chatbot,
    to: '/work'
  }
];

const renderAppCategoryIcon = (type) => {
  switch (type) {
    case 'portal':
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M2.5 17H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="4" y="9.5" width="2.5" height="5.5" rx="0.6" fill="currentColor" />
          <rect x="8" y="11.5" width="2.5" height="3.5" rx="0.6" fill="currentColor" />
          <rect x="12" y="12.5" width="2.5" height="2.5" rx="0.6" fill="currentColor" />
          <path d="M3.5 4.2H8.5M3.5 6.6H6.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 3.2A4.2 4.2 0 1 0 17.2 7.4H13V3.2Z" fill="currentColor" />
          <path d="M14.4 2.5A3.8 3.8 0 0 1 17.9 6H14.4V2.5Z" fill="currentColor" opacity="0.75" />
        </svg>
      );
    case 'assistant':
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M9.5 2.5L11.1 7.4L16 9L11.1 10.6L9.5 15.5L7.9 10.6L3 9L7.9 7.4L9.5 2.5Z" fill="currentColor" />
          <path d="M15.5 13L16.3 15.2L18.5 16L16.3 16.8L15.5 19L14.7 16.8L12.5 16L14.7 15.2L15.5 13Z" fill="currentColor" />
        </svg>
      );
    case 'air':
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M6.2 14.5H14.2C16.1 14.5 17.5 13.1 17.5 11.3C17.5 9.6 16.2 8.2 14.5 8.1C13.9 5.7 11.8 4 9.2 4C6.2 4 3.8 6.4 3.8 9.4C2.7 9.8 2 10.9 2 12.1C2 13.5 3.2 14.5 4.6 14.5H6.2Z" fill="currentColor" />
        </svg>
      );
    case 'biodiversity':
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M16.5 3.5C10.5 3.5 5 6.8 4.2 12.6C4 14 4.6 15.3 5.5 16.1C9.5 12.5 11.8 9.8 13.5 7.5C12.2 10.5 9.8 13.4 6.8 16.5C12.4 16.2 16.5 11.4 16.5 3.5Z" fill="currentColor" />
          <path d="M3.5 17L6.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="14" height="11.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 7H13.5M6.5 10H10.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7 14.5L5 17.2V14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};

const renderCategoryChipIcon = (type) => {
  switch (type) {
    case 'ecosystems':
      return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 17V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10 12C6.5 12 4 9.5 4 6C7.5 6 10 8.5 10 12Z" fill="currentColor" />
          <path d="M10 10C10 6.8 12.6 4.2 16 4.2C16 7.6 13.4 10 10 10Z" fill="currentColor" opacity="0.85" />
          <path d="M6.5 17H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'water':
      return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 3.2C10 3.2 5.2 8.6 5.2 12C5.2 14.6 7.3 16.8 10 16.8C12.7 16.8 14.8 14.6 14.8 12C14.8 8.6 10 3.2 10 3.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M7.8 12.5C8 13.8 9 14.6 10.3 14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'soil':
      return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 8.5H17M3 12.5H17" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6.5" cy="6.3" r="0.8" fill="currentColor" />
          <circle cx="11.5" cy="10.5" r="0.8" fill="currentColor" />
          <circle cx="8.5" cy="14.3" r="0.8" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M6 6H14L13.2 16.2C13.1 17 12.5 17.5 11.7 17.5H8.3C7.5 17.5 6.9 17 6.8 16.2L6 6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M4.5 6H15.5M8 6V4.2C8 3.8 8.3 3.5 8.7 3.5H11.3C11.7 3.5 12 3.8 12 4.2V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.8 9.5V14M11.2 9.5V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
  }
};

const DATASET_TABS = [
  {
    id: 'all',
    label: 'All Datasets',
    chip: 'Environmental Data',
    statValue: '8',
    statTitle: 'Environmental Categories',
    statSubtitle: 'Available across the catalogue',
    heading: 'Explore Data. Understand Our Environment.',
    description:
      'Access a diverse collection of environmental datasets covering natural resources, ecosystems and environmental conditions. Discover meaningful information through connected data resources.',
    bullets: [
      'Explore data across environmental domains',
      'Access valuable spatial and tabular information',
      'Discover data for research and informed decisions'
    ],
    image: quickAccessMangrovesImg,
    imageAlt: 'Aerial view of coastal mangrove ecosystems'
  },
  {
    id: 'featured',
    label: 'Featured',
    chip: 'Featured Datasets',
    statValue: '24+',
    statTitle: 'Curated Records',
    statSubtitle: 'High-impact environmental insights',
    heading: 'Key Indicators. Clear Environmental Intelligence.',
    description:
      'Discover flagship datasets curated by EAD specialists to highlight priority habitats, water resources, and air quality baselines across Abu Dhabi.',
    bullets: [
      'Verified baseline environmental datasets',
      'High-resolution GIS layers and structured tables',
      'Ready for policy planning and scientific analysis'
    ],
    image: about01EnvironmentalData,
    imageAlt: 'Featured Abu Dhabi environmental monitoring'
  },
  {
    id: 'recent',
    label: 'Recently Added',
    chip: 'Latest Releases',
    statValue: '12',
    statTitle: 'Recent Updates',
    statSubtitle: 'Newly published data collections',
    heading: 'Fresh Observations. Up-to-Date Records.',
    description:
      'Stay current with newly ingested field surveys, satellite-derived indices, and telemetry feeds published across our environmental monitoring network.',
    bullets: [
      'Continuously updated monitoring records',
      'Latest seasonal biodiversity and water surveys',
      'Direct links to interactive catalogue views'
    ],
    image: about02GeospatialIntelligence,
    imageAlt: 'Recently updated geospatial environmental datasets'
  },
  {
    id: 'popular',
    label: 'Popular',
    chip: 'Most Accessed',
    statValue: '18+',
    statTitle: 'Top Resources',
    statSubtitle: 'Widely used by researchers & planners',
    heading: 'Trusted Data. Proven Utility.',
    description:
      'Explore the most frequently accessed environmental datasets supporting academic research, coastal management, and sustainable urban development.',
    bullets: [
      'Most-downloaded spatial and tabular resources',
      'Standardized metadata and clear documentation',
      'Cross-domain datasets for integrated studies'
    ],
    image: about03DigitalApplications,
    imageAlt: 'Popular environmental datasets and analytics'
  }
];

const ABOUT_PLATFORM_PANELS = [
  {
    index: '01',
    title: 'Environmental Data',
    description:
      'Access, discover, and understand environmental datasets covering biodiversity, air quality, water resources, land, & more.',
    image: about01EnvironmentalData,
    to: '/work/index'
  },
  {
    index: '02',
    title: 'Geospatial Intelligence',
    description:
      "Explore interactive maps, satellite monitoring, and spatial analytics across Abu Dhabi's coastal, marine, and terrestrial environments.",
    image: about02GeospatialIntelligence,
    to: '/about'
  },
  {
    index: '03',
    title: 'Digital Applications',
    description:
      'Engage with specialized environmental portals, AI assistants, and monitoring tools built for researchers, policymakers, and the public.',
    image: about03DigitalApplications,
    to: '/work'
  }
];

const STORY_EXPERIENCE_PILLARS = [
  {
    id: 'ecosystem',
    index: '01',
    side: 'right',
    chip: 'Ecosystems',
    icon: 'ecosystems',
    image: cat01Ecosystem,
    titleBefore: '',
    titleItalic: 'Ecosystem',
    titleAfter: '',
    description:
      'Explore diverse ecosystems, natural habitats and ecological relationships. Discover environmental data that helps understand and protect the balance of nature.',
    to: '/work/index'
  },
  {
    id: 'groundwater',
    index: '02',
    side: 'left',
    chip: 'Water',
    icon: 'water',
    image: cat02Groundwater,
    titleBefore: '',
    titleItalic: 'Groundwater',
    titleAfter: '',
    description:
      'Discover groundwater resources, underground water availability and quality. Explore valuable information to understand water conditions and support sustainable resource management.',
    to: '/work/index'
  },
  {
    id: 'soil',
    index: '03',
    side: 'right',
    chip: 'Land & Soil',
    icon: 'soil',
    image: cat03Soil,
    titleBefore: '',
    titleItalic: 'Soil',
    titleAfter: '',
    description:
      'Explore soil composition, characteristics, quality and distribution. Access valuable information to understand soil conditions, land resources and environmental changes.',
    to: '/work/index'
  },
  {
    id: 'waste-management',
    index: '04',
    side: 'left',
    textRight: true,
    chip: 'Waste & Recycling',
    icon: 'waste',
    image: cat04WasteManagement,
    titleBefore: 'Waste ',
    titleItalic: 'Management',
    titleAfter: '',
    description:
      'Waste management involves the collection, treatment and disposal of waste. It promotes recycling, resource recovery and a cleaner, sustainable environment.',
    to: '/work/index'
  }
];

export const HomePage = () => {
  const { lang, getPath, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [activeDatasetTab, setActiveDatasetTab] = useState(0);
  const [isDatasetsPaused, setIsDatasetsPaused] = useState(false);
  const [activePlatformPanel, setActivePlatformPanel] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : -1
  );

  // Animation Refs
  const pageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const quickAccessSectionRef = useRef(null);
  const quickAccessLeftRef = useRef(null);
  const quickAccessImageRef = useRef(null);
  const quickAccessRightRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const servicesHeaderRef = useRef(null);
  const servicesTabsRef = useRef(null);
  const servicesContentRef = useRef(null);
  const storyExperienceSectionRef = useRef(null);
  const storyExperienceHeaderRef = useRef(null);
  const koraChangeSectionRef = useRef(null);
  const datasetsSectionRef = useRef(null);
  const datasetsContentRef = useRef(null);

  const currentTab = t.services.tabs[activeTab];

  // GSAP ScrollTrigger Lifecycle
  useEffect(() => {
    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Content Parallax Scrub
      if (heroSectionRef.current && heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          y: -70,
          opacity: 0.15,
          scale: 0.98,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom 20%',
            scrub: 0.6
          }
        });
      }

      // 2. Quick Access Section Entrance & Subtle Parallax
      if (quickAccessSectionRef.current) {
        const qaTl = gsap.timeline({
          scrollTrigger: {
            trigger: quickAccessSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        if (quickAccessLeftRef.current) {
          qaTl.fromTo(
            quickAccessLeftRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
          );
        }

        if (quickAccessImageRef.current) {
          qaTl.fromTo(
            quickAccessImageRef.current,
            { opacity: 0, y: 32, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
            '-=0.7'
          );

          gsap.to(quickAccessImageRef.current, {
            y: -24,
            ease: 'none',
            scrollTrigger: {
              trigger: quickAccessSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          });
        }

        if (quickAccessRightRef.current) {
          qaTl.fromTo(
            quickAccessRightRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            '-=0.8'
          );
        }
      }

      // 4. FormaStudio Services Section Entrance & Card Image Parallax
      if (servicesSectionRef.current) {
        if (servicesHeaderRef.current) {
          gsap.fromTo(
            servicesHeaderRef.current,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: servicesSectionRef.current,
                start: 'top 82%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        const stackItems = gsap.utils.toArray('.featured-app-stack-item', servicesSectionRef.current);
        stackItems.forEach((item, idx) => {
          const card = item.querySelector('.forma-service-card');
          if (!card) return;

          // Subtle entrance for each card
          gsap.fromTo(
            card,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          // Sticky scale-down + recede animation as the next card stacks over it (matching Recent Work)
          const nextItem = stackItems[idx + 1];
          if (nextItem && window.innerWidth > 960) {
            gsap.fromTo(
              card,
              { scale: 1, y: 0, filter: 'brightness(1)' },
              {
                scale: 0.88,
                y: 20,
                filter: 'brightness(0.58)',
                ease: 'none',
                scrollTrigger: {
                  trigger: nextItem,
                  start: 'top 88%',
                  end: 'top 18%',
                  scrub: true,
                  invalidateOnRefresh: true
                }
              }
            );
          }

          const img = card.querySelector('.forma-service-img');
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -5, scale: 1.08 },
              {
                yPercent: 5,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true
                }
              }
            );
          }
        });
      }

      // 4a. Explore Catalogue Natural Vertical Scroll-Driven Storytelling
      if (storyExperienceSectionRef.current) {
        const headerEl = storyExperienceHeaderRef.current;
        const rows = gsap.utils.toArray('.story-heart-row', storyExperienceSectionRef.current);
        const orbitOuter = storyExperienceSectionRef.current.querySelector('.story-heart-orbit');
        const orbitInner = storyExperienceSectionRef.current.querySelector('.story-heart-orbit-inner');

        if (headerEl) {
          gsap.fromTo(
            headerEl,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerEl,
                start: 'top 86%',
                once: true
              }
            }
          );
        }

        if (orbitOuter) {
          gsap.to(orbitOuter, {
            y: -70,
            rotation: 24,
            ease: 'none',
            scrollTrigger: {
              trigger: storyExperienceSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }

        if (orbitInner) {
          gsap.to(orbitInner, {
            y: 60,
            rotation: -32,
            ease: 'none',
            scrollTrigger: {
              trigger: storyExperienceSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }

        const mm = gsap.matchMedia();

        mm.add('(min-width: 900px)', () => {
          const isTablet = window.innerWidth < 1120;
          const enterY = isTablet ? 48 : 72;
          const exitY = isTablet ? -24 : -38;
          const centerLayers = gsap.utils.toArray('.story-heart-3d-layer', storyExperienceSectionRef.current);
          const centerSpins = gsap.utils.toArray('.story-heart-3d-spin', storyExperienceSectionRef.current);
          const centerHalo = storyExperienceSectionRef.current.querySelector('.story-heart-3d-halo');
          const journeyEl = storyExperienceSectionRef.current.querySelector('.story-heart-journey');

          // Scroll-linked upright 3D tilt & turntable swing on the center diorama & orbital halo
          if (journeyEl && centerSpins.length > 0) {
            const spinTl = gsap.timeline({
              scrollTrigger: {
                trigger: journeyEl,
                start: 'top 72%',
                end: 'bottom 28%',
                scrub: 0.65
              }
            });

            spinTl
              .fromTo(
                centerSpins,
                { rotateY: -24, rotateX: 8, rotateZ: -5, scale: 0.96 },
                { rotateY: 24, rotateX: -6, rotateZ: 5, scale: 1.05, duration: 0.34, ease: 'sine.inOut' }
              )
              .to(centerSpins, {
                rotateY: -22,
                rotateX: 7,
                rotateZ: -4,
                scale: 0.99,
                duration: 0.33,
                ease: 'sine.inOut'
              })
              .to(centerSpins, {
                rotateY: 24,
                rotateX: -5,
                rotateZ: 4,
                scale: 1.04,
                duration: 0.33,
                ease: 'sine.inOut'
              });

            if (centerHalo) {
              gsap.fromTo(
                centerHalo,
                { rotation: 0 },
                {
                  rotation: 360,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: journeyEl,
                    start: 'top 72%',
                    end: 'bottom 28%',
                    scrub: 0.65
                  }
                }
              );
            }
          }

          const activateCenterLayer = (activeIdx) => {
            centerLayers.forEach((layer, i) => {
              const isRight = STORY_EXPERIENCE_PILLARS[i]?.side === 'right';
              if (i === activeIdx) {
                gsap.fromTo(
                  layer,
                  {
                    opacity: 0,
                    scale: 0.88,
                    rotateY: isRight ? -28 : 28,
                    rotateX: 6,
                    filter: 'blur(4px)'
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotateY: 0,
                    rotateX: 2,
                    filter: 'blur(0px)',
                    duration: 0.68,
                    ease: 'power3.out',
                    overwrite: 'auto'
                  }
                );
              } else {
                gsap.to(layer, {
                  opacity: 0,
                  scale: 0.88,
                  y: i < activeIdx ? -20 : 20,
                  rotateY: i < activeIdx ? -28 : 28,
                  filter: 'blur(6px)',
                  duration: 0.45,
                  ease: 'power2.inOut',
                  overwrite: 'auto'
                });
              }
            });
          };

          centerLayers.forEach((layer, i) => {
            const isRight = STORY_EXPERIENCE_PILLARS[i]?.side === 'right';
            gsap.set(layer, {
              opacity: i === 0 ? 1 : 0,
              scale: i === 0 ? 1 : 0.88,
              y: i === 0 ? 0 : 20,
              rotateY: i === 0 ? 0 : isRight ? -28 : 28,
              rotateX: 2,
              filter: i === 0 ? 'blur(0px)' : 'blur(6px)'
            });
          });

          rows.forEach((row, idx) => {
            const textCol = row.querySelector('.story-heart-text-col');
            const rule = row.querySelector('.story-heart-rule');

            if (textCol) {
              gsap.set(textCol, {
                y: enterY,
                opacity: 0.25,
                scale: 0.96,
                filter: 'blur(9px)'
              });
            }
            if (rule) {
              gsap.set(rule, { scaleX: 0, opacity: 0.3 });
            }

            // Swap the single center 3D diorama only when this row reaches the center focal band
            ScrollTrigger.create({
              trigger: row,
              start: 'top 46%',
              end: 'bottom 46%',
              onEnter: () => activateCenterLayer(idx),
              onEnterBack: () => activateCenterLayer(idx)
            });

            const rowTl = gsap.timeline({
              scrollTrigger: {
                trigger: row,
                start: 'top 95%',
                end: 'bottom 5%',
                scrub: 0.75
              }
            });

            if (textCol) {
              rowTl.to(
                textCol,
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 0.34,
                  ease: 'power2.out'
                },
                0
              );
            }
            if (rule) {
              rowTl.to(
                rule,
                {
                  scaleX: 1,
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.out'
                },
                0.05
              );
            }

            if (textCol) {
              rowTl.to(
                textCol,
                {
                  y: exitY,
                  opacity: 0.28,
                  scale: 0.96,
                  filter: 'blur(9px)',
                  duration: 0.34,
                  ease: 'power1.in'
                },
                0.66
              );
            }
          });
        });

        mm.add('(max-width: 899px)', () => {
          rows.forEach((row) => {
            const visual = row.querySelector('.story-heart-mobile-visual');
            const textCol = row.querySelector('.story-heart-text-col');
            const rule = row.querySelector('.story-heart-rule');

            if (visual) {
              gsap.fromTo(
                visual,
                { opacity: 0, y: 36, scale: 0.96 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top 88%',
                    once: true
                  }
                }
              );
            }
            if (textCol) {
              gsap.fromTo(
                textCol,
                { opacity: 0, y: 26 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top 84%',
                    once: true
                  }
                }
              );
            }
            if (rule) {
              gsap.fromTo(
                rule,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  duration: 0.65,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top 84%',
                    once: true
                  }
                }
              );
            }
          });
        });
      }

      // 4A-2. Kora-Style "About the Platform" Scroll-Driven Split Headline & 3-Panel Expanding Accordion
      if (koraChangeSectionRef.current) {
        const isSmallViewport = window.innerWidth < 768;
        const centerSticky = storyExperienceSectionRef.current?.querySelector('.story-heart-center-sticky');

        // Smoothly glide floating 3D Catalogue visuals upward & fade as About the Platform enters
        if (centerSticky) {
          gsap.fromTo(
            centerSticky,
            { y: 0, opacity: 1 },
            {
              y: isSmallViewport ? -45 : -88,
              opacity: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: koraChangeSectionRef.current,
                start: 'top 95%',
                end: 'top 32%',
                scrub: 0.65
              }
            }
          );
        }

        const mmKora = gsap.matchMedia();
        mmKora.add('(min-width: 900px)', () => {
          const line1 = koraChangeSectionRef.current.querySelector('.kora-change-line-1');
          const line2 = koraChangeSectionRef.current.querySelector('.kora-change-line-2');
          const metaItems = koraChangeSectionRef.current.querySelectorAll('.kora-change-meta');
          const accordionWrap = koraChangeSectionRef.current.querySelector('.kora-accordion-wrap');

          if (line1 && line2 && accordionWrap) {
            gsap.set(accordionWrap, { y: 56, scale: 0.74, opacity: 0 });

            const koraTl = gsap.timeline({
              scrollTrigger: {
                trigger: koraChangeSectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.65
              }
            });

            // Split headline curtains apart while the 3-panel interactive accordion scales into the center
            koraTl
              .to(metaItems, { opacity: 0, y: -16, duration: 0.25, ease: 'power2.out' }, 0)
              .to(line1, { xPercent: -95, opacity: 0, duration: 0.42, ease: 'power2.inOut' }, 0)
              .to(line2, { xPercent: 95, opacity: 0, duration: 0.42, ease: 'power2.inOut' }, 0)
              .to(
                accordionWrap,
                { y: 0, scale: 1, opacity: 1, duration: 0.52, ease: 'power3.out' },
                0.14
              );
          }
        });

        ScrollTrigger.create({
          trigger: koraChangeSectionRef.current,
          start: 'top 55%',
          onEnter: () => setActivePlatformPanel((prev) => (prev === -1 ? 0 : prev))
        });
      }
      // 4C. Datasets Section Entrance
      if (datasetsSectionRef.current) {
        gsap.fromTo(
          datasetsSectionRef.current.querySelectorAll('.datasets-reveal'),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: datasetsSectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, pageRef);

    // Recalculate trigger positions once fonts / the Spline container have settled
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 1600);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [lang]);

  // Tab switch micro-animation
  useEffect(() => {
    if (servicesContentRef.current) {
      gsap.fromTo(
        servicesContentRef.current,
        { opacity: 0.45, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  // Auto-cycle Datasets tabs smoothly every 2.0s (pauses on hover/focus or reduced motion)
  useEffect(() => {
    if (isDatasetsPaused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = setInterval(() => {
      setActiveDatasetTab((prev) => (prev + 1) % DATASET_TABS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isDatasetsPaused, activeDatasetTab]);

  // Datasets tab switch micro-animation
  useEffect(() => {
    if (datasetsContentRef.current) {
      gsap.fromTo(
        datasetsContentRef.current,
        { opacity: 0.55, y: 10 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
      );
    }
  }, [activeDatasetTab]);

  const activeDataset = DATASET_TABS[activeDatasetTab];

  return (
    <div ref={pageRef} className="home-page" style={{ paddingTop: 'var(--header-height)', position: 'relative', overflowX: 'clip' }}>
      {/* Right-side EAD Green Ambient Shade behind Hero 3D Cards */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '105vh',
          zIndex: 6,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 52% 62% at 82% 38%, rgba(0, 119, 73, 0.42) 0%, rgba(116, 170, 80, 0.16) 36%, rgba(4, 24, 15, 0.12) 62%, transparent 78%), radial-gradient(ellipse 46% 52% at 92% 76%, rgba(0, 119, 73, 0.30) 0%, transparent 72%)'
        }}
      />

      {/* 3D Spline Interactive Hero Layer */}
      <SplineHero />

      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="mobile-hero"
        style={{
          minHeight: 'calc(100vh - var(--header-height))',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          paddingTop: 'clamp(4rem, 10vh, 8rem)',
          paddingBottom: 'clamp(2.75rem, 6.5vh, 4.75rem)',
          paddingLeft: 'var(--header-padding)',
          paddingRight: 'var(--header-padding)',
          position: 'relative',
          zIndex: 12,
          pointerEvents: 'none'
        }}
      >
        <div
          ref={heroTextRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'clamp(1.25rem, 2.2vw, 2rem)',
            maxWidth: '780px',
            willChange: 'transform, opacity'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 3.15rem)',
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--text-white)',
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.85)',
              margin: 0
            }}
          >
            {lang === 'ar' ? (
              <>
                منصة واحدة. <br />
                بيانات بيئية مترابطة. <br />
                قرارات أذكى.
              </>
            ) : (
              <>
                One Platform. <br />
                Connected Environmental Data. <br />
                Smarter Decisions.
              </>
            )}
          </h1>

          <div
            className="hero-bottom-row"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 'clamp(1.35rem, 2.4vw, 2rem)'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
                color: 'var(--text-primary)',
                fontWeight: 200,
                lineHeight: 1.5,
                maxWidth: '520px',
                margin: 0
              }}
            >
              {t.hero.description}
            </p>
            <div style={{ pointerEvents: 'auto' }}>
              <RollLink
                to={getPath('/contact')}
                className="hero-ead-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.95rem 2.15rem',
                  borderRadius: '32px',
                  border: '2px solid #007749',
                  background: 'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease, transform 0.2s ease'
                }}
              >
                {t.hero.cta}
              </RollLink>
            </div>
          </div>
          <style>{`
            .hero-ead-cta:hover {
              filter: brightness(1.08);
              transform: translateY(-1px);
            }
            .hero-ead-cta:hover .roll-link-inner {
              transform: translateY(-50%);
            }
            @media (max-width: 600px) {
              .mobile-hero {
                padding-left: 1rem !important;
                padding-right: 1rem !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Section Spacer (Matching Fragment Studio 320px breathing room) */}
      <div className="section-spacer" style={{ height: 'clamp(6rem, 15vw, 16rem)' }} aria-hidden="true" />

      {/* Quick Access Section (Transparent over continuous EAD stage so 3D cards overlap in foreground) */}
      <section
        ref={quickAccessSectionRef}
        className="quick-access-section"
        style={{
          position: 'relative',
          zIndex: 4,
          backgroundColor: 'transparent',
          paddingTop: 'clamp(3.5rem, 7vw, 6.5rem)',
          paddingBottom: 'clamp(3.5rem, 7vw, 6.5rem)'
        }}
      >
        {/* Diffuse EAD green ambient light behind the Quick Access glass panel */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '4%',
              right: '10%',
              width: '34vw',
              minWidth: '320px',
              maxWidth: '520px',
              height: '58%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 42% 38%, rgba(116, 170, 80, 0.24) 0%, rgba(0, 119, 73, 0.16) 44%, transparent 74%)',
              filter: 'blur(36px)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '6%',
              right: '2%',
              width: '30vw',
              minWidth: '280px',
              maxWidth: '460px',
              height: '52%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 55% 55%, rgba(0, 119, 73, 0.28) 0%, rgba(11, 40, 26, 0.14) 50%, transparent 76%)',
              filter: 'blur(42px)'
            }}
          />
        </div>

        <div
          className="quick-access-grid"
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            paddingLeft: 'var(--header-padding)',
            paddingRight: 'var(--header-padding)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 40fr) minmax(0, 60fr)',
            gap: 'clamp(1.75rem, 3vw, 2.75rem)',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Quick Access Copy + CTA + Featured Applications */}
          <div
            ref={quickAccessLeftRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              willChange: 'transform, opacity'
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '14px'
                }}
              >
                QUICK ACCESS
              </p>

              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 2.65vw, 2.375rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: 'var(--text-white)',
                  marginBottom: '1.35rem'
                }}
              >
                Everything environmental. <br />
                Connected in one place.
              </h2>

              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'var(--text-primary)',
                  maxWidth: '480px',
                  marginBottom: '2.15rem'
                }}
              >
                Discover environmental applications, explore trusted datasets, and access valuable insights through one connected platform supporting informed decisions and a sustainable future.
              </p>

              <Link
                to={getPath('/work')}
                className="hero-ead-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '0.9rem 2.1rem',
                  borderRadius: '32px',
                  border: '2px solid #007749',
                  background: 'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease, transform 0.2s ease'
                }}
              >
                <span>Explore Platform</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Bottom-Left Featured Applications Cluster */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.1rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {QUICK_ACCESS_APPS.map((app, idx) => (
                  <div
                    key={app.name}
                    title={app.name}
                    className="qa-app-thumb"
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      marginLeft: idx === 0 ? 0 : '-12px',
                      border: '2px solid #0B1510',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
                      backgroundColor: '#07110C',
                      position: 'relative',
                      zIndex: idx + 1,
                      transition: 'transform 0.25s ease, border-color 0.25s ease'
                    }}
                  >
                    <img
                      src={app.image}
                      alt={app.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text-white)',
                    marginBottom: '0.15rem'
                  }}
                >
                  Featured Applications
                </p>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    margin: 0
                  }}
                >
                  Discover environmental tools and insights.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (60%): Nested 2-column split (25% Mangrove Image + 35% Quick Access Card) */}
          <div
            className="quick-access-right-split"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 25fr) minmax(0, 35fr)',
              gap: '0.75rem',
              alignItems: 'stretch'
            }}
          >
            {/* Nested Column 1 (25%): Rounded Aerial Mangrove Environmental Image */}
            <div
              ref={quickAccessImageRef}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                willChange: 'transform, opacity'
              }}
            >
              <div
                style={{
                  width: '100%',
                  minHeight: '420px',
                  borderRadius: '26px',
                  overflow: 'hidden',
                  border: '1px solid rgba(116, 170, 80, 0.22)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)'
                }}
              >
                <img
                  src={quickAccessMangrovesImg}
                  alt="Aerial view of Abu Dhabi coastal mangroves"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.03)',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            {/* Nested Column 2 (35%): Quick Access Links Card */}
            <div
              ref={quickAccessRightRef}
              className="quick-access-glass-card"
              style={{
                width: '100%',
                borderRadius: '24px',
                padding: 'clamp(1.25rem, 2.2vw, 1.85rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                willChange: 'transform, opacity'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {QUICK_ACCESS_LINKS.map((item) => (
                  <Link
                    key={item.title}
                    to={getPath(item.to)}
                    className="qa-nav-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '0.9rem 0.25rem',
                      borderBottom: '1px solid rgba(116, 170, 80, 0.18)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color 0.25s ease'
                    }}
                  >
                    <div>
                      <div
                        className="qa-nav-title"
                        style={{
                          fontSize: '0.975rem',
                          fontWeight: 500,
                          color: 'var(--text-white)',
                          lineHeight: 1.3,
                          transition: 'color 0.25s ease'
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.825rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.15rem'
                        }}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                    <span
                      className="qa-nav-arrow"
                      aria-hidden="true"
                      style={{
                        fontSize: '1.05rem',
                        color: 'var(--text-primary)',
                        transition: 'transform 0.25s ease, color 0.25s ease',
                        flexShrink: 0
                      }}
                    >
                      ↗
                    </span>
                  </Link>
                ))}
              </div>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                  fontWeight: 400,
                  lineHeight: 1.35,
                  color: 'var(--text-white)',
                  margin: '0.25rem 0 0'
                }}
              >
                Environmental Knowledge. <br />
                Connected for a Sustainable Future.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          .qa-app-thumb:hover {
            transform: translateY(-3px) scale(1.08);
            border-color: #74AA50 !important;
            z-index: 10 !important;
          }
          .qa-nav-row:hover {
            border-bottom-color: rgba(116, 170, 80, 0.55) !important;
          }
          .qa-nav-row:hover .qa-nav-title {
            color: #74AA50 !important;
          }
          .qa-nav-row:hover .qa-nav-arrow {
            color: #74AA50 !important;
            transform: translate(3px, -3px);
          }
          @media (max-width: 1080px) {
            .quick-access-grid {
              grid-template-columns: 1fr !important;
              gap: 2.25rem !important;
            }
          }
          @media (max-width: 720px) {
            .quick-access-right-split {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
      </section>

      {/* Continuous Shared EAD Green-and-Black Atmosphere Layer (Behind 3D Cards at zIndex 1, Content in Foreground at zIndex 10) */}
      <div style={{ position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage:
              'radial-gradient(ellipse 65% 28% at 16% 22%, rgba(0, 119, 73, 0.30) 0%, rgba(7, 17, 12, 0.14) 50%, transparent 78%), radial-gradient(ellipse 58% 26% at 86% 48%, rgba(116, 170, 80, 0.16) 0%, rgba(0, 119, 73, 0.12) 48%, transparent 76%), radial-gradient(ellipse 64% 28% at 22% 76%, rgba(0, 119, 73, 0.26) 0%, rgba(7, 17, 12, 0.12) 50%, transparent 78%)'
          }}
        />

        {/* Section Spacer (transparent, as on the reference — the 3D scene keeps moving here) */}
        <div className="section-spacer" style={{ height: 'clamp(5rem, 22vw, 20rem)' }} aria-hidden="true" />

        {/* Featured Applications Section */}
        <section
          ref={servicesSectionRef}
          style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'transparent',
            paddingTop: 'clamp(4rem, 8vw, 7rem)',
            paddingBottom: 'clamp(2rem, 4vw, 3.5rem)'
          }}
        >
          <div
            style={{
              width: '100%',
              paddingLeft: 'var(--header-padding)',
              paddingRight: 'var(--header-padding)'
            }}
          >
            <div
              className="forma-services-layout"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 40fr) minmax(0, 60fr)',
                gap: 'clamp(1.75rem, 3vw, 2.75rem)',
                alignItems: 'start'
              }}
            >
              {/* Sticky Left Column (Styled Matching Quick Access) */}
              <div
                ref={servicesHeaderRef}
                className="forma-services-sticky"
                style={{
                  position: 'sticky',
                  top: 'calc(var(--header-height) + 4rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  willChange: 'transform, opacity'
                }}
              >
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '14px'
                  }}
                >
                  FEATURED APPLICATIONS
                </p>

                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 2.65vw, 2.375rem)',
                    fontWeight: 500,
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    color: 'var(--text-white)',
                    marginBottom: '1.35rem'
                  }}
                >
                  Discover Our Environmental Applications.
                </h2>

                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: 'var(--text-primary)',
                    maxWidth: '480px',
                    marginBottom: '2.15rem'
                  }}
                >
                  Explore EAD's digital environmental applications designed to monitor, analyse, and understand Abu Dhabi's environment through connected data and innovative solutions.
                </p>

                <Link
                  to={getPath('/work')}
                  className="hero-ead-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.72rem 1.45rem',
                    borderRadius: '9999px',
                    border: '2px solid #007749',
                    background:
                      'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                    boxShadow:
                      '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
                    color: '#ffffff',
                    fontSize: '0.84375rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'filter 0.2s ease, transform 0.2s ease'
                  }}
                >
                  <span>View All Applications</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Right Column: Vertical Stack of Application Cards */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                {/* Subtle EAD Green Ambient Glow Layer Behind Glass Cards */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '-2rem -3rem',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '4%',
                      left: '-2%',
                      width: '48%',
                      height: '22%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at 45% 45%, rgba(116, 170, 80, 0.14) 0%, rgba(0, 119, 73, 0.10) 46%, transparent 74%)',
                      filter: 'blur(48px)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '34%',
                      right: '0%',
                      width: '50%',
                      height: '24%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at 55% 50%, rgba(0, 119, 73, 0.16) 0%, rgba(116, 170, 80, 0.08) 45%, transparent 75%)',
                      filter: 'blur(52px)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12%',
                      left: '8%',
                      width: '48%',
                      height: '22%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at 42% 52%, rgba(116, 170, 80, 0.12) 0%, rgba(0, 119, 73, 0.10) 48%, transparent 75%)',
                      filter: 'blur(50px)'
                    }}
                  />
                </div>

                {FEATURED_APPLICATIONS.map((app, idx) => (
                  <div
                    key={app.id}
                    className="featured-app-stack-item"
                    style={{
                      position: 'sticky',
                      top: 'calc(var(--header-height) + 4rem)',
                      zIndex: idx + 1,
                      marginBottom:
                        idx < FEATURED_APPLICATIONS.length - 1 ? 'clamp(2.5rem, 6vh, 4rem)' : 0
                    }}
                  >
                    <Link
                      to={getPath(app.to)}
                      className="forma-service-card featured-application-card"
                      style={{
                        zIndex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.08fr)',
                        gap: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                        alignItems: 'stretch',
                        minHeight: '360px',
                        padding: 'clamp(1.25rem, 2vw, 1.75rem)',
                        borderRadius: '0 10px 10px 10px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transformOrigin: 'top center',
                        willChange: 'transform, filter, opacity'
                      }}
                    >
                    {/* Card Left Info */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '2rem',
                        paddingTop: '0.25rem',
                        paddingBottom: '0.25rem'
                      }}
                    >
                      <div>
                        {/* Glassmorphism Category Chip (Icon + Title Case, No Numbering) */}
                        <span className="featured-app-glass-chip">
                          {renderAppCategoryIcon(app.icon)}
                          <span>{app.category}</span>
                        </span>

                        <h3
                          style={{
                            fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
                            fontWeight: 500,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            color: 'var(--text-white)',
                            marginBottom: '0.9rem'
                          }}
                        >
                          {app.title}
                        </h3>

                        <p
                          style={{
                            fontSize: '14px',
                            fontWeight: 300,
                            lineHeight: 1.65,
                            color: 'var(--text-primary)'
                          }}
                        >
                          {app.description}
                        </p>
                      </div>

                      <div
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          color: '#74AA50'
                        }}
                      >
                        Explore →
                      </div>
                    </div>

                    {/* Card Right Framed Image */}
                    <div
                      className="forma-service-media"
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        minHeight: '280px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        backgroundColor: '#050907'
                      }}
                    >
                      <img
                        src={app.image}
                        alt={app.title}
                        loading="eager"
                        className="forma-service-img"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.6s var(--ease-out)'
                        }}
                      />
                    </div>
                  </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
          .forma-service-card:hover .forma-service-img {
            transform: scale(1.11) !important;
          }
          @media (max-width: 960px) {
            .forma-services-layout {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
            .forma-services-sticky {
              position: relative !important;
              top: auto !important;
            }
            .featured-app-stack-item {
              position: relative !important;
              top: auto !important;
              margin-bottom: 1.5rem !important;
            }
          }
          @media (max-width: 680px) {
            .forma-service-card {
              grid-template-columns: 1fr !important;
              min-height: auto !important;
            }
            .forma-service-media {
              min-height: 220px !important;
              aspect-ratio: 16 / 10;
            }
          }
        `}</style>
        </section>

        {/* Explore Catalogue Natural Vertical Scroll-Driven Storytelling */}
        <section ref={storyExperienceSectionRef} className="story-heart-section">
          <div className="story-heart-backdrop" aria-hidden="true" />
          <div className="story-heart-grid" aria-hidden="true" />
          <div className="story-heart-grid-sweep" aria-hidden="true" />
          <div className="story-heart-orbit" aria-hidden="true" />
          <div className="story-heart-orbit-inner" aria-hidden="true" />

          {/* Section Header (Matching Featured Applications Typography) */}
          <div ref={storyExperienceHeaderRef} className="story-heart-header">
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                margin: '0 0 14px 0'
              }}
            >
              EXPLORE CATALOGUE
            </p>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2.65vw, 2.375rem)',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: 'var(--text-white)',
                margin: '0 0 1.1rem 0'
              }}
            >
              Explore Environmental Data Across <br />
              Diverse Catalogues
            </h2>

            <p
              style={{
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'var(--text-primary)',
                maxWidth: '540px',
                margin: 0
              }}
            >
              Discover environmental information across a wide range of categories, from biodiversity and air quality to marine ecosystems and land resources.
            </p>
          </div>

          {/* Vertical Category Journey (Normal Flow: Left / Single Center 3D Area / Right) */}
          <div className="story-heart-journey">
            {/* Single Center 3D Focal Column (Sticky within the vertical journey, swaps per active side) */}
            <div className="story-heart-center-rail" aria-hidden="true">
              <div className="story-heart-center-sticky">
                <div className="story-heart-light-beam" />
                <div className="story-heart-3d-halo" />
                {STORY_EXPERIENCE_PILLARS.map((pillar) => {
                  const imgSrc =
                    pillar.id === 'ecosystem'
                      ? cat3d01Ecosystem
                      : pillar.id === 'groundwater'
                        ? cat3d02Groundwater
                        : pillar.id === 'soil'
                          ? cat3d03Soil
                          : cat3d04WasteManagement;
                  return (
                    <div key={`${pillar.id}-3d`} className="story-heart-3d-layer">
                      <div className="story-heart-3d-spin">
                        <img
                          src={imgSrc}
                          alt={pillar.chip}
                          decoding="async"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {STORY_EXPERIENCE_PILLARS.map((pillar) => {
              const imgSrc =
                pillar.id === 'ecosystem'
                  ? cat3d01Ecosystem
                  : pillar.id === 'groundwater'
                    ? cat3d02Groundwater
                    : pillar.id === 'soil'
                      ? cat3d03Soil
                      : cat3d04WasteManagement;

              const textBlock = (
                <div className="story-heart-text-col">
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.42rem',
                      padding: '0.28rem 0.72rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(116, 170, 80, 0.34)',
                      background: 'rgba(11, 24, 17, 0.55)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: '#91D19D',
                      fontSize: '0.75rem',
                      fontWeight: 300,
                      marginBottom: '0.75rem'
                    }}
                  >
                    <span style={{ color: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                      {renderCategoryChipIcon(pillar.icon)}
                    </span>
                    <span>{pillar.chip}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(1.5rem, 2.25vw, 2rem)',
                      fontWeight: 500,
                      lineHeight: 1.15,
                      letterSpacing: '-0.025em',
                      color: 'var(--text-white)',
                      margin: 0
                    }}
                  >
                    {pillar.titleBefore}
                    {pillar.titleItalic}
                    {pillar.titleAfter}
                  </h3>

                  <div className="story-heart-rule" aria-hidden="true" />

                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      color: 'var(--text-primary)',
                      margin: '0 0 0.85rem 0'
                    }}
                  >
                    {pillar.description}
                  </p>

                  <Link
                    to={getPath(pillar.to)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: '#74AA50',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Explore</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              );

              return (
                <article
                  key={pillar.id}
                  className={`story-heart-row ${pillar.side === 'right' ? 'is-right' : 'is-left'}${pillar.textRight ? ' is-text-right' : ''
                    }`}
                >
                  {pillar.side === 'left' ? textBlock : <div className="story-heart-spacer" aria-hidden="true" />}

                  {/* Center column spacer on desktop (occupied by sticky center rail) + inline 3D image on mobile */}
                  <div className="story-heart-spacer" aria-hidden="true" />
                  <div className="story-heart-mobile-visual">
                    <img
                      src={imgSrc}
                      alt={pillar.chip}
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {pillar.side === 'right' ? textBlock : <div className="story-heart-spacer" aria-hidden="true" />}
                </article>
              );
            })}
          </div>

          {/* Centered View All Catalogue Primary CTA */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'clamp(3.5rem, 7vw, 5.5rem)'
            }}
          >
            <Link
              to={getPath('/work/index')}
              className="hero-ead-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.78rem 1.75rem',
                borderRadius: '9999px',
                border: '2px solid #007749',
                background:
                  'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                boxShadow:
                  '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'filter 0.2s ease, transform 0.2s ease'
              }}
            >
              <span>View All Catalogue</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Minimal Seamless Overlap Spacer */}
        <div className="section-spacer" style={{ height: '0.5rem' }} aria-hidden="true" />
      </div>

      {/* Kora-Style "About the Platform" Scroll-Driven Section */}
      <section
        ref={koraChangeSectionRef}
        data-spline-cover="true"
        className="kora-change-section"
        style={{
          backgroundColor: '#020b08',
          backgroundImage: `url(${aboutPlatformBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          className="kora-change-sticky"
          style={{
            backgroundColor: '#020b08',
            backgroundImage: `url(${aboutPlatformBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="kora-change-headline" style={{ maxWidth: '1080px', width: '100%' }}>
            <p
              className="kora-change-meta"
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(212, 220, 216, 0.72)',
                margin: '0 0 14px 0'
              }}
            >
              ABOUT THE PLATFORM
            </p>
            <div className="kora-change-line kora-change-line-1">
              One Platform. A Wealth of
            </div>
            <div className="kora-change-line kora-change-line-2">
              Environmental Data.
            </div>
            <p
              className="kora-change-meta"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'var(--text-primary)',
                maxWidth: '780px',
                margin: '1.35rem auto 0'
              }}
            >
              Explore a centralized environmental information platform that brings together diverse datasets,
              geospatial resources, and digital applications to support environmental awareness, research, and
              informed decision-making.
            </p>
            <div
              className="kora-change-meta"
              style={{ marginTop: '1.75rem', pointerEvents: 'auto' }}
            >
              <Link
                to={getPath('/about')}
                className="hero-ead-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.72rem 1.45rem',
                  borderRadius: '9999px',
                  border: '2px solid #007749',
                  background:
                    'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                  boxShadow:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
                  color: '#ffffff',
                  fontSize: '0.84375rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                <span>Explore the Platform</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="kora-change-cards-stage">
            <div className="kora-accordion-wrap">
              <div className="about-platform-accordion">
                {ABOUT_PLATFORM_PANELS.map((panel, idx) => {
                  const isActive = activePlatformPanel === idx;
                  return (
                    <div
                      key={panel.index}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isActive}
                      aria-label={`${panel.index} ${panel.title}`}
                      className={`about-platform-panel${isActive ? ' is-active' : ''}`}
                      onMouseEnter={() => setActivePlatformPanel(idx)}
                      onClick={() => setActivePlatformPanel(idx)}
                      onFocus={() => setActivePlatformPanel(idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActivePlatformPanel(idx);
                        }
                      }}
                    >
                      <img
                        src={panel.image}
                        alt={panel.title}
                        decoding="async"
                        className="about-platform-panel-img"
                      />

                      {/* Overlays for Expanded vs Collapsed Legibility */}
                      <div className="about-platform-expanded-shade" aria-hidden="true" />
                      <div className="about-platform-collapsed-shade" aria-hidden="true" />

                      {/* Expanded Panel Bottom-Left Content */}
                      <div className="about-platform-expanded-body" aria-hidden={!isActive}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            marginBottom: '0.55rem'
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              width: '42px',
                              height: '1px',
                              backgroundColor: 'rgba(255, 255, 255, 0.42)'
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 400,
                              letterSpacing: '0.04em',
                              color: 'rgba(255, 255, 255, 0.85)'
                            }}
                          >
                            {panel.index}
                          </span>
                        </div>

                        <h3
                          style={{
                            fontSize: 'clamp(1.35rem, 1.8vw, 1.625rem)',
                            fontWeight: 600,
                            lineHeight: 1.2,
                            letterSpacing: '-0.015em',
                            color: '#ffffff',
                            margin: '0 0 0.5rem 0'
                          }}
                        >
                          {panel.title}
                        </h3>

                        <p
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 300,
                            lineHeight: 1.58,
                            color: 'rgba(212, 220, 216, 0.86)',
                            margin: '0 0 0.9rem 0',
                            maxWidth: '370px'
                          }}
                        >
                          {panel.description}
                        </p>

                        <Link
                          to={getPath(panel.to)}
                          tabIndex={isActive ? 0 : -1}
                          className="about-platform-view-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View all</span>
                          <span className="about-platform-view-link-arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </div>

                      {/* Collapsed Panel Vertical UI (Top Pill + Rotated Title + Bottom Vertical Stem) */}
                      <div className="about-platform-collapsed-ui" aria-hidden={isActive}>
                        <span className="about-platform-collapsed-pill">{panel.index}</span>

                        <div className="about-platform-collapsed-bottom">
                          <span className="about-platform-collapsed-title">{panel.title}</span>
                          <span className="about-platform-collapsed-stem" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1.75rem'
                }}
              >
                <Link
                  to={getPath('/about')}
                  className="hero-ead-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.72rem 1.45rem',
                    borderRadius: '9999px',
                    border: '2px solid #007749',
                    background:
                      'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                    boxShadow:
                      '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
                    color: '#ffffff',
                    fontSize: '0.84375rem',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  <span>Explore the Platform</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Environmental Datasets Section */}
      <section
        ref={datasetsSectionRef}
        data-spline-cover="true"
        className="datasets-section"
      >
        <div className="datasets-header datasets-reveal">
          <p className="datasets-eyebrow">EXPLORE ENVIRONMENTAL DATA</p>
          <h2 className="datasets-heading">
            Explore Environmental Datasets &amp;
            <br />
            Discover Valuable Insights
          </h2>
          <p className="datasets-subtitle">
            Explore a collection of environmental datasets covering air, water, land and biodiversity. Access
            valuable data and insights to better understand our environment and support informed decisions.
          </p>

          <div
            className="datasets-tab-bar"
            role="tablist"
            aria-label="Dataset categories"
            onMouseEnter={() => setIsDatasetsPaused(true)}
            onMouseLeave={() => setIsDatasetsPaused(false)}
          >
            {DATASET_TABS.map((tab, idx) => {
              const isActive = activeDatasetTab === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`datasets-tab-btn${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveDatasetTab(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={datasetsContentRef}
          className="datasets-grid datasets-reveal"
          onMouseEnter={() => setIsDatasetsPaused(true)}
          onMouseLeave={() => setIsDatasetsPaused(false)}
        >
          {/* Left Card — Full-Bleed Photo + Floating Stat Badge */}
          <div className="datasets-media-card">
            <img
              src={activeDataset.image}
              alt={activeDataset.imageAlt}
              decoding="async"
              className="datasets-media-img"
            />

            <div className="datasets-stat-badge">
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  marginBottom: '0.25rem'
                }}
              >
                {activeDataset.statValue}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '0.15rem'
                }}
              >
                {activeDataset.statTitle}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 300,
                  color: 'rgba(212, 220, 216, 0.78)'
                }}
              >
                {activeDataset.statSubtitle}
              </div>
            </div>
          </div>

          {/* Right Card — Attached Green-to-Dark Wireframe Terrain Background + Checklist */}
          <div
            className="datasets-info-card"
            style={{
              backgroundImage: `url(${datasetsCardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span
                className="featured-app-glass-chip"
                style={{ marginBottom: '1.35rem' }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22v-9" />
                  <path d="M12 13c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6Z" />
                  <path d="M12 13c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6Z" />
                </svg>
                <span>{activeDataset.chip}</span>
              </span>

              <h3
                style={{
                  fontSize: 'clamp(1.55rem, 2.35vw, 2rem)',
                  fontWeight: 600,
                  lineHeight: 1.18,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  margin: '0 0 0.9rem 0',
                  maxWidth: '460px'
                }}
              >
                {activeDataset.heading}
              </h3>

              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(212, 220, 216, 0.86)',
                  margin: 0,
                  maxWidth: '490px'
                }}
              >
                {activeDataset.description}
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
              <ul className="datasets-check-list">
                {activeDataset.bullets.map((bullet) => (
                  <li key={bullet} className="datasets-check-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      style={{ flexShrink: 0 }}
                    >
                      <circle cx="12" cy="12" r="10" fill="#91D19D" />
                      <path
                        d="M8.5 12.2l2.3 2.3 4.7-4.8"
                        stroke="#05130c"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
