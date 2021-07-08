import React from "react";
import { Box, Button, Heading, Spinner, Text, TextInput } from "grommet";

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
			<Spinner size='large' />
		</Box>
	) : (
		<Box gap='small'>
			{tasks.length === 0 ? (
				<Box>
					<Heading>No Tasks</Heading>
					<Text>Click the button below to add a task to this project</Text>
				</Box>
			) : (
				tasks.map((task) => (
					<Box hoverIndicator round onClick={() => setSelectedTaskId(task._id)}>
						<TaskContent task={task} />
					</Box>
				))
			)}
			{draftTask ? (
				<Box pad="medium">
					<TextInput
						type="text"
						a11yTitle="task Name"
						placeholder="Task Name"
						onChange={(e) => {
							setDraftTaskName(e.target.value);
						}}
						value={draftTask.name}
					/>
					<Box
						justify="center"
						direction="row-responsive"
						gap="medium"
						margin="small"
					>
						<Button
							hoverIndicator
							primary
							disabled={!draftTask.name}
							onClick={() => {
								submitDraftTask();
							}}
							label="Add"
						/>
						<Button
							hoverIndicator
							secondary
							label="Cancel"
							onClick={() => {
								deleteDraftTask();
							}}
						/>
					</Box>
				</Box>
			) : (
				<Box pad="medium">
					<Button
						hoverIndicator
						primary
						onClick={() => createDraftTask()}
						label="Add Task"
					/>
				</Box>
			)}
			<TaskDetailModal
				project={currentProject}
				task={selectedTask}
				unselectTask={setSelectedTaskId}
			/>
		</Box>
	);
}
