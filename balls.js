class Ball {
    constructor(id, threshold, bouncy, eats, kills, speed, xPos, yPos, xDirection, yDirection) {
        this.id = id;
        this.threshold = threshold;
        this.bouncy = bouncy;
        this.eats = eats;
        this.kills = kills;
        this.speed = speed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xDirection = xDirection;
        this.yDirection = yDirection;
    }

    move() {
        this.frame();
        this.place();
    }

    place() {
        let element = document.getElementById(this.id);
        element.style.left = this.xPos + 'px';
        element.style.top = this.yPos + 'px';
    }

    frame() {
        if (score >= this.threshold) {
            this.movement();
            for (const ball of balls) {
                if (this.id === ball.id) {
                    continue;
                }
                this.collision(ball);
            }
        }
    }

    movement() {
        let element = document.getElementById(this.id);

        // move player, klatscher and unkown
        if ([player.id, klatscher.id, unknown.id].includes(this.id)) {
            this.xPos += this.xDirection / collisionSteps;
            this.yPos += this.yDirection / collisionSteps;

            // move hunter
        } else if (this.id === hunter.id) {
            const playerCenterX = player.xPos;
            const playerCenterY = player.yPos;

            let dx = playerCenterX - this.xPos;
            let dy = playerCenterY - this.yPos;
            let distance = Math.sqrt(dx * dx + dy * dy);

            this.xPos += (dx / distance) * this.speed / collisionSteps;
            this.yPos += (dy / distance) * this.speed / collisionSteps;

            // move villain
        } else if (this.id === "villain") {
            let ballElement = document.getElementById(food.id)
            const foodCenterX = food.xPos + ballElement.clientWidth / 2;
            const foodCenterY = food.yPos + ballElement.clientHeight / 2;

            let dx = foodCenterX - this.xPos;
            let dy = foodCenterY - this.yPos;
            let distance = Math.sqrt(dx * dx + dy * dy);

            this.xPos += (dx / distance) * this.speed / collisionSteps;
            this.yPos += (dy / distance) * this.speed / collisionSteps;
        }
        if (this.bouncy) {
            if (this.yPos <= 0 || this.yPos >= gameArea.clientHeight - element.clientHeight) {
                this.yDirection *= -1;
            }
            if (this.xPos <= 0 || this.xPos >= gameArea.clientWidth - element.clientWidth) {
                this.xDirection *= -1;
            }
        }
    }

    collision(ball) {
        if (this.colliding(ball) && score > Math.max(this.threshold, ball.threshold)) {
            if (this.kills && ball.id === player.id || this.id === player.id && ball.kills) {
                gameOver()
            }
            if (this.eats && ball.id === "food") {
                if (this.id === "player") {
                    score += 10;
                } else {
                    hunterScore += 5;
                    unknown.increase();
                    klatscher.increase()
                }
                moveFood();
            }
            if (this.bouncy && ball.bouncy && score >= Math.max(this.threshold, ball.threshold)) {
                let cache = this.xDirection;
                this.xDirection = ball.xDirection;
                ball.xDirection = cache;

                cache = this.yDirection;
                this.yDirection = ball.yDirection;
                ball.yDirection = cache;
            }
        }
    }

    colliding(ball) {
        const element = document.getElementById(this.id);
        const ballElement = document.getElementById(ball.id);
        const entityCenterX = this.xPos + element.clientWidth / 2;
        const entityCenterY = this.yPos + element.clientHeight / 2;
        const ballCenterX = ball.xPos + ballElement.clientWidth / 2;
        const ballCenterY = ball.yPos + ballElement.clientHeight / 2;
        let dx = entityCenterX - ballCenterX;
        let dy = entityCenterY - ballCenterY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (element.clientWidth / 2 + ballElement.clientWidth / 2);
    }

    increase() {
        if (this.threshold > score) {
            return;
        }
        const element = document.getElementById(this.id);
        const currentWidth = element.offsetWidth;
        const currentHeight = element.offsetHeight;

        // Calculate the increase
        const widthIncrease = currentWidth * (precentageIncrease / 100);
        const heightIncrease = currentHeight * (precentageIncrease / 100);

        // Apply the new size
        element.style.width = `${currentWidth + widthIncrease}px`;
        element.style.height = `${currentHeight + heightIncrease}px`;
    }

    resetSize() {
        const element = document.getElementById(this.id);
        element.style.width = `10px`;
        element.style.height = `10px`;
    }
}