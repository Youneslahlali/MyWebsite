"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
    QrCode,
    Barcode,
    FileText,
    Camera,
    Download,
    Copy,
    Check,
    Wand2,
    AlignLeft,
    Link as LinkIcon,
    Mail,
    Phone,
    MessageSquare,
    Wifi,
    Contact,
    Layers,
    RefreshCw,
    X,
} from "lucide-react";

// ===== TYPES =====
type Mode = "qr" | "barcode" | "bulk" | "scan" | "rescan";
type QRInputType = "text" | "url" | "email" | "phone" | "sms" | "wifi" | "vcard";

const modes = [
    { id: "qr" as Mode, label: "QR Code", icon: QrCode },
    { id: "barcode" as Mode, label: "Barcode", icon: Barcode },
    { id: "bulk" as Mode, label: "Bulk Barcodes", icon: FileText },
    { id: "scan" as Mode, label: "Scanner", icon: Camera },
    { id: "rescan" as Mode, label: "Rescan Utility", icon: RefreshCw },
];

const qrInputTypes = [
    { id: "text" as QRInputType, label: "Text", icon: AlignLeft },
    { id: "url" as QRInputType, label: "URL", icon: LinkIcon },
    { id: "email" as QRInputType, label: "Email", icon: Mail },
    { id: "phone" as QRInputType, label: "Phone", icon: Phone },
    { id: "sms" as QRInputType, label: "SMS", icon: MessageSquare },
    { id: "wifi" as QRInputType, label: "WiFi", icon: Wifi },
    { id: "vcard" as QRInputType, label: "Contact", icon: Contact },
];

const barcodeFormats = [
    { value: "CODE128", label: "Code 128 (Default)" },
    { value: "CODE39", label: "Code 39" },
    { value: "EAN13", label: "EAN-13" },
    { value: "UPC", label: "UPC" },
    { value: "ITF14", label: "ITF-14" },
    { value: "MSI", label: "MSI" },
    { value: "pharmacode", label: "Pharmacode" },
];

