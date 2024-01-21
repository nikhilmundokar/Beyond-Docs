export const scrollToSection = (goTo: string) => {
  document.querySelector("#" + goTo)?.scrollIntoView({ behavior: "smooth" });
};
