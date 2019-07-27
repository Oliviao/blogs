if(index == 0){
    return 0;
}
var uglyArray = [1],
    two = 0,
    three = 0,
    five = 0;
for(var i=1;i<index;i++){
    uglyArray[i] = Math.min(uglyArray[two]*2,uglyArray[three]*3,uglyArray[five]*5);
    if(uglyArray[i]==uglyArray[two]*2){
        two++;
    }
    if(uglyArray[i]==uglyArray[three]*3){
        three++;
    }
    if(uglyArray[i]==uglyArray[five]*5){
        five++;
    }
}
return uglyArray[index-1];