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
} from "lucide-react";

// ===== TYPES =====
type Mode = "qr" | "barcode" | "bulk" | "scan";
type QRInputType = "text" | "url" | "email" | "phone" | "sms" | "wifi" | "vcard";

const modes = [
    { id: "qr" as Mode, label: "QR Code", icon: QrCode },
    { id: "barcode" as Mode, label: "Barcode", icon: Barcode },
    { id: "bulk" as Mode, label: "Bulk PDF", icon: FileText },
    { id: "scan" as Mode, label: "Scanner", icon: Camera },
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

        if (mode === "qr") {
            const qrContent = getQRContent();
            const qrDiv = document.createElement("div");
            stage.appendChild(qrDiv);

            // Dynamically import QRCode library
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
        } else if (mode === "barcode") {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.id = "barcode-preview";
            stage.appendChild(svg);

            import("jsbarcode").then(({ default: JsBarcode }) => {
                try {
                    JsBarcode("#barcode-preview", content || "1234567890", {
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
            stage.innerHTML = `<div class="text-center text-zinc-500 space-y-4">
        <div class="text-5xl">📄</div>
        <p>Enter codes and click Generate PDF</p>
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
        if (mode !== "scan" && html5QrCodeRef.current) {
            try {
                html5QrCodeRef.current.stop?.().catch(() => { });
            } catch { }
            html5QrCodeRef.current = null;
            setScannerActive(false);
        }
    }, [mode]);

    // Scanner
    const startScanner = async () => {
        if (!scannerRef.current) return;
        try {
            const { Html5Qrcode } = await import("html5-qrcode");
            const qr = new Html5Qrcode("scanner-reader");
            html5QrCodeRef.current = qr;
            setScannerActive(true);
            await qr.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (text: string) => {
                    setScanResult(text);
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

    // Bulk PDF
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
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-3">
                        Code Generator Suite
                    </h1>
                    <p className="text-zinc-400">Create professional QR codes and barcodes instantly.</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-1 p-1.5 glass rounded-xl">
                        {modes.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => {
                                    setMode(m.id);
                                    if (m.id === "barcode") setContent("1234567890");
                                }}
                                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === m.id
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <m.icon size={16} />
                                <span className="hidden sm:inline">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
                    {/* Config Panel */}
                    <aside className="glass rounded-2xl p-6 space-y-6 h-fit lg:sticky lg:top-24">
                        {/* QR Input Types */}
                        {mode === "qr" && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Content Type</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {qrInputTypes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => { setInputType(t.id); setContent(""); }}
                                            className={`flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs font-medium transition-all ${inputType === t.id
                                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                                    : "bg-white/3 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
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
                                        <input value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} placeholder="Network Name (SSID)" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                        <input value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                        <select value={wifiEnc} onChange={(e) => setWifiEnc(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                            <option value="WPA">WPA/WPA2</option>
                                            <option value="WEP">WEP</option>
                                            <option value="nopass">No Encryption</option>
                                        </select>
                                    </div>
                                ) : mode === "qr" && inputType === "sms" ? (
                                    <div className="space-y-2">
                                        <input value={smsPhone} onChange={(e) => setSmsPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                        <textarea value={smsMessage} onChange={(e) => setSmsMessage(e.target.value)} placeholder="Message" rows={3} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
                                    </div>
                                ) : mode === "qr" && inputType === "vcard" ? (
                                    <div className="space-y-2">
                                        <input value={vcardName} onChange={(e) => setVcardName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                        <input value={vcardOrg} onChange={(e) => setVcardOrg(e.target.value)} placeholder="Organization" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                        <input value={vcardPhone} onChange={(e) => setVcardPhone(e.target.value)} placeholder="Phone" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                        <input value={vcardEmail} onChange={(e) => setVcardEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                        <input value={vcardSite} onChange={(e) => setVcardSite(e.target.value)} placeholder="Website" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                                    </div>
                                ) : (
                                    <input
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder={getPlaceholder()}
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
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
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors resize-y"
                                />
                            </div>
                        )}

                        {/* Barcode Format */}
                        {(mode === "barcode" || mode === "bulk") && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Barcode Format</label>
                                <select value={barcodeFormat} onChange={(e) => setBarcodeFormat(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                    {barcodeFormats.map((f) => (
                                        <option key={f.value} value={f.value}>{f.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* QR Settings */}
                        {mode === "qr" && (
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Error Correction</label>
                                <select value={eccLevel} onChange={(e) => setEccLevel(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                    <option value="L">Low (7%)</option>
                                    <option value="M">Medium (15%)</option>
                                    <option value="Q">Quartile (25%)</option>
                                    <option value="H">High (30%)</option>
                                </select>
                            </div>
                        )}

                        {/* Bulk Settings */}
                        {mode === "bulk" && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Code Type</label>
                                    <select value={bulkType} onChange={(e) => setBulkType(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors">
                                        <option value="barcode">Barcode (Code 128)</option>
                                        <option value="qr">QR Code</option>
                                    </select>
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
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Size</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min={100}
                                        max={400}
                                        value={size}
                                        onChange={(e) => setSize(Number(e.target.value))}
                                        className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none accent-indigo-500"
                                    />
                                    <span className="text-sm text-zinc-400 min-w-[45px] text-right">{size}px</span>
                                </div>
                            </div>
                        )}

                        {/* Colors */}
                        {mode !== "scan" && (
                            <div className="space-y-3">
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Colors</label>
                                <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5">
                                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                                    <span className="text-sm text-zinc-400">Foreground</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5">
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                                    <span className="text-sm text-zinc-400">Background</span>
                                </div>
                            </div>
                        )}

                        {/* Generate Button */}
                        {mode !== "scan" && (
                            <button
                                onClick={mode === "bulk" ? generateBulkPDF : generate}
                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                            >
                                {mode === "bulk" ? <><FileText size={18} /> Generate PDF</> : <><Wand2 size={18} /> Generate Code</>}
                            </button>
                        )}
                    </aside>

                    {/* Preview Panel */}
                    <div className="glass rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute w-72 h-72 bg-indigo-600 filter blur-[150px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        {mode === "scan" ? (
                            <div className="z-10 w-full max-w-md space-y-6">
                                <div ref={scannerRef} id="scanner-reader" className="w-full rounded-xl overflow-hidden" />
                                {!scannerActive && (
                                    <button
                                        onClick={startScanner}
                                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <Camera size={18} /> Start Scanner
                                    </button>
                                )}
                                {scanResult && (
                                    <div className="p-4 bg-black/30 rounded-xl border border-green-500/30">
                                        <p className="text-green-400 font-mono text-sm break-all">{scanResult}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Preview Stage */}
                                <div
                                    ref={previewRef}
                                    className="z-10 bg-white p-6 sm:p-8 rounded-xl shadow-2xl shadow-black/30 flex justify-center items-center min-w-[200px] min-h-[150px]"
                                />

                                {/* Label */}
                                <div className="z-10 mt-6 px-4 py-1.5 bg-black/30 rounded-full text-xs text-zinc-400 font-mono">
                                    Live Preview
                                </div>

                                {/* Actions */}
                                <div className="z-10 mt-6 flex flex-col sm:flex-row gap-3">
                                    <button onClick={handleCopy} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-all text-sm">
                                        {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy</>}
                                    </button>

                                    <div className="flex rounded-lg overflow-hidden shadow-lg shadow-indigo-500/20">
                                        <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors text-sm">
                                            <Download size={16} /> Download
                                        </button>
                                        <select value={downloadFormat} onChange={(e) => setDownloadFormat(e.target.value)} className="bg-indigo-700 text-white text-sm font-semibold px-3 border-l border-indigo-500 focus:outline-none cursor-pointer">
                                            <option value="png">PNG</option>
                                            <option value="jpg">JPG</option>
                                            <option value="svg">SVG</option>
                                        </select>
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
