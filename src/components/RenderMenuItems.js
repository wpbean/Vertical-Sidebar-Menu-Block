export const RenderMenuItems = ({
    items,
    maxDepth = Infinity,
    currentDepth = 0,
    attributes,
}) => {
    const {
        fontSize = "14px",
        fontWeight = "400",
        lineHeight = "1.5",
        childFontSize = "14px",
        childFontWeight = "400",
        childLineHeight = "1.5",
        collapseFontSize = "17px",
        collapseFontWeight = "400",
        collapseLineHeight = "1",
        expandIcon = "arrow-down",
        accordionMode = false,
    } = attributes || {};

    const toggleMenu = (event) => {
        event.preventDefault();

        const clickedLi = event.currentTarget.closest("li");
        const parentUl = clickedLi.parentElement;

        // Handle accordion mode
        if (accordionMode && parentUl) {
            const siblingLis = parentUl.querySelectorAll("li.wpb-submenu-opened");
            siblingLis.forEach((li) => {
                if (li !== clickedLi) {
                    li.classList.remove("wpb-submenu-opened");
                    const nestedUl = li.querySelector("ul");
                    if (nestedUl) {
                        nestedUl.classList.remove("wpb-submenu-opened");
                        nestedUl.setAttribute("aria-hidden", "true");
                        const anchor = li.querySelector("a[aria-expanded]");
                        if (anchor) anchor.setAttribute("aria-expanded", "false");
                    }
                }
            });
        }

        // Toggle the current menu item
        const nestedUl = clickedLi.querySelector("ul");
        if (nestedUl) {
            const isExpanded = clickedLi.classList.toggle("wpb-submenu-opened");
            nestedUl.setAttribute("aria-hidden", !isExpanded);
            nestedUl.classList.toggle("wpb-submenu-opened");
            const anchor = clickedLi.querySelector("a[aria-expanded]");
            if (anchor) anchor.setAttribute("aria-expanded", isExpanded);
        }
    };

    const renderMenuItems = (items, depth) => (

        <>
            {items.map((item) => (
                <li
                    key={item.id}
                    className={item.children && item.children.length > 0 ? 'menu-item-has-children' : ''}
                >
                    <a
                        href={item.url || "#"}
                        onClick={item.children && depth < maxDepth ? toggleMenu : undefined}
                        style={{
                            fontSize: depth === 0 ? fontSize : childFontSize,
                            fontWeight: depth === 0 ? fontWeight : childFontWeight,
                            lineHeight: depth === 0 ? lineHeight : childLineHeight,
                        }}
                        aria-expanded={
                            item.children && item.children.length > 0 && depth < maxDepth ? "false" : undefined
                        }
                    >
                        {item.title}
                        {item.children && item.children.length > 0 && depth < maxDepth ? (
                            <span
                                className={`menu-expand-icon dashicons dashicons-${expandIcon}`}
                                style={{
                                    fontSize: collapseFontSize,
                                    fontWeight: collapseFontWeight,
                                    lineHeight: collapseLineHeight,
                                }}
                            ></span>
                        ) : null}
                    </a>
                    {item.children && item.children.length > 0 && depth < maxDepth && (
                        <ul role="group" aria-hidden="true">
                            {renderMenuItems(item.children, depth + 1)}
                        </ul>
                    )}
                </li>
            ))}
        </>
    );

    return items && Array.isArray(items) ? renderMenuItems(items, currentDepth) : null;
};
