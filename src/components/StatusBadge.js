import React from "react";
import { Tag } from "@chakra-ui/react";

export default function StatusBadge({ status }) {
	return (
		<Tag colorScheme={getColorForStatus(status)}>
			{getTaskStatusDisplayName(status)}
		</Tag>
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
