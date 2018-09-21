class GeoVect
{
	getDistance(point1,point2) {

        var lat1=point1[0];
        var lon1=point1[1];
        var lat2=point2[0];
        var lon2=point2[1];

		var a = 6378137, b = 6356752.314245, f = 1 / 298.257223563;
		var L = ((lon2 - lon1)*Math.PI)/180;
		var U1 = Math.atan((1 - f) * Math.tan((lat1*Math.PI)/180));
		var U2 = Math.atan((1 - f) * Math.tan((lat2*Math.PI)/180));
		var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
		var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
		var cosSqAlpha;
		var sinSigma;
		var cos2SigmaM;
		var cosSigma;
		var sigma;

		var lambda = L, lambdaP, iterLimit = 100;
		do 
		{
			var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
			sinSigma = Math.sqrt(	(cosU2 * sinLambda)
									* (cosU2 * sinLambda)
									+ (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
									* (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
								);
			if (sinSigma == 0) 
			{
				return 0;
			}

			cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
			sigma = Math.atan2(sinSigma, cosSigma);

			var sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
			cosSqAlpha = 1 - sinAlpha * sinAlpha;
			cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

			var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
			lambdaP = lambda;
			lambda = 	L + (1 - C) * f * sinAlpha	
						* 	(sigma + C * sinSigma	
								* 	(cos2SigmaM + C * cosSigma
										* 	(-1 + 2 * cos2SigmaM * cos2SigmaM)
									)
							);
		
		} while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

		if (iterLimit == 0) 
		{
			return 0;
		}

		var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
		var A = 1 + uSq / 16384* (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
		var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
		var deltaSigma = 
					B * sinSigma
						* (cos2SigmaM + B / 4
							* (cosSigma 
								* (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM
									* (-3 + 4 * sinSigma * sinSigma)
										* (-3 + 4 * cos2SigmaM * cos2SigmaM)));
		
		var s = b * A * (sigma - deltaSigma);
		
		return s;
	}


}