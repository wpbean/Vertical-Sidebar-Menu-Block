export function getDynamicStyles(attributes) {
    const {
        parentColor,
        parentHoverColor,
        childColor,
        childHoverColor,
        currentColor,
        currentHoverColor,
        parentBackground,
        parentHoverBackground,
        childBackground,
        childHoverBackground,
        currentBackground,
        currentHoverBackground,
        itemSpacing,
        parentSpacing, // Parent spacing object
        childSpacing, // Child spacing object
        childBorderColor,
        childBorderWidth,
        borderRadius
    } = attributes;

    // Initialize dynamic styles object
    const styles = {
        'border': 0,
        '--wpbean-vsm-parent-color': parentColor || '',
        '--wpbean-vsm-parent-hover-color': parentHoverColor || '',
        '--wpbean-vsm-child-color': childColor || '',
        '--wpbean-vsm-child-hover-color': childHoverColor || '',
        '--wpbean-vsm-current-color': currentColor || '',
        '--wpbean-vsm-current-hover-color': currentHoverColor || '',
        '--wpbean-vsm-parent-background': parentBackground || '',
        '--wpbean-vsm-parent-hover-background': parentHoverBackground || '',
        '--wpbean-vsm-child-background': childBackground || '',
        '--wpbean-vsm-child-hover-background': childHoverBackground || '',
        '--wpbean-vsm-current-background': currentBackground || '',
        '--wpbean-vsm-current-hover-background': currentHoverBackground || '',
        '--wpbean-vsm-item-spacing': itemSpacing || '',
        '--wpbean-vsm-child-border-color': childBorderColor || '',
        '--wpbean-vsm-child-border-width': childBorderWidth || '',
        '--wpbean-vsm-border-radius': borderRadius || '',
    };

    // Handle parentSpacing object
    if (parentSpacing) {
        const { top, right, bottom, left } = parentSpacing;

        if (top) {
            styles['--wpbean-vsm-parent-spacing-top'] = top;
        }
        if (right) {
            styles['--wpbean-vsm-parent-spacing-right'] = right;
        }
        if (bottom) {
            styles['--wpbean-vsm-parent-spacing-bottom'] = bottom;
        }
        if (left) {
            styles['--wpbean-vsm-parent-spacing-left'] = left;
        }
    }

    // Handle childSpacing object
    if (childSpacing) {
        const { top, right, bottom, left } = childSpacing;

        if (top) {
            styles['--wpbean-vsm-child-spacing-top'] = top;
        }
        if (right) {
            styles['--wpbean-vsm-child-spacing-right'] = right;
        }
        if (bottom) {
            styles['--wpbean-vsm-child-spacing-bottom'] = bottom;
        }
        if (left) {
            styles['--wpbean-vsm-child-spacing-left'] = left;
        }
    }

    return styles;
}
