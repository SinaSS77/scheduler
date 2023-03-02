import React from "react";
import "./DayListItems.scss";
import classNames from "classnames";


const formatSpots = function(remainingSpots) {

  if (remainingSpots === 0) {
    return "no spots remaining";
  } else if (remainingSpots === 1) {
    return "1 spot remaining";
  } else {
    return `${remainingSpots} spots remaining`;
  }
};

export default function DayListItem(props) {
  const classes = classNames("day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": (props.spots === 0)
    });

  return (
    <li className={classes}
      onClick={() => props.setDay(props.name)}
      data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}