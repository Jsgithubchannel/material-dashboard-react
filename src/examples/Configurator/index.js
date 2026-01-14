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

import { useEffect, useRef } from "react";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import { useMaterialUIController, setOpenConfigurator } from "context";

// Log Context
import { useLog } from "context/LogContext";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, darkMode } = controller;
  const { logs, clearLogs } = useLog();
  const logContainerRef = useRef(null);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        sx={{
          backgroundColor: "#1a1a1a",
          minHeight: "100vh",
          color: "#00ff00",
        }}
      >
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
            <MDTypography variant="h5" sx={{ color: "#ffffff !important" }}>
              System Log Console
            </MDTypography>
            <MDTypography variant="body2" sx={{ color: "#00ff00 !important" }}>
              Developer Mode - Microservices Architecture
          </MDTypography>
        </MDBox>

        <Icon
            sx={({ typography: { size } }) => ({
            fontSize: `${size.lg} !important`,
              color: "#00ff00",
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

          <MDBox
        pt={2}
        pb={3}
        px={3}
            sx={{
          height: "calc(100vh - 120px)",
              display: "flex",
          flexDirection: "column",
        }}
            >
        <MDBox
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="body2" sx={{ color: "#00ff00 !important" }}>
            {logs.length} log entries
          </MDTypography>
          <MDButton
            variant="outlined"
            color="success"
            size="small"
            onClick={clearLogs}
            sx={{
              borderColor: "#00ff00",
              color: "#00ff00",
              "&:hover": {
                borderColor: "#00ff00",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
              },
            }}
          >
            Clear Logs
          </MDButton>
        </MDBox>

        <MDBox
          ref={logContainerRef}
          sx={{
            flex: 1,
            backgroundColor: "#000000",
            borderRadius: "4px",
            padding: "16px",
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#00ff00",
            overflowY: "auto",
            overflowX: "hidden",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#1a1a1a",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#00ff00",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#00cc00",
            },
          }}
        >
          {logs.length === 0 ? (
            <MDTypography variant="body2" sx={{ color: "#666666 !important" }}>
              No logs yet. System logs will appear here...
            </MDTypography>
          ) : (
            logs.map((log) => (
              <MDTypography
                key={log.id}
                variant="body2"
                sx={{
                  color: "#00ff00 !important",
                  marginBottom: "4px",
                  fontFamily: "monospace",
                }}
              >
                {log.message}
              </MDTypography>
            ))
          )}
          </MDBox>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
