import React from "react";
import "./AnnouncementBar.css";
import { announcements } from "../util/offers";

function AnnouncementBar() {
  // Double the items to make the sliding loop perfectly infinite and seamless
  const duplicatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="announcement-bar">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {duplicatedAnnouncements.map((item, index) => (
            <React.Fragment key={`${item.key}-${index}`}>
              <span className="marquee-item">{item.text}</span>
              <span className="marquee-separator">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
