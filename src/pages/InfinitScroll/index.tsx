import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import msgList from './data.json';
import styles from './index.less';
console.log('🚀 ~ file: index.tsx:4 ~ messages:', msgList);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据可加载
  const [isFetching, setIsFetching] = useState(false); // 是否正在加载数据

  const scrollRef = useRef(null);
  const topRef = useRef(null); // 顶部观察器引用
  const bottomRef = useRef(null); // 底部观察器引用

  // 顶部滚动
  const fetchMoreMessages = () => {
    if (
      messages[messages.length - 1]?.mid === msgList[msgList.length - 1].mid
    ) {
      setHasMore(false);
      return;
    }
    const arr = [1, 2, 3, 4, 5];
    console.log('🚀 ~ file: index.tsx:18 ~ arr:', arr.pop());
    // 模拟获取更多消息的异步操作
    // 例如，使用API请求获取下一页的聊天消息
    setTimeout(() => {
      if (!messages.length) {
        const newMessages = msgList.slice(0, 20);
        setMessages([...newMessages]);
      } else {
        console.log(messages[messages.length - 1]);
        const startIndex = msgList.findIndex(
          (item) => item.mid === messages[messages.length - 1].mid,
        );
        console.log('🚀 ~ file: index.tsx:30 ~ startIndex:', startIndex);
        const newMessages = msgList.slice(startIndex + 1, startIndex + 21);
        setMessages([...messages, ...newMessages]);
      }
    }, 1000);
  };

  // 底部滚动
  const bottomMessages = () => {
    // if (messages[0]?.mid === msgList[0].mid) return;
    // 模拟获取更多消息的异步操作
    // 例如，使用API请求获取下一页的聊天消息
    setTimeout(() => {
      if (!messages.length) {
        const newMessages = msgList.slice(0, 20);
        setMessages([...newMessages]);
      } else {
        const endIndex = msgList.findIndex(
          (item) => item.mid === messages[0].mid,
        );
        console.log('🚀 ~ file: index.tsx:30 ~ startIndex:', endIndex);
        const newMessages = msgList.slice(endIndex - 20, endIndex);
        console.log('🚀 ~ file: index.tsx:55 ~ newMessages:', newMessages);
        setMessages([...newMessages, ...messages]);
        setIsFetching(false);
      }
    }, 1000);
  };

  useEffect(() => {
    // 初始化加载一些聊天消息
    fetchMoreMessages();
  }, []);

  useEffect(() => {
    console.log('🚀 ~ file: index.tsx:29 ~ messages:', messages);
    // 聊天消息列表变化时，将滚动条滚动到底部
    if (scrollRef.current) {
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  // 创建顶部和底部观察器并监听触发
  useEffect(() => {
    const topObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && isFetching === false && messages.length > 0) {
        console.log('🚀 ~ file: index.tsx:43 ~ 底部监听触发:');
        bottomMessages();
        setIsFetching(true);
        // fetchData();
      }
    });

    const bottomObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && isFetching === false && hasMore) {
        console.log('🚀 ~ file: index.tsx:43 ~ 顶部监听触发:');

        // setIsFetching(true);
        // fetchData();
      }
    });

    if (topRef.current) {
      topObserver.observe(topRef.current);
    }

    if (bottomRef.current) {
      bottomObserver.observe(bottomRef.current);
    }

    return () => {
      if (topRef.current) {
        topObserver.unobserve(topRef.current);
      }

      if (bottomRef.current) {
        bottomObserver.unobserve(bottomRef.current);
      }
    };
  }, [messages, isFetching, hasMore]);

  const getCenter = (mid) => {
    const accIndex = msgList.findIndex((item) => item.mid === mid);
    const former = msgList.slice(accIndex - 20, accIndex);
    const after = msgList.slice(accIndex, accIndex + 20);
    setMessages([...former, ...after]);
    setTimeout(() => {
      scrollToItem(mid);
    }, 500);
  };

  const scrollToItem = (mid) => {
    // const hasItem = messages.some((item) => item.mid === mid);
    if (scrollRef.current) {
      const itemElement = scrollRef.current.querySelector(`[id="${mid}"]`);
      console.log('🚀 ~ file: index.tsx:85 ~ itemElement:', itemElement);
      if (itemElement) {
        itemElement.className = '';
        itemElement.classList.add(styles.myElement);
        // itemElement.style.animation = 'none';
        // void itemElement.offsetWidth; // 强制页面重新计算元素样式
        // itemElement.style.animation = 'changeColor 3s infinite';
        itemElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        getCenter(mid);
      }
    }
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
        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreMessages}
          style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column-reverse',
          }} //To put endMessage and loader to the top.
          inverse={true} //
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {messages.map((item, index) => (
            <p key={item.mid} id={item.mid}>
              {item.mid}: {item?.content?.text}
            </p>
          ))}
        </InfiniteScroll>
        <div ref={bottomRef} />
      </div>
      {/* ebb7ddedab93904d  fd51f3e6ae3775fb */}
      <button type="button" onClick={() => scrollToItem('ebb7ddedab93904d')}>
        跳转
      </button>
    </div>
  );
}

export default Chat;
