import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {StateMachineInput, useRive, useStateMachineInput} from "@rive-app/react-canvas";
import {useEffect, useState} from "react";
import Watercup from "./Watercup";

function App() {
  let defaultSeconds = 30;
  enum TimerStatus {
    Start = "start",
    Pause = "pause",
    Restart = "restart",
  }

  function convertTime(secondsLeft: number) {
    let output = "";
    const secs = secondsLeft % 60;
    const mins = Math.floor(secondsLeft / 60) % 60;
    const hours = Math.floor(secondsLeft / 3600);

    function addLeadingZeroes(time: number) {
      return time < 10 ? `0${time}` : time;
    }
    if (hours > 0) {
      output += `${hours}:`;
    }
    output += `${addLeadingZeroes(mins)}:${addLeadingZeroes(secs)}`;

    return output;
  }

  const [timerStatus, setTimerStatus] = useState<TimerStatus>(TimerStatus.Start);
  const [seconds, setSeconds] = useState<number>(defaultSeconds);
  const [waterLevel, setWaterLevel] = useState<number>(100);

  function convertSecondsToWaterLevel() {
    let percent = (seconds * 100) / defaultSeconds;
    setWaterLevel(percent);
  }

  useEffect(() => {
    let interval: number | undefined;

    if (!interval && timerStatus === TimerStatus.Pause) {
      interval = window.setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        convertSecondsToWaterLevel();
      }, 1000);
    }

    if (timerStatus === TimerStatus.Start && seconds > 0) {
      clearInterval(interval);
    }

    if (seconds <= 0) {
      clearInterval(interval);
      setTimerStatus(TimerStatus.Restart);
      convertSecondsToWaterLevel();
    }

    return () => clearInterval(interval);
  }, [seconds, timerStatus]);

  useEffect(() => {
    setSeconds(defaultSeconds);
    setTimerStatus(TimerStatus.Restart);
  }, [defaultSeconds]);

  const onTimerButtonClick = (status: TimerStatus | undefined) => {
    if (status !== undefined && status === TimerStatus.Restart) {
      setTimerStatus(TimerStatus.Start);
      setSeconds(defaultSeconds);
      setWaterLevel(100);
      return;
    }

    if (status === TimerStatus.Pause) {
      setTimerStatus(TimerStatus.Pause);
    } else if (status === TimerStatus.Start) {
      setTimerStatus(TimerStatus.Start);
    } else {
      setTimerStatus(TimerStatus.Start);
      setSeconds(defaultSeconds);
    }
  };

  return (
    <Box bg="gray.700" p={4} color="white" h="100vh">
      <Flex h="100%" direction="column" justifyContent="center">
        <Text fontSize="6xl" alignSelf="center">
          {convertTime(seconds)}
        </Text>
        <Text fontSize="6xl" alignSelf="center">
          {timerStatus}
        </Text>
        <Watercup waterLevel={waterLevel} />
        <Flex alignSelf="center">
          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => setWaterLevel(waterLevel + 10)}>
            Increase water level
          </Button>
          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => setWaterLevel(waterLevel - 10)}>
            Decease water level
          </Button>

          <Button
            alignSelf="center"
            m={2}
            bg="gray.500"
            onClick={() => onTimerButtonClick(TimerStatus.Pause)}>
            Start Timer
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

export default App;
