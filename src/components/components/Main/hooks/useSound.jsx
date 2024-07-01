function useSound(wordData) {
    if(!wordData) return null
    if(!Array.isArray(wordData[0].phonetics)) return null;
    const phonetic = wordData[0].phonetics.find(phonetic => phonetic.audio);
    if(!phonetic) return null;
    return phonetic.audio;
}

export default useSound;