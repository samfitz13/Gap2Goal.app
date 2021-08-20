import React from "react";
import { Box, Tag, TagLabel } from "@chakra-ui/react";

export default function StatusBadge({ status }, statusBadgeDisplay) {
	
	const display = statusBadgeDisplay ? "block" : "none";
	
	return (
		<Box paddingInlineStart="2" display={display}>
			<Tag
				maxH="1rem"
				size="lg"
				variant="subtle"
				colorScheme={getColorForStatus(status)}
			>
				<TagLabel>{getTaskStatusDisplayName(status)}</TagLabel>
			</Tag>
		</Box>
	);
}

const getColorForStatus = (status) => {
	switch (status) {
		case "Open":
			return "blue";
		case "InProgress":
			return "orange";
		case "Complete":
			return "green";
		default:
			return "gray";
	}
};

const getTaskStatusDisplayName = (status) => {
	if (status === "InProgress") {
		// Add a non-breaking space so that the string is always a single line
		const nbsp = String.fromCharCode(160);
		return `In${nbsp}Progress`;
	}
	return status;
};
