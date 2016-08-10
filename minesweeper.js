/* global $*/
$(document).ready(function() {
        
    //-----------------------------------------
    //  Generate the bombs on the game board
    //-----------------------------------------
    var flags = 10;
    var game = function(){
        var board = [["", "", "", "", "", "", "", "", ""], 
                     ["", "", "", "", "", "", "", "", ""], 
                     ["", "", "", "", "", "", "", "", ""],
                     ["", "", "", "", "", "", "", "", ""],
                     ["", "", "", "", "", "", "", "", ""],
                     ["", "", "", "", "", "", "", "", ""],
                     ["", "", "", "", "", "", "", "", ""],
                     ["", "", "", "", "", "", "", "", ""],
                     ["", "", "", "", "", "", "", "", ""]];
                     
        var bomb = 10;
        
        while(bomb != 0) {
            for(var i = 0; i < 9; i++){
                for(var j = 0; j < 9; j++){
                    if(board[i][j] === "b"){
                    }
                    else if(bomb < 1){
                        board[i][j] = " ";
                    }
                    else if(Math.random() < 0.07){
                        board[i][j] = "b";
                        bomb--;
                    } else {
                        board[i][j] = " ";
                    }
                }
            }
        }
        
        //-----------------------------------------
        //  Put the correct number in each position
        //-----------------------------------------
        
        var bombSurr = 0;
        
        function testRight() {
            if(board[i][j + 1] === "b"){
                return bombSurr++;
            }
        }
        
        function testBottomRight() {
            if(board[i + 1][j + 1] === "b"){
                return bombSurr++;
            }
        }
        
        function testBottom() {
            if(board[i + 1][j] === "b"){
                return bombSurr++;
            }
        }
        
        function testBottomLeft() {
            if(board[i + 1][j - 1] === "b"){
                return bombSurr++;
            }
        }
        
        function testLeft() {
            if(board[i][j - 1] === "b"){
                return bombSurr++;
            }
        }
        
        function testTopLeft() {
            if(board[i - 1][j - 1] === "b"){
                return bombSurr++;
            }
        }
        
        function testTop() {
            if(board[i - 1][j] === "b"){
                return bombSurr++;
            }
        }
        
        function testTopRight() {
            if(board[i - 1][j + 1] === "b"){
                return bombSurr++;
            }
        }
        
        function assignNum() {
            if(bombSurr !== 0){
                board[i][j] = bombSurr;
                return board[i][j];
            }
        }
        
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(board[i][j] !== "b") {
                    if(i === 0 && j == 0){
                        testRight();
                        testBottom();
                        testBottomRight();
                        assignNum();
                    }
                    else if(i === 0 && j === 8){
                        testLeft();
                        testBottomLeft();
                        testBottom();
                        assignNum();
                    }
                    else if(i === 0){
                        testLeft();
                        testBottomLeft();
                        testBottom();
                        testBottomRight();
                        testRight();
                        assignNum();
                    }
                    else if(i === 8 & j === 0){
                        testTop();
                        testTopRight();
                        testRight();
                        assignNum();
                    }
                    else if(j === 0) {
                        testTop();
                        testTopRight();
                        testRight();
                        testBottomRight();
                        testBottom();
                        assignNum();
                    }
                    else if(i === 8 && j === 8){
                        testTop();
                        testTopLeft();
                        testLeft();
                        assignNum();
                    }
                    else if(i === 8){
                        testRight();
                        testTopRight();
                        testTop();
                        testTopLeft();
                        testLeft();
                        assignNum();
                    }
                    else if(j === 8){
                        testBottom();
                        testBottomLeft();
                        testLeft();
                        testTopLeft();
                        testTop();
                        assignNum();
                    } else {
                        testTop();
                        testTopRight();
                        testRight();
                        testBottomRight();
                        testBottom();
                        testBottomLeft();
                        testLeft();
                        testTopLeft();
                        assignNum();
                    }
                    bombSurr = 0;
                }
            }
        }
        
        //-----------------------------------------
        //  Print the game to the screen
        //-----------------------------------------
        
        for(var i = 0, x = 1; i < 9; i++){
            for(var j = 0; j < 9; j++){
                //add bomb
                if(board[i][j] === "b"){
                    $(".p" + x).addClass("bomb");
                } else {
                    $(".p" + x).text(board[i][j]);
                }
                if(board[i][j] === " "){
                    $(".p" + x).addClass("blank");
                }
                //style numbers
                if(board[i][j] === 1){
                    $(".p" + x).addClass("num1");
                }
                else if(board[i][j] === 2){
                    $(".p" + x).addClass("num2");
                }
                else if(board[i][j] === 3){
                    $(".p" + x).addClass("num3");
                }
                else if(board[i][j] === 4){
                    $(".p" + x).addClass("num4");
                }
                else if(board[i][j] === 5){
                    $(".p" + x).addClass("num5");
                }
                else if(board[i][j] === 6){
                    $(".p" + x).addClass("num6");
                }
                else if(board[i][j] === 7){
                    $(".p" + x).addClass("num7");
                }
                else if(board[i][j] === 8){
                    $(".p" + x).addClass("num8");
                }
                x++;
            }
        }
        
        //-----------------------------------------
        //  Remove top blocks when clicked
        //-----------------------------------------
                     
        function findNum(block) {
            var x = 1;
            for(var i = 0; i < 9; i++){
                for(var j = 0; j < 9; j++){
                    if($(block).hasClass("c" + x)){
                        return x;
                    } else {
                        x++;
                    }
                }
            }
        }
        
        function lookRight(num){
            //look right
            if(!($(".c" + (num + 1)).hasClass("remove"))){
                $(".c" + (num + 1)).addClass("remove");
                clearSpace($(".p" + (num + 1)), (num + 1));
            }
        }
        
        function lookLeft(num){
            //look left
            if(!($(".c" + (num - 1)).hasClass("remove"))){
                $(".c" + (num - 1)).addClass("remove");
                clearSpace($(".p" + (num - 1)), (num - 1));
            }
        }
        
        function lookDown(num){
            //look down
            if(!($(".c" + (num + 9)).hasClass("remove"))){
                $(".c" + (num + 9)).addClass("remove");
                clearSpace($(".p" + (num + 9)), (num + 9));
            }
        }
        
        function lookBottomRight(num){
            //look bottom right
            if(!($(".c" + (num + 10)).hasClass("remove"))){
                $(".c" + (num + 10)).addClass("remove");
                clearSpace($(".p" + (num + 10)), (num + 10));
            }
        }
        
        function lookBottomLeft(num){
            //look bottom left
            if(!($(".c" + (num + 8)).hasClass("remove"))){
                $(".c" + (num + 8)).addClass("remove");
                clearSpace($(".p" + (num + 8)), (num + 8));
            }
        }
        
        function lookTop(num){
            //look top
            if(!($(".c" + (num - 9)).hasClass("remove"))){
                $(".c" + (num - 9)).addClass("remove");
                clearSpace($(".p" + (num - 9)), (num - 9));
            }
        }
        
        function lookTopRight(num){
            //look top right
            if(!($(".c" + (num - 8)).hasClass("remove"))){
                $(".c" + (num - 8)).addClass("remove");
                clearSpace($(".p" + (num - 8)), (num - 8));
            }
        }
        
        function lookTopLeft(num){
            //look top left
            if(!($(".c" + (num - 10)).hasClass("remove"))){
                $(".c" + (num - 10)).addClass("remove");
                clearSpace($(".p" + (num - 10)), (num - 10));
            }
        }
        
        function clearSpace(space, num) {
            if($(space).is(".num1, .num2, .num3, .num4, .num5, .num6, .num7, .num8")){
                return true;
            }
            else if($(space).is(".p1")){
                $(".c2").addClass("remove");
                clearSpace($(".p2"), (num + 1));
                $(".c11").addClass("remove");
                clearSpace($(".p11"), (num + 10));
                $(".c10").addClass("remove");
                clearSpace($(".p10"), (num + 9));
            }
            else if($(space).is(".p2, .p3, .p4, .p5, .p6, .p7, .p8")){
                lookRight(num);
                lookLeft(num);
                lookDown(num);
                lookBottomRight(num);
                lookBottomLeft(num);
            }
            else if($(space).is(".p9")){
                lookLeft(num);
                lookDown(num);
                lookBottomLeft(num);
            }
            else if($(space).is(".p10, .p19, .p28, .p37, .p46, .p55, .p64")){
                lookTop(num);
                lookTopRight(num);
                lookRight(num);
                lookBottomRight(num);
                lookDown(num);
            }
            else if($(space).is(".p73")){
                lookTop(num);
                lookTopRight(num);
                lookRight(num);
            }
            else if($(space).is(".p74, .p75, .p76, .p77, .p78, .p79, .p80")){
                lookLeft(num);
                lookTopLeft(num);
                lookTop(num);
                lookTopRight(num);
                lookRight(num);
            }
            else if($(space).is(".p81")){
                lookLeft(num);
                lookTopLeft(num);
                lookTop(num);
            }
            else if($(space).is(".p18, .p27, .p36, .p45, .p54, .p63, .p72")){
                lookDown(num);
                lookBottomLeft(num);
                lookLeft(num);
                lookTopLeft(num);
                lookTop(num);
            } else {
                lookTop(num);
                lookTopRight(num);
                lookRight(num);
                lookBottomRight(num);
                lookDown(num);
                lookBottomLeft(num);
                lookLeft(num);
                lookTopLeft(num);
            }
        }
        
        //test for the solution
        function solved() {
            for(var i = 0, correct = 0, counter = 1; i < 81; i++){
                    if($(".c" + counter).hasClass("flag")){
                        if($(".p" + counter).hasClass("bomb")){
                            correct++;
                        }
                    }
                    else if($(".p" + counter).is(".blank, .num1, .num2, .num3, .num4, .num5, .num6, .num7, .num8")){
                        if($(".c" + counter).hasClass("remove")){
                            correct++;
                        }
                    }
                    counter++;
            }
            if(correct === 81){
                return true;
            } else {
                return false;
            }
        }
        
        
        
        $(".top").on("contextmenu", function(event) {
            if((event.which) === 3){
                $(this).toggleClass("flag");
                if($(this).hasClass("flag")){
                    flags--;
                    $(".flag-count").text("Flags: " + flags);
                } else {
                    flags++;
                    $(".flag-count").text("Flags: " + flags);
                }
                if(solved()){
                    $(".win_lose").addClass("win");
                }
            }
            return false;
        });
        
        $(".top").on("click", function(event) {
            event.preventDefault();
            var num = findNum($(this));
            if(!($(this).hasClass("flag"))){
                $(this).addClass("remove");
                if($(".p" + num).hasClass("bomb")){
                    $(".win_lose").addClass("lose");
                }
                if($(".p" + num).hasClass("blank")){
                    clearSpace($(".p" + num), num);
                }
            }
            if(solved()){
                $(".win_lose").addClass("win");
            }
        });
    };
    
    game();
    
    $(".reset_button").on("click", function(event){
        event.stopPropagation;
        event.preventDefault;
        for(var i = 0, counter = 1; i < 81; i++){
            if($(".p" + counter).hasClass("bomb")){
                $(".p" + counter).removeClass("bomb");
            }
            else if($(".p" + counter).hasClass("blank")){
                $(".p" + counter).removeClass("blank");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num1")){
                $(".p" + counter).removeClass("num1");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num2")){
                $(".p" + counter).removeClass("num2");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num3")){
                $(".p" + counter).removeClass("num3");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num4")){
                $(".p" + counter).removeClass("num4");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num5")){
                $(".p" + counter).removeClass("num5");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num6")){
                $(".p" + counter).removeClass("num6");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num7")){
                $(".p" + counter).removeClass("num7");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num8")){
                $(".p" + counter).removeClass("num8");
                $(".p" + counter).text("");
            }
            if($(".c" + counter).hasClass("remove")){
                $(".c" + counter).removeClass("remove");
            }
            if($(".c" + counter).hasClass("flag")){
                $(".c" + counter).removeClass("flag");
            }
            if($(".win_lose").hasClass("lose")){
                $(".win_lose").removeClass("lose");
            }
            if($(".win_lose").hasClass("win")){
                $(".win_lose").removeClass("win");
            }
            counter++;
        }
        flags = 10;
        $(".flag-count").text("Flags: " + flags);
        game();
        event.stopPropagation;
        event.preventDefault;
        for(var i = 0, counter = 1; i < 81; i++){
            if($(".p" + counter).hasClass("bomb")){
                $(".p" + counter).removeClass("bomb");
            }
            else if($(".p" + counter).hasClass("blank")){
                $(".p" + counter).removeClass("blank");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num1")){
                $(".p" + counter).removeClass("num1");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num2")){
                $(".p" + counter).removeClass("num2");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num3")){
                $(".p" + counter).removeClass("num3");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num4")){
                $(".p" + counter).removeClass("num4");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num5")){
                $(".p" + counter).removeClass("num5");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num6")){
                $(".p" + counter).removeClass("num6");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num7")){
                $(".p" + counter).removeClass("num7");
                $(".p" + counter).text("");
            }
            else if($(".p" + counter).hasClass("num8")){
                $(".p" + counter).removeClass("num8");
                $(".p" + counter).text("");
            }
            if($(".c" + counter).hasClass("remove")){
                $(".c" + counter).removeClass("remove");
            }
            if($(".c" + counter).hasClass("flag")){
                $(".c" + counter).removeClass("flag");
            }
            if($(".win_lose").hasClass("lose")){
                $(".win_lose").removeClass("lose");
            }
            if($(".win_lose").hasClass("win")){
                $(".win_lose").removeClass("win");
            }
            counter++;
        }
        flags = 10;
        $(".flag-count").text("Flags: " + flags);
        game();
    });
});