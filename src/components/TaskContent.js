import React from "react";
import { Box, Heading, Text } from "grommet";

import StatusBadge from "./StatusBadge";

export default function TaskContent({ task }) {
	return (
		<Box
			animation="fadeIn"
			border
			round
			pad="medium"
		>
			<Box direction="row" justify='between'>
				<Heading level={4}>{task.name}</Heading>
				<StatusBadge status={task.status} />
			</Box>
			<Text size="small">{task.description}</Text>
		</Box>
	);
}
