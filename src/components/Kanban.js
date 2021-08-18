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
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Stack,
	Text,
	VStack,
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

	const openTasks = tasks.filter(task => task.status === "Open")
	const inProgressTasks = tasks.filter(task => task.status === "InProgress")
	const completeTasks = tasks.filter(task => task.status === "Complete")

	const {
		draftTask,
		createDraftTask,
		deleteDraftTask,
		setDraftTaskName,
		submitDraftTask,
		setDraftTaskDescription,
	} = useDraftTask({ addTask });

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
		<Flex direction='column'>
			<Stack direction="Row" spacing='2'>
				<Stack spacing={4}>
				<Heading align='center' size='md'>
			 	Open Tasks
				</Heading>
					{openTasks.length === 0 ? (
						<Box p="3" direction="column">
							<Heading align="center">No Open Tasks</Heading>
							<Text align="center">
								Click the button below to add a task to this project
							</Text>
						</Box>
					) : (
						openTasks.map((task) => (
							<Box onClick={() => setSelectedTaskId(task._id)}>
								<TaskContent task={task} />
							</Box>
						))
					)}
				</Stack>
				<Stack>
					<Heading align='center' size='md'>
					In Progress Tasks
					</Heading>
					{inProgressTasks.length === 0 ? (
						<Box p="3" direction="column">
							<Heading align="center">No In Progress Tasks</Heading>
						</Box>
					) : (
						inProgressTasks.map((task) => (
							<Box onClick={() => setSelectedTaskId(task._id)}>
								<TaskContent showStatusBadge={false} task={task} />
							</Box>
						))
					)}
				</Stack>
				<Stack>
				<Heading align='center' size='md'>
				Completed Tasks
				</Heading>
					{completeTasks.length === 0 ? (
						<Box p="3" direction="column">
							<Heading align="center">No In Progress Tasks</Heading>
						</Box>
					) : (
						completeTasks.map((task) => (
							<Box onClick={() => setSelectedTaskId(task._id)}>
								<TaskContent task={task} />
							</Box>
						))
					)}
				</Stack>
				<TaskDetailModal
					project={currentProject}
					task={selectedTask}
					unselectTask={setSelectedTaskId}
				/>
			</Stack>
			{draftTask ? (
				<Modal isOpen={draftTask}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							Add Task
						</ModalHeader>
						<ModalCloseButton />
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
													submitDraftTask()}
											}
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
			<Center>
				<Button colorScheme="green" onClick={() => createDraftTask()}>
					Add Task
				</Button>
			</Center>
		)}
		</Flex>
	);
}
