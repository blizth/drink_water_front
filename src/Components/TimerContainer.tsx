import {Box, Button, Flex, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useInterval} from "../useInterval";
import {convertTime} from "../Utils/stringUtils";
import Watercup from "./Watercup";

export default function TimerContainer() {
  const defaultSeconds = 1 * 60;
  const [waterLevel, setWaterLevel] = useState<number>(100);
  const [duration, setDuration] = useState(defaultSeconds);
  const [paused, setPaused] = useState(true);

  useInterval(() => {
    function convertSecondsToWaterLevel() {
      let percent = (duration * 100) / defaultSeconds;
      setWaterLevel(percent);
    }
    convertSecondsToWaterLevel();
    if (!paused && duration > 0) {
      setDuration(duration - 1);
    }
    if (duration <= 0) {
      setPaused(true);
    }
  }, 1000);

  const restartTimer = () => {
    setPaused(true);
    setDuration(defaultSeconds);
    setWaterLevel(100);
  };

  return (
    <Box bg="gray.700" p={4} color="white" h="100vh">
      <Flex h="100%" direction="column" justifyContent="center">
        <Watercup waterLevel={waterLevel} />
        <Text fontSize="6xl" alignSelf="center">
          {convertTime(duration)}
        </Text>
        <Flex alignSelf="center">
          <Button alignSelf="center" m={2} bg="gray.500" onClick={() => setPaused(false)}>
            Start Timer
          </Button>
          <Button alignSelf="center" m={2} bg="gray.500" onClick={() => setPaused(true)}>
            Stop Timer
          </Button>
          <Button alignSelf="center" m={2} bg="gray.500" onClick={() => restartTimer()}>
            Clear timer
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
