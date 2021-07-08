import React, { useState } from "react";
import { Box, Button, Heading, Layer, Text } from "grommet";

import TaskContent from "./TaskContent";
import useChangeTaskStatusButton from "./useChangeTaskStatusButton";
import { Edit, Trash } from "grommet-icons";

export default function TaskDetailModal({ project, task, unselectTask }) {
	const ChangeTaskStatusButton = useChangeTaskStatusButton(project);
	let [feature, setFeature] = useState(false);
	return (
		<Box>
			{task && (
				<Layer
					onEsc={unselectTask}
					onClickOutside={() => {
						unselectTask();
						setFeature(false);
					}}
					modal
					responsive
				>
					<Box basis="medium" pad="small" gap="medium" width="medium">
						<TaskContent task={task} />
						{task.status === "Open" && (
							<Box pad="medium">
								<ChangeTaskStatusButton
									task={task}
									fromStatus="Open"
									toStatus="InProgress"
								>
									<Heading level="4">Start Progress</Heading>
								</ChangeTaskStatusButton>
							</Box>
						)}
						{task.status === "InProgress" && (
							<Box pad="medium">
								<ChangeTaskStatusButton
									task={task}
									fromStatus="InProgress"
									toStatus="Open"
								>
									<Heading level="4">Stop Progress</Heading>
								</ChangeTaskStatusButton>
								<ChangeTaskStatusButton
									task={task}
									fromStatus="InProgress"
									toStatus="Complete"
								>
									<Heading level="4">Complete Task</Heading>
								</ChangeTaskStatusButton>
							</Box>
						)}
						{task.status === "Complete" && (
							<Box pad="medium">
								<ChangeTaskStatusButton
									task={task}
									fromStatus="Complete"
									toStatus="InProgress"
								>
									<Heading level="4">Resume Task</Heading>
								</ChangeTaskStatusButton>
							</Box>
						)}
						{/* TODO: Add Edit and Delete */}
						<Box justify="evenly" direction="row">
							<Button
								onClick={() => {
									setFeature(true);
								}}
								icon={<Edit />}
								label="Edit"
								color="accent-1"
							/>
							<Button
								onClick={() => {
									setFeature(true);
								}}
								icon={<Trash />}
								label="Delete"
								primary
								color="status-critical"
							/>
						</Box>
					</Box>
				</Layer>
			)}
			{feature && <FeatureMessage />}
		</Box>
	);
}

const FeatureMessage = () => (
	<Layer modal={false} full="horizontal" position="top">
		<Box
			background="light-3"
			pad="small"
			direction="row"
			justify="between"
			align="center"
		>
			<Text size="large">This feature is coming soon! Stay Tuned!</Text>
		</Box>
	</Layer>
);
