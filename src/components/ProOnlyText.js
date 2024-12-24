import { __ } from '@wordpress/i18n';
import '../editor.scss';

export const ProOnlyText = ({props}) => {
    return (
        <>
            <p>{__( "Only the premium version of this plugin has these specific parameters. Please upgrade to the pro version to receive a special 10% discount.", "vertical-sidebar-menu-block" )}</p>
            <p>{__( "Discount Code:", "vertical-sidebar-menu-block" )} <b><a href='https://wpbean.com/' target='_blank'>10PERCENTOFF</a></b></p>
        </>
    );
}