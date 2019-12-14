// this challenge was just adding code into one if-condition:
{
    sum =
        lastRowLeftmostSum -
        rowSum(i - 1, j, j + width) +
        rowSum(i + height - 1, j, j + width);
    lastRowLeftmostSum = sum;
}

// here's the full function - which optimally calculates
// -> sums of numbers in an area of boxes (not all written by me)
function textOverlayOnHeroImage(image, height, width) {
    var columnSum = function(x, y1, y2) {
        var result = 0;
        for (var y = y1; y < y2; y++) {
            result += image[y][x];
        }
        return result;
    };

    var rowSum = function(y, x1, x2) {
        var result = 0;
        for (var x = x1; x < x2; x++) {
            result += image[y][x];
        }
        return result;
    };

    var bestSum = -1;
    var bestPos = [];
    var sum = 0;
    var lastRowLeftmostSum = 0;

    for (var i = 0; i + height <= image.length; i++) {
        for (var j = 0; j + width <= image[0].length; j++) {
            if (!i && !j) {
                for (var y = 0; y < height; y++) {
                    sum += rowSum(y, 0, width);
                }
                lastRowLeftmostSum = sum;
            } else if (!j) {
                sum =
                    lastRowLeftmostSum -
                    rowSum(i - 1, j, j + width) +
                    rowSum(i + height - 1, j, j + width);
                lastRowLeftmostSum = sum;
            } else {
                sum =
                    sum -
                    columnSum(j - 1, i, i + height) +
                    columnSum(j + width - 1, i, i + height);
            }
            if (sum > bestSum) {
                bestSum = sum;
                bestPos = [i, j];
            }
        }
    }

    return bestPos;
}
