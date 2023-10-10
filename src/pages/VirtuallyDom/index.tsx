import { UserOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { Avatar, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ScrollSync,
} from 'react-virtualized';

function VirtuallyDom() {
  const [listData, setListData] = useState([]);

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 10,
    }),
  );
  const listRef = useRef();

  useEffect(() => {
    const newData = [];
    for (let i = 0; i < 309; i++) {
      newData.push({
        id: `id${i}`,
        name: `${faker.person.firstName()}-${faker.person.lastName()}`,
        desc: faker.lorem.lines(Math.random() * 20),
      });
    }

    setListData(newData);
  }, []);

  const addItem = () => {
    const newItem = {
      id: `id${listData.length + 1}`,
      name: `${faker.person.firstName()}-${faker.person.lastName()}`,
      desc: faker.lorem.lines(Math.random() * 10),
    };
    setListData([...listData, newItem]);
  };

  const itemStyle = { flexDirection: 'row-reverse', textAlign: 'right' };
  const renderItem = ({ index, key, style, parent, isScrolling }) => {
    return (
      <CellMeasurer
        cache={cache.current}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div style={{ ...style, padding: 20 }}>
          {index % 9 !== 0 ? (
            <div
              style={{
                display: 'flex',
                gap: 8,
                ...(index % 6 === 0 ? itemStyle : {}),
              }}
            >
              <div>
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              </div>
              <div>
                <h3>{listData[index].name}</h3>
                <div
                  style={{
                    background: '#eee',
                    padding: '10px 15px',
                    borderRadius: 10,
                  }}
                >
                  {index % 5 === 0 && (
                    <div
                      style={{
                        background: '#f6f6f6',
                        padding: '10px 15px',
                        borderRadius: 10,
                      }}
                    >
                      {listData[index].desc}
                    </div>
                  )}
                  {listData[index].desc}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 10, textAlign: 'center' }}>
              <span
                style={{
                  background: '#eee',
                  padding: '5px 15px',
                  borderRadius: 20,
                }}
              >
                {new Date().toJSON()}
              </span>
            </div>
          )}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <>
      <h2>VirtuallyDom</h2>
      <div>
        <Button type={'primary'} onClick={addItem}>
          添加
        </Button>
      </div>
      <div style={{ width: '100%', height: '84vh' }}>
        <ScrollSync>
          {({ clientHeight }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  ref={listRef}
                  width={width}
                  height={height}
                  keyMapper={(index) => listData[index].id}
                  rowCount={listData.length}
                  rowHeight={cache.current.rowHeight}
                  deferredMeasurementCache={cache.current}
                  scrollToRow={setTimeout(() => {
                    listRef.current?.scrollToRow(listData.length - 1);
                    if (listRef) {
                      // listRef.current?.scrollToRow(listData.length - 1);
                    }
                  }, 100)}
                  rowRenderer={renderItem}
                />
              )}
            </AutoSizer>
          )}
        </ScrollSync>
      </div>
    </>
  );
}

export default VirtuallyDom;
