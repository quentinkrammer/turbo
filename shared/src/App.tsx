import { useEffect, useState } from "react";

function App() {
  const [lang, setLang] = useState<"en" | "de">("en");
  console.log("curr lang:", lang);
  const t = useTranslation(lang);
  console.log("translations:", t);
  return (
    <button
      onClick={() => {
        console.log("setLang");
        setLang("de");
      }}
    >
      {t?.bye}
    </button>
  );
}

export default App;

type TranslationKeys = "hi" | "bye";
export type Translations = Record<TranslationKeys, string>;

function useTranslation(language: string) {
  const [lang, setLang] = useState<Translations>();
  useEffect(() => {
    async function getTranslations() {
      const t = await import(`./${language}.ts`).then((module) => module.label);
      setLang(t);
    }
    getTranslations().catch((e) => console.log(e));
  }, [language]);
  return lang;
}
