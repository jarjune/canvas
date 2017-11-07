!function(doc) {

	var canvas = {
			width: window.innerWidth, // 画布的宽度
			height: window.innerHeight // 画布的高度
		};

	var cvs=doc.getElementById('flow');
	var ctx=cvs.getContext('2d');

	function getCircle(radius) {
		var radius = radius || 50;
		var color = '#dbdde0'; // 未完成颜色
		var activeColor = '#7fc54c'; // 已完成颜色
		var fontSize = 18; // 字体大小
		var fontColor = '#555';
		var fontActiveColor = '#fff';
		var offset = (canvas.width - 10 * radius) / 4;
		var circles = [{
				x: radius, // 圆心x
				y: canvas.height / 2, // 圆心y
				text: '异议申请',
				isActive: true
			}, {
				x: 3 * radius + offset, // 圆心x
				y: canvas.height / 2, // 圆心y
				text: '平台自查',
				isActive: true
			}, {
				x: 6 * radius + 2.5 * offset, // 圆心x
				y: radius, // 圆心y
				text: '数据修复',
				isActive: true
			}, {
				x: 5 * radius + 2 * offset, // 圆心x
				y: canvas.height - radius, // 圆心y
				text: '部门自查',
				isActive: false
			}, {
				x: 7 * radius + 3 * offset, // 圆心x
				y: canvas.height - radius, // 圆心y
				text: '部门反馈',
				isActive: false
			}, {
				x: canvas.width - radius, // 圆心x
				y: canvas.height / 2, // 圆心y
				text: '结果反馈',
				isActive: false
			}];

		return {
			radius,
			color,
			activeColor,
			fontSize,
			fontColor,
			fontActiveColor,
			circles
		}
	}
	
	// 获取所有圆
	var circle = getCircle(44);

	function drawFlow() {

		cvs.width = canvas.width;
		cvs.height = canvas.height;

		var _length = circle.circles.length;
		for(var i = 0; i<_length; i++) {
			// 画圆
			ctx.fillStyle = circle.circles[i].isActive?circle.activeColor:circle.color;
			ctx.beginPath();
			ctx.arc(circle.circles[i].x, circle.circles[i].y, circle.radius, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();

			// 写字
			ctx.fillStyle = circle.circles[i].isActive?circle.fontActiveColor:circle.fontColor;
			ctx.font = circle.fontSize + "px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(circle.circles[i].text.slice(0,2),circle.circles[i].x, circle.circles[i].y - circle.fontSize / 2 - 1);
			ctx.fillText(circle.circles[i].text.slice(2,4),circle.circles[i].x, circle.circles[i].y + circle.fontSize / 2 + 1);
		}
	}

	function drawLine(from, to) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.lineJoin = "round";
		if(from.x < to.x) {
			if(from.y == to.y) {
				ctx.moveTo(from.x + 50, from.y);
				ctx.lineTo(to.x - 50, to.y);
			}else if(from.y > to.y) {
				ctx.moveTo(from.x, from.y - 50);
				ctx.lineTo(from.x, to.y);
				ctx.lineTo(to.x - 50, to.y);
			}else if(from.y < to.y) {
				ctx.moveTo(from.x, from.y + 50);
				ctx.lineTo(from.x, to.y);
				ctx.lineTo(to.x - 50, to.y);
			}
		} else {
			if(from.y == to.y) {
				ctx.moveTo(from.x + 50, from.y);
				ctx.lineTo(to.x - 50, to.y);
			}else if(from.y > to.y) {
				ctx.moveTo(from.x, from.y - 50);
				ctx.lineTo(from.x, to.y);
				ctx.lineTo(to.x + 50, to.y);
			}else if(from.y < to.y) {
				ctx.moveTo(from.x, from.y + 50);
				ctx.lineTo(from.x, to.y);
				ctx.lineTo(to.x + 50, to.y);
			}
		}
		// if(from.x < to.x) {
		// 	if(from.y == to.y) {
		// 		ctx.moveTo(from.x + 50, from.y);
		// 		ctx.lineTo(to.x - 50, to.y);
		// 	}else if(from.y > to.y) {
		// 		ctx.moveTo(from.x + 50, from.y);
		// 		// ctx.lineTo(from.x, to.y);
		// 		ctx.lineTo(to.x - 50, to.y);
		// 	}else if(from.y < to.y) {
		// 		ctx.moveTo(from.x + 50, from.y);
		// 		// ctx.lineTo(from.x, to.y);
		// 		ctx.lineTo(to.x - 50, to.y);
		// 	}
		// } else {
		// 	if(from.y == to.y) {
		// 		ctx.moveTo(from.x + 50, from.y);
		// 		ctx.lineTo(to.x - 50, to.y);
		// 	}else if(from.y > to.y) {
		// 		ctx.moveTo(from.x - 50, from.y);
		// 		// ctx.lineTo(from.x, to.y);
		// 		ctx.lineTo(to.x + 50, to.y);
		// 	}else if(from.y < to.y) {
		// 		ctx.moveTo(from.x - 50, from.y);
		// 		// ctx.lineTo(from.x, to.y);
		// 		ctx.lineTo(to.x + 50, to.y);
		// 	}
		// }
		ctx.strokeStyle = to.isActive && from.isActive?circle.activeColor:circle.color;
		ctx.stroke();
	}

	drawFlow();

	drawLine(circle.circles[0], circle.circles[1]);
	drawLine(circle.circles[1], circle.circles[2]);
	drawLine(circle.circles[5], circle.circles[2]);
	drawLine(circle.circles[1], circle.circles[3]);
	drawLine(circle.circles[3], circle.circles[4]);
	drawLine(circle.circles[5], circle.circles[4]);

	window.onresize = function() {
		canvas.width = window.innerWidth; // 画布的宽度
		canvas.height = window.innerHeight; // 画布的高度

		circle = getCircle(44);

		drawFlow();

		drawLine(circle.circles[0], circle.circles[1]);
		drawLine(circle.circles[1], circle.circles[2]);
		drawLine(circle.circles[5], circle.circles[2]);
		drawLine(circle.circles[1], circle.circles[3]);
		drawLine(circle.circles[3], circle.circles[4]);
		drawLine(circle.circles[5], circle.circles[4]);
	}

}(document)