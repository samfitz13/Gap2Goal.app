import React from "react";
import {
	Flex,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels,
} from "@chakra-ui/react";

import EditPermissionsModal from "./EditPermissionsModal";
import StatsScreen from "./StatsScreen";
import { TaskList } from "./TaskList";

export default function ProjectScreen({
	currentProject,
	isEditingPermissions,
	setIsEditingPermissions,
}) {
	return (
		<Tabs>
			<TabList>
				<Tab>Task List</Tab>
				<Tab>Stats</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<Flex justify="center">
						{currentProject && <TaskList currentProject={currentProject} />}
						<EditPermissionsModal
							isEditingPermissions={isEditingPermissions}
							setIsEditingPermissions={setIsEditingPermissions}
						/>
					</Flex>
				</TabPanel>
				<TabPanel>
					<StatsScreen currentProject={currentProject} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}


