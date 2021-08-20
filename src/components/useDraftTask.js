import React from "react";

export function useDraftTask({ addTask }) {
	const [draftTask, setDraftTask] = React.useState(null);
	const createDraftTask = () => {
		setDraftTask({ name: "", description: "" });
	};
	const deleteDraftTask = () => {
		setDraftTask(null);
	};
	const setDraftTaskName = (name) => {
		setDraftTask(prevState => ({
			...prevState,
			name
		}));
	};
	const setDraftTaskDescription = (description) => {
		setDraftTask(prevState => ({
			...prevState,
			description }));
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
