import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
	Notice,
	__experimentalText as Text,
	__experimentalHeading as Heading,
} from "@wordpress/components";

export const ProUpgradeNotice = () => {
	const [isDismissed, setDismissed] = useState(false);

	if (isDismissed) {
		return null; // Do not render if dismissed
	}

	return (
		<Notice status="info" isDismissible onDismiss={() => setDismissed(true)}>
			<Heading level={4}>
				{__("Upgrade to Pro!", "vertical-sidebar-menu-block")}
			</Heading>
			<Text>
				{__(
					"Unlock premium features such as custom colors, background, advanced spacing, and dedicated support.",
					"vertical-sidebar-menu-block",
				)}
			</Text>
			<Text>
				<a
					href="https://wpbean.com/downloads/vertical-sidebar-menu-block-pro/?utm_content=Vertical+Sidebar+Menu+Block&utm_campaign=blocklink&utm_medium=block-control&utm_source=FreeVersion"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "#0073aa", textDecoration: "none" }}
				>
					{__("Learn More", "vertical-sidebar-menu-block")}
				</a>
			</Text>
		</Notice>
	);
};
