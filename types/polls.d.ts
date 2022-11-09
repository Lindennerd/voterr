export interface Poll {
    id: string,
    title: string,
    description: string,
    slug: string,
    createdBy: string,
    created: string,
    validUntil: string,
    options?: Option[]
}

export interface Option {
    id: string,
    text: string,
    description?: string,
    votes: number,
    poll: string
}

export interface VotedEvent {
    poll: string,
    option: string,
}