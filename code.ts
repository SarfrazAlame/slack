const generateCode = () => {
    const letter = '1234567890'
    let code = ''
    for (let i = 1; i < 7; i++) {
            code += Math.floor(Math.random() * 10)
    }

    console.log(code)
}

generateCode()