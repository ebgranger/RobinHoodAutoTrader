export function calculateRSI(priceArray, previousAverageGain, previousAverageLoss) {
	var prices = priceArray;
    var sumGain = 0;
    var sumLoss = 0;
        for (i=0; i<prices.length-1; i++){
            var difference = prices[i] - prices[i + 1];
            if (difference >= 0) {
                sumGain +=difference;
            }
            else {
                sumLoss -= difference;
            }
        }
        var averageGain = sumGain/prices.length;
        var averageLoss = sumLoss/prices.length;
        var smoothedGain = (((previousAverageGain)*(prices.length-1))+sumGain)/(prices.length);
        var smoothedLoss = (((previousAverageLoss)*(prices.length-1))+sumLoss)/(prices.length);
        var relativeStrength = smoothedGain/smoothedLoss;
        var rsi = (100.0 - (100.0 / (1 + relativeStrength)));
        var rsiOutput = {
        	rsi:rsi,
        	averageGain: averageGain,
        	averageLoss: averageLoss
        }
        return(rsiOutput);
    }