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
	Text,
	VStack,
} from "@chakra-ui/react";

import useTasks from "../graphql/useTasks";
import TaskContent from "./TaskContent";
import TaskDetailModal from "./TaskDetailModal";
import EditPermissionsModal from "./EditPermissionsModal";

export default function ProjectScreen({
	currentProject,
	isEditingPermissions,
	setIsEditingPermissions,
}) {
	return (
		<Box>
			{currentProject && <TaskList currentProject={currentProject} />}
			<EditPermissionsModal
				isEditingPermissions={isEditingPermissions}
				setIsEditingPermissions={setIsEditingPermissions}
			/>
		</Box>
	);
}

function useDraftTask({ addTask }) {
	const [draftTask, setDraftTask] = React.useState(null);
	const createDraftTask = () => {
		setDraftTask({ name: "" });
	};
	const deleteDraftTask = () => {
		setDraftTask(null);
	};
	const setDraftTaskName = (name) => {
		setDraftTask({ name });
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
		<Flex>
			<Stack spacing={4}>
				{tasks.length === 0 ? (
					<Box>
						<Heading>No Tasks</Heading>
						<Text>Click the button below to add a task to this project</Text>
					</Box>
				) : (
					tasks.map((task) => (
						<Box
							onClick={() => setSelectedTaskId(task._id)}
						>
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
						<Box justify="center" direction="row-responsive">
							<HStack spacing={4}>
								<Button
									disabled={!draftTask.name}
									onClick={() => {
										submitDraftTask();
									}}
								>
									Add
								</Button>
								<Button
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
						<Button onClick={() => createDraftTask()}>Add Task</Button>
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
