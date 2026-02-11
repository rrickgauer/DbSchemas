import { Dropdown, Modal, Offcanvas, Tab } from "bootstrap";

const BS_DISPLAY_NONE = 'd-none';

export function bootstrapGetModal(element: Element): Modal
{
    return Modal.getOrCreateInstance(element);
}

export function bootstrapShowModal(element: Element): void
{
    Modal.getOrCreateInstance(element).show();
}

export function bootstrapShowOffcanvas(element: Element): void
{
    Offcanvas.getOrCreateInstance(element).show();
}

export function bootstrapHideModal(element: Element): void
{
    bootstrapGetModal(element).hide();
}

export function bootstrapHideOffcanvas(element: Element): void
{
    Offcanvas.getOrCreateInstance(element).hide();
}

export function bootstrapHideDropdown(element: Element): void;
export function bootstrapHideDropdown(element: Element, handleButton: boolean): void;
export function bootstrapHideDropdown(element: Element, handleButton?: boolean): void
{
    Dropdown.getOrCreateInstance(element).hide();
    
    if (handleButton)
    {
        const dropdown = element.querySelector<HTMLElement>(`[data-bs-toggle="dropdown"]`);
        dropdown?.classList.remove('show');
    }
}

export function bootstrapShowElement(element: Element): void
{
    element.classList.remove(BS_DISPLAY_NONE);
}

export function bootstrapHideElement(element: Element): void
{
    element.classList.add(BS_DISPLAY_NONE);
}



export function bootstrapShowNav(element: string | Element): Tab
{
    const tab = bootstrapGetNav(element);
    tab.show();
    return tab;
}

export function bootstrapGetNav(element: string | Element): Tab
{
    return Tab.getOrCreateInstance(element);
}



