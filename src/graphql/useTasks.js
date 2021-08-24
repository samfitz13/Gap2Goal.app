import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useTaskMutations from "./useTaskMutations";

const useTasks = (project) => {
	const { tasks, loading } = useAllTasksInProject(project);
	const { addTask, updateTask, deleteTask } = useTaskMutations(project);
	return {
		loading,
		tasks,
		updateTask,
		addTask,
		deleteTask,
	};
};
export default useTasks;

const useAllTasksInProject = (project) => {
	const { data, loading, error } = useQuery(
		gql`
			query GetAllTasksForProject($partition: String!) {
				tasks(query: { _partition: $partition }) {
					_id
					name
					status
					description
					dueDate
				}
			}
		`,
		{ variables: { partition: project.partition } }
	);
	if (error) {
		throw new Error(`Failed to fetch tasks: ${error.message}`);
	}

	// If the query has finished, return the tasks from the result data
	// Otherwise, return an empty list
	const tasks = data?.tasks ?? [];
	return { tasks, loading };
}
