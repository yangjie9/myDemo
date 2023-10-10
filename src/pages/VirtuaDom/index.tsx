import { useEffect, useRef } from 'react';
import { AutoSizer, List, ScrollSync } from 'react-virtualized';

const MyComponent = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      // Set scrollTop to a very large value
      list.scrollToPosition(999999);
    }
  }, []);

  const rowRenderer = ({ index, key, style }) => {
    // Render your list rows here
    return (
      <div key={key} style={style}>
        Row {index}
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '84vh' }}>
      <ScrollSync>
        {({ clientHeight }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={listRef}
                width={width}
                height={height}
                rowCount={1000}
                rowHeight={30}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        )}
      </ScrollSync>
    </div>
  );
};

export default MyComponent;
