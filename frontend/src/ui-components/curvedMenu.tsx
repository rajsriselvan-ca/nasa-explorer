import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MenuItem } from '../types/menuItem_types';
import { CurvedMenuProps } from '../types/curvedMenuProps_types';
import { FaSatellite, FaMars, FaGlobe, FaMeteor, FaImages, FaBars, FaTimes } from 'react-icons/fa';


const menuItems: MenuItem[] = [
  { name: 'APOD', path: '/apod', icon: <FaSatellite />, color: 'bg-blue-600', label: 'APOD' },
  { name: 'Mars Rover', path: '/mars-rover', icon: <FaMars />, color: 'bg-red-600', label: 'MarsRover' },
  { name: 'EPIC', path: '/epic', icon: <FaGlobe />, color: 'bg-green-600', label: 'EPIC' },
  { name: 'Near-Earth Objects', path: '/neows', icon: <FaMeteor />, color: 'bg-yellow-600', label: 'NEOs' },
  { name: 'Image Library', path: '/image-library', icon: <FaImages />, color: 'bg-purple-600', label: 'Images' }
];

const CurvedMenu = ({ isOpen, setIsOpen }: CurvedMenuProps) => {
  const radius = isOpen ? 150 : 0;
  const angleStep = Math.PI / (menuItems.length - 1);

  return (
    <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center 
          text-white text-xl shadow-lg hover:bg-gray-700 transition-all duration-300 mb-4"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {menuItems.map((item, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              return (
                <motion.div
                  key={item.path}
                  className="absolute flex items-center"
                  style={{
                    x: x,
                    y: y,
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center 
                      text-white text-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {item.icon}
                  </Link>
                  <span className="ml-2 text-white text-sm font-semibold">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurvedMenu;