import React from "react";
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Spinner,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";

import { AddDraftTaskModal } from "./AddDraftTaskModal";
import TaskContent from "./TaskContent";
import TaskDetailModal from "./TaskDetailModal";
import useTasks from "../graphql/useTasks";

export function TaskList({ currentProject }) {
	const { tasks, loading } = useTasks(currentProject);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const getTaskById = (id) => tasks.find((task) => task._id === id);
	const [selectedTaskId, setSelectedTaskId] = React.useState(null);
	const selectedTask = getTaskById(selectedTaskId);

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
		<Flex direction="column">
			<Stack spacing={4}>
				{tasks.length === 0 ? (
					<Box p="3" direction="column">
						<Heading align="center">No Tasks</Heading>
						<Text align="center">
							Click the button below to add a task to this project
						</Text>
					</Box>
				) : (
					tasks.map((task) => (
						<Box onClick={() => setSelectedTaskId(task._id)}>
							<TaskContent task={task} />
						</Box>
					))
				)}
				<AddDraftTaskModal
					currentProject={currentProject}
					isOpen={isOpen}
					onClose={onClose}
				/>
				<Center>
					<Button colorScheme="green" onClick={onOpen}>
						Add Task
					</Button>
				</Center>
			</Stack>
			<TaskDetailModal
				project={currentProject}
				task={selectedTask}
				unselectTask={setSelectedTaskId}
			/>
		</Flex>
	);
}
