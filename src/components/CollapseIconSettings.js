import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    ButtonGroup,
    Button
} from '@wordpress/components';

import { TypographyControls } from './TypographyControls';

import '../editor.scss';

export const CollapseIconSettings = ({props}) => {
	// Define available Dashicons.
    const dashiconsList = [
        'arrow-right-alt2',
        'arrow-right',
        'arrow-right-alt',
        'plus',
        'plus-alt2',
        'plus-alt',
    ];

    return (
        <>
            <BaseControl label={__("Select an icon", "vertical-sidebar-menu-block")}>
                <ButtonGroup className="wpbean-vsm-icon-grid">
                    {dashiconsList.map((expandIcon) => (
                        <Button
                            key={expandIcon}
                            variant="secondary"
                            onClick={() => props.setAttributes({ expandIcon })}
                            className={`wpbean-vsm-icon-button ${props.attributes.expandIcon === expandIcon ? 'selected' : ''}`}
                        >
                            <span className={`dashicons dashicons-${expandIcon}`} aria-hidden="true"></span>
                        </Button>
                    ))}
                </ButtonGroup>
            </BaseControl>
            
            <BaseControl className="wpbean-vsm-no-padding">
                <TypographyControls
                    title={__('Icon Typography', "vertical-sidebar-menu-block")}
                    fontSize={{
                        value: props.attributes.collapseFontSize,
                        onChange: (newValue) => props.setAttributes({ collapseFontSize: newValue }),
                    }}
                    fontWeight={{
                        value: props.attributes.collapseFontWeight,
                        onChange: (newValue) => props.setAttributes({ collapseFontWeight: newValue }),
                    }}
                    lineHeight={{
                        value: props.attributes.collapseLineHeight,
                        onChange: (newValue) => props.setAttributes({ collapseLineHeight: newValue }),
                    }}
                />
            </BaseControl>
        </>
    );
};