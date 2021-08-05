import React from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import StatusBadge from "./StatusBadge";

export default function TaskContent({ task }) {
	return (
		<Box
			mx="auto"
			px={8}
			py={4}
			maxW="2xl"
			shadow="lg"
			borderWidth="1px"
			bg={useColorModeValue("white", "gray.800")}
		>
			<Flex justifyContent="space-between" slignItems="center">
				<Heading fontSize="lg">{task.name}</Heading>
				<StatusBadge status={task.status} />
			</Flex>
			<Box mt={2}>
				<Text>{task.description}</Text>
			</Box>
		</Box>
	);
}
