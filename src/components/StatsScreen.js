import React from "react";
import {
	Box,
	List,
	ListItem,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stat,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";

import useTasks from "../graphql/useTasks";

const StatsScreen = ({ currentProject }) => {
	const { tasks, loading } = useTasks(currentProject);

	let openTasks = tasks.filter((task) => task.status === "Open");
	let inProgressTasks = tasks.filter((task) => task.status === "InProgress");
	let completedTasks = tasks.filter((task) => task.status === "Complete");

	return loading ? (
		<Box>Loading...</Box>
	) : (
		<Box>
			<StatGroup>
				<Popover placement="bottom-start">
					<PopoverTrigger>
						<Stat>
							<StatLabel>Open</StatLabel>
							<StatNumber>{openTasks.length}</StatNumber>
							<StatHelpText>
								{((openTasks.length / tasks.length) * 100).toFixed(2)}%
							</StatHelpText>
						</Stat>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverHeader>
							<strong>Open Tasks</strong>
						</PopoverHeader>
						<PopoverCloseButton />
						<PopoverBody>
							<List>
								{openTasks.length > 0 ? (
									openTasks.map((task) => (
										<ListItem key={task.id}>{task.name}</ListItem>
									))
								) : (
									<p>No Open Tasks at this time </p>
								)}
							</List>
						</PopoverBody>
					</PopoverContent>
				</Popover>

				<Popover placement="bottom">
					<PopoverTrigger>
						<Stat>
							<StatLabel>In Progress</StatLabel>
							<StatNumber>{inProgressTasks.length}</StatNumber>
							<StatHelpText>
								{((inProgressTasks.length / tasks.length) * 100).toFixed(2)}%
							</StatHelpText>
						</Stat>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverHeader>
							<strong>In Progress Tasks</strong>
						</PopoverHeader>
						<PopoverCloseButton />
						<PopoverBody>
							<List>
								{inProgressTasks.length > 0 ? (
									inProgressTasks.map((task) => (
										<ListItem key={task.id}>{task.name}</ListItem>
									))
								) : (
									<ListItem>No In Progress Tasks at this time </ListItem>
								)}
							</List>
						</PopoverBody>
					</PopoverContent>
				</Popover>
				<Popover placement="bottom-start">
					<PopoverTrigger>
						<Stat>
							<StatLabel>Completed</StatLabel>
							<StatNumber>{completedTasks.length}</StatNumber>
							<StatHelpText>
								{((completedTasks.length / tasks.length) * 100).toFixed(2)}%
							</StatHelpText>
						</Stat>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverHeader>
							<strong>Completed Tasks</strong>
						</PopoverHeader>
						<PopoverCloseButton />
						<PopoverBody>
							<List>
								{completedTasks.length > 0 ? (
									completedTasks.map((task) => (
										<ListItem key={task.id}>{task.name}</ListItem>
									))
								) : (
									<ListItem> No Completed Tasks at this time </ListItem>
								)}
							</List>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</StatGroup>
		</Box>
	);
};

export default StatsScreen;
