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

const ITEMS = [
  // Primary hero showcase: top Applications & Catalogues
  { key: 'enviroportal', name: 'Enviroportal', category: 'Application', image: app03Enviroportal },
  { key: 'air-quality-portal', name: 'Air Quality Portal', category: 'Application', image: app04AirQualityPortal },
  { key: 'abu-dhabi-nature', name: 'Abu Dhabi Nature', category: 'Application', image: app05AbuDhabiNature },
  { key: 'avatar', name: 'Avatar', category: 'Application', image: app01Avatar },
  { key: 'chatbot', name: 'Chatbot', category: 'Application', image: app02Chatbot },
  { key: 'cat-ecosystem', name: 'Ecosystem', category: 'Catalogue', image: cat01Ecosystem },
  { key: 'cat-groundwater', name: 'Groundwater', category: 'Catalogue', image: cat02Groundwater },
  { key: 'cat-air-quality', name: 'Air Quality', category: 'Catalogue', image: cat05AirQuality },
  { key: 'cat-marine-water', name: 'Marine Water Quality', category: 'Catalogue', image: cat06MarineWater },
  { key: 'naha', name: 'Naha', category: 'Application', image: app06Naha },
  { key: 'al-daleela', name: 'Al Daleela', category: 'Application', image: app07AlDaleela },
  { key: 'bird-tracking', name: 'Bird Tracking System', category: 'Application', image: app08BirdTracking },
  { key: 'fisheries-sys', name: 'National Fisheries Information System', category: 'Application', image: app09Fisheries },
  { key: 'oil-spill', name: 'Oil Spill Monitoring', category: 'Application', image: app10OilSpill },
  { key: 'cat-soil', name: 'Soil', category: 'Catalogue', image: cat03Soil },
  { key: 'cat-waste', name: 'Waste Management', category: 'Catalogue', image: cat04WasteManagement },
  { key: 'cat-fisheries', name: 'Fisheries', category: 'Catalogue', image: cat07Fisheries },
  { key: 'cat-protected-area', name: 'Protected Area', category: 'Catalogue', image: cat08ProtectedArea },
  { key: 'marine-debris', name: 'Marine Debris', category: 'Application', image: app11MarineDebris },
  { key: 'algal-bloom', name: 'Algal Bloom', category: 'Application', image: app12AlgalBloom },
  { key: 'outfall-monitoring', name: 'Outfall Monitoring', category: 'Application', image: app13Outfall },
  { key: 'fish-species-id', name: 'Fish Species Identification', category: 'Application', image: app14FishSpecies },
  { key: 'birds-nests', name: 'Birds, Nests & Animal Identification', category: 'Application', image: app15BirdsNests },
  { key: 'jaywun-habitat', name: 'Jaywun Habitat', category: 'Application', image: app16Jaywun },
  { key: 'land-subsidence', name: 'Land Subsidence Modelling', category: 'Application', image: app17LandSubsidence },
  { key: 'change-detection', name: 'Change Detection', category: 'Application', image: app18ChangeDetection },
  { key: 'dredges-detection', name: 'Dredges Detection', category: 'Application', image: app19Dredges },
  { key: 'urban-detection', name: 'Urban Detection', category: 'Application', image: app20Urban },
  { key: 'coastline-change', name: 'Coastline Change Detection', category: 'Application', image: app21Coastline },
  { key: 'vegetation-detection', name: 'Vegetation Detection', category: 'Application', image: app22Vegetation },
  { key: 'tree-species', name: 'Tree Species Detection', category: 'Application', image: app23TreeSpecies },
  { key: 'camera-trap', name: 'Camera Trap Analysis Species Monitoring', category: 'Application', image: app24CameraTrap }
];

// Desktop resting hero starts around Clone 8 -> Clone 0 then continues Clone 9..31 on scroll
const DESKTOP_CLONES = [
  8, 7, 6, 5, 4, 3, 2, 1, 0,
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
];

// Tablet & Mobile resting hero starts around Clone 26 -> Clone 17 then continues across remaining clones
const MOBILE_CLONES = [
  26, 25, 24, 23, 22, 21, 20, 19, 18, 17,
  16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
  27, 28, 29, 30, 31
];

export const EDP_SLIDE_MAP = ITEMS.map((item, idx) => ({
  slide: idx + 1,
  ...item,
  cloneName: `Clone ${DESKTOP_CLONES[idx]}`,
  cloneNames: {
    desktop: `Clone ${DESKTOP_CLONES[idx]}`,
    tablet: `Clone ${MOBILE_CLONES[idx]}`,
    mobile: `Clone ${MOBILE_CLONES[idx]}`
  }
}));
