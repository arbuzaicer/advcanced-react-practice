import { AnimatePresence } from "framer-motion";
import { createContext, useCallback, useEffect, useState } from "react";

import TextField from "./components/TextField/TextField";
import TodoSingle from "./components/TodoSingle/TodoSingle";
import { getLocalTodos } from "./utils/functions";

export const AppContext = createContext();

function App() {
  const [todos, setTodos] = useState(null);
  const [goToStorageForUpdates, setGoToStorageForUpdates] = useState(false);

  const getUpdates = () => {
    getLocalTodos().then((res) => {
      setTodos(res);
      setGoToStorageForUpdates(false);
    });
  };

  const renderTodos = useCallback(() => {
    if (!todos) {
      return null;
    }

    return (
      <div style={{ marginTop: 70 }}>
        <AnimatePresence>
          {todos.map((el, index) => {
            return <TodoSingle key={el.id} index={index} {...el} />;
          })}
        </AnimatePresence>
      </div>
    );
  }, [todos]);

  useEffect(() => {
    getUpdates();
  }, []);

  useEffect(() => {
    if (goToStorageForUpdates) {
      getUpdates();
    }
  }, [goToStorageForUpdates]);

  return (
    <AppContext.Provider
      value={{
        todos,
        setGoToStorageForUpdates,
      }}
    >
      <TextField />

      {renderTodos()}
    </AppContext.Provider>
  );
}

export default App;
