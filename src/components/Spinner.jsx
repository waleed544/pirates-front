// Spinner.jsx
import React from "react";

export default function Spinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading, please wait...</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #ffffff, #e0f2fe)", // white to light blue
    color: "#0ea5e9", // cyan-blue text
    fontFamily: "sans-serif",
  },
  spinner: {
    width: "70px",
    height: "70px",
    border: "6px solid rgba(14,165,233,0.2)", // faded blue
    borderTop: "6px solid #0ea5e9", // bright blue top
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "20px",
    fontSize: "1.1rem",
    opacity: 0.8,
  },
};

// Add keyframes dynamically
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }`,
  styleSheet.cssRules.length
);
