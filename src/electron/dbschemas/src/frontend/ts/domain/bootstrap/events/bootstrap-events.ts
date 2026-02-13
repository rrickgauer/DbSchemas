

import { BootstrapComponentEvents } from "./BootstrapComponentEvents";

// https://getbootstrap.com/docs/5.3/components/modal/#events
export const BootstrapModalEvents = new BootstrapComponentEvents({
    componentName: 'modal',
    includeHidePrevented: true,
});

export const BootstrapCollapseEvents = new BootstrapComponentEvents({
    componentName: 'collapse',
    includeHidePrevented: false,
});


export const BootstrapDropdownEvents = new BootstrapComponentEvents({
    componentName: 'dropdown',
    includeHidePrevented: true,
});





