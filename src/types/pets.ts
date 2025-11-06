

export type Pets = {
    type: string | "Dog" | "Cat",
    allowed: boolean,
    declawed?: boolean,
    neutered?: boolean,
    interview?: boolean,
    details: string,
    limit: number,
    fee?: number,
    deposit?: number,
    rent?: number,
  }