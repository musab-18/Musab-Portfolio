declare module "gsap-trial/SplitText" {
    export class SplitText {
        chars: HTMLElement[];
        words: HTMLElement[];
        lines: HTMLElement[];
        constructor(
            target: string | string[] | HTMLElement | HTMLElement[],
            options?: {
                type?: string;
                linesClass?: string;
                wordsClass?: string;
                charsClass?: string;
                position?: string;
            }
        );
        revert(): void;
    }
}
