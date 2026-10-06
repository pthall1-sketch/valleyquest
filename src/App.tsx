import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// ==========================================
// TYPE DEFINITIONS & LOCATION DATABASE
// ==========================================
export interface STEMEvent {
  title: string;
  date: string;
  venue: string;
  description: string;
}

export interface LocationContext {
  zip: string;
  city: string;
  county: string;
  airDistrict: string;
  monitoringStation: string;
  schoolDistrict: string;
  aqi: number;
  temp: number;
  pm25: number;
  fogRisk: string;
  stemEvents: STEMEvent[];
  districtAnnouncements: string[];
}

export interface UserProfile {
  name: string;
  grade: string;
  school: string;
  username: string;
}

const CENTRAL_VALLEY_ZIP_DB: Record<string, LocationContext> = {
  '93301': {
    zip: '93301',
    city: 'Bakersfield',
    county: 'Kern County',
    airDistrict: 'SJVAPCD - Southern Region',
    monitoringStation: 'Bakersfield - California Avenue Station',
    schoolDistrict: 'Bakersfield City School District',
    aqi: 42,
    temp: 78,
    pm25: 10.2,
    fogRisk: 'Low Fog Risk',
    stemEvents: [
      { title: 'Kern County Regional Science Fair', date: 'Oct 24, 2026', venue: 'Mechanics Bank Convention Center', description: 'Annual student science competition showcasing environmental and physical projects.' },
      { title: 'Valley Agriculture & Tech Workshop', date: 'Nov 12, 2026', venue: 'CSU Bakersfield Science Hall', description: 'Hands-on telemetry and soil-moisture sensor building for middle schoolers.' },
    ],
    districtAnnouncements: [
      'BCSD Notice: Outdoor PE permitted under Green/Good AQI status today.',
      'Kern High School District: STEM Expo registration open through November.',
    ],
  },
  '93721': {
    zip: '93721',
    city: 'Fresno',
    county: 'Fresno County',
    airDistrict: 'SJVAPCD - Central Region',
    monitoringStation: 'Fresno - Garland Station',
    schoolDistrict: 'Fresno Unified School District',
    aqi: 68,
    temp: 75,
    pm25: 20.1,
    fogRisk: 'Moderate Tule Fog Advisory',
    stemEvents: [
      { title: 'Central Valley Robotics Challenge', date: 'Oct 18, 2026', venue: 'Fresno Convention Center', description: 'Autonomous rover competition using sensors designed for farm automation.' },
      { title: 'Fresno STEM & Drone Flying Workshop', date: 'Nov 05, 2026', venue: 'Fresno State Engineering Lab', description: 'Learn drone aerodynamics and air particulate mapping.' },
    ],
    districtAnnouncements: [
      'Fresno Unified Advisory: Moderate AQI status. Limit prolonged outdoor exertion for sensitive groups.',
      'FUSD Science Dept: Mobile air monitoring labs visiting middle schools next week.',
    ],
  },
  '93291': {
    zip: '93291',
    city: 'Visalia',
    county: 'Tulare County',
    airDistrict: 'SJVAPCD - Southern Region',
    monitoringStation: 'Visalia - N Church St Station',
    schoolDistrict: 'Visalia Unified School District',
    aqi: 38,
    temp: 74,
    pm25: 8.9,
    fogRisk: 'Clear / Low Fog Risk',
    stemEvents: [
      { title: 'Tulare Water Conservation Science Day', date: 'Oct 22, 2026', venue: 'Mooney Grove Park', description: 'Interactive field testing of groundwater and canal filtration systems.' },
    ],
    districtAnnouncements: [
      'VUSD Outdoor Safety: All outdoor sports clear for afternoon practice.',
    ],
  },
  '95354': {
    zip: '95354',
    city: 'Modesto',
    county: 'Stanislaus County',
    airDistrict: 'SJVAPCD - Northern Region',
    monitoringStation: 'Modesto - 14th Street Station',
    schoolDistrict: 'Modesto City Schools District',
    aqi: 48,
    temp: 71,
    pm25: 11.8,
    fogRisk: 'Low Fog Advisory',
    stemEvents: [
      { title: 'Stanislaus STEM Maker Faire', date: 'Nov 08, 2026', venue: 'Modesto Centre Plaza', description: 'Student projects on renewable energy and clean air solutions.' },
    ],
    districtAnnouncements: [
      'Modesto City Schools: Air Quality Flag System is currently GREEN.',
    ],
  },
  '95202': {
    zip: '95202',
    city: 'Stockton',
    county: 'San Joaquin County',
    airDistrict: 'SJVAPCD - Northern Region',
    monitoringStation: 'Stockton - Hazelton St Station',
    schoolDistrict: 'Stockton Unified School District',
    aqi: 52,
    temp: 68,
    pm25: 13.4,
    fogRisk: 'Low Fog Advisory',
    stemEvents: [
      { title: 'Delta Science Student Symposium', date: 'Oct 29, 2026', venue: 'University of the Pacific (UOP)', description: 'Exploring Sacramento-San Joaquin Delta hydraulics and aquatic life.' },
      { title: 'Stockton Clean Energy Student Challenge', date: 'Nov 15, 2026', venue: 'Stockton Civic Center', description: 'Design wind turbine and solar collector prototypes.' },
    ],
    districtAnnouncements: [
      'Stockton Unified SD: District-wide Science & Math Night on November 4.',
      'SUSD Health Services: Air Quality index alerts synced with campus flag systems.',
    ],
  },
};

const getDefaultLocationData = (zip: string): LocationContext => ({
  zip,
  city: 'Central Valley Community',
  county: 'San Joaquin',
  airDistrict: 'SJVAPCD - San Joaquin Valley Air Basin',
});

export default App; // Ensure your main App component is exported at the bottom
