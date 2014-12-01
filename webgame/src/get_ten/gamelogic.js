var GameLogic = cc.Class.extend(
{
    data:null,
    max:1,
    score:0,

    ctor:function()
    {
        this.data = new Array();
        
    },
    
    reset:function()
    {
        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) {
            this.data[i] = Math.ceil(3*Math.random());
        }
        this.score = 0;
        this.max = 3;
    },

    check:function(idx,dir,array)
    {
        var pos = idx2pos(idx);
        var n = this.data[idx];

        if(0==array.length)
        {
            array.push(idx);
            //cc.log(pos);
        }    
        
        for (var i = Dir.Up; i <= Dir.Left; i++) {
            var newPos = new Pos();
            newPos.x = pos.x;
            newPos.y = pos.y;

            if (dir!=Dir.None)
            {
                var oppositeDir = (i+Dir.Total/2)%Dir.Total;
                if( oppositeDir==dir){
                    continue;
                }
            }

            if(Dir.Up==i)
            {
                newPos.y+=1;
            }
            else if(Dir.Right==i)
            {
                newPos.x+=1;
            }
            else if(Dir.Down==i)
            {
                newPos.y-=1;
            }
            else if(Dir.Left==i)
            {
                newPos.x-=1;
            }

            if( (newPos.y>=NUMBER_ROW) || (newPos.y<0) || (newPos.x>=NUMBER_COLUMN) || (newPos.x<0) )
            {
                continue;
            }
            
            var newIdx = pos2idx(newPos.x,newPos.y);
            var newN = this.data[newIdx];
            if(n!=newN )
            {
                continue;
            }

            var bCheck = true;
            for (var j = 0; j < array.length; j++) {
                if( newIdx==array[j] )
                {
                    bCheck = false;
                    break;
                }
            };

            if (!bCheck) {
                continue;
            };

            //cc.log(newPos);
            array.push(newIdx);

            this.check(newIdx,i,array);
        };
    },

    dispose:function(idx)
    {
        var array = new Array();
        this.check(idx,Dir.None,array);

        if (array.length>1) {
            for (var i = 0; i < array.length; i++) {
                
                this.score+=this.data[array[i]];

                if( idx==array[i] )
                {
                    this.data[array[i]] += 1;
                    if (this.max<this.data[array[i]]) {
                        this.max = this.data[array[i]];
                    };
                }
                else
                {
                    this.data[array[i]] = -1;
                }

            };        
        };
        
        return array;
    },

    generateNum:function()
    {
        var nMax = 3;
        if(Math.random()<=0.4)
        {
            nMax = 4;
            if(this.max>4)
            {
                if(Math.random()<=0.4)
                {
                    nMax = 5;
                }
                
            }
        }
        nMax =9;
        return Math.ceil(nMax*Math.random());
    },

    fallDownByStep:function()
    {
        var bOk = false;
        for (var i = 0; i < NUMBER_COLUMN; i++) {
            for (var j = 0; j < NUMBER_ROW; j++) {
                var idx = pos2idx(i,j);
                if(-1==this.data[idx]){                    
                    for (var k = j; k < NUMBER_ROW-1; k++) {
                        var currentIdx = pos2idx(i,k+1);
                        var nextIdx = pos2idx(i,k);

                        var temp = this.data[currentIdx];
                        this.data[currentIdx] = this.data[nextIdx];
                        this.data[nextIdx] = temp;
                    }
                    this.data[pos2idx(i,NUMBER_ROW-1)] = this.generateNum();
                    bOk = true;
                    break;
                }                 
            }
        }

        return bOk;
    },

    falldown:function()
    {
        for (var i = 0; i < NUMBER_COLUMN; i++) {
            for (var j = 0; j < NUMBER_ROW; j++) {
                var idx = pos2idx(i,j);
                if(-1!=this.data[idx]){
                    continue;
                }

                for (var k = j+1; k < NUMBER_ROW; k++) {
                    var nextIdx = pos2idx(i,k);
                    if(-1!=this.data[nextIdx]){
                        var temp = this.data[idx];
                        this.data[idx] = this.data[nextIdx];
                        this.data[nextIdx] = temp;

                        break;
                    }
                }
                 
            };

            for (var j = 0; j < NUMBER_ROW; j++) {
                var idx = pos2idx(i,j);
                if(-1==this.data[idx]){
                    var nMax = 3;
                    if(Math.random()<=0.4)
                    {
                        nMax = 4;
                        if(this.max>4)
                        {
                            if(Math.random()<=0.4)
                            {
                                nMax = 5;
                            }
                            
                        }
                    }
                    
                    this.data[idx] = Math.ceil(nMax*Math.random());
                }
            }          
        };
    },

    checkover:function()
    {
        for (var i = 0; i < NUMBER_ROW*NUMBER_COLUMN; i++) {
            var array = new Array();
            this.check(i,Dir.None,array);
            if( array.length>1 ) {
                return false;
            }
        }
        return true;
    }
});

var g_GameLogic = new GameLogic();
