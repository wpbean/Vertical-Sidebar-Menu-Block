<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use VSMB\VerticalSidebarMenuBlock\Utils\DynamicStyleHandler;
use VSMB\VerticalSidebarMenuBlock\Utils\WalkerMenu;

// Return early if the menu ID is not set.
if ( ! isset( $attributes['menuId'] ) ) {
    return;
}


// Generate a unique block ID based on the client ID or a random ID.
$block_id = isset( $attributes['theClientId'] ) 
    ? 'wpbean-vertical-menu-block-' . $attributes['theClientId'] 
    : 'wpbean-vertical-menu-block-' . uniqid();

// Instantiate the DynamicStyleHandler class.
new DynamicStyleHandler(
    $attributes,
    $block_id,
    'wpb-vertical-sidebar-menu-dynamic-style',
    '--wpbean-vsm-',
    apply_filters( 'vsmb_block_dynamic_styles', array(
        'fontSize',
        'fontWeight',
        'lineHeight',
        'childFontSize',
        'childFontWeight',
        'childLineHeight',
        'collapseFontSize',
        'collapseFontWeight',
        'collapseLineHeight'
    ) )
);

// Prepare dynamic block CSS classes.
$block_class = array(
    'wpbean-vertical-menu-block',
    $block_id
);

if( isset( $attributes['childBorder'] ) && false !== $attributes['childBorder'] ) {
    $block_class[] = 'wpbean-vertical-menu-has-child-border';
}

// Prepare additional block wrapper attributes.
$extra_attributes = array(
    'class'           => implode( ' ', $block_class ),
    'data-id'         => ! empty( $attributes['menuId'] ) ? esc_attr( $attributes['menuId'] ) : '',
    'data-depth'      => ! empty( $attributes['menuDepth'] ) ? esc_attr( $attributes['menuDepth'] ) : 0,
    'data-expandicon' => ! empty( $attributes['expandIcon'] ) ? esc_attr( $attributes['expandIcon'] ) : 'plus',
);

if ( isset( $attributes['accordionMode'] ) && $attributes['accordionMode'] ) {
    $extra_attributes['data-accordion'] = esc_attr( $attributes['accordionMode'] );
}

if ( isset( $attributes['preserveExpanded'] ) && $attributes['preserveExpanded'] ) {
    $extra_attributes['data-preserve'] = esc_attr( $attributes['preserveExpanded'] );
}

if ( isset( $attributes['currentExpanded'] ) && $attributes['currentExpanded'] ) {
    $extra_attributes['data-current'] = esc_attr( $attributes['currentExpanded'] );
}

// Generate block wrapper attributes.
$block_wrapper_attributes = get_block_wrapper_attributes( $extra_attributes );

// Define the menu options.
$default_options = array(
    'menu'                 => intval( ! empty( $attributes['menuId'] ) ? $attributes['menuId'] : '' ),
    'container'            => 'nav',
    'container_aria_label' => esc_html__( 'Vertical Sidebar Menu', 'vertical-sidebar-menu-block' ),
    'container_class'      => '',
    'container_id'         => '',
    'menu_class'           => 'wpbean-vertical-menu-accordion',
    'menu_id'              => '',
    'echo'                 => true,
    'before'               => '',
    'after'                => '',
    'link_before'          => '',
    'link_after'           => '',
    'items_wrap'           => '<ul role="menu" id="%1$s" class="%2$s">%3$s</ul>',
    'depth'                => intval( ! empty( $attributes['menuDepth'] ) ? $attributes['menuDepth'] : 0 ),
    'walker'               => new WalkerMenu(),
);
$options = apply_filters( 'vsmb_wp_nav_menu_args', $default_options );
?>
<div <?php echo wp_kses_post( $block_wrapper_attributes ); ?>>
    <?php wp_nav_menu( $options ); ?>
</div>
