import { SearchModal } from "./SearchModal";

let SEACH_MODAL_SINGLETON: SearchModal | null = null;

export function initializeSearchModal(): void
{
    if (SEACH_MODAL_SINGLETON == null)
    {
        SEACH_MODAL_SINGLETON = new SearchModal();
        SEACH_MODAL_SINGLETON.control();
    }
}