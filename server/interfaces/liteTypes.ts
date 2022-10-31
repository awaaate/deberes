export interface UserLite {
    name : string,
    email : string,
    about? : string
}

export interface TaskLite {
    title : string,
    body : string,
    status : string,
    userId : string,
    tags : TagLite[]
}

export interface TagLite {
    name : string
}