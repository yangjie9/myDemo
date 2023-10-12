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