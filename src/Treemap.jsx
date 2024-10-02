import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

import { calculateLayout, normalizeData } from './utils';

const Treemap = ({ data, width = 500, height = 500, options = {} }) => {
  const padding = options.boxSpacing || 0;

  const normalizedData = normalizeData(data);
  const layout = calculateLayout(normalizedData, 0, 0, width, height, padding);

  return (
    <AnimatePresence>
      <svg width='100%' height='100%' viewBox={`0 0 ${width} ${height}`}>
        <rect
          x='0'
          y='0'
          width={width}
          height={height}
          rx={options.containerBorderRadius || 0}
          ry={options.containerBorderRadius || 0}
          fill={options.containerBackgroundColor || 'transparent'}
        />
        {layout.map((item) => (
          <motion.g
            key={item.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}>
            <motion.rect
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.1 },
              }}
              initial={false}
              animate={{
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
                fill: item.color || options.defaultColor || 'grey',
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              stroke={options.strokeColor || 'white'}
              strokeWidth={options.strokeWidth || 1}
              rx={options.boxBorderRadius || 0}
              ry={options.boxBorderRadius || 0}
            />
            <motion.text
              initial={false}
              animate={{
                x: item.x + item.width / 2,
                y: item.y + item.height / 2,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              textAnchor='middle'
              dominantBaseline='central'
              fill={options.textColor || 'black'}
              fontSize={options.fontSize || 14}
              style={{ pointerEvents: 'none' }}>
              {item.name}
            </motion.text>
          </motion.g>
        ))}
      </svg>
    </AnimatePresence>
  );
};

Treemap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  options: PropTypes.object,
};

export default Treemap;
