import { useRef, useState, useEffect } from "react";
import Persona from "./persona";
import MarkPosition from "./unitPositioner";

export default function Unit() {
  const unitPosition = useRef({ x: 500, y: 500 });
  const [unitMarker, setUnitMarker] = useState(false);

  useEffect(() => {
    moveRandomUnit(400, { x: window.innerWidth / 2, y: 350 });
  }, []);

  function moveCreeper(newPosition: any) {
    const positionToChange = { ...unitPosition.current };
    const moveStepByStep = () => {
      if (newPosition.x !== unitPosition.current.x) {
        newPosition.x < unitPosition.current.x
          ? (positionToChange.x--)
          : (positionToChange.x++);
      }
      if (newPosition.y !== unitPosition.current.y) {
        newPosition.y < unitPosition.current.y
          ? (positionToChange.y -= 0.5)
          : (positionToChange.y += 0.5);
      }
      unitPosition.current = positionToChange;

      if (
        newPosition.x === unitPosition.current.x &&
        newPosition.y === unitPosition.current.y
      ) {
        clearInterval(intervalId);
        console.log("Arrived at destination");
      }
    };
    const intervalId = setInterval(moveStepByStep, 5);
  }

  function moveRandomUnit(radius: any, center: any) {
    unitPosition.current.x = center.x;
    unitPosition.current.y = center.y + radius / 2;

    const moveInCircle = () => {
      const rndNumber = Math.random();
      const moveDirection = rndNumber >= 0.5 ? 1 : -1;
      let newPosition = { x: unitPosition.current.x, y: unitPosition.current.y };

      if (unitPosition.current.y === center.y + radius / 2) {
        newPosition.x += moveDirection * radius / 2;
        newPosition.y -= radius;
      } else if (unitPosition.current.y === center.y - radius / 2) {
        newPosition.x += moveDirection * radius / 2;
        newPosition.y += radius;
      } else if (unitPosition.current.x === center.x + radius) {
        newPosition.x -= radius / 2;
        newPosition.y += radius;
      } else {
        newPosition.x += radius / 2;
        newPosition.y += moveDirection * radius / 2;
      }

      moveCreeper(newPosition);
    };
    const movement = setInterval(moveInCircle, 4000);
  }

  return (
    <>
      <Persona reference={unitPosition} />
      {unitMarker && <MarkPosition />}
    </>
  );
}
