import { __ } from '@wordpress/i18n';
import '../editor.scss';

import {
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    FontSizePicker,
    SelectControl,
    RangeControl 
} from '@wordpress/components';

export const TypographyControls = ({ 
    title,
    fontSize,
    fontWeight,
    lineHeight
}) => {
    return (
        <ToolsPanel
            label={title}
            resetAll={() => {
                if (fontSize && fontSize.onChange) fontSize.onChange(undefined);
                if (fontWeight && fontWeight.onChange) fontWeight.onChange(undefined);
                if (lineHeight && lineHeight.onChange) lineHeight.onChange(undefined);
            }}
        >
            {/* Font Size */}
            {fontSize && (
                <ToolsPanelItem
                    label={__('Font Size', "vertical-sidebar-menu-block")}
                    resetAll={() => fontSize.onChange(undefined)}
                    hasValue={() => fontSize.value !== undefined}
                >
                    <FontSizePicker
                        value={fontSize.value}
                        onChange={fontSize.onChange}
                        fallbackFontSize={16}
                        withSlider
                    />
                </ToolsPanelItem>
            )}

            {/* Font Weight */}
            {fontWeight && (
                <ToolsPanelItem
                    label={__('Font Weight', "vertical-sidebar-menu-block")}
                    resetAll={() => fontWeight.onChange(undefined)}
                    hasValue={() => fontWeight.value !== undefined}
                >
                    <SelectControl
                        label={__('Font Weight', "vertical-sidebar-menu-block")}
                        labelPosition="side"
                        value={fontWeight.value}
                        options={[
                            { label: __('Default', "vertical-sidebar-menu-block"), value: '' },
                            { label: __('100', "vertical-sidebar-menu-block"), value: '100' },
                            { label: __('200', "vertical-sidebar-menu-block"), value: '200' },
                            { label: __('300', "vertical-sidebar-menu-block"), value: '300' },
                            { label: __('400', "vertical-sidebar-menu-block"), value: '400' },
                            { label: __('500', "vertical-sidebar-menu-block"), value: '500' },
                            { label: __('600', "vertical-sidebar-menu-block"), value: '600' },
                            { label: __('700', "vertical-sidebar-menu-block"), value: '700' },
                            { label: __('800', "vertical-sidebar-menu-block"), value: '800' },
                            { label: __('900', "vertical-sidebar-menu-block"), value: '900' },
                            { label: __('Bold', "vertical-sidebar-menu-block"), value: '700' },
                            { label: __('Normal', "vertical-sidebar-menu-block"), value: 'normal' },
                        ]}
                        onChange={fontWeight.onChange}
                    />
                </ToolsPanelItem>
            )}

            {/* Line Height */}
            {lineHeight && (
                <ToolsPanelItem
                    label={__('Line Height', "vertical-sidebar-menu-block")}
                    resetAll={() => lineHeight.onChange(undefined)}
                    hasValue={() => lineHeight.value !== undefined}
                >
                    <RangeControl
                        label={__('Line Height', "vertical-sidebar-menu-block")}
                        value={lineHeight.value}
                        onChange={lineHeight.onChange}
                        min={1}
                        max={3}
                        step={0.1}
                        allowReset
                    />
                </ToolsPanelItem>
            )}
        </ToolsPanel>
    );
};