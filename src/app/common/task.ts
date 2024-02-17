export class Task {
    constructor(public id: number,
                public description: string,
                public creationTime?: Date,
                public lastUpdate?: Date,
                public isDone? :boolean) { }
}
