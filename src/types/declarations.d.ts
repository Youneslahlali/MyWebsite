declare module "qrcodejs2-fix" {
    export default class QRCode {
        static CorrectLevel: { L: number; M: number; Q: number; H: number };
        constructor(
            element: HTMLElement,
            options: {
                text: string;
                width?: number;
                height?: number;
                colorDark?: string;
                colorLight?: string;
                correctLevel?: number;
            }
        );
    }
}

declare module "jsbarcode" {
    function JsBarcode(
        element: string | HTMLElement,
        data: string,
        options?: Record<string, unknown>
    ): void;
    export default JsBarcode;
}
