const darkModeHandler = (isOnPageLoad?:boolean) => {
    let theme = localStorage.getItem("theme");
    if (theme) {
      if(!isOnPageLoad){
          theme = theme === "light" ? "dark" : "light";
          localStorage.setItem("theme", theme);
      }
    } else {
      //set default theme for website
      localStorage.setItem("theme", "dark");
      theme = 'dark'
    }
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  };
  
  export default darkModeHandler;