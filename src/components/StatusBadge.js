import React from "react";
import { Badge } from "@chakra-ui/react";

export default function StatusBadge({ status }) {
	return (
		<Badge ml='1.5' colorScheme={getColorForStatus(status)}>
			{getTaskStatusDisplayName(status)}
		</Badge>
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
