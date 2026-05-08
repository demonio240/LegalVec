export class VectorizeElementCommand implements Command {
    constructor(
        public readonly elementId: string,
        public readonly image: string,
        public readonly scale: number,
        public readonly precision: number,
    ) { }
}
