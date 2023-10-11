import { InfiniteLoader, List } from 'react-virtualized';

const MyListComponent = () => {
  const totalRowCount = 1000; // 列表总行数

  const isRowLoaded = ({ index }) => {
    // 根据 index 判断某一行的数据是否已加载
    // 返回 true 表示数据已加载，返回 false 表示数据尚未加载
  };

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    // 在这里触发加载数据的操作，通常调用 fetchData 函数
    // 根据 startIndex 和 stopIndex 倒序获取数据
    return fetchData({
      startIndex: totalRowCount - 1 - stopIndex,
      stopIndex: totalRowCount - 1 - startIndex,
    });
  };

  const rowRenderer = ({ index, key, style }) => {
    // 根据 index 渲染对应的行组件
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={totalRowCount} // 列表总行数
      threshold={10} // 提前触发加载的阈值
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          rowCount={totalRowCount} // 列表总行数
          rowHeight={30} // 列表项高度
          rowRenderer={rowRenderer}
          width={300} // 列表宽度
          height={500} // 列表高度
          onRowsRendered={onRowsRendered} // 渲染完成的回调函数
          ref={registerChild} // 注册子组件的引用
          scrollToIndex={totalRowCount - 1} // 滚动到列表的尾部
          scrollToAlignment="start" // 对齐方式
        />
      )}
    </InfiniteLoader>
  );
};

export default MyListComponent;
