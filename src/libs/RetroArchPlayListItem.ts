import { RetroArchDB } from './RetroArchDB';
import { CustomDB } from './CustomDB';


export interface RetroArchPlayListItem {
    "path": string,
    "label": string,
    "core_path": string,
    "core_name": string,
    "crc32": string,
    "db_name": RetroArchDB|CustomDB
}