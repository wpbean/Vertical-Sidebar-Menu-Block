<?php

namespace VSMB\VerticalSidebarMenuBlock\Utils;

class WalkerMenu extends \Walker_Nav_Menu {
    // Add ARIA attributes to the <li> tag for menu items.
    public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        // Add ARIA roles and attributes for parent items with submenus.
        $has_children = in_array( 'menu-item-has-children', $classes );
        $aria_expanded = $has_children ? ' aria-expanded="false"' : '';

        $output .= sprintf(
            '<li id="menu-item-%s" %s%s>',
            esc_attr( $item->ID ),
            $class_names,
            $aria_expanded
        );

        $atts           = array();
        $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts['target'] = ! empty( $item->target ) ? $item->target : '';
        $atts['rel']    = ! empty( $item->xfn ) ? $item->xfn : '';
        $atts['href']   = ! empty( $item->url ) ? $item->url : '';
        $atts['role']   = 'menuitem';                                                                // ARIA role for menu items.
        $atts           = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $output .= sprintf( '<a%s>%s</a>', $attributes, apply_filters( 'the_title', $item->title, $item->ID ) );
    }

    // Add ARIA attributes for submenus.
    public function start_lvl( &$output, $depth = 0, $args = null ) {
        $indent = str_repeat( "\t", $depth );
        $output .= "\n$indent<ul role=\"group\" aria-hidden=\"true\" class=\"sub-menu\">\n";
    }
}
