export const StyleEventCalendar = () => {
  const weekDays = document.querySelectorAll(".dow");
  weekDays.forEach((d) => {
    d.textContent = d.textContent[0];
    d.style.fontSize = "10px";
    return d;
  });
  weekDays[4].textContent = "Th";
  const rdtSwitch = document.querySelector(".rdtSwitch");
  rdtSwitch.setAttribute("colspan", "3");
};
