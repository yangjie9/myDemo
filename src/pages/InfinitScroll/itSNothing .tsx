<div key={key} style={style} onLoad={measure}>
            {allMsgList[index]?.timerId ? (
              <div className={styles.timeLine}>
                <span className={styles.timeLineInner}>
                  {this.renderTime(allMsgList[index]?.timerId)}
                </span>
              </div>
            ) : (
              <Message
                // groupTime={g}
                message={allMsgList[index]}
                key={allMsgList[index].mid}
                // todo: intersection
                // addObserve={addObserve}
                handleContextMenu={this.handleMessageAction}
                {...renderStyle(allMsgList, index, uiSetting)}
              />
            )}
          </div>


{messages.map((item, index) => (
  <div style={{ padding: 20 }} key={item.id || item.timerId} id={item.mid || item.timerId}>
  {!item?.timerId ? (
    <div style={{
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
        <h3>用户名：</h3>
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
              {item?.content?.text}
            </div>
          )}
          {item?.content?.text}
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
))}



timeSortByMessageList(messageList) {
  console.log("🚀 ~ file: chat.js:268 ~ Chat ~ timeSortByMessageList ~ messageList:", messageList)
  // const messageList = self.currentMessageList;
  // const local = settings.locale;
  // moment.updateLocale(local);
  const timerMessageList=[]
  const groupedArr = groupBy(
    messageList.filter((msg) => msg && !MessageDeleteStatus.isDelete(msg.deleteFlag)),
    (item) => moment(item.displayTime).format("YYYYMMDD")
  );

  // sort
  const keys = sortBy(Object.keys(groupedArr), function (o) {
    return moment(o);
  });

  keys.forEach((key) => {
    groupedArr[key] = groupedArr[key].sort((a, b) => {
      return a.id - b.id;
    });
  });

  for (const time in groupedArr) {
    const timeArrMessage = groupedArr[time];
    timerMessageList.unshift({ timerId: time}, ...timeArrMessage );
  }
  console.log("🚀 ~ file: chat.js:293 ~ Chat ~ groupedArr[key]=groupedArr[key].sort ~ groupedArr:", timerMessageList)
  // let allMsgList = self.currentMessageList;
  return timerMessageList;
}