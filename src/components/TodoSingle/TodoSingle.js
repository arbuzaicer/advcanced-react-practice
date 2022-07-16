import { formatRelative } from "date-fns";
import { motion } from "framer-motion";

import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "../../App";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import SubmitIcon from "../icons/SubmitIcon";
import styles from "./TodoSingle.module.scss";
import { setLocalTodos } from "../../utils/functions";

const TodoSingle = ({ date, id, selected, title, index }) => {
  const { todos, setGoToStorageForUpdates } = useContext(AppContext);

  const inputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitChanges = () => {
    const currentDate = new Date();

    const todosCopy = [...todos];
    todosCopy[index].title = inputValue;
    todosCopy[index].date = currentDate;

    setLocalTodos(todosCopy).then(() => {
      setGoToStorageForUpdates(true);
      setIsEditing(false);
    });
  };

  const handleRemove = () => {
    const filteredTodos = todos.filter((el) => el.id !== id);

    setLocalTodos(filteredTodos).then(() => {
      setGoToStorageForUpdates(true);
      setIsEditing(false);
    });
  };

  const handleChacked = (e) => {
    const todosCopy = [...todos];
    todosCopy[index].selected = e.target.checked;

    setLocalTodos(todosCopy).then(() => {
      setGoToStorageForUpdates(true);
    });
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <motion.div
      layout
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
      className={styles.single}
      onHoverStart={setIsHovered.bind(null, true)}
      onHoverEnd={setIsHovered.bind(null, false)}
    >
      <input
        type="checkbox"
        checked={selected}
        className={styles.checkbox}
        onChange={handleChacked}
      />

      <div className={styles.content}>
        {isEditing ? (
          <div className={styles["edit-input"]}>
            <input ref={inputRef} value={inputValue} onChange={handleChange} />
            <SubmitIcon onClick={handleSubmitChanges} />
          </div>
        ) : (
          <p className={styles.title}>{title}</p>
        )}

        <p className={styles.date}>
          {formatRelative(new Date(date), new Date())}
        </p>
      </div>

      <motion.div
        initial={{
          x: "200%",
          opacity: 0,
        }}
        animate={{
          x: isHovered ? 0 : "200%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",

          stiffness: 100,
        }}
        className={styles.actions}
      >
        <EditIcon onClick={setIsEditing.bind(null, !isEditing)} />
        <TrashIcon onClick={handleRemove} />
      </motion.div>
    </motion.div>
  );
};

export default TodoSingle;
