import {Button} from "@chakra-ui/react";
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
  //   useEffect(() => {
  //
  //   }, [waterLevel, waterLevelInput]);

  const changeWaterLevel = (levelChange: number, waterLevelInput: StateMachineInput) => {
    // if (Number(waterLevelInput.value) + levelChange >= 100) return;
    // if (Number(waterLevelInput.value) + levelChange <= 0) return;
    if (waterLevelInput === null) return;
    waterLevelInput!.value = levelChange;
  };
  return (
    <React.Fragment>
      <RiveComponent style={{alignSelf: "center"}} />
      <Button
        alignSelf="center"
        m={2}
        bg="gray.500"
        onClick={() => changeWaterLevel(50, waterLevelInput as StateMachineInput)}>
        Increase water level
      </Button>
    </React.Fragment>
  );
}
