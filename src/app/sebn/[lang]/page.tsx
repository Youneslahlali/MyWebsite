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
            className={`min-h-screen bg-slate-950 text-slate-50 ${isRtl ? "font-arabic" : "font-sans"}`} 
            dir={isRtl ? "rtl" : "ltr"}
        >
            <SebnNavbar lang={lang} dict={dict} />
            <main>
                <SebnHero dict={dict} />
                <SebnPartners dict={dict} />
                <SebnValues dict={dict} />
                <SebnProducts dict={dict} />
                <SebnAbout dict={dict} />
                <SebnLocations dict={dict} />
                <SebnCareers dict={dict} />
            </main>
            <SebnFooter dict={dict} />
        </div>
    );
}
