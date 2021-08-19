import React from "react";
import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";

import EditPermissionsModal from "./EditPermissionsModal";
import Kanban from "./Kanban";
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
				<Tab>Kanban </Tab>
				<Tab>Stats</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					{currentProject && <TaskList currentProject={currentProject} />}
					<EditPermissionsModal
						isEditingPermissions={isEditingPermissions}
						setIsEditingPermissions={setIsEditingPermissions}
					/>
				</TabPanel>
				<TabPanel>
					<Kanban currentProject={currentProject} />
				</TabPanel>
				<TabPanel>
					<StatsScreen currentProject={currentProject} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
