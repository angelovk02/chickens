function initState(){
    let startX = Math.floor(Math.random() * 1000)
    let startY = 0

    const state = {
        player: 'ssss',
        gameOver: false,
        score: 0,
        scoreRate: 1,
        killScore: 100,
        spaceShip: {
            width: 60,
            height: 65,
            posX: startX,
            posY: startY,
            speed: 10,
        }, chickenStats:{
            width: 35,
            height: 50,
            nextSpawnTimestamp: 0,
            maxSpawnInterval:2000,
            speed: 4,
        }, 
        missile:{
            width:40,
            height:40,
            speed: 12,
            nextSpawnTimestamp: 0,
            fireRate: 300,
        },
        keys: {
            KeyA: false,
            KeyD: false,
            Space: false,
        }
    }
    
    return state;
}