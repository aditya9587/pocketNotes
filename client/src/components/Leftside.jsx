import React, { useState, useContext } from "react";
import { groupName } from "../context/Namecontext";
import Modal from "./Modal";
import styles from "./Leftside.module.css"

export default function Leftside() {
  const { groups, setselectedGroup } = useContext(groupName);
  const [visible, setVisible] = useState(false);

  function handelGroupclick(group){
    setselectedGroup(group)
  }

  return (
    <div className={styles.groupName}>
    <h2>Pocket Notes</h2>
    <div className={styles.groupList}>
      {groups.length > 0 && (
        <>
          {groups.map((group, index) => (
            <div
              key={index}
              className={styles.name}
              onClick={()=> handelGroupclick(group) }
            >
              <div
                style={{ backgroundColor: group.backgroundColor }}
                className={styles.initials}
              >
                {group.initials}
              </div>
              <div>{group.groupName}</div>
            </div>
          ))}
        </>
      )}
    </div>

    <button onClick={() => setVisible(true)} className={styles.bluebutton}>
      +
    </button>

    {visible && <Modal onClose={() => setVisible(false)} />}
  </div>
  )
}
