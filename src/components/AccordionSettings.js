import { __ } from '@wordpress/i18n';
import {
    PanelRow,
	ToggleControl
} from '@wordpress/components';

import '../editor.scss';

export const AccordionSettings = ({props}) => {
    return (
        <>
            <PanelRow>
            <ToggleControl
                label={ __( "Accordion Mode", "vertical-sidebar-menu-block" ) }
                checked={ props.attributes.accordionMode }
                onChange={ (newValue) => {
                    props.setAttributes({
                        accordionMode: newValue
                    })
                } }
            />
            </PanelRow>
            <PanelRow>
            <ToggleControl
                label={ __( "Preserve Expanded", "vertical-sidebar-menu-block" ) }
                checked={ props.attributes.preserveExpanded }
                onChange={ (newValue) => {
                    props.setAttributes({
                        preserveExpanded: newValue
                    })
                } }
            />
            </PanelRow>
            <PanelRow>
            <ToggleControl
                label={ __( "Current Expanded", "vertical-sidebar-menu-block" ) }
                checked={ props.attributes.currentExpanded }
                onChange={ (newValue) => {
                    props.setAttributes({
                        currentExpanded: newValue
                    })
                } }
            />
            </PanelRow>
        </>
    );
}