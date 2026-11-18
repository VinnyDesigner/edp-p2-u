import app01Avatar from '../assets/edp-thumbs/app-01-avatar.jpg';
import app02Chatbot from '../assets/edp-thumbs/app-02-chatbot.jpg';
import app03Enviroportal from '../assets/edp-thumbs/app-03-enviroportal.png';
import app04AirQualityPortal from '../assets/edp-thumbs/app-04-air-quality-portal.jpg';
import app05AbuDhabiNature from '../assets/edp-thumbs/app-05-abu-dhabi-nature.jpg';
import app06Naha from '../assets/edp-thumbs/app-06-naha.jpg';
import app07AlDaleela from '../assets/edp-thumbs/app-07-al-daleela.png';
import app08BirdTracking from '../assets/edp-thumbs/app-08-bird-tracking-system.png';
import app09Fisheries from '../assets/edp-thumbs/app-09-national-fisheries-information-system.jpg';
import app10OilSpill from '../assets/edp-thumbs/app-10-oil-spill-monitoring.png';
import app11MarineDebris from '../assets/edp-thumbs/app-11-marine-debris.png';
import app12AlgalBloom from '../assets/edp-thumbs/app-12-algal-bloom.png';
import app13Outfall from '../assets/edp-thumbs/app-13-outfall-monitoring.png';
import app14FishSpecies from '../assets/edp-thumbs/app-14-fish-species-identification.png';
import app15BirdsNests from '../assets/edp-thumbs/app-15-birds-nests-and-animal-identification-and-counting.png';
import app16Jaywun from '../assets/edp-thumbs/app-16-jaywun-habitat.png';
import app17LandSubsidence from '../assets/edp-thumbs/app-17-land-subsidence-modelling.png';
import app18ChangeDetection from '../assets/edp-thumbs/app-18-change-detection.png';
import app19Dredges from '../assets/edp-thumbs/app-19-dredges-detection.png';
import app20Urban from '../assets/edp-thumbs/app-20-urban-detection.png';
import app21Coastline from '../assets/edp-thumbs/app-21-coastline-change-detection.png';
import app22Vegetation from '../assets/edp-thumbs/app-22-vegetation-detection.png';
import app23TreeSpecies from '../assets/edp-thumbs/app-23-tree-species-detection.png';
import app24CameraTrap from '../assets/edp-thumbs/app-24-camera-trap-analysis-species-monitoring.png';

import cat01Ecosystem from '../assets/edp-thumbs/cat-01-ecosystem.jpg';
import cat02Groundwater from '../assets/edp-thumbs/cat-02-groundwater.png';
import cat03Soil from '../assets/edp-thumbs/cat-03-soil.png';
import cat04WasteManagement from '../assets/edp-thumbs/cat-04-waste-management.png';
import cat05AirQuality from '../assets/edp-thumbs/cat-05-air-quality.jpg';
import cat06MarineWater from '../assets/edp-thumbs/cat-06-marine-water-quality.jpg';
import cat07Fisheries from '../assets/edp-thumbs/cat-07-fisheries.png';
import cat08ProtectedArea from '../assets/edp-thumbs/cat-08-protected-area.jpg';

