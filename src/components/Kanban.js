import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

import TaskContent from "./TaskContent";
import TaskDetailModal from "./TaskDetailModal";
import useTasks from "../graphql/useTasks";
import { useDraftTask } from "./useDraftTask";

export default function Kanban({ currentProject }) {
  const { tasks, addTask, loading } = useTasks(currentProject);
  const getTaskById = (id) => tasks.find((task) => task._id === id);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);
  const selectedTask = getTaskById(selectedTaskId);

  let stages = ["Open", "InProgress", "Complete"];

  const {
    draftTask,
    createDraftTask,
    deleteDraftTask,
    setDraftTaskName,
    submitDraftTask,
    setDraftTaskDescription,
  } = useDraftTask({ addTask });

  let boxColor = useColorModeValue("gray.200", "gray.900");

  return loading ? (
    <Box margin="xlarge" align="center" justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  ) : (
    <Box>
      <Flex direction="column" overflowX="scroll">
        <Stack spacing={8} direction="Row">
          {stages.map((stage) => (
            <Box p={2} m={2} bg={boxColor}>
              <Heading align="center" size="md">
                {stage === "InProgress" ? "In Progress" : stage} tasks
              </Heading>
              {tasks.filter((task) => task.status === stage).length === 0 ? (
                <Box align="center">
                  No {stage === "InProgress" ? "In Progress" : stage} Tasks
                </Box>
              ) : (
                tasks
                  .filter((task) => task.status === stage)
                  .map((task) => (
                    <Box py={1} onClick={() => setSelectedTaskId(task._id)}>
                      <TaskContent task={task} />
                    </Box>
                  ))
              )}
            </Box>
          ))}
        </Stack>
      </Flex>
      {draftTask ? (
        <Modal isOpen={draftTask}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Task</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  type="text"
                  placeholder="Task Name"
                  onChange={(e) => setDraftTaskName(e.target.value)}
                  value={draftTask.name}
                />
                <Input
                  type="text"
                  placeholder="Task Description"
                  onChange={(e) => setDraftTaskDescription(e.target.value)}
                  value={draftTask.description}
                />
                <Box justify="center" direction="row-responsive">
                  <HStack spacing={4}>
                    <Button
                      disabled={!draftTask.name}
                      colorScheme="blue"
                      onClick={() => {
                        submitDraftTask();
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      rightIcon={<FiTrash2 />}
                      colorScheme="red"
                      onClick={() => deleteDraftTask()}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Center mt="2">
          <Button colorScheme="green" onClick={() => createDraftTask()}>
            Add Task
          </Button>
        </Center>
      )}
      <TaskDetailModal
        project={currentProject}
        task={selectedTask}
        unselectTask={setSelectedTaskId}
      />
    </Box>
  );
}
