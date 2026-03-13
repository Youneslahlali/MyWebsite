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
