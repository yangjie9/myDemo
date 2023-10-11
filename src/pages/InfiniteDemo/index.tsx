import { useState } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
} from 'react-virtualized';
import msgs from './data.json';

function InfiniteList() {
  const [messages, setMessages] = useState(msgs.slice(0, 50).reverse());
  const totalMessageCount = msgs.length;

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 'auto',
  });

  function isRowLoaded({ index }) {
    return !!messages[index];
  }

  function loadMoreRows({ startIndex, stopIndex }) {
    console.log('🚀 ~ startIndex, stopIndex:', startIndex, stopIndex);
    // setMessages(msgs.slice(startIndex, stopIndex));
    // console.log(
    //   '🚀 ~ msgs.slice(startIndex, stopIndex):',
    //   msgs.slice(startIndex, stopIndex),
    // );
    console.log('🚀🚀🚀', msgs.length - 1 - stopIndex);
    console.log('🚀🚀🚀', msgs.length - 1 - startIndex);

    // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    //   .then(response => {
    //     // Store response data in list...
    //   })
  }

  function rowRenderer({ key, index, style }) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div key={key} style={style}>
          {messages[index]?.content?.text}-----------
          {index + 1}
        </div>
      </CellMeasurer>
    );
  }

  return (
    <div style={{ height: 500 }}>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={totalMessageCount} // 聊天消息总数
        threshold={10} // 触发加载的阈值
      >
        {({ onRowsRendered, registerChild }) => (
          <List
            width={300} // 列表宽度
            height={500} // 列表高度
            rowCount={messages.length} // 聊天消息总数
            rowHeight={cache.rowHeight} // 聊天消息项的高度
            rowRenderer={rowRenderer}
            deferredMeasurementCache={cache}
            onRowsRendered={onRowsRendered} // 渲染完成的回调函数
            ref={registerChild} // 注册子组件的引用
            scrollToIndex={totalMessageCount - 1} // 滚动到最新消息
            scrollToAlignment="end" // 对齐方式
          />
        )}
      </InfiniteLoader>
    </div>
  );
}

export default InfiniteList;
