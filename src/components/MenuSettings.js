import { __ } from '@wordpress/i18n';
import { 
	SelectControl,
    RangeControl
} from '@wordpress/components';

import {useNavMenus} from '../hooks/useNavMenus';
import '../editor.scss';

export const MenuSettings = ({props}) => {
    const navMenus   = useNavMenus();

    return (
        <>
            <SelectControl
                label={__( "Select a menu", "vertical-sidebar-menu-block" )}
                value={props.attributes.menuId}
                onChange={(newValue)=>{
                    props.setAttributes({
                        menuId: newValue
                    })
                }}
                options={[
                    {
                        label: __("Select a menu", "vertical-sidebar-menu-block"),
                        value: "",
                    },
                    ...(navMenus || []).map((navMenu) => ({
                        label: navMenu.name,
                        value: navMenu.id,
                    })),
                ]}
            >
            </SelectControl>

            <RangeControl
                label={__("Menu depth", "vertical-sidebar-menu-block")}
                value={props.attributes.menuDepth}
                onChange={(newValue)=>{
                    props.setAttributes({
                        menuDepth: newValue
                    })
                }}
                min={0}
                max={10}
                step={1}
            />
        </>
    );
};