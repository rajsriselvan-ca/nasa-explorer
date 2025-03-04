import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem } from '../types/menuItem_types';
import { FaSatellite, FaMars, FaGlobe, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';
import {CurvedMenuProps} from '../types/curvedMenuProps_types';

const menuItems: MenuItem[] = [
  { name: 'APOD', path: '/apod', icon: <FaSatellite />, color: 'bg-blue-600', label: 'APOD' },
  { name: 'Mars Rover', path: '/mars-rover', icon: <FaMars />, color: 'bg-red-600', label: 'MarsRover' },
  { name: 'EPIC', path: '/epic', icon: <FaGlobe />, color: 'bg-green-600', label: 'EPIC' },
  { name: 'Charts', path: '/charts', icon: <FaChartBar />, color: 'bg-purple-600', label: 'Charts' }
];

const CurvedMenu: React.FC<CurvedMenuProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const labelColorClass = location.pathname === '/charts' ? 'text-black' : 'text-white';

  const radius = isOpen ? 150 : 0;
  const angleStep = Math.PI / (menuItems.length - 1);

  return (
    <div className="fixed left-4 top-[32vh] sm:top-[50vh] lg:top-[50vh] transform -translate-y-1/2 z-50 safe-area-left"> {/* Use vh for vertical centering */}
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
                  <motion.span
                    className={`ml-2 ${labelColorClass} text-sm font-semibold`}
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {item.label}
                  </motion.span>
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