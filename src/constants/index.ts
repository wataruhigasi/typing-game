interface InputObject {
    name: string,
    romaji: string,
    photo: string
}

const characterData: InputObject[] = [
    {
        name: 'アスナ',
        romaji: 'asuna',
        photo: 'asuna',
    },
    {
        name: 'キリト',
        romaji: 'kirito',
        photo: 'kirito',
    }
]

export {
    characterData
}