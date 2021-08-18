import React from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import StatusBadge from "./StatusBadge";

export default function TaskContent({ task }, statusBadgeDisplay) {
	return (
		<Box
			mx="auto"
			px={8}
			py={4}
			maxW="3xl"
			shadow="sm"
			_hover={{
				shadow: "2xl",
			}}
			w="full"
			borderWidth="1px"
			bg={useColorModeValue("white", "gray.800")}
		>
			<Flex justify="space-between">
				<Heading justifyContent="start" flexWrap="wrap" fontSize="lg">
					{task.name}
				</Heading>
				<StatusBadge display={statusBadgeDisplay} status={task.status} />
			</Flex>
			<Box mt={2}>
				<Text>{task.description}</Text>
			</Box>
		</Box>
	);
}
