import {Box, Button, Flex, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {convertTime} from "../Utils/stringUtils";
import Watercup from "./Watercup";

export default function TimerContainer() {
  let defaultSeconds = 1 * 60;
  enum TimerStatus {
    Start = "start",
    Pause = "pause",
    Restart = "restart",
  }

  const [timerStatus, setTimerStatus] = useState<TimerStatus>(TimerStatus.Pause);
  const [seconds, setSeconds] = useState<number>(defaultSeconds);
  const [waterLevel, setWaterLevel] = useState<number>(100);

  useEffect(() => {
    function convertSecondsToWaterLevel() {
      let percent = (seconds * 100) / defaultSeconds;
      setWaterLevel(percent);
    }

    let interval: number | undefined;

    if (!interval && timerStatus === TimerStatus.Start) {
      interval = window.setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        convertSecondsToWaterLevel();
      }, 1000);
    }

    if (timerStatus === TimerStatus.Pause && seconds > 0) {
      clearInterval(interval);
    }

    if (seconds <= 0) {
      clearInterval(interval);
      setTimerStatus(TimerStatus.Restart);
      convertSecondsToWaterLevel();
    }

    return () => clearInterval(interval);
  }, [seconds, timerStatus, TimerStatus, defaultSeconds]);

  //   useEffect(() => {
  //     setSeconds(defaultSeconds);
  //     setTimerStatus(TimerStatus.Restart);
  //   }, [defaultSeconds, TimerStatus.Restart]);

  const onTimerButtonClick = (status: TimerStatus) => {
    if (status === TimerStatus.Restart) {
      setTimerStatus(TimerStatus.Pause);
      setSeconds(defaultSeconds);
      setWaterLevel(100);
      return;
    }

    if (status === TimerStatus.Pause) {
      setTimerStatus(TimerStatus.Pause);
      return;
    }

    if (status === TimerStatus.Start) {
      setTimerStatus(TimerStatus.Start);
    }
  };

  return (
    <Box bg="gray.700" p={4} color="white" h="100vh">
      <Flex h="100%" direction="column" justifyContent="center">
        <Watercup waterLevel={waterLevel} />
        <Text fontSize="6xl" alignSelf="center">
          {convertTime(seconds)}
        </Text>
        <Flex alignSelf="center">
          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => onTimerButtonClick(TimerStatus.Start)}>
            Start Timer
          </Button>
          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => onTimerButtonClick(TimerStatus.Pause)}>
            Stop Timer
          </Button>
          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => onTimerButtonClick(TimerStatus.Restart)}>
            Clear timer
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
