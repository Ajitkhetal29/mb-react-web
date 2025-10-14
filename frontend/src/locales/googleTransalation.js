export const translateText = async (text, targetLang = "en") => {
  try {
    if (!text || targetLang === "en") return text; 
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map((part) => part[0]).join("");
  } catch (error) {
    console.error("Translation error:", error);
    return text; 
  }
};
