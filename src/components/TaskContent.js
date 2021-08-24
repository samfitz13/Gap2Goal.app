import React from "react";
import {
	Box,
	Flex,
	Heading,
	Tag,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import StatusBadge from "./StatusBadge";
import moment from "moment";

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
				<Flex>
					{moment(task.dueDate).fromNow().includes("ago") &&
					task.status !== "Complete" ? (
						<Tag maxH="1rem" size="lg" colorScheme="red" variant="subtle">
							Overdue
						</Tag>
					) : null}
					<StatusBadge display={statusBadgeDisplay} status={task.status} />
				</Flex>
			</Flex>
			<Box mt={2}>
				<Text>{task.description}</Text>
				{task.dueDate ? (
					<Text>Due Date: {moment(task.dueDate).fromNow()}</Text>
				) : null}
			</Box>
		</Box>
	);
}
