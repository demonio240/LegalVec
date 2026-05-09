import { Command } from '@Shared/Domain/Bus/Command/Command';

export class VectorizeElementCommand implements Command {
    constructor(
        public elementId: string,
        public image: string,
        public scale: number,
        public precision: number
    ) { }

    public getElementId(): string { return this.elementId; }
    public getImage(): string { return this.image; }
    public getScale(): number { return this.scale; }
    public getPrecision(): number { return this.precision; }
}
