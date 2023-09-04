function initGameObject(){
    const startScreen = document.querySelector('.start-screen')
    const gameScreen = document.querySelector('.game-screen')
    const scoreElement = document.querySelector('.score')
    

    // set background properties
    let width = 1366
    let height = 756
    
    gameScreen.style.width = width + 'px'
    gameScreen.style.height = height + 'px'

    return{
        startScreen,
        gameScreen,
        scoreElement,
        createSpaceShip(initialState){
            let spaceShipElement = document.createElement('div')
           spaceShipElement.classList.add('spaceShip')

           spaceShipElement.style.width = initialState.width + 'px'
           spaceShipElement.style.height = initialState.height + 'px'
           spaceShipElement.style.position = 'absolute'
           spaceShipElement.style.left = initialState.posX + 'px'
           spaceShipElement.style.bottom = initialState.posY + 'px'


            // check how to spawn the ship on different position on the x axis
            this.spaceShipElement = spaceShipElement
            gameScreen.appendChild(spaceShipElement)

            return spaceShipElement
        },
        createChickens(stats){
            const chickenElement = document.createElement('div')
            chickenElement.classList.add('chicken')

            chickenElement.style.width = stats.width + 'px'
            chickenElement.style.height = stats.height + 'px'
            chickenElement.style.position = 'absolute'
            chickenElement.style.bottom = gameScreen.offsetHeight - stats.height + 'px'
            chickenElement.style.right = Math.floor(Math.random() * (gameScreen.offsetWidth - stats.width)) +'px'
           
           
           
            //chickenElement.style.top = 0 + 'px'
           

            gameScreen.appendChild(chickenElement)
        },
        createMissile(spaceShip, missile){
            let missileElement = document.createElement('div')
            missileElement.classList.add('missile')

            missileElement.style.bottom = spaceShip.posY + spaceShip.height  +  'px'
            missileElement.style.left = spaceShip.posX + spaceShip.width / 12 + 12 + 'px'
            missileElement.style.width = missile.width + 'px'
            missileElement.style.height = missile.height + 'px'

            
            gameScreen.appendChild(missileElement)
        }
    }
}