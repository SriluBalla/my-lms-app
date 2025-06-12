import React, { useState } from "react";

const SavedProfileCard = ({ profile }) => {
  const [showFullIntro, setShowFullIntro] = useState(false);

  if (!profile) return null;

  const toggleIntro = () => setShowFullIntro(!showFullIntro);

  const maxLength = 200;
  const intro = profile.self_intro || "";

  const introPreview =
    intro.length > maxLength && !showFullIntro
      ? `${intro.slice(0, maxLength)}...`
      : intro;

  const {
    profile_img_url,
    preferred_name,
    role,
    first_name,
    last_name,
    country,
    birth_month,
    birth_day,
    linkedin,
    github,
    blog,
    self_intro,
    years_experience,
  } = profile;

  return (
    <div className="profile-card">
      <img
        className="profile-image"
        src={
          profile_img_url
            ? profile_img_url
            : "/public/images/global/Profile-placeholder.png"
        }
        alt="Profile"
        title="Profile Picture"
      />

      <h2 className="center">{preferred_name}</h2>

      {role && (
        <p className="center" title={`This user is a ${role}`}>
          <strong>{role.toUpperCase()}</strong>
        </p>
      )}

      <ul className="bullet-no">
        <li>
          {first_name} {last_name}
        </li>
        <li>
          Country of Residence:  <strong>{country}</strong>
        </li>
        <li>
          Birthday: <strong>{birth_day} {birth_month}</strong> 
        </li>
        {years_experience && (
          <li>
            👩‍💻 <strong>{years_experience}</strong> years of experience in IT
          </li>
        )}
        {linkedin && (
          <li>
            🔗 <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a>
          </li>
        )}
        {github && (
          <li>
            💻 <a href={github} target="_blank" rel="noopener noreferrer">{github}</a>
          </li>
        )}
        {blog && (
          <li>
            📰 <a href={blog} target="_blank" rel="noopener noreferrer">{blog}</a>
          </li>
        )}
      </ul>

      {intro && (
        <p>
          📝 {introPreview}
          {intro.length > maxLength && (
            <>
              <button
                onClick={toggleIntro}
                className="btn-toggle-intro"
                aria-label="Toggle full self intro"
              >
                {showFullIntro ? "Show less" : "Read more"}
              </button>
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default SavedProfileCard;
