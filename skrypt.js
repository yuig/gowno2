const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cw = canvas.width = 1000;
const ch = canvas.height = 500;
const ballSize = 20;
const paddleHeight= 100;
const paddlewidth = 20;
const playerX = 70;
const aiX = 910
const lineWidth =6;
const lineHeight = 16;
let playerY =  aiY = 200;
let ballSpeedX = 1;
let ballSpeedY =1;
let ballX = cw/2 -ballSize/2;
let ballY = ch/2- ballSize/2;
topOffset = canvas.offsetTop;
function speedUp(){
	if(ballSpeedX > 0 && ballSpeedX<16){
		ballSpeedX += .2;
	} else if(ballSpeedX < 0 && ballSpeedX> -16){
		ballSpeedX -= .2;
	}
	if(ballSpeedY>0 && ballSpeedY < 16){
		ballSpeedY += .2;
	}
	else if (ballSpeedY< 0 && ballSpeedY> -16){
		ballSpeedY -= .2;
	}

}
function playerPosition(e){
	playerY = e.clientY - topOffset - paddleHeight/2;
	if(playerY >= ch -paddleHeight){
		playerY = ch - paddleHeight
	}
	if(playerY <=0){
		playerY =0;
	}
}
function drawTable(){
	ctx.fillStyle= 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height)
	for(let l = 20; l<ch;l+=30){
		ctx.fillStyle="gray"
		ctx.fillRect(cw/2-lineWidth/2,l,lineWidth,lineHeight)
	}
}

function drawBall(){
	ctx.fillStyle = "white";
	ctx.fillRect(ballX,ballY,ballSize,ballSize)
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if(ballY<=0 || ballY +ballSize>ch){
		ballSpeedY = -ballSpeedY
		speedUp()
	}
	if(ballX<=0 || ballX +ballSize>cw){
		ballSpeedX = -ballSpeedX
		speedUp()
	}
	
}

function aiPosition(){
	const middlePaddle = aiY + paddleHeight/2;
	const middleBall = ballY + ballSize /2;
	if(ballX>500){
		if(middlePaddle-middleBall>200){
			aiY -=24;
			
		}else if(middlePaddle-middleBall>50){
			aiY -=10;
		}
		else if(middlePaddle-middleBall<-200){
			aiY +=24;
		}
		else if(middlePaddle-middleBall<-50){
			aiY += 10;
		}
	}
	if(ballX<= 500 && ballX>100){
		aiY -= 3;
	}
	if(middlePaddle-middleBall< -100){
		aiY +=3;
	}
	if(aiY >= ch -paddleHeight){
		aiY = ch-paddleHeight;
	}
	if(aiY <= 0){
		aiY = 0;
	}
}
function drawPlayer(){
	ctx.fillStyle = "#7fff00";
	ctx.fillRect(playerX,playerY,paddlewidth,paddleHeight)
}
function drawAI(){
	ctx.fillStyle = "yellow";
	ctx.fillRect(aiX,aiY,paddlewidth,paddleHeight)
}

canvas.addEventListener("mousemove",playerPosition)
function game(){
	drawTable()
	drawPlayer();
	drawAI();
	drawBall()
	
	console.log(ballSpeedX+","+ballSpeedY);
}
setInterval(aiPosition,40);
setInterval(game,1000/60)