import { groupName } from "../context/Namecontext";
import React, { useState, useContext, useEffect } from "react";
import styles from "./Homepage.module.css";
import Leftside from "../components/Leftside";
import { MdSend } from "react-icons/md";

export default function Homepage() {
  const {
    groups,
    selectedGroup,
    addNoteToGroup,
    messageInput,
    setMessageInput,
    setselectedGroup,
  } = useContext(groupName);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      addNoteToGroup(selectedGroup.id, messageInput.trim());
      setMessageInput("");
    }
  };
  useEffect(() => {
    if (selectedGroup) {
      const updatedGroup = groups.find(
        (group) => group.id === selectedGroup.id
      );
      setselectedGroup(updatedGroup);
    }
  }, [groups, selectedGroup, setselectedGroup]);

  return (
    <div className={styles.container}>
      <Leftside />

      <div className={styles.contentmsg}>
        {selectedGroup ? (
          <div className={styles.inputContent}>
            <div
              className={styles.groupHeader}
              style={{ backgroundColor: selectedGroup.backgroundColor }}
            >
              <p>{selectedGroup.initials}</p>
              <h2>{selectedGroup.groupName}</h2>
            </div>

            <div className={styles.messages}>
              {selectedGroup.data && selectedGroup.data.length > 0 ? (
                selectedGroup.data.map((message, index) => (
                  <div key={index} className={styles.message}>
                    {message.messageInput}
                    <div className={styles.date}>
                      <span>
                        {new Date(message.timestamp).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span> • </span>
                      <span>
                        {new Date(message.timestamp).toLocaleString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No messages yet</p>
              )}
            </div>

            <div className={styles.messageInput}>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Enter your text here..........."
                style={{
                  border: `20px solid ${selectedGroup.backgroundColor}`,
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{ color: selectedGroup.backgroundColor }}
                disabled={!messageInput.trim()}
              >
                <MdSend

                // color={!note.trim() ? '#CCCCCC' : selectedGroup.selectedColor}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.insideContentmsg}>
            <div className={styles.imagecontent}>
            <img src="./images/image1.png" alt="homeimage" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
            </div>
          
            <div className={styles.footer}>
              <img src="./images/Vector.png" alt="" />
              <p>end-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
