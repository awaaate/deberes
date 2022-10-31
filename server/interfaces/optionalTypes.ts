export interface UserOpt {
    id : string
    name? : string,
    email? : string,
    about? : string
}

export interface TaskOpt {
    id : string
    title? : string,
    body? : string,
    status? : string,
    userId? : string
}

export interface TagOpt{
    id : string
    name? : string
}