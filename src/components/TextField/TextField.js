import React, { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AppContext } from "../../App";
import styles from "./TextField.module.scss";
import { ENTER_KEY_CODE } from "../../utils/constants";
import { setLocalTodos } from "../../utils/functions";

const TextField = () => {
  const { todos, setGoToStorageForUpdates } = useContext(AppContext);

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onTodoAdd = useCallback(
    (e) => {
      const trimmedValue = value.trim();
      if (e.key === ENTER_KEY_CODE && isFocused && trimmedValue) {
        const currentDate = new Date();

        const todoItem = {
          id: uuidv4(),
          selected: false,
          date: currentDate,
          title: trimmedValue,
        };

        setLocalTodos([...todos, todoItem]).then(() => {
          setGoToStorageForUpdates(true);
        });

        setValue("");
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, isFocused, todos]
  );

  useEffect(() => {
    window.addEventListener("keydown", onTodoAdd);

    return () => {
      window.removeEventListener("keydown", onTodoAdd);
    };
  }, [onTodoAdd]);

  return (
    <input
      value={value}
      className={styles["input"]}
      onChange={handleChange}
      onFocus={setIsFocused.bind(null, true)}
      onBlur={setIsFocused.bind(null, false)}
    />
  );
};

export default TextField;
