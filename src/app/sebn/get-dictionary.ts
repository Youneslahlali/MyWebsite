import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    // Falls back to English if locale is not supported
    const loader = dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
    return loader();
};
