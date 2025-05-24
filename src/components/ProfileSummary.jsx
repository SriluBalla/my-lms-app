import React, { useState } from "react";

const SavedProfileCard = ({ profile }) => {
  if (!profile) return null;

  const [showFullIntro, setShowFullIntro] = useState(false);
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
    <section>
      <div>
        <img className="profile-image-preview"
        title="Hello there, soon you will be able to share how you look with your community"
          src={
            profile_img_url
              ? profile_img_url
              : "/images/global/Profile-placeholder.png"
          }
          alt="Profile" />
      </div>

      <h2 className="text-center">{preferred_name}</h2>

<ul className="bullet-no">
  <li>
    {first_name} {last_name}
  </li>
  <li>
    🌎 <strong>{country}</strong>
  </li>
  <li>
    🎁 🎂 <strong>{birth_day} {birth_month}</strong> 🙌 🥳
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
              {" "}
              <button
                onClick={toggleIntro}
                className="toggle-intro-btn"
                aria-label="Toggle full self intro"
              >
                {showFullIntro ? "Show less" : "Read more"}
              </button>
            </>
          )}
        </p>
      )}
    </section>
  );
};

export default SavedProfileCard;
