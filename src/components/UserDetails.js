import React from "react";
import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Heading, Image,
	Stack, useColorModeValue
} from "@chakra-ui/react";

export function UserDetails({ user, handleEditPermissions }) {
	return (
		<Center p={2}>
			<Box
				maxW={"270px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded="md"
				overflow="hidden"
				p="5"
			>
				<Image
					h={"120px"}
					w={"full"}
					src={"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"}
					objectFit={"cover"} />
				<Flex justify={"center"} mt={-12}>
					<Avatar
						size={"xl"}
						alt={"Author"}
						css={{
							border: "2px solid white",
						}} />
				</Flex>
				<Box p={6}>
					<Stack spacing={2} align="center" mb={5}>
						<Heading fontSize="2xl" fontWeight={500} fontFamily="body">
							{user.profile.email}
						</Heading>
						<Button onClick={handleEditPermissions}>Manage My Project</Button>
					</Stack>
				</Box>
			</Box>
		</Center>
	);
}
