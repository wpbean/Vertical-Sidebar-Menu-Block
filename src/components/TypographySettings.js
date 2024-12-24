import { __ } from '@wordpress/i18n';
import '../editor.scss';

import { TypographyControls } from './TypographyControls';

import { TabPanel } from '@wordpress/components';

export const TypographySettings = ({props}) => {
    return (
        <>
            <TabPanel
                className="wpbean-settings-tab-panel"
                tabs={[
                    {
                        name: 'parent-style',
                        title: __('Parent Items', "vertical-sidebar-menu-block"),
                        className: 'parent-style-tab',
                    },
                    {
                        name: 'child-style',
                        title: __('Child Items', "vertical-sidebar-menu-block"),
                        className: 'child-style-tab',
                    },
                ]}
            >
                {(tab) => {
                    if (tab.name === 'parent-style') {
                        return (
                            <>
                                <TypographyControls
                                    title={__('Parent Typography', "vertical-sidebar-menu-block")}
                                    fontSize={{
                                        value: props.attributes.fontSize,
                                        onChange: (newValue) => props.setAttributes({ fontSize: newValue }),
                                    }}
                                    fontWeight={{
                                        value: props.attributes.fontWeight,
                                        onChange: (newValue) => props.setAttributes({ fontWeight: newValue }),
                                    }}
                                    lineHeight={{
                                        value: props.attributes.lineHeight,
                                        onChange: (newValue) => props.setAttributes({ lineHeight: newValue }),
                                    }}
                                />
                            </>
                        );
                    }
    
                    if (tab.name === 'child-style') {
                        return (
                            <>
                                <TypographyControls
                                    title={__('Child Typography', "vertical-sidebar-menu-block")}
                                    fontSize={{
                                        value: props.attributes.childFontSize,
                                        onChange: (newValue) => props.setAttributes({ childFontSize: newValue }),
                                    }}
                                    fontWeight={{
                                        value: props.attributes.childFontWeight,
                                        onChange: (newValue) => props.setAttributes({ childFontWeight: newValue }),
                                    }}
                                    lineHeight={{
                                        value: props.attributes.childLineHeight,
                                        onChange: (newValue) => props.setAttributes({ childLineHeight: newValue }),
                                    }}
                                />
                            </>
                        );
                    }
                }}
            </TabPanel>
        </>
    );
}