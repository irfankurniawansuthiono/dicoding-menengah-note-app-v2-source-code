export type putAccessTokenProps = string

export type fetchWithTokenProps = {
    url: string;
    options?: RequestInit;
}

export type loginProps = {
    email: string;
    password: string;
}

export type registerProps = {
    name: string;
    email: string;
    password: string;
}

export type addNoteProps = {
    title: string;
    body: string;
}

export type getNoteProps = {
    id: string;
}

export type getArchivedNotesProps = {
    id: string;
}

export type unArchiveNoteProps = {
    id: string;
}

export type deleteNoteProps = {
    id : string;
}
