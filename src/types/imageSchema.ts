export interface ImageSchema {
    kind: string;
    mimeType: string;
    id: string;
    name: string;
}

export interface ImageListType {
    files: ImageSchema[];
}
