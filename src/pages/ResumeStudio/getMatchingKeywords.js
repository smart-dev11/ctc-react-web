

export default (keywords, resumeText) =>
  keywords
    .split(", ")
    .filter((keyword) =>
      resumeText.toLowerCase().includes(keyword.toLowerCase())
    );

