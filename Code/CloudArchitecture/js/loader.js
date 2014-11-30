// Generated by CoffeeScript 1.6.3
var loader;

loader = {
    loadImages: function (sources, callback) {
        var loadedImages, numImages, src;
        loadedImages = 0;
        numImages = 0;
        for (src in sources) {
            numImages++;
        }
        for (src in sources) {
            global.images[src] = new Image();
            global.images[src].src = sources[src];
            global.images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(global.images);
                }
            };
        }
    }
};
