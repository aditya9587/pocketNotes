import React, { createContext, useEffect, useState } from "react";

//creating the contextapi and exporting
export const groupName = createContext();

export default function Namecontext({ children }) {
  const [inputName, setinputName] = useState();
  const [bgColor, setBgColor] = useState();
  const [selectedGroup, setselectedGroup] = useState();
  const [messageInput, setMessageInput] = useState("");

  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups")) || []
  );

  const addNoteToGroup=(id,messageInput)=>{
    setGroups(prevGroups=>{
        return prevGroups.map(group=>{
            if (group.id === id) {
                const updatedNotes = [...(group.data||[]),{ messageInput, timestamp: new Date().toISOString() }];
                return { ...group, data: updatedNotes };
            }
            return group;
        })
    })
}
  // to store the group data in local storage and update whwn new data come in groups state
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);


  return (
    <groupName.Provider
      value={{
        inputName,
        setinputName,
        bgColor,
        setBgColor,
        groups,
        setGroups,
        selectedGroup, 
        setselectedGroup,
        addNoteToGroup,
        messageInput, 
        setMessageInput
      }}
    >
      {children}
    </groupName.Provider>
  );
}
