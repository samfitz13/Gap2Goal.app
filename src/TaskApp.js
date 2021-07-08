import React from "react";
import { Box, Clock, Footer, Grommet, Header, Heading, Main } from "grommet";

import { useRealmApp } from "./RealmApp";
import ProjectScreen from "./components/ProjectScreen";
import Sidebar from "./components/Sidebar";

const theme = {
	global: {
		colors: {
			"light-2": "#f5f5f5",
			text: {
				light: "rgba(0, 0, 0, 0.87)",
			},
		},
		edgeSize: {
			small: "14px",
		},
		elevation: {
			light: {
				medium:
					"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
			},
		},
		font: {
			family: "Roboto",
			size: "16px",
			height: "20px",
		},
	},
};

export default function TaskApp() {
	const app = useRealmApp();
	const [currentProject, setCurrentProject] = React.useState(
		// set the current project as  "My Project"
		app.currentUser.customData.memberOf[0]
	);
	const [isEditingPermissions, setIsEditingPermissions] = React.useState(false);
	return (
		<Grommet theme={theme}>
			<Header background="brand">
				<Heading color="light-2" margin="small" level={2} responsive>
					Gap2Goal.app
				</Heading>
				<Clock type="digital" hourLimit={12} />
			</Header>
			<Box
				gap='small'
				direction="row"
				pad="small"
				border={{ color: "brand", size: "large" }}
			>
				<Sidebar
					currentProject={currentProject}
					setCurrentProject={setCurrentProject}
					setIsEditingPermissions={setIsEditingPermissions}
				/>
				<Main>
					<ProjectScreen
						currentProject={currentProject}
						isEditingPermissions={isEditingPermissions}
						setIsEditingPermissions={setIsEditingPermissions}
					/>
				</Main>
			</Box>
			<Footer background="brand" pad="medium">
				a samfitz project
			</Footer>
		</Grommet>
	);
}
