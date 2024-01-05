type theme = "dark" | "light"

const darkModeHandler = (isOnPageLoad?: boolean):theme => {
  let theme = localStorage.getItem("theme") as theme;
  if (theme) {
    if (!isOnPageLoad) {
      theme = theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme);
    }
  } else {
    //set default theme for website
    localStorage.setItem("theme", "light");
    theme = "light";
  }
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  return theme;
};

export default darkModeHandler;
