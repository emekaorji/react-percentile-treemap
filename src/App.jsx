import { useEffect, useState } from 'react';
import Treemap from './Treemap';

const data1 = [
  { name: 'Pineapple', percentage: 100, color: 'blue' },
  { name: 'Avocado', percentage: 100, color: 'gray' },
  { name: 'Bananas', percentage: 100, color: 'pink' },
  { name: 'Oranges', percentage: 100, color: 'red' },
  { name: 'Berries', percentage: 100, color: 'brown' },
  { name: 'Pear', percentage: 100, color: 'purple' },
  { name: 'Apples', percentage: 100, color: 'green' },
  { name: 'Guava', percentage: 100, color: 'green' },
];

const data2 = [
  { name: 'Pineapple', percentage: 46, color: 'blue' },
  { name: 'Avocado', percentage: 10, color: 'gray' },
  { name: 'Bananas', percentage: 11, color: 'pink' },
  { name: 'Oranges', percentage: 13, color: 'red' },
  { name: 'Berries', percentage: 15, color: 'brown' },
  { name: 'Pear', percentage: 5, color: 'purple' },
  { name: 'Apples', percentage: 20, color: 'green' },
];

const App = () => {
  const [data, setData] = useState(data1);

  useEffect(() => {
    setTimeout(() => {
      setData(data2);
    }, 5000);
  }, []);

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <Treemap
        data={data}
        options={{
          defaultColor: '#ccc',
          strokeColor: '#fff',
          textColor: '#000',
          fontSize: 16,
          containerBorderRadius: 12.5,
          boxBorderRadius: 10,
          boxSpacing: 5,
          containerBackgroundColor: '#f0f0f0',
        }}
      />
    </div>
  );
};

export default App;