export const edpApplications = [
  {
    id: 'enviroportal',
    slug: 'enviroportal',
    title: 'Enviroportal',
    category: 'Environmental Portal',
    description: "Explore environmental information and resources through EAD's Enviroportal.",
    image: app03Enviroportal
  },
  {
    id: 'air-quality-portal',
    slug: 'air-quality-portal',
    title: 'Air Quality Portal',
    category: 'Environmental Portal',
    description: "Access air quality monitoring information across Abu Dhabi through EAD's Air Quality Portal.",
    image: app04AirQualityPortal
  },
  {
    id: 'abu-dhabi-nature',
    slug: 'abu-dhabi-nature',
    title: 'Abu Dhabi Nature',
    category: 'Biodiversity & Nature',
    description: "Discover Abu Dhabi's habitats, species, and natural heritage through Abu Dhabi Nature.",
    image: app05AbuDhabiNature
  },
  {
    id: 'al-daleela',
    slug: 'al-daleela',
    title: 'Al Daleela',
    category: 'Environmental Discovery',
    description: 'Guided environmental knowledge and exploration application.',
    image: app07AlDaleela
  },
  {
    id: 'bird-tracking-system',
    slug: 'bird-tracking-system',
    title: 'Bird Tracking System',
    category: 'Biodiversity Monitoring',
    description: 'Application supporting bird movement tracking and biodiversity monitoring.',
    image: app08BirdTracking
  },
  {
    id: 'national-fisheries-information-system',
    slug: 'national-fisheries-information-system',
    title: 'National Fisheries Information System',
    category: 'Marine & Fisheries',
    description: 'Fisheries information application supporting marine resource monitoring.',
    image: app09Fisheries
  },
  {
    id: 'oil-spill-monitoring',
    slug: 'oil-spill-monitoring',
    title: 'Oil Spill Monitoring',
    category: 'Marine Monitoring',
    description: 'Geospatial and remote-sensing application for oil spill detection and response.',
    image: app10OilSpill
  },
  {
    id: 'naha',
    slug: 'naha',
    title: 'Naha',
    category: 'Environmental Application',
    description: 'Digital environmental application within the EAD Environmental Data Platform.',
    image: app06Naha
  },
  {
    id: 'chatbot',
    slug: 'chatbot',
    title: 'Chatbot',
    category: 'AI Discovery',
    description: 'An interactive conversational assistant helping users discover environmental insights.',
    image: app02Chatbot
  },
  {
    id: 'avatar',
    slug: 'avatar',
    title: 'Avatar',
    category: 'AI Assistant',
    description: 'An AI-powered digital avatar designed to enhance environmental information access and user interaction.',
    image: app01Avatar
  },
  {
    id: 'marine-debris',
    slug: 'marine-debris',
    title: 'Marine Debris',
    category: 'Marine Monitoring',
    description: 'Remote-sensing and monitoring application for marine debris assessment.',
    image: app11MarineDebris
  },
  {
    id: 'algal-bloom',
    slug: 'algal-bloom',
    title: 'Algal Bloom',
    category: 'Marine Monitoring',
    description: 'Monitoring application for coastal algal bloom observation.',
    image: app12AlgalBloom
  },
  {
    id: 'outfall-monitoring',
    slug: 'outfall-monitoring',
    title: 'Outfall Monitoring',
    category: 'Marine Monitoring',
    description: 'Spatial monitoring application for coastal outfall observation.',
    image: app13Outfall
  },
  {
    id: 'fish-species-identification',
    slug: 'fish-species-identification',
    title: 'Fish Species Identification',
    category: 'Marine & Fisheries',
    description: 'Application supporting fish species identification and marine biodiversity assessment.',
    image: app14FishSpecies
  },
  {
    id: 'birds-nests-identification',
    slug: 'birds-nests-identification',
    title: 'Birds, Nests & Animal Identification',
    category: 'Biodiversity Monitoring',
    description: 'Automated identification and counting support for wildlife and nesting surveys.',
    image: app15BirdsNests
  },
  {
    id: 'jaywun-habitat',
    slug: 'jaywun-habitat',
    title: 'Jaywun Habitat',
    category: 'Marine & Fisheries',
    description: 'Habitat mapping and research support application.',
    image: app16Jaywun
  },
  {
    id: 'land-subsidence-modelling',
    slug: 'land-subsidence-modelling',
    title: 'Land Subsidence Modelling',
    category: 'Land & Geospatial',
    description: 'Geospatial modelling application for land subsidence analysis.',
    image: app17LandSubsidence
  },
  {
    id: 'change-detection',
    slug: 'change-detection',
    title: 'Change Detection',
    category: 'Land & Geospatial',
    description: 'Satellite-based environmental change detection application.',
    image: app18ChangeDetection
  },
  {
    id: 'dredges-detection',
    slug: 'dredges-detection',
    title: 'Dredges Detection',
    category: 'Marine Monitoring',
    description: 'Spatial detection application for coastal and marine dredging activity.',
    image: app19Dredges
  },
  {
    id: 'urban-detection',
    slug: 'urban-detection',
    title: 'Urban Detection',
    category: 'Land & Geospatial',
    description: 'Geospatial detection application for urban land-cover observation.',
    image: app20Urban
  },
  {
    id: 'coastline-change-detection',
    slug: 'coastline-change-detection',
    title: 'Coastline Change Detection',
    category: 'Land & Geospatial',
    description: 'Coastal monitoring application tracking shoreline changes over time.',
    image: app21Coastline
  },
  {
    id: 'vegetation-detection',
    slug: 'vegetation-detection',
    title: 'Vegetation Detection',
    category: 'Terrestrial & Biodiversity',
    description: 'Remote-sensing application for vegetation cover mapping and analysis.',
    image: app22Vegetation
  },
  {
    id: 'tree-species-detection',
    slug: 'tree-species-detection',
    title: 'Tree Species Detection',
    category: 'Terrestrial & Biodiversity',
    description: 'Spatial analysis application supporting tree species identification.',
    image: app23TreeSpecies
  },
  {
    id: 'camera-trap-analysis',
    slug: 'camera-trap-analysis',
    title: 'Camera Trap Analysis & Species Monitoring',
    category: 'Biodiversity Monitoring',
    description: 'Application supporting camera trap wildlife imagery analysis and monitoring.',
    image: app24CameraTrap
  }
];

