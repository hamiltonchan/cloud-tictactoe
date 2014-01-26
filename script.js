angular.module("TicTacToe", ["firebase"])
	.controller("TicTacController", function($scope, $firebase) {

	var ticTacRef = new Firebase("https://tictactictac.firebaseio.com");
	$scope.rootnode = $firebase(ticTacRef);

	cells = ['','','','','','','','',''];
	gameover = false;
	$scope.cells = cells;
	currentMark= 'o';
	grid = [
			[ "" , "" , "" ],
			[ "" , "" , "" ],
			[ "" , "" , "" ]];
	moves = 0;
	leftScore = 0;
	rightScore = 0;

 	$scope.rootnode.$on("loaded", function() {

		$scope.rootnode.$add(
			{ grid: [
				[ "" , "" , "" ],
				[ "" , "" , "" ],
				[ "" , "" , "" ]],
				cells: ['','','','','','','','',''],
				currentMark: 'o',
				moves: 0,
				leftScore: 0,
				rightScore: 0
			});

		nodeKey = $scope.rootnode.$getIndex(0)[0];
		gameNode = $scope.rootnode[nodeKey];

		gameNode.cells = ['','','','','','','','',''];
		gameNode.grid = [
			[ "" , "" , "" ],
			[ "" , "" , "" ],
			[ "" , "" , "" ]];
		gameNode.currentMark = 'o';
		gameNode.moves = 0;
		gameNode.leftScore = 0;
		gameNode.rightScore = 0;
		gameNode.player1Name = 'Player 1';
		gameNode.player2Name = 'Player 2';
		gameNode.leftMessage = '';
		gameNode.rightMessage = '';
		gameNode.gameover = false;
		if (gameNode.p1assign != 1) {
			gameNode.p1assign = 1;
			player = "xplayer";
			$scope.identityX = "You are 'x'";
			$scope.identityO = " ";
		} else {
			gameNode.p2assign = 1;
			player = "oplayer";
			gameNode.p1assign = 0;
			gameNode.p2assign = 0;
			$scope.identityO = "You are 'o'";
			$scope.identityX = " ";
		}
		console.log('i am ' + player);

		$scope.rootnode.$save(nodeKey);

 
	$scope.rootnode.$on("change", function() {
		nodeKey = $scope.rootnode.$getIndex(0)[0];
		console.log('nodeKey = ' + nodeKey);
		gameNode = $scope.rootnode[nodeKey];
		$scope.gameNode = gameNode;


		$scope.drawMark = function(index) {
			var row = Math.floor(index/3);
			var column = (index % 3);
			if (gameNode.gameover == false && gameNode.cells[index] == '') {
				if (gameNode.currentMark == 'o' && player == "xplayer") {
					console.log('i am x player so i will make a move');
					$scope.cells[index] = 'x';
					gameNode.cells[index] = 'x';
					gameNode.currentMark = 'x';
					gameNode.grid[row][column] = gameNode.currentMark;
					gameNode.moves += 1;
					$scope.rootnode.$save(nodeKey);
				} else if (gameNode.currentMark == 'x' && player == "oplayer") {
					$scope.cells[index] = 'o';
					gameNode.cells[index] = 'o';
					gameNode.currentMark = 'o';
					gameNode.grid[row][column] = gameNode.currentMark;
					gameNode.moves += 1;
					$scope.rootnode.$save(nodeKey);
				}
			}
		$scope.rootnode.$save(nodeKey);

		if (gameNode.gameover == false) evaluateWin();
	}

});


	var evaluateWin = function() {
		if (gameNode.grid[0][0] == "x" && gameNode.grid[0][1] == "x" && gameNode.grid[0][2] == "x") {
			xwin();
		} else if (gameNode.grid[1][0] == "x" && gameNode.grid[1][1] == "x" && gameNode.grid[1][2] == "x") {
			xwin();
		} else if (gameNode.grid[2][0] == "x" && gameNode.grid[2][1] == "x" && gameNode.grid[2][2] == "x") {
			xwin();
		} else if (gameNode.grid[0][0] == "x" && gameNode.grid[1][0] == "x" && gameNode.grid[2][0] == "x") {
			xwin();
		} else if (gameNode.grid[0][1] == "x" && gameNode.grid[1][1] == "x" && gameNode.grid[2][1] == "x") {
			xwin();
		} else if (gameNode.grid[0][2] == "x" && gameNode.grid[1][2] == "x" && gameNode.grid[2][2] == "x") {
			xwin();
		} else if (gameNode.grid[0][0] == "x" && gameNode.grid[1][1] == "x" && gameNode.grid[2][2] == "x") {
			xwin();
		} else if (gameNode.grid[0][2] == "x" && gameNode.grid[1][1] == "x" && gameNode.grid[2][0] == "x") {
			xwin();
		} else if (gameNode.grid[0][0] == "o" && gameNode.grid[0][1] == "o" && gameNode.grid[0][2] == "o") {
			owin();
		} else if (gameNode.grid[1][0] == "o" && gameNode.grid[1][1] == "o" && gameNode.grid[1][2] == "o") {
			owin();
		} else if (gameNode.grid[2][0] == "o" && gameNode.grid[2][1] == "o" && gameNode.grid[2][2] == "o") {
			owin();
		} else if (gameNode.grid[0][0] == "o" && gameNode.grid[1][0] == "o" && gameNode.grid[2][0] == "o") {
			owin();
		} else if (gameNode.grid[0][1] == "o" && gameNode.grid[1][1] == "o" && gameNode.grid[2][1] == "o") {
			owin();
		} else if (gameNode.grid[0][2] == "o" && gameNode.grid[1][2] == "o" && gameNode.grid[2][2] == "o") {
			owin();
		} else if (gameNode.grid[0][0] == "o" && gameNode.grid[1][1] == "o" && gameNode.grid[2][2] == "o") {
			owin();
		} else if (gameNode.grid[0][2] == "o" && gameNode.grid[1][1] == "o" && gameNode.grid[2][0] == "o") {
			owin();
		} else if (gameNode.moves == 9) {
			console.log('there was a draw');
			gameNode.leftMessage = "draw...";
			gameNode.rightMessage = "draw...";
			$scope.rootnode.$save(nodeKey);
		} else {
			console.log('there was no win and no draw, and here are the moves: ' + gameNode.moves);
		}
	}

	$scope.setName1 = function(player1Name) {
		$scope.gameNode.player1Name = '';
	}

	$scope.setName2 = function(player2Name) {
		$scope.gameNode.player2Name = '';
	}

	$scope.removeFocus1 = function(key) {
		if (key.keyCode == 13) {
			gameNode.player1Name = $scope.gameNode.player1Name;
			$scope.rootnode.$save(nodeKey);
			key.target.blur();
		}
	}

	$scope.removeFocus2 = function(key) {
		if (key.keyCode == 13) {
			gameNode.player2Name = $scope.gameNode.player2Name;
			$scope.rootnode.$save(nodeKey);
			key.target.blur();
		}
	}

	var xwin = function () {
		gameNode.leftMessage = gameNode.player1Name + " wins!";
		gameNode.gameover = true;
		gameNode.leftScore += 1;
		$scope.rootnode.$save(nodeKey);
	}

	var owin = function () {
		gameNode.rightMessage = gameNode.player2Name + " wins!";
		gameNode.gameover = true;
		gameNode.rightScore += 1;
		$scope.rootnode.$save(nodeKey);
	}

	$scope.clearBoard = function() {
		for (var j = 0; j < cells.length; j++) {
			gameNode.cells[j] = '';
		}
		gameNode.leftMessage = "";
		gameNode.rightMessage = "";
		gameNode.currentMark = 'o';
		gameNode.moves = 0;
		gameNode.gameover = false;
		gameNode.grid = [
				[ "" , "" , "" ],
				[ "" , "" , "" ],
				[ "" , "" , "" ]
		];
		$scope.rootnode.$save(nodeKey);
	};

	});

});





