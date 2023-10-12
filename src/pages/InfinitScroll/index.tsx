import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import msgsList from './data.json';
import styles from './index.less';
console.log('🚀 ~ file: index.tsx:4 ~ messages:', msgsList);

function Chat() {
  const [msgList, setMsgList] = useState(msgsList);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据可加载
  const [isFetching, setIsFetching] = useState(false); // 是否正在加载数据
  const [bottomMore, setBottomMore] = useState(false); 
  const [isToIndex, setIsToIndex] = useState(false); // 跳转引用

  const scrollRef = useRef(null);
  const infiniteBox = useRef(null);
  const topRef = useRef(null); // 顶部观察器引用
  const bottomRef = useRef(null); // 底部观察器引用

  // 截取数据
  const getMessage = (startIndex:number, endIndex:number,data:any[])=>{
    if(startIndex>=0){
      return data.slice(startIndex, endIndex)
    }
  }
  // 顶部滚动
  const fetchMoreMessages = () => {
    if (
      messages[messages.length - 1]?.mid === msgList[msgList.length - 1].mid
    ) {
      setHasMore(false);
      return;
    }
    // 模拟获取更多消息的异步操作
    // 例如，使用API请求获取下一页的聊天消息
      if (!messages.length) {
        const newMessages = getMessage(0, 20, msgList);
        setMessages([...newMessages]);
        setTimeout(()=>scrollRef.current.scrollTop=0,100)
      } else {
        const startIndex = msgList.findIndex(
          (item) => item.mid === messages[messages.length - 1].mid,
        );
        const newMessages = getMessage(startIndex + 1, startIndex + 21, msgList)
        setMessages([...messages, ...newMessages]);
      }
  };

  // 底部滚动
  const bottomMessages = () => {
    if (messages[0]?.mid === msgList[0].mid) return;
    // 模拟获取更多消息的异步操作
    // 例如，使用API请求获取下一页的聊天消息
      if (!messages.length) {
        const newMessages =  getMessage(0, 20, msgList);
        setMessages([...newMessages]);
      } else {
        const endIndex = msgList.findIndex(
          (item) => item.mid === messages[0].mid,
        );
        const startIndex = endIndex - 10 > 0 ? endIndex - 10 : 0;
        const newMessages = getMessage(startIndex, endIndex, msgList);
        setMessages([...newMessages, ...messages]);
        setTimeout(() => {
          scrollRef.current.scrollTop=-24
        }, 100);
      }
  };

  useEffect(() => {
    // 初始化加载一些聊天消息
    fetchMoreMessages();
  }, [msgList]);

  // 创建顶部和底部观察器并监听触发
  // useEffect(() => {
  //   let topObserver:any,bottomObserver:any;
  //     topObserver = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting && isFetching === false && messages.length > 0) {
  //       console.log('🚀 ~ file: index.tsx:43 ~ 底部监听触发:');
  //       bottomMessages();
  //       setIsFetching(true);
  //       // fetchData();
  //     }
  //   });

  //   bottomObserver = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting && isFetching === false && hasMore) {
  //       console.log('🚀 ~ file: index.tsx:43 ~ 顶部监听触发:');
  //       // setIsFetching(true);
  //       // fetchData();
  //     }
  //   });
   

  //   if (topRef.current&& topObserver) {
  //     topObserver?.observe(topRef.current);
  //   }

  //   if (bottomRef.current&& bottomObserver) {
  //     bottomObserver.observe(bottomRef.current);
  //   }

  //   return () => {
  //     if (topRef.current) {
  //       topObserver.unobserve(topRef.current);
  //     }

  //     if (bottomRef.current) {
  //       bottomObserver.unobserve(bottomRef.current);
  //     }
  //   };
  // }, [isFetching, hasMore]);

  // 截取数据
  const getCenter = (mid) => {
    const accIndex = msgList.findIndex((item) => item.mid === mid);
    if(accIndex!==-1){
      const startIndex = accIndex - 20 > 0 ? accIndex - 20 : 0;
    const former = getMessage(startIndex, accIndex, msgList);
    const after = getMessage(accIndex, accIndex + 20, msgList);
    setMessages([...former, ...after]);
    setTimeout(() => {
      scrollToItem(mid);
    }, 100);
    }else{
      setIsToIndex(false)
    }
    
  };

  // 根据mid跳转
  const scrollToItem = (mid) => {
    // const hasItem = messages.some((item) => item.mid === mid);
    if (scrollRef.current) {
      setIsToIndex(true);
      const itemElement = scrollRef.current.querySelector(`[id="${mid}"]`);
      if (itemElement) {
        itemElement.className = '';
        itemElement.classList.add(styles.myElement);
        // itemElement.style.animation = 'none';
        // void itemElement.offsetWidth; // 强制页面重新计算元素样式
        // itemElement.style.animation = 'changeColor 3s infinite';
        itemElement.scrollIntoView({ behavior: 'smooth' });
        setTimeout(()=>setIsToIndex(false),1000);
      } else {
        getCenter(mid);
      }
    }
  };

  const handleScroll = () => {
    const scrollTop = infiniteBox.current.lastScrollTop;
    if(Math.abs(Math.floor(scrollTop))>20) return;
    console.log('跳转',isToIndex)
    if(!isToIndex){
      if(msgList[0].mid !== messages[0]?.mid){
        console.log('非最后一条数据')
        setBottomMore(true)
        bottomMessages()
      }else{
        console.log('最后一条数据')
        setBottomMore(false)
      }
    };
   
   
  };

  return (
    <div>
      <div
        ref={scrollRef}
        id="scrollableDiv"
        style={{
          height: 500,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <div ref={topRef} />
        {/* Put the scroll bar always on the bottom */}
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreMessages}
          style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column-reverse',
          }} //To put endMessage and loader to the top.
          inverse={true}
          hasMore={hasMore}
          loader={<h4>加载更多...</h4>}
          scrollableTarget="scrollableDiv"
          scrollThreshold={10} // 触发加载数据的阈值
          ref={infiniteBox}
          onScroll={handleScroll}
        >
          {bottomMore && <h4>加载更多...</h4>}
          {messages.map((item, index) => (
            <p key={item.mid} id={item.mid}>
              {item.mid}: {item?.content?.text}
            </p>
          ))}
        </InfiniteScroll>
        <div ref={bottomRef} />
          
      </div>
      {/* ebb7ddedab93904d  fd51f3e6ae3775fb */}
      <button type="button" onClick={() => scrollToItem('5cb935d6f246a79820ede6fc121ad36b')}>
        跳转1
      </button>
      <button type="button" onClick={() => scrollToItem('77e45ea51b03573fdeb7e511a014c1c2')}>
        跳转2
      </button>
      {/* <button type="button" onClick={() => setMsgList([{mid: new Date().toISOString(), content:{text:'新添加的数据'}},...msgList])}>
        新消息
      </button> */}
    </div>
  );
}

export default Chat;
