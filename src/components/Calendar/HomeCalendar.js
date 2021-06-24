export const styleCalendar = () => {
  const Monday = document.querySelector('[title="Monday"]');
  const Tuesday = document.querySelector('[title="Tuesday"]');
  const Wednesday = document.querySelector('[title="Wednesday"]');
  const Thursday = document.querySelector('[title="Thursday"]');
  const Friday = document.querySelector('[title="Friday"]');
  const Saturday = document.querySelector('[title="Saturday"]');
  const Sunday = document.querySelector('[title="Sunday"]');
  const Calendar = document.querySelector(".react-calendar");
  const MyEvent = document.createElement("div");
  const month = document.querySelector(".react-calendar__navigation__label ");
  // handle Month
  const monthPlain = document.createElement("div");
  let monthText = month.textContent.split(" ");
  monthText[0] = monthText[0].slice(0, 3);
  monthPlain.textContent = `${monthText[0]} ${monthText[1]}`;

  monthPlain.className = "month-plain";
  Calendar.prepend(monthPlain);

  MyEvent.textContent = "My Events";
  MyEvent.style.fontWeight = "Bold";
  MyEvent.style.fontSize = "18px";
  MyEvent.style.lineHeight = "25px";
  MyEvent.style.marginTop = "15px";
  MyEvent.style.marginLeft = "6px";
  MyEvent.id = "MyEvent";
  if (!document.getElementById("MyEvent")) Calendar.prepend(MyEvent);
  Calendar.style.padding = "10px";

  for (let day of [
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  ]) {
    day.innerText = day.innerText.slice(0, 1);
    day.style.textDecoration = "none";
  }
  const nodesContainer = document.querySelector(
    ".react-calendar__month-view__days",
  );
  nodesContainer.style = "";
};
