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