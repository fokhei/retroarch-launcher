import { RetroArchPlayListItem } from './RetroArchPlayListItem';

export interface RetroArchPlayList {
    version: string,
    default_core_path: string,
    default_core_name: string,
    label_display_mode: number,
    right_thumbnail_mode: number,
    left_thumbnail_mode: number,
    items: Array<RetroArchPlayListItem>
}