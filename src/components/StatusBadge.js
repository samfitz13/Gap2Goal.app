import React from "react";
import { Tag } from "grommet-controls";

export default function StatusBadge({ status }) {
	return (
		<Tag
			
			round
			background={getColorForStatus(status)}
			label={getTaskStatusDisplayName(status)}
		/>
	);
}

const getColorForStatus = (status) => {
	switch (status) {
		case "Open":
			return "accent-3";
		case "InProgress":
			return "status-warning";
		case "Complete":
			return "status-ok";
		default:
			return "status-disabled";
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
