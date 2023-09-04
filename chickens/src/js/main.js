let state = initState()
let game = initGameObject()

const availableKeys = [
    'KeyA',
    'KeyD',
    'Space',
]

document.addEventListener('keydown',(e) =>{
    if(!availableKeys.includes(e.code)){
        state.keys[e.code] = true 
    }
    state.keys[e.code] = true
})
document.addEventListener('keyup',(e) =>{
    state.keys[e.code] = false
})

game.startScreen.addEventListener('click', (e)=>{
    game.startScreen.classList.add('hidden')
    game.gameScreen.classList.remove('hidden')

    start(state, game)
})