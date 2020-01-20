import { RetroArchPlayListItem } from './RetroArchPlayListItem';

export interface ComputedPlayListItem extends RetroArchPlayListItem {
    id: number;
    category: string;
    basename: string;
    extname: string;
}

