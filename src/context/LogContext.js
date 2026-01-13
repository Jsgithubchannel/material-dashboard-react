/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createContext, useContext, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";

// Log Context
const LogContext = createContext();

// Setting custom name for the context which is visible on react dev tools
LogContext.displayName = "LogContext";

// Log Context Provider
function LogProvider({ children }) {
  const [logs, setLogs] = useState([]);
  const maxLogs = 100; // Maximum number of logs to keep
  const logIdCounterRef = useRef(0);

  const addLog = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: logIdCounterRef.current++,
      timestamp,
      message: `[${timestamp}] ${message}`,
    };
    
    setLogs((prevLogs) => {
      const newLogs = [logEntry, ...prevLogs];
      // Keep only the last maxLogs entries
      return newLogs.slice(0, maxLogs);
    });
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const value = {
    logs,
    addLog,
    clearLogs,
  };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}

// Custom hook for using LogContext
function useLog() {
  const context = useContext(LogContext);

  if (!context) {
    throw new Error("useLog must be used within a LogProvider");
  }

  return context;
}

// Typechecking props for the LogProvider
LogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LogProvider, useLog };
