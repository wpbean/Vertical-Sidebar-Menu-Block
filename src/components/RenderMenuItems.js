export const RenderMenuItems = ({
    items,
    maxDepth = Infinity,
    currentDepth = 0,
    attributes, // Pass attributes to check accordionMode
}) => {
    const toggleMenu = (event) => {
        event.preventDefault();

        const clickedLi = event.currentTarget.closest("li");
        const parentUl  = clickedLi.parentElement;

        // If accordionMode is true, close other open menu items at the same level
        if (attributes.accordionMode && parentUl) {
            const siblingLis = parentUl.querySelectorAll("li.wpb-submenu-opened");
            siblingLis.forEach((li) => {
                if (li !== clickedLi) {
                    li.classList.remove("wpb-submenu-opened");
                    const nestedUl = li.querySelector("ul.wpb-submenu-opened");
                    if (nestedUl) {
                        nestedUl.classList.remove("wpb-submenu-opened");
                    }
                }
            });
        }

        // Toggle the current menu item
        clickedLi.classList.toggle("wpb-submenu-opened");
        const nestedUl = clickedLi.querySelector("ul");
        if (nestedUl) {
            nestedUl.classList.toggle("wpb-submenu-opened");
        }
    };
    
    const renderMenuItems = (items, depth) => (
        <ul>
            {items.map((item) => (
                <li
                    key={item.id}
                    className={item.children && item.children.length > 0 ? 'menu-item-has-children' : ''}
                >
                    <a 
                        href={item.url}
                        onClick={item.children && depth < maxDepth ? toggleMenu : undefined}
                        style={{
                            fontSize: depth === 0 ? attributes.fontSize : attributes.childFontSize,
                            fontWeight: depth === 0 ? attributes.fontWeight : attributes.childFontWeight,
                            lineHeight: depth === 0 ? attributes.lineHeight : attributes.childLineHeight
                        }}
                    >
                        {item.title}
                        {item.children && item.children.length > 0 && depth < maxDepth ? (
                            <span 
                                className={`menu-expand-icon dashicons dashicons-${attributes.expandIcon}`}
                                style={{
                                    fontSize : attributes.collapseFontSize,
                                    fontWeight : attributes.collapseFontWeight,
                                    lineHeight : attributes.collapseLineHeight
                                }}
                            ></span>
                        ) : null}
                    </a>
                    {/* Render children only if within maxDepth */}
                    {item.children && item.children.length > 0 && depth < maxDepth && renderMenuItems(item.children, depth + 1)}
                </li>
            ))}
        </ul>
    );

    return items ? renderMenuItems(items, currentDepth) : null;
};
