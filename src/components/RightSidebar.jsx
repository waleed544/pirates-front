import React from "react";
import { Link } from "react-router-dom";

function RightSidebar() {
  return (
    <div className="card rightbar shadow-sm p-3">
      <h5 className="card-title mb-3">Navigation</h5>
      <ul className="list-unstyled mb-0">
        <li className="mb-2">
          <Link to="/" className="text-decoration-none">
            🏠 Home
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default RightSidebar;
