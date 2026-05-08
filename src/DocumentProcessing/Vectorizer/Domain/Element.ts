export class Element {
    constructor(
        public readonly id: string,
        public readonly rawSvg: string,
        public readonly optimizedSvg: string,
        public readonly reductionRate: number,
        public readonly scale: number
    ) { }

    static create(params: {
        id: string;
        rawSvg: string;
        optimizedSvg: string;
        reductionRate: number;
        scale: number;
    }): Element {
        return new Element(
            params.id,
            params.rawSvg,
            params.optimizedSvg,
            params.reductionRate,
            params.scale
        );
    }

}