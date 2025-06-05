import { useState } from "react";
import "../../styles/Tab.css"; // optional: isolate tab styles here

export default function TabbedPanel({ tabs = [], defaultTab = "", children }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);
  const activeTabObj = tabs.find((tab) => tab.key === activeTab);

  return (
    <div className="tabbed-panel-wrapper">
      <nav className="tab-nav">
        {tabs.map((tab) => (
          <span
            key={tab.key}
            className={`tab-link ${tab.colorClass} ${
              activeTab === tab.key ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </span>
        ))}
      </nav>

      <div className={`tab-body ${activeTabObj?.colorClass}`}>
        {children[activeTab]}
      </div>
    </div>
  );
}
