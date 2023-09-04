function start(state, game) {
    game.createSpaceShip(state.spaceShip)

    window.requestAnimationFrame(gameLoop.bind(null, state, game))
}

function gameLoop(state, game, timestamp) {
    const { spaceShip } = state;
    const { spaceShipElement } = game;

    game.scoreElement.textContent = `${state.score}.pts`;


    modifySpaceShipPosition(state, game);
    if (state.keys.Space) {


        if (timestamp > state.missile.nextSpawnTimestamp) {
            game.createMissile(spaceShip, state.missile)
            state.missile.nextSpawnTimestamp = timestamp + state.missile.fireRate
        }

    }


    if (timestamp > state.chickenStats.nextSpawnTimestamp) {
        game.createChickens(state.chickenStats);
        state.chickenStats.nextSpawnTimestamp = timestamp + Math.random() * state.chickenStats.maxSpawnInterval;
    }

    let chickenElements = document.querySelectorAll('.chicken');
    chickenElements.forEach(chicken => {
        let posY = parseInt(chicken.style.bottom);

        if (detectCollision(spaceShipElement, chicken)) {
            state.gameOver = true;
        }
        if (posY > 0) {
            chicken.style.bottom = posY - state.chickenStats.speed + 'px';
        } else {
            chicken.remove();
        }
    });


    document.querySelectorAll('.missile').forEach(missile => {
        let posY = parseInt(missile.style.bottom)

        chickenElements.forEach(chicken => {
            if (detectCollision(chicken, missile)) {
                state.score += state.killScore
                chicken.remove()
                missile.remove()
            }
        })


        if (posY > game.gameScreen.offsetWidth - state.missile.width) {
            missile.remove()
        } else {
            missile.style.bottom = posY + state.missile.speed + 'px'
        }

    })

    spaceShipElement.style.left = spaceShip.posX + 'px';
    spaceShipElement.style.bottom = spaceShip.posY + 'px';

    if (state.gameOver) {
        alert(`Game Over - You had ${state.score} pts.`);
    } else {
        state.score += state.scoreRate;
        window.requestAnimationFrame(gameLoop.bind(null, state, game));
    }


    if (state.score > 3000 &&  state.score < 5000) {
        state.chickenStats.speed = 5
        state.chickenStats.maxSpawnInterval = 1500
    } else if (state.score > 5000 &&  state.score < 7000) {
        state.chickenStats.speed = 6
        state.chickenStats.maxSpawnInterval = 1000
    } else if (state.score > 7000 &&  state.score < 9000) {
        state.chickenStats.speed = 7
        state.chickenStats.maxSpawnInterval = 500
    }else if (state.score > 9000 ) {
        
        state.chickenStats.speed = 8
        state.chickenStats.maxSpawnInterval = 300
    }
}



function modifySpaceShipPosition(state, game) {
    const { spaceShipElement } = game;
    const { spaceShip } = state;

    if (state.keys.KeyA) {
        spaceShip.posX = Math.max(spaceShip.posX - spaceShip.speed, 0);
        spaceShipElement.classList.add('move-left');
        spaceShipElement.classList.remove('move-right');
    }

    if (state.keys.KeyD) {
        spaceShip.posX = Math.min(spaceShip.posX + spaceShip.speed, game.gameScreen.offsetWidth - spaceShip.width);
        spaceShipElement.classList.add('move-right');
        spaceShipElement.classList.remove('move-left');
    }

    if (!state.keys.KeyA && !state.keys.KeyD) {
        spaceShipElement.classList.remove('move-left');
        spaceShipElement.classList.remove('move-right');
    }
}



function detectCollision(objectA, objectB) {
    let first = objectA.getBoundingClientRect()
    let second = objectB.getBoundingClientRect()


    let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right)

    return hasCollision

}