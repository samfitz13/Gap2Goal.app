import React from "react";
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Input,
	Spinner,
	Stack,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

import EditPermissionsModal from "./EditPermissionsModal";
import StatsScreen from "./StatsScreen";
import TaskContent from "./TaskContent";
import TaskDetailModal from "./TaskDetailModal";
import useTasks from "../graphql/useTasks";

export default function ProjectScreen({
	currentProject,
	isEditingPermissions,
	setIsEditingPermissions,
}) {
	return (
		<Tabs>
			<TabList>
				<Tab>Task List</Tab>
				<Tab>Stats</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<Flex justify="center">
						{currentProject && <TaskList currentProject={currentProject} />}
						<EditPermissionsModal
							isEditingPermissions={isEditingPermissions}
							setIsEditingPermissions={setIsEditingPermissions}
						/>
					</Flex>
				</TabPanel>
				<TabPanel>
					<StatsScreen currentProject={currentProject} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}

function useDraftTask({ addTask }) {
	const [draftTask, setDraftTask] = React.useState(null);
	const createDraftTask = () => {
		setDraftTask({ name: "", description: "" });
	};
	const deleteDraftTask = () => {
		setDraftTask(null);
	};
	const setDraftTaskName = (name) => {
		setDraftTask({ name });
	};
	const setDraftTaskDescription = (description) => {
		setDraftTask({ description });
	};
	const submitDraftTask = async () => {
		await addTask(draftTask);
		setDraftTask(null);
	};
	return {
		draftTask,
		createDraftTask,
		deleteDraftTask,
		setDraftTaskName,
		submitDraftTask,
		setDraftTaskDescription,
	};
}

function TaskList({ currentProject }) {
	const { tasks, addTask, loading } = useTasks(currentProject);
	const getTaskById = (id) => tasks.find((task) => task._id === id);
	const [selectedTaskId, setSelectedTaskId] = React.useState(null);
	const selectedTask = getTaskById(selectedTaskId);

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
		<Flex direction="column">
			<Stack spacing={4}>
				{tasks.length === 0 ? (
					<Box>
						<Heading>No Tasks</Heading>
						<Text>Click the button below to add a task to this project</Text>
					</Box>
				) : (
					tasks.map((task) => (
						<Box onClick={() => setSelectedTaskId(task._id)}>
							<TaskContent task={task} />
						</Box>
					))
				)}
				{draftTask ? (
					<VStack spacing={4}>
						<Input
							type="text"
							placeholder="Task Name"
							onChange={(e) => {
								setDraftTaskName(e.target.value);
							}}
							value={draftTask.name}
						/>
						<Input
							type="text"
							placeholder="Task Description"
							onChange={(e) => {
								setDraftTaskDescription(e.target.value);
							}}
							value={draftTask.description}
						/>
						<Box justify="center" direction="row-responsive">
							<HStack spacing={4}>
								<Button
									disabled={!draftTask.name}
									colorScheme="blue"
									onClick={() => {
										alert(
											`Submitting ${draftTask.name}: ${draftTask.description}`
										);
										submitDraftTask();
									}}
								>
									Add
								</Button>
								<Button
									rightIcon={<FiTrash2 />}
									colorScheme="red"
									onClick={() => {
										deleteDraftTask();
									}}
								>
									Cancel
								</Button>
							</HStack>
						</Box>
					</VStack>
				) : (
					<Center>
						<Button colorScheme="green" onClick={() => createDraftTask()}>
							Add Task
						</Button>
					</Center>
				)}
			</Stack>
			<TaskDetailModal
				project={currentProject}
				task={selectedTask}
				unselectTask={setSelectedTaskId}
			/>
		</Flex>
	);
}