export const edpCatalogueCategories = [
  {
    id: 'air-quality',
    title: 'Air Quality',
    domain: 'Atmosphere & Emissions',
    description:
      'Air quality monitoring resources covering atmospheric indicators and ambient air conditions across Abu Dhabi.',
    image: cat05AirQuality
  },
  {
    id: 'ecosystem',
    title: 'Biodiversity & Ecosystems',
    domain: 'Ecosystems',
    description:
      'Explore diverse ecosystems, natural habitats, and ecological relationships supporting biodiversity conservation.',
    image: cat01Ecosystem
  },
  {
    id: 'groundwater',
    title: 'Water Resources & Groundwater',
    domain: 'Water',
    description:
      'Discover groundwater resources, underground water availability, and quality indicators supporting sustainable management.',
    image: cat02Groundwater
  },
  {
    id: 'marine-water-quality',
    title: 'Marine Water Quality',
    domain: 'Marine Environment',
    description:
      'Marine water quality information supporting coastal, offshore, and marine ecosystem stewardship.',
    image: cat06MarineWater
  },
  {
    id: 'soil',
    title: 'Soil & Land Resources',
    domain: 'Land & Soil',
    description:
      'Explore soil composition, characteristics, quality, and distribution across Abu Dhabi’s terrestrial landscape.',
    image: cat03Soil
  },
  {
    id: 'waste-management',
    title: 'Waste Management & Recycling',
    domain: 'Waste & Circularity',
    description:
      'Information covering waste collection, treatment, disposal, recycling, and resource recovery.',
    image: cat04WasteManagement
  },
  {
    id: 'fisheries',
    title: 'Fisheries',
    domain: 'Marine Resources',
    description:
      'Environmental data resources supporting sustainable fisheries and marine biodiversity.',
    image: cat07Fisheries
  },
  {
    id: 'protected-area',
    title: 'Protected Areas',
    domain: 'Conservation',
    description:
      'Spatial and environmental information covering designated terrestrial and marine protected areas.',
    image: cat08ProtectedArea
  }
];

// Preserved exports so existing shared imports stay intact without Fragment Studio data
export const featuredProjects = edpApplications.slice(0, 5).map((app) => ({
  id: app.id,
  slug: app.slug,
  title: app.title,
  category: { en: app.category, ar: app.category },
  summary: { en: app.description, ar: app.description },
  cardImage: app.image,
  gallery: [app.image]
}));

export const projectIndexItems = edpCatalogueCategories.map((cat) => ({
  id: cat.id,
  title: cat.title,
  category: { en: cat.domain, ar: cat.domain },
  description: { en: cat.description, ar: cat.description },
  image: cat.image
}));
