import { useState } from "react";
import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import classes from "./AddItem.module.css";
import { AddBookmark } from "../AddBookmark/AddBookmark";
import { AddFolder } from "../AddFolder/AddFolder";

const data = ["Add bookmark", "Add folder"];

export const AddItem = () => {
  const [rootRef, setRootRef] = useState();
  const [controlsRefs, setControlsRefs] = useState({});
  const [active, setActive] = useState(0);

  const setControlRef = (index) => (node) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <>
      <div className={classes.root} ref={setRootRef}>
        {controls}

        <FloatingIndicator
          target={controlsRefs[active]}
          parent={rootRef}
          className={classes.indicator}
        />
      </div>
      {active === 0 ? <AddBookmark /> : <AddFolder />}
    </>
  );
};
