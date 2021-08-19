import React from "react";
import { BsCodeSlash } from "react-icons/bs";
import { Center, Heading, Icon } from "@chakra-ui/react";

export default function Logo() {
	return (
		<Center>
			<Icon as={BsCodeSlash} />
			<Heading textAlign="center" fontSize="2xl" ml="2" fontWeight="light">
				Gap2Goal.app
			</Heading>
		</Center>
	);
}
