import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {StateMachineInput, useRive, useStateMachineInput} from "@rive-app/react-canvas";
import {useEffect, useState} from "react";

function App() {
  const {rive, RiveComponent} = useRive({
    src: "watercup.riv",
    stateMachines: "default",
    animations: "Idle",
    autoplay: true,
    onStateChange: (event) => {
      console.log(event.data);
    },
  });
  const waterLevelInput = useStateMachineInput(rive, "default", "input", 100 as number);
  const changeWaterLevel = (levelChange: number, waterLevelInput: StateMachineInput) => {
    if (Number(waterLevelInput.value) + levelChange >= 100) return;
    if (Number(waterLevelInput.value) + levelChange <= 0) return;

    waterLevelInput!.value = Number(waterLevelInput!.value) + levelChange;
  };

  return (
    <Box bg="gray.700" p={4} color="white" h="100vh">
      <Flex h="100%" direction="column" justifyContent="center">
        <Text fontSize="6xl" alignSelf="center">
          25:00
        </Text>
        <RiveComponent style={{alignSelf: "center"}} />
        <Flex alignSelf="center">
          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => changeWaterLevel(10, waterLevelInput as StateMachineInput)}>
            Increase water level
          </Button>
          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => changeWaterLevel(-10, waterLevelInput as StateMachineInput)}>
            Decease water level
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
