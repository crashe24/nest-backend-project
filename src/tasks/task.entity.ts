export enum TastStatusEnun {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    DONE = 'DONE',
    IN_PROGRESS = 'IN_PROGRESS',
    PENDING= 'PENDING'


}

export class Task {
    id  : number
    title : string
    description : string 
    status: TastStatusEnun
}

