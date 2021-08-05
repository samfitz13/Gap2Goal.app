import React from "react";
import { LinkNext } from "grommet-icons";
import { HStack } from "@chakra-ui/react";

import StatusBadge from "./StatusBadge";

export default function StatusChange({ from, to }) {
	return (
		<HStack spacing="12">
			<StatusBadge status={from} />
			<LinkNext />
			<StatusBadge status={to} />
		</HStack>
	);
}