// ===== COMPONENTS =====
function CustomSelect({
    value,
    onChange,
    options,
    className = "",
}: {
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_#e9ff00] dark:focus:shadow-[4px_4px_0px_#00e936] transition-all uppercase"
            >
                <span className="truncate">{selectedOption?.label || "Select..."}</span>
                <svg
                    className={`w-5 h-5 text-black dark:text-white transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-black border-[4px] border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] animate-in fade-in zoom-in duration-200">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-5 py-3 text-sm font-bold uppercase transition-colors border-b-[3px] border-black dark:border-white last:border-b-0 ${opt.value === value
                                    ? "bg-black dark:bg-white text-[#e9ff00] dark:text-black"
                                    : "text-black dark:text-white hover:bg-[#00e936] hover:text-black dark:hover:bg-[#e9ff00]"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function GeneratorPage() {
    const [mode, setMode] = useState<Mode>("barcode");
    const [inputType, setInputType] = useState<QRInputType>("text");
    const [content, setContent] = useState("1234567890");
    const [bulkInput, setBulkInput] = useState("");
    const [size, setSize] = useState(200);
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [eccLevel, setEccLevel] = useState("M");
    const [barcodeFormat, setBarcodeFormat] = useState("CODE128");
    const [downloadFormat, setDownloadFormat] = useState("png");
    const [showText, setShowText] = useState(true);
    const [showPageNum, setShowPageNum] = useState(false);
    const [bulkType, setBulkType] = useState("barcode");
    const [copied, setCopied] = useState(false);
    const [scanResult, setScanResult] = useState("");
    const [scannerActive, setScannerActive] = useState(false);
    const [autoProcess, setAutoProcess] = useState(true);
    const [rescanPreview, setRescanPreview] = useState(false);
    const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);

    // WiFi fields
    const [wifiSSID, setWifiSSID] = useState("");
    const [wifiPass, setWifiPass] = useState("");
    const [wifiEnc, setWifiEnc] = useState("WPA");

    // SMS fields
    const [smsPhone, setSmsPhone] = useState("");
    const [smsMessage, setSmsMessage] = useState("");

    // vCard fields
    const [vcardName, setVcardName] = useState("");
    const [vcardOrg, setVcardOrg] = useState("");
    const [vcardPhone, setVcardPhone] = useState("");
    const [vcardEmail, setVcardEmail] = useState("");
    const [vcardSite, setVcardSite] = useState("");

    const previewRef = useRef<HTMLDivElement>(null);
    const scannerRef = useRef<HTMLDivElement>(null);
    const html5QrCodeRef = useRef<any>(null);

    // Build content string based on input type
    const getQRContent = useCallback(() => {
        if (inputType === "wifi") return `WIFI:T:${wifiEnc};S:${wifiSSID};P:${wifiPass};;`;
        if (inputType === "sms") return `SMSTO:${smsPhone}:${smsMessage}`;
        if (inputType === "vcard")
            return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nORG:${vcardOrg}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nURL:${vcardSite}\nEND:VCARD`;
        return content || "1234567890";
    }, [inputType, content, wifiSSID, wifiPass, wifiEnc, smsPhone, smsMessage, vcardName, vcardOrg, vcardPhone, vcardEmail, vcardSite]);

    // Generate preview
    const generate = useCallback(() => {
        if (!previewRef.current) return;
        const stage = previewRef.current;
        stage.innerHTML = "";
        stage.style.backgroundColor = bgColor;

        const isBarcodeMode = mode === "barcode" || mode === "rescan";

        if (mode === "qr") {
            const qrContent = getQRContent();
            const qrDiv = document.createElement("div");
            stage.appendChild(qrDiv);

            import("qrcodejs2-fix").then(({ default: QRCode }: any) => {
                new QRCode(qrDiv, {
                    text: qrContent,
                    width: size,
                    height: size,
                    colorDark: fgColor,
                    colorLight: bgColor,
                    correctLevel: (QRCode.CorrectLevel as any)[eccLevel],
                });
            }).catch(() => {
                stage.innerHTML = `<div class="text-red-400 text-center text-sm">QR library not loaded</div>`;
            });
        } else if (isBarcodeMode) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            stage.appendChild(svg);

            import("jsbarcode").then(({ default: JsBarcode }) => {
                try {
                    JsBarcode(svg as any, content || "1234567890", {
                        format: barcodeFormat,
                        lineColor: fgColor,
                        background: bgColor,
                        width: 2,
                        height: size / 2,
                        displayValue: true,
                    });
                } catch {
                    stage.innerHTML = `<div class="text-red-400 text-center text-sm">Invalid data for ${barcodeFormat}</div>`;
                }
            });
        } else if (mode === "bulk") {
            stage.innerHTML = `<div class="text-center font-black uppercase text-black dark:text-white space-y-4 flex flex-col items-center p-8 border-[4px] border-black dark:border-white shadow-[8px_8px_0_0_#00e936] dark:shadow-[8px_8px_0_0_#e9ff00]">
        <div class="text-5xl border-[3px] border-black dark:border-white bg-[#00e936] dark:bg-[#e9ff00] p-4 text-black rotate-12 inline-block">📄</div>
        <p class="text-xl tracking-widest leading-loose">ENTER CODES<br/>AND CLICK<br/>GENERATE PDF</p>
      </div>`;
        }
    }, [mode, content, size, fgColor, bgColor, eccLevel, barcodeFormat, getQRContent]);

    useEffect(() => {
        if (mode !== "scan") {
            generate();
        }
    }, [mode, content, size, fgColor, bgColor, eccLevel, barcodeFormat, inputType, wifiSSID, wifiPass, wifiEnc, smsPhone, smsMessage, vcardName, vcardOrg, vcardPhone, vcardEmail, vcardSite, generate]);

    // Stop scanner on mode change
    useEffect(() => {
        if (mode !== "scan" && mode !== "rescan") {
            if (html5QrCodeRef.current) {
                try {
                    html5QrCodeRef.current.stop?.().catch(() => { });
                } catch { }
                html5QrCodeRef.current = null;
            }
            setScannerActive(false);
        }
    }, [mode]);

    // Scanner
    const startScanner = async () => {
        if (!scannerRef.current) return;
        const targetId = mode === "rescan" ? "rescan-reader" : "scanner-reader";

        try {
            const { Html5Qrcode } = await import("html5-qrcode");
            const qr = new Html5Qrcode(targetId);
            html5QrCodeRef.current = qr;
            setScannerActive(true);
            await qr.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (text: string) => {
                    setScanResult(text);
                    if (mode === "rescan") {
                        const processed = autoProcess ? text.replace(/[a-zA-Z]/g, "") : text;
                        // Stop scanner properly before updating state to avoid DOM conflicts
                        qr.stop().then(() => {
                            setScannerActive(false);
                            setContent(processed);
                            setRescanPreview(true);
                            html5QrCodeRef.current = null;
                        }).catch(() => {
                            // Backup cleanup
                            setScannerActive(false);
                            setRescanPreview(true);
                        });
                    }
                },
                () => { }
            );
        } catch (err) {
            setScanResult(`Error: ${err}`);
        }
    };

    // Download
    const handleDownload = async () => {
        if (!previewRef.current) return;

        if (mode === "barcode") {
            const svg = previewRef.current.querySelector("svg");
            if (!svg) return;

            if (downloadFormat === "svg") {
                const data = new XMLSerializer().serializeToString(svg);
                const blob = new Blob([data], { type: "image/svg+xml" });
                downloadBlob(blob, `barcode-${Date.now()}.svg`);
                return;
            }

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            const data = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([data], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                if (downloadFormat === "jpg") {
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                const ext = downloadFormat === "jpg" ? "jpeg" : "png";
                canvas.toBlob((b) => b && downloadBlob(b, `barcode-${Date.now()}.${downloadFormat}`), `image/${ext}`);
            };
            img.src = url;
        } else {
            // QR — use html2canvas
            const { default: html2canvas } = await import("html2canvas");
            const canvas = await html2canvas(previewRef.current, { backgroundColor: null, scale: 2 });
            const ext = downloadFormat === "jpg" ? "jpeg" : "png";
            canvas.toBlob((b) => b && downloadBlob(b, `qrcode-${Date.now()}.${downloadFormat === "jpg" ? "jpg" : "png"}`), `image/${ext}`);
        }
    };

    const downloadBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Bulk Barcodes
    const generateBulkPDF = async () => {
        const lines = bulkInput.split("\n").filter((l) => l.trim());
        if (!lines.length) return alert("Please enter some codes first!");

        const { jsPDF } = await import("jspdf");
        const JsBarcode = (await import("jsbarcode")).default;
        const doc = new jsPDF();

        lines.forEach((code, i) => {
            if (i > 0) doc.addPage();
            const pw = doc.internal.pageSize.getWidth();
            const ph = doc.internal.pageSize.getHeight();

            const canvas = document.createElement("canvas");
            try {
                JsBarcode(canvas, code.trim(), {
                    format: barcodeFormat,
                    lineColor: fgColor,
                    width: 2,
                    height: 100,
                    displayValue: showText,
                    margin: 10,
                });
                const imgData = canvas.toDataURL("image/jpeg");
                doc.addImage(imgData, "JPEG", (pw - 100) / 2, (ph - 50) / 2, 100, 50);
            } catch {
                doc.text("Error: " + code, 10, 10);
            }

            if (showPageNum) {
                doc.setFontSize(10);
                doc.text(`Page ${i + 1}`, pw - 20, ph - 10);
            }
        });

        doc.save("bulk-barcodes.pdf");
    };

    // Copy
    const handleCopy = () => {
        navigator.clipboard.writeText(mode === "scan" ? scanResult : content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getPlaceholder = () => {
        if (inputType === "url") return "https://example.com";
        if (inputType === "email") return "mailto:example@mail.com";
        if (inputType === "phone") return "tel:+1234567890";
        return "Type your text here...";
    };

    return (
        <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl font-black uppercase text-black tracking-tighter mb-4 inline-block px-8 py-3 bg-[#e9ff00] dark:bg-[#00e936] border-[4px] border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] -rotate-1">
                        CODE GENERATOR
                    </h1>
                    <p className="text-black dark:text-white font-bold text-lg max-w-2xl mx-auto mt-6">Create professional QR codes and barcodes instantly.</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="flex flex-wrap justify-center gap-3 p-3 bg-white dark:bg-[#111] border-[4px] border-black dark:border-white shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_rgba(255,255,255,1)]">
                        {modes.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => {
                                    setMode(m.id);
                                    if (m.id === "barcode") setContent("1234567890");
                                }}
                                className={`flex items-center gap-2 px-6 py-3 border-[3px] font-black uppercase tracking-widest text-sm transition-all focus:outline-none ${mode === m.id
                                    ? "bg-black dark:bg-white text-[#00e936] dark:text-black border-black dark:border-white shadow-[4px_4px_0_0_#00e936] dark:shadow-[4px_4px_0_0_#e9ff00] translate-y-1 translate-x-1"
                                    : "bg-white dark:bg-black text-black dark:text-white border-transparent hover:border-black dark:hover:border-white"
                                    }`}
                            >
                                <m.icon size={20} strokeWidth={3} />
                                <span>{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
                    {/* Config Panel */}
                    <aside className="bg-white dark:bg-[#111] border-[4px] border-black dark:border-white p-8 space-y-8 h-fit lg:sticky lg:top-24 shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_0_rgba(255,255,255,1)]">
                        {/* QR Input Types */}
                        {mode === "qr" && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Content Type</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {qrInputTypes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => { setInputType(t.id); setContent(""); }}
                                            className={`flex flex-col items-center gap-1 p-3 border-[3px] text-xs font-black uppercase tracking-widest transition-all ${inputType === t.id
                                                ? "bg-black dark:bg-white text-[#00e936] dark:text-black border-black dark:border-white shadow-[4px_4px_0_0_#00e936] dark:shadow-[4px_4px_0_0_#e9ff00] translate-y-1 translate-x-1"
                                                : "bg-white dark:bg-black text-black dark:text-white border-transparent hover:border-black dark:hover:border-white"
                                                }`}
                                        >
                                            <t.icon size={16} />
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Content Input */}
                        {mode !== "scan" && mode !== "bulk" && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Content Data</label>
                                {/* WiFi */}
                                {mode === "qr" && inputType === "wifi" ? (
                                    <div className="space-y-2">
                                        <input value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} placeholder="Network Name (SSID)" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                        <input value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                        <CustomSelect
                                            value={wifiEnc}
                                            onChange={setWifiEnc}
                                            options={[
                                                { value: "WPA", label: "WPA/WPA2" },
                                                { value: "WEP", label: "WEP" },
                                                { value: "nopass", label: "No Encryption" },
                                            ]}
                                        />
                                    </div>
                                ) : mode === "qr" && inputType === "sms" ? (
                                    <div className="space-y-2">
                                        <input value={smsPhone} onChange={(e) => setSmsPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                        <textarea value={smsMessage} onChange={(e) => setSmsMessage(e.target.value)} placeholder="Message" rows={3} className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all resize-none uppercase" />
                                    </div>
                                ) : mode === "qr" && inputType === "vcard" ? (
                                    <div className="space-y-2">
                                        <input value={vcardName} onChange={(e) => setVcardName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                        <input value={vcardOrg} onChange={(e) => setVcardOrg(e.target.value)} placeholder="Organization" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                        <input value={vcardPhone} onChange={(e) => setVcardPhone(e.target.value)} placeholder="Phone" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                        <input value={vcardEmail} onChange={(e) => setVcardEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                        <input value={vcardSite} onChange={(e) => setVcardSite(e.target.value)} placeholder="Website" className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all uppercase" />
                                    </div>
                                ) : (
                                    <input
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder={getPlaceholder()}
                                        className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all"
                                    />
                                )}
                            </div>
                        )}

                        {/* Bulk Input */}
                        {mode === "bulk" && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Bulk Codes (one per line)</label>
                                <textarea
                                    value={bulkInput}
                                    onChange={(e) => setBulkInput(e.target.value)}
                                    placeholder="Enter one code per line..."
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-bold text-lg placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:shadow-[4px_4px_0_0_#00e936] dark:focus:shadow-[4px_4px_0_0_#e9ff00] transition-all resize-y"
                                />
                            </div>
                        )}

                        {/* Barcode Format */}
                        {(mode === "barcode" || mode === "bulk") && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Barcode Format</label>
                                <CustomSelect
                                    value={barcodeFormat}
                                    onChange={setBarcodeFormat}
                                    options={barcodeFormats}
                                />
                            </div>
                        )}

                        {/* QR Settings */}
                        {mode === "qr" && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Error Correction</label>
                                <CustomSelect
                                    value={eccLevel}
                                    onChange={setEccLevel}
                                    options={[
                                        { value: "L", label: "Low (7%)" },
                                        { value: "M", label: "Medium (15%)" },
                                        { value: "Q", label: "Quartile (25%)" },
                                        { value: "H", label: "High (30%)" },
                                    ]}
                                />
                            </div>
                        )}

                        {/* Bulk Settings */}
                        {mode === "bulk" && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Code Type</label>
                                    <CustomSelect
                                        value={bulkType}
                                        onChange={setBulkType}
                                        options={[
                                            { value: "barcode", label: "Barcode (Code 128)" },
                                            { value: "qr", label: "QR Code" },
                                        ]}
                                    />
                                </div>
                                <label className="flex items-center gap-2 text-zinc-400 text-sm cursor-pointer">
                                    <input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} className="accent-indigo-500" />
                                    Show Text Below
                                </label>
                                <label className="flex items-center gap-2 text-zinc-400 text-sm cursor-pointer">
                                    <input type="checkbox" checked={showPageNum} onChange={(e) => setShowPageNum(e.target.checked)} className="accent-indigo-500" />
                                    Page Numbers
                                </label>
                            </div>
                        )}

                        {/* Size Slider */}
                        {mode !== "scan" && (
                            <div className="space-y-4">
                                <label className="block text-sm font-black text-black dark:text-white uppercase tracking-widest">Size</label>
                                <div className="flex items-center gap-6 p-4 bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
                                    <input
                                        type="range"
                                        min={100}
                                        max={400}
                                        value={size}
                                        onChange={(e) => setSize(Number(e.target.value))}
                                        className="flex-1 h-4 border-[3px] border-black dark:border-white appearance-none bg-[#00e936] dark:bg-[#e9ff00] outline-none slider-thumb-brutal cursor-pointer shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]"
                                    />
                                    <span className="text-xl font-black text-black dark:text-white min-w-[70px] text-right">{size}PX</span>
                                </div>
                            </div>
                        )}

                        {/* Colors */}
                        {mode !== "scan" && (
                            <div className="space-y-4">
                                <label className="block text-sm font-black text-black dark:text-white uppercase tracking-widest">Colors</label>
                                <div className="flex items-center gap-4 p-3 bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
                                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 cursor-pointer border-[3px] border-black dark:border-white p-0 bg-transparent" />
                                    <span className="text-sm font-bold uppercase text-black dark:text-white">Foreground</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 cursor-pointer border-[3px] border-black dark:border-white p-0 bg-transparent" />
                                    <span className="text-sm font-bold uppercase text-black dark:text-white">Background</span>
                                </div>
                            </div>
                        )}

                        {/* Generate Button */}
                        {mode !== "scan" && mode !== "rescan" && (
                            <button
                                onClick={mode === "bulk" ? generateBulkPDF : generate}
                                className="w-full py-4 bg-black hover:bg-white dark:bg-white dark:hover:bg-black text-[#00e936] hover:text-black dark:text-black dark:hover:text-[#e9ff00] border-[4px] border-black dark:border-white font-black text-xl uppercase transition-all shadow-[6px_6px_0_0_#00e936] dark:shadow-[6px_6px_0_0_#e9ff00] hover:shadow-[0px_0px_0px_0px_transparent] flex items-center justify-center gap-3 translate-x-0 translate-y-0 hover:translate-x-1 hover:translate-y-1"
                            >
                                {mode === "bulk" ? <><FileText size={24} strokeWidth={3} /> GENERATE PDF</> : <><Wand2 size={24} strokeWidth={3} /> GENERATE CODE</>}
                            </button>
                        )}

                        {mode === "rescan" && (
                            <div className="space-y-6">
                                <label className="flex items-center gap-4 p-4 bg-white dark:bg-black border-[3px] border-black dark:border-white cursor-pointer shadow-[4px_4px_0_0_#00e936] dark:shadow-[4px_4px_0_0_#e9ff00] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all group">
                                    <input
                                        type="checkbox"
                                        checked={autoProcess}
                                        onChange={(e) => setAutoProcess(e.target.checked)}
                                        className="w-5 h-5 border-[3px] border-black dark:border-white appearance-none checked:bg-[#e9ff00] dark:checked:bg-[#00e936] checked:border-black dark:checked:border-white"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black uppercase text-black dark:text-white group-hover:text-[#00e936] dark:group-hover:text-[#e9ff00] transition-colors">Clean Digits</span>
                                        <span className="text-xs font-bold text-black/60 dark:text-white/60">Remove letters from result</span>
                                    </div>
                                </label>
                                {rescanPreview && (
                                    <button
                                        onClick={() => {
                                            setRescanPreview(false);
                                            setScanResult("");
                                            setScannerActive(false);
                                        }}
                                        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black border-[3px] border-black dark:border-white text-sm font-black uppercase tracking-widest hover:bg-[#e9ff00] dark:hover:bg-[#00e936] hover:text-black dark:hover:text-black transition-all flex items-center justify-center gap-3 shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
                                    >
                                        <RefreshCw size={18} strokeWidth={3} /> SCAN ANOTHER
                                    </button>
                                )}
                            </div>
                        )}
                    </aside>

                    {/* Preview Panel */}
                    <div className="bg-[#f0f0f0] dark:bg-[#222] border-[4px] border-black dark:border-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_0_rgba(255,255,255,1)] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
                        {/* Background Glow removed for brutalist styling */}

                        {mode === "scan" ? (
                            <div className="z-10 w-full max-w-md space-y-8">
                                <div key="scan-reader" ref={scannerRef} id="scanner-reader" className="w-full border-[4px] border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] overflow-hidden bg-white dark:bg-black min-h-[250px]" />
                                {!scannerActive && (
                                    <button
                                        onClick={startScanner}
                                        className="w-full py-4 bg-black hover:bg-white dark:bg-white dark:hover:bg-black text-[#00e936] hover:text-black dark:text-black dark:hover:text-[#e9ff00] border-[4px] border-black dark:border-white font-black text-xl uppercase transition-all shadow-[6px_6px_0_0_#00e936] dark:shadow-[6px_6px_0_0_#e9ff00] hover:shadow-none translate-y-0 translate-x-0 hover:translate-y-1 hover:translate-x-1 flex items-center justify-center gap-3"
                                    >
                                        <Camera size={24} strokeWidth={3} /> START SCANNER
                                    </button>
                                )}
                                {scanResult && (
                                    <div className="p-6 bg-white dark:bg-black border-[4px] border-black dark:border-white shadow-[6px_6px_0_0_#e9ff00] dark:shadow-[6px_6px_0_0_#00e936]">
                                        <p className="font-bold text-lg text-black dark:text-white break-all">{scanResult}</p>
                                    </div>
                                )}
                            </div>
                        ) : mode === "rescan" ? (
                            <div className="z-10 w-full max-w-lg flex flex-col items-center">
                                {!rescanPreview ? (
                                    <div className="w-full space-y-8">
                                        <div className="w-full bg-white dark:bg-black border-[4px] border-black dark:border-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_0_rgba(255,255,255,1)] aspect-square relative group">
                                            {/* Dedicated empty box for the library to mount to */}
                                            <div key="rescan-reader" ref={scannerRef} id="rescan-reader" className="w-full h-full min-h-[300px]" />
                                            
                                            {/* Status Overlay (Outside the scanner div) */}
                                            {!scannerActive && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-black dark:text-white bg-white/90 dark:bg-black/90">
                                                    <div className="w-20 h-20 bg-[#00e936] dark:bg-[#e9ff00] border-[4px] border-black dark:border-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] flex items-center justify-center">
                                                        <Camera size={32} className="text-black" strokeWidth={3} />
                                                    </div>
                                                    <p className="text-lg font-black uppercase text-center max-w-[200px]">Ready to scan numerical barcodes</p>
                                                </div>
                                            )}

                                            {/* X Button Overlay */}
                                            {scannerActive && (
                                                <div className="absolute top-4 right-4 z-50">
                                                    <button
                                                        onClick={() => {
                                                            html5QrCodeRef.current?.stop().then(() => {
                                                                setScannerActive(false);
                                                                html5QrCodeRef.current = null;
                                                            });
                                                        }}
                                                        className="p-3 bg-white dark:bg-black text-black dark:text-white border-[3px] border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:bg-[#e9ff00] dark:hover:bg-[#00e936] hover:text-black transition-all hover:translate-y-1 hover:translate-x-1 hover:shadow-none"
                                                    >
                                                        <X size={24} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        {!scannerActive && (
                                            <button
                                                onClick={startScanner}
                                                className="w-full py-4 bg-black hover:bg-white dark:bg-white dark:hover:bg-black text-[#00e936] hover:text-black dark:text-black dark:hover:text-[#e9ff00] border-[4px] border-black dark:border-white font-black text-xl uppercase transition-all shadow-[8px_8px_0_0_#00e936] dark:shadow-[8px_8px_0_0_#e9ff00] hover:shadow-none translate-y-0 translate-x-0 hover:translate-y-1 hover:translate-x-1 flex items-center justify-center gap-3"
                                            >
                                                <Camera size={24} strokeWidth={3} /> START UTILITY SCANNER
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="flex items-center gap-4 w-full flex-col sm:flex-row">
                                                <div className="flex-1 p-6 w-full bg-white dark:bg-black border-[4px] border-black dark:border-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] space-y-2">
                                                    <span className="text-sm font-black uppercase text-black/50 dark:text-white/50 tracking-widest">Original Scan</span>
                                                    <p className="text-base text-black dark:text-white font-bold italic line-through break-all opacity-80">{scanResult}</p>
                                                </div>
                                                <div className="w-12 h-12 bg-black dark:bg-[#e9ff00] border-[4px] border-black dark:border-white flex items-center justify-center shrink-0 shadow-[4px_4px_0_0_#00e936] dark:shadow-[4px_4px_0_0_#e9ff00] rotate-12">
                                                    <Wand2 size={24} className="text-[#00e936] dark:text-black" strokeWidth={3} />
                                                </div>
                                                <div className="flex-1 p-6 w-full bg-[#e9ff00] dark:bg-[#00e936] border-[4px] border-black dark:border-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] space-y-2">
                                                    <span className="text-sm font-black uppercase text-black tracking-widest">Processed Result</span>
                                                    <p className="text-xl text-black font-black break-all">{content}</p>
                                                </div>
                                            </div>

                                            <div
                                                ref={previewRef}
                                                className="bg-white p-8 border-[4px] border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)] scale-110 sm:scale-125 my-12 transform transition-all"
                                            />

                                            <div className="flex flex-col sm:flex-row gap-6 w-full mt-4">
                                                <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-black border-[4px] border-black dark:border-white text-black dark:text-white font-black uppercase tracking-widest hover:bg-[#00e936] dark:hover:bg-[#e9ff00] hover:text-black dark:hover:text-black transition-all shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                                                    {copied ? <><Check size={24} strokeWidth={3} /> COPIED!</> : <><Copy size={24} strokeWidth={3} /> COPY CODE</>}
                                                </button>
                                                <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-[#e9ff00] dark:hover:bg-[#00e936] hover:text-black dark:hover:text-black border-[4px] border-black dark:border-white font-black uppercase tracking-widest transition-all shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                                                    <Download size={24} strokeWidth={3} /> DOWNLOAD
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                             <>
                                {/* Preview Stage */}
                                <div
                                    key="preview-stage"
                                    ref={previewRef}
                                    className="z-10 bg-white p-6 sm:p-8 border-[4px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex justify-center items-center min-w-[200px] min-h-[150px]"
                                />

                                {/* Label */}
                                <div className="z-10 mt-6 px-6 py-2 bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[4px_4px_0_0_#00e936] dark:shadow-[4px_4px_0_0_#e9ff00] text-sm font-black text-black dark:text-white uppercase tracking-widest">
                                    Live Preview
                                </div>

                                {/* Actions */}
                                <div className="z-10 mt-10 flex flex-col sm:flex-row gap-4">
                                    <button onClick={handleCopy} className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white font-black uppercase tracking-widest hover:bg-[#e9ff00] dark:hover:bg-[#00e936] hover:text-black transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 text-sm">
                                        {copied ? <><Check size={20} strokeWidth={3} /> COPIED!</> : <><Copy size={20} strokeWidth={3} /> COPY</>}
                                    </button>

                                    <div className="flex border-[3px] border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] bg-white dark:bg-black">
                                        <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-[#00e936] dark:text-black hover:bg-[#00e936] hover:text-black dark:hover:bg-[#e9ff00] font-black uppercase transition-colors text-sm border-r-[3px] border-black dark:border-white">
                                            <Download size={20} strokeWidth={3} /> DOWNLOAD
                                        </button>
                                        <div className="relative">
                                            <button 
                                                onClick={() => setFormatDropdownOpen(!formatDropdownOpen)}
                                                className="h-full flex items-center bg-transparent text-black dark:text-white hover:text-black hover:bg-[#e9ff00] dark:hover:bg-[#00e936] text-sm font-black uppercase px-6 py-2 outline-none transition-colors"
                                                aria-haspopup="listbox"
                                                aria-expanded={formatDropdownOpen}
                                                aria-label="Select download format"
                                            >
                                                {downloadFormat} 
                                                <svg className={`ml-2 w-5 h-5 transition-transform ${formatDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {formatDropdownOpen && (
                                                <div className="absolute bottom-full right-0 mb-3 min-w-[140px] bg-white dark:bg-black border-[4px] border-black dark:border-white shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] z-50 flex flex-col">
                                                    {['png', 'jpg', 'svg'].map(fmt => (
                                                        <button 
                                                            key={fmt} 
                                                            onClick={() => {
                                                                setDownloadFormat(fmt);
                                                                setFormatDropdownOpen(false);
                                                            }} 
                                                            className={`px-5 py-4 text-left font-black uppercase text-base border-b-[4px] border-black dark:border-white last:border-b-0 transition-colors ${downloadFormat === fmt ? 'bg-[#00e936] dark:bg-[#e9ff00] text-black' : 'bg-transparent text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'}`}
                                                        >
                                                            {fmt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
