/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';

import { PanelBody } from '@wordpress/components';

import { useEffect } from "@wordpress/element";

import { useMenuItems } from './hooks/useMenuItems';
import { RenderMenuItems } from './components/RenderMenuItems';
import { MenuSettings } from './components/MenuSettings';
import { AccordionSettings } from './components/AccordionSettings';
import { TypographySettings } from './components/TypographySettings';
import { CollapseIconSettings } from './components/CollapseIconSettings';
import { ProUpgradeNotice } from './components/ProUpgradeNotice';
import { getDynamicStyles } from './components/DynamicStyles';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import metadata from './block.json';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {

	const menuItems = useMenuItems(props.attributes.menuId);

	useEffect(() => {
		if (!props.attributes.theClientId) {
			props.setAttributes({
				theClientId: props.clientId
			});
		}
	}, []);

	const blockProps = useBlockProps({
		style: props.attributes.hasProVersion ? getDynamicStyles(props.attributes) : '',
		className: props.attributes.childBorder ? 'wpbean-vertical-menu-has-child-border' : ''
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Menu Settings", "vertical-sidebar-menu-block")}>
					<MenuSettings props={props}></MenuSettings>
				</PanelBody>

				<PanelBody title={__("Accordion", "vertical-sidebar-menu-block")} initialOpen={false}>
					<AccordionSettings props={props}></AccordionSettings>
				</PanelBody>

				<PanelBody title={__("Typography", "vertical-sidebar-menu-block")} initialOpen={false}>
					<TypographySettings props={props}></TypographySettings>
				</PanelBody>

				<PanelBody title={__("Collapse Icon", "vertical-sidebar-menu-block")} initialOpen={false}>
					<CollapseIconSettings props={props}></CollapseIconSettings>
				</PanelBody>
				{!props.attributes.hasProVersion && (
					<>
						<ProUpgradeNotice></ProUpgradeNotice>
					</>
				)}
			</InspectorControls>
			<div {...blockProps}>
				{!!props.attributes.menuId && (
					<>
						{Array.isArray(menuItems) && menuItems.length > 0 ? (
							<nav aria-label={__("Vertical Sidebar Menu", "vertical-sidebar-menu-block")}>
								<ul role="menu">
									<RenderMenuItems
										key={props.clientId}
										items={menuItems}
										maxDepth={props.attributes.menuDepth == '0' ? 10 : props.attributes.menuDepth - 1}
										attributes={props.attributes}
									/>
								</ul>
							</nav>
						) : (
							<p style={{ color: 'red', fontWeight: 'bold' }} className="menu-error-message">
								{__("No menu items found for the selected menu.", "vertical-sidebar-menu-block")}
							</p>
						)}
					</>
				)}

				{!props.attributes.menuId && (
					<p>{__("Please Set a Menu", "vertical-sidebar-menu-block")}</p>
				)}
			</div>
		</>
	);
}
