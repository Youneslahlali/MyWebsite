import { getDictionary } from "@/app/sebn/get-dictionary";
import { SebnNavbar } from "@/app/sebn/[lang]/components/SebnNavbar";
import { SebnHero } from "@/app/sebn/[lang]/components/SebnHero";
import { SebnPartners } from "@/app/sebn/[lang]/components/SebnPartners";
import { SebnProducts } from "@/app/sebn/[lang]/components/SebnProducts";
import { SebnValues } from "@/app/sebn/[lang]/components/SebnValues";
import { SebnAbout } from "@/app/sebn/[lang]/components/SebnAbout";
import { SebnLocations } from "@/app/sebn/[lang]/components/SebnLocations";
import { SebnCareers } from "@/app/sebn/[lang]/components/SebnCareers";
import { SebnFooter } from "@/app/sebn/[lang]/components/SebnFooter";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = await params;
    
    // Fallbacks for languages before dictionary loads or for static pre-rendering
    const titles: Record<string, string> = {
        en: "SEBN MA | Sumitomo Electric Bordnetze - Morocco",
        fr: "SEBN MA | Sumitomo Electric Bordnetze - Maroc",
        ar: "SEBN MA | سوميتومو إلكتريك بوردنيتز - المغرب"
    };

    const descriptions: Record<string, string> = {
        en: "Global leader in automotive wiring harness systems, driving innovation from the heart of Morocco.",
        fr: "Leader mondial des systèmes de câblage automobile, moteur d'innovation au cœur du Maroc.",
        ar: "رائد عالمي في أنظمة الأسلاك الكهربائية للسيارات، نقود الابتكار من قلب المغرب."
    };

    return {
        metadataBase: new URL('http://localhost:3000'), // Replace with production URL when deploying
        title: titles[lang] || titles.en,
        description: descriptions[lang] || descriptions.en,
        openGraph: {
            title: titles[lang] || titles.en,
            description: descriptions[lang] || descriptions.en,
            url: `https://www.sebn.com/${lang}/sebn-ma/`,
            siteName: 'SEBN MA',
            images: [
                {
                    url: '/sebn-hero.png',
                    width: 1200,
                    height: 630,
                    alt: 'SEBN MA',
                },
            ],
            locale: lang,
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export default async function SebnPage({
    params,
}: {
    params: { lang: string };
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isRtl = lang === "ar";

    return (
        <div 
            className={`min-h-screen bg-white text-slate-900 ${isRtl ? "font-arabic" : "font-sans"} sebn-corporate`} 
            dir={isRtl ? "rtl" : "ltr"}
        >
            <SebnNavbar lang={lang} dict={dict} />
            <main className="pt-20">
                <SebnHero dict={dict} />
                <SebnCareers dict={dict} />
                <SebnLocations dict={dict} />
                <SebnAbout dict={dict} />
            </main>
            <SebnFooter dict={dict} />
        </div>
    );
}
