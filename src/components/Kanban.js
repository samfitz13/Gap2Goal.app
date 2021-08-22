import React from "react";
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Spinner,
	Stack,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import TaskContent from "./TaskContent";
import TaskDetailModal from "./TaskDetailModal";
import useTasks from "../graphql/useTasks";
import { AddDraftTaskModal } from "./AddDraftTaskModal";

export default function Kanban({ currentProject }) {
	const { tasks, loading } = useTasks(currentProject);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const getTaskById = (id) => tasks.find((task) => task._id === id);
	const [selectedTaskId, setSelectedTaskId] = React.useState(null);
	const selectedTask = getTaskById(selectedTaskId);

	let stages = ["Open", "InProgress", "Complete"];

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
			<Flex align="center" direction="column" overflowX="scroll">
				<Stack spacing={8} direction="Row">
					{stages.map((stage) => (
						<Box p={2} m={2} bg={boxColor} w="sm">
							<Heading align="center" size="md">
								{stage === "InProgress" ? "In Progress" : stage} tasks
							</Heading>
							{tasks.filter((task) => task.status === stage).length === 0 ? (
								<Box align="center" pt={20}>
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
			<AddDraftTaskModal
				currentProject={currentProject}
				isOpen={isOpen}
				onClose={onClose}
			/>
			<Center mt="2">
				<Button colorScheme="green" onClick={onOpen}>
					Add Task
				</Button>
			</Center>
			<TaskDetailModal
				project={currentProject}
				task={selectedTask}
				unselectTask={setSelectedTaskId}
			/>
		</Box>
	);
}
