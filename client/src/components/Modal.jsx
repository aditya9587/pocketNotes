import React, { useRef, useContext } from "react";
import Style from "./Modal.module.css";
import { groupName } from "../context/Namecontext";
import colorOptions from "../data/color";

export default function Modal({ onClose }) {
  const modalref = useRef();

  //destructure of context api state
  const { inputName, setinputName, bgColor, setBgColor, groups, setGroups } =
    useContext(groupName);

  const getInitials = (groupName) => {
    if (!groupName) return "";
    const words = groupName.split(" ");
    if (words.length === 1) {
      // If there's only one word, return the first two letters
      return words[0].slice(0, 2).toUpperCase();
    } else {
      // If there are multiple words, return the initials of the first two words
      return words
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!bgColor){
      alert("plese select any one color");
    }
    const initial = getInitials(inputName);

    // Create a new group object
    const newGroup = {
      id: groups.length+1,
      groupName: inputName,
      initials: initial,
      backgroundColor: bgColor,
      data: []
    };
    onClose();
    // Add the new group to the list of groups
    setGroups([...groups, newGroup]);

    // Clear form fields after submission
    setinputName("");
    setBgColor("");
  };

  const closemodal = (e) => {
    if (modalref.current === e.target) {
      onClose();
    }
  };

  return (
    <div ref={modalref} onClick={closemodal} className={Style.container}>
      <div className={Style.insideContainer}>
        <h2>Create new Group</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name1">
            Group name 
            <input
              type="text"
              name="name1"
              id="name1"
              placeholder="Enter group name"
              required
              value={inputName}
              className={Style.nameInput}
              onChange={(e) => setinputName(e.target.value)}
            />
          </label>

          <div className={Style.colorOption}>
            <p>Choose color</p>
            <div className={Style.colorList}>
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className={`${Style.colorCircle} ${
                    bgColor === color ? Style.selected : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBgColor(color)}
                />
              ))}
            </div>
          </div>

          <button type="submit" className={Style.button}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
