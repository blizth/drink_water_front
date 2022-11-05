import {StateMachineInput, useRive, useStateMachineInput} from "@rive-app/react-canvas";
import React, {useEffect} from "react";

interface WaterCupProps {
  waterLevel: number;
}

export default function Watercup({waterLevel}: WaterCupProps) {
  const {rive, RiveComponent} = useRive({
    src: "watercup.riv",
    stateMachines: "default",
    animations: "Idle",
    autoplay: true,
    onStateChange: (event) => {
      console.log(event.data);
    },
  });
  const waterLevelInput = useStateMachineInput(rive, "default", "input", 100);

  useEffect(() => {
    changeWaterLevel(waterLevel, waterLevelInput as StateMachineInput);
  }, [waterLevel, waterLevelInput]);

  const changeWaterLevel = (levelChange: number, waterLevelInput: StateMachineInput) => {
    if (waterLevelInput === null) return;
    waterLevelInput!.value = levelChange;
  };
  return <RiveComponent style={{alignSelf: "center", paddingBottom: "-200px"}} />;
}
