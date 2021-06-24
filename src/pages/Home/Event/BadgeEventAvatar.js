import { EventBadge, EventAvatar } from "../StyleLanding";
import calendar from "../../../images/calendar.png";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function BadgeEventAvatar({ onClick }) {
  return (
    <EventBadge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      overlap="circle"
      badgeContent={<p>{dayjs().format("DD")}</p>}
      onClick={onClick}
    >
      <EventBadge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circle"
        badgeContent={<img src={calendar} alt=""></img>}
      >
        <EventAvatar />
      </EventBadge>
    </EventBadge>
  );
}
