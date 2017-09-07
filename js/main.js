$(function(){

   function changeDirect(player, direct){
       return new Promise(function(resolve, reject) {
           var angle = direct;
          // console.log(angle);
           setTimeout(function() {
               player.setDirection([angle, 0]);
               resolve(angle);
           }, 100);
           // setTimeout(function(direct){
           //     player.setDirection([direct, 0]);
           //     resolve();
           // },50*(Math.abs(reverse-direct)),direct);
       });
   }

    function delay(ms){
        return new Promise(function(resolve){
            setTimeout(resolve, ms);
        });
    }

function directionToRight(player,angleFrom, angleTo){
    return new Promise(function(resolve, reject) {
        var last = Promise.resolve(angleFrom);
        for (var direct = angleFrom; direct < angleTo; direct++) {
            last=last.then(function(angle){
                var agl= ++angle;
                //console.log(player.getDirection());
                return changeDirect(player,agl);
            });
        }
        last.then(function(){
           resolve();
        });

    });
}
function directionToLeft(player,angleFrom, angleTo) {
    return new Promise(function(resolve, reject) {
        var last = Promise.resolve(angleFrom);
        for (var direct = angleFrom; direct > angleTo; direct--) {
            last = last.then(function (angle) {
                var agl = --angle;
               // console.log(player.getDirection());
                return changeDirect(player, agl);
            });
        }
        last.then(function(){
            resolve();
        });
    });
}

ymaps.ready(function () {
    // Для начала проверим, поддерживает ли плеер браузер пользователя.
    if (!ymaps.panorama.isSupported()) {
        // Если нет, то просто ничего не будем делать.
        return;
    }

    // Ищем панораму в переданной точке.
    ymaps.panorama.locate([55.910319, 37.542207]).done(
        function (panoramas) {
            // Убеждаемся, что найдена хотя бы одна панорама.
            if (panoramas.length > 0) {

                // Создаем плеер с одной из полученных панорам.
                var player = new ymaps.panorama.Player(
                    'player1',
                    // Панорамы в ответе отсортированы по расстоянию
                    // от переданной в panorama.locate точки. Выбираем первую,
                    // она будет ближайшей.
                    panoramas[0],
                    // Зададим направление взгляда, отличное от значения
                    // по умолчанию.
                    { direction: [0, 0],
                        controls: [],
                        suppressMapOpenBlock: true,
                        scrollZoomBehavior: false

                    }

                );
                player.events.add('directionchange', function () {
                    //console.log('Change direction');

                });
                player.events.add('panoramachange', function () {
                    //console.log('Change panorama');
                    var panorama = player.getPanorama();
                    panorama._connectionArrows = Array();
                    console.log(panorama.getConnectionArrows());
                    console.log(panorama);

                });
                var graph=panoramas[0].getGraph();
                var nodes = graph.getNodes();

                var panorama = player.getPanorama();
                panorama._connectionArrows = Array();
                panorama.getConnectionArrows = function(){
                    return [];
                };


                console.log(nodes[0]);
                // var last = Promise.resolve();
                // last=last.then(function(){
                //     return directionToRight(player,0,90);
                // }).then(function(){
                //     console.log(player.getDirection());
                //     return directionToLeft(player,90,0);
                // });
                var ind=1;
                var last = Promise.resolve();
                for(var i=0; i<nodes.length; i++){
                    last=last.then(function(){
                        return delay(10000);
                    }).then(function(){
                       return directionToRight(player,0,30);
                    }).then(function(){
                        return delay(12000);
                    }).then(function(){
                        return directionToRight(player,30,60);
                    }).then(function(){
                        return delay(12000);
                    }).then(function(){
                       return directionToLeft(player,360,330);
                    }).then(function(){
                        return delay(12000);
                    }).then(function(){
                        return new Promise(function(resolve, reject) {
                            var coord_panorama = Array.from(nodes[ind]._position).reverse();
                            player.moveTo(coord_panorama);
                            ind++;
                            resolve();
                        });
                    });
                    nodes[i]._panorama._connectionArrows=Array();
                    nodes[i]._panorama.getConnectionArrows = function(){
                        return [];
                    };
                }

                var panorama = player.getPanorama();
                console.log(panorama.getTileSize());
               // var url =panorama.getTileLevels()[2].getTileUrl(1,1);
                var imageSize = Array.from(panorama.getTileLevels());
                //var imageSize = Array.from(panorama.getTileLevels()[2].getImageSize());

                //var urlTpl =panorama.getTileLevels()[2]._tileUrlTemplate;

                //var layer = new ymaps.Layer(urlTpl);

                //var tileSize = Array.from(panorama.getTileSize());
               // console.log(tileSize);
               //  console.log(imageSize);
                //var url2 =panorama.getTileLevels()[2].getTileUrl(0,1);
                //console.log(url2);

                //формируем массив тайлов

                // var mass_images = [];
                // var imageWidth = imageSize[0];
                // var imageHeight = imageSize[1];
                // var countTilesX = imageWidth / tileSize[0]; //количество тайлов по оси X
                // var countTilesY = imageHeight / tileSize[1]; // количество тайлов по оси Y
                //
                // for (var x=0; x<countTilesX; x++){
                //     for(var y=0; y<countTilesY; y++){
                //         var url =panorama.getTileLevels()[2].getTileUrl(x,y);
                //         mass_images.push(url);
                //     }
                // }
                // console.log(typeof(imageWidth));
                // console.log(imageHeight);
                // console.log(tileSize);
                // console.log(countTilesX);
                // console.log(countTilesY);
                //
                // console.log(mass_images);
                //
                //



            }

            // var coord_panorama = Array.from(nodes[0]._position).reverse();
            // console.log(panorama.getTileLevels()[3].getTileUrl(coord_panorama[1], coord_panorama[0]));
            // var img_source= panorama._tileLevels[3]._tileUrlTemplate;
            // console.log(img_source);
            // var image = document.createElement('img');
            // image.src= img_source;
            // panorama.onload = function() {
            //     alert( "Loaded" ); // её код
            // }

                //console.log(panorama.getConnectionArrows());

            // var canvas = document.querySelector('canvas');
            // console.log(canvas);
            // var dataURL = canvas.toDataURL();
            // var image = document.createElement('img');
            // image.src=dataURL;
            // console.log(dataURL);


        },
        function (error) {
            // Если что-то пошло не так, сообщим об этом пользователю.
            alert(error.message);
        }


    );

});


});

