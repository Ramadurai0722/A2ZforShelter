import React from 'react';
import { Link } from 'react-router-dom';
import './category.css';
// Import your icons
import houseIcon from '../../../assets/icons/housecat.png';
import pghostelIcon from '../../../assets/icons/pgcat.png';
import interiorsIcon from '../../../assets/icons/interiorcat.png';
import cementIcon from '../../../assets/icons/cementcat.png';
import stoneIcon from '../../../assets/icons/stonecat.png';
import sandIcon from '../../../assets/icons/sandcat.png';
import steelIcon from '../../../assets/icons/steelcat.png';
import pipeIcon from '../../../assets/icons/pipecat.png';
import wireIcon from '../../../assets/icons/wirecat.png';
import woodIcon from '../../../assets/icons/woodcat.png';
import cateringIcon from '../../../assets/icons/cateringcat.png';
import landIcon from '../../../assets/icons/landcat.jpg';
import agentIcon from '../../../assets/icons/agentcat.webp';
import boreWellIcon from '../../../assets/icons/borewellcat.png';
import civilIcon from '../../../assets/icons/civilcat.png';

const categories = [
  { name: 'Civil Engineers', icon: civilIcon, path: '/civilall', group: 'firsticon' },
  { name: 'Catering Services', icon: cateringIcon, path: '/cateringall', group: 'firsticon' },
  { name: 'House', icon: houseIcon, path: '/houseall', group: 'firsticon' },
  { name: 'Pghostel', icon: pghostelIcon, path: '/pgall', group: 'firsticon' },
  { name: 'Interiors', icon: interiorsIcon, path: '/interiorall', group: 'firsticon' },
  { name: 'Cement', icon: cementIcon, path: '/cementall', group: 'firsticon' },
  { name: 'Stone', icon: stoneIcon, path: '/stoneall', group: 'secondicon' },
  { name: 'Sand', icon: sandIcon, path: '/sandall', group: 'secondicon' },
  { name: 'Steel', icon: steelIcon, path: '/steelall', group: 'secondicon' },
  { name: 'Pipe', icon: pipeIcon, path: '/pipewireall', group: 'secondicon' },
  { name: 'Wire', icon: wireIcon, path: '/pipewireall', group: 'secondicon' },
  { name: 'Wood', icon: woodIcon, path: '/woodall', group: 'thirdicon' },
  { name: 'Land', icon: landIcon, path: '/landall', group: 'thirdicon' },
  { name: 'Agents', icon: agentIcon, path: '/agentsList', group: 'thirdicon' },
  { name: 'Borewell', icon: boreWellIcon, path: '/borewellall', group: 'thirdicon' },
];

const CategoryList = () => {
  return (
    <div className="category-list">
      <h2>Categories</h2>

      <div className="categories first-row">
        {categories.filter(category => category.group === 'firsticon').map((category, index) => (
          <Link to={category.path} key={index} className="category firsticon">
            <img src={category.icon} alt={category.name} className="category-icon" />
            <p>{category.name}</p>
          </Link>
        ))}
      </div>

      {/* Second row of categories */}
      <div className="categories second-row">
        {categories.filter(category => category.group === 'secondicon').map((category, index) => (
          <Link to={category.path} key={index} className="category secondicon">
            <img src={category.icon} alt={category.name} className="category-icon" />
            <p>{category.name}</p>
          </Link>
        ))}
      </div>

      {/* Third row of categories */}
      <div className="categories third-row">
        {categories.filter(category => category.group === 'thirdicon').map((category, index) => (
          <Link to={category.path} key={index} className="category thirdicon">
            <img src={category.icon} alt={category.name} className="category-icon" />
            <p>{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
