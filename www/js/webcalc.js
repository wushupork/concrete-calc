$(document).ready(function() {
	var bagtruck = 0;
	var side1unit = 0;
	var side2unit = 0;
	var side3unit = 0;
	var thickunit = 0;
	var side1 = 0;
	var side2 = 0;
	var side3 = 0;
	var thickval = 0;
	var volume = 0;
	
	$('tr[name="side2row"]').hide();
	$('tr[name="side3row"]').hide();
	$('tr[name="thickrow"]').show();
	$('select[name="shape"]').change( function(){
		if($('select[name="shape"]').val()=="Circle"){
			$('span[name="side1text"]').text("Radius: ");
			$('tr[name="side2row"]').hide();
			$('tr[name="side3row"]').hide();			
		} else if ($('select[name="shape"]').val()=="Rectangle"){
			$('span[name="side1text"]').text("Length: ");
			$('tr[name="side2row"]').show();
			$('span[name="side2text"]').text("Width: ");
			$('tr[name="side3row"]').hide();
		} else if($('select[name="shape"]').val()=="Square"){
			$('span[name="side1text"]').text("Side length: ");
			$('tr[name="side2row"]').hide();
			$('tr[name="side3row"]').hide();
		} else if($('select[name="shape"]').val()=="Trapezoid"){
			$('span[name="side1text"]').text("Bottom Length: ");
			$('tr[name="side2row"]').show();
			$('span[name="side2text"]').text("Top Length: ");
			$('tr[name="side3row"]').show();
			$('span[name="side3text"]').text("Height: ");
		} else if($('select[name="shape"]').val()=="Triangle"){
			$('span[name="side1text"]').text("Base Length: ");
			$('tr[name="side2row"]').show();
			$('span[name="side2text"]').text("Height: ");
			$('tr[name="side3row"]').hide();
		}
	});
	$('select[name="unit"]').change( function(){
		if($('select[name="unit"]').val()=="Bag"){
			$('span[name="concreqtext"]').text("Concrete Required (bags)");			
		} else if ($('select[name="unit"]').val()=="Truck"){
			$('span[name="concreqtext"]').text("Concrete Required (cu. yd.)");
		}
	});
	$('input[name="calculate"]').click(function(){
		bagtruck = $('select[name="unit"]').val() == "Bag" ? 0 : 1;
		if($('select[name="shape"]').val()=="Circle"){
			side1unit = $('select[name="side1unit"]').val() == "feet" ? 0 : 1;
			side1 = $('input[name="side1"]').val();
			thickunit = $('select[name="thickunit"]').val() == "feet" ? 0 : 1;
			thickval = $('input[name="thickness"]').val();
			volume = CalcCircleVol(side1,thickval,side1unit,thickunit);
			$('span[name="areavalue"]').text(CalcCircleArea(side1,side1unit));
			$('span[name="volvalue"]').text((Math.round(volume * 100) / 100).toFixed(2));
			$('span[name="concreqvalue"]').text(CalcRequiredConcrete(volume,bagtruck));
		} else if ($('select[name="shape"]').val()=="Rectangle"){
			side1unit = $('select[name="side1unit"]').val() == "feet" ? 0 : 1;
			side1 = $('input[name="side1"]').val();
			side2unit = $('select[name="side2unit"]').val() == "feet" ? 0 : 1;
			side2 = $('input[name="side2"]').val();
			thickunit = $('select[name="thickunit"]').val() == "feet" ? 0 : 1;
			thickval = $('input[name="thickness"]').val();
			volume = CalcRectangleVol(side1, side2, thickval, thickunit, side1unit, side2unit);
			$('span[name="areavalue"]').text(CalcRectangleArea(side1, side2, side1unit, side2unit));
			$('span[name="volvalue"]').text((Math.round(volume * 100) / 100).toFixed(2));
			$('span[name="concreqvalue"]').text(CalcRequiredConcrete(volume,bagtruck));
		} else if($('select[name="shape"]').val()=="Square"){
			side1unit = $('select[name="side1unit"]').val() == "feet" ? 0 : 1;
			side1 = $('input[name="side1"]').val();
			thickunit = $('select[name="thickunit"]').val() == "feet" ? 0 : 1;
			thickval = $('input[name="thickness"]').val();
			volume = CalcSquareVol(side1,thickval,side1unit,thickunit);
			$('span[name="areavalue"]').text(CalcSquareArea(side1,side1unit));
			$('span[name="volvalue"]').text((Math.round(volume * 100) / 100).toFixed(2));
			$('span[name="concreqvalue"]').text(CalcRequiredConcrete(volume,bagtruck));
		} else if($('select[name="shape"]').val()=="Trapezoid"){
			side1unit = $('select[name="side1unit"]').val() == "feet" ? 0 : 1;
			side1 = $('input[name="side1"]').val();
			side2unit = $('select[name="side2unit"]').val() == "feet" ? 0 : 1;
			side2 = $('input[name="side2"]').val();
			side3unit = $('select[name="side3unit"]').val() == "feet" ? 0 : 1;
			side3 = $('input[name="side3"]').val();
			thickunit = $('select[name="thickunit"]').val() == "feet" ? 0 : 1;
			thickval = $('input[name="thickness"]').val();
			volume = CalcTrapezoidVol(side1, side2, side3, thickval, thickunit, side3unit, side1unit, side2unit);
			$('span[name="areavalue"]').text(CalcTrapezoidArea(side1, side2, side3, side3unit, side1unit, side2unit));
			$('span[name="volvalue"]').text((Math.round(volume * 100) / 100).toFixed(2));
			$('span[name="concreqvalue"]').text(CalcRequiredConcrete(volume,bagtruck));
		} else if($('select[name="shape"]').val()=="Triangle"){
			side1unit = $('select[name="side1unit"]').val() == "feet" ? 0 : 1;
			side1 = $('input[name="side1"]').val();
			side2unit = $('select[name="side2unit"]').val() == "feet" ? 0 : 1;
			side2 = $('input[name="side2"]').val();
			thickunit = $('select[name="thickunit"]').val() == "feet" ? 0 : 1;
			thickval = $('input[name="thickness"]').val();
			volume = CalcTriangleVol(side1, side2, thickval, side1unit, side2unit, thickunit);
			$('span[name="areavalue"]').text(CalcTriangleArea(side1, side2, side1unit, side2unit));
			$('span[name="volvalue"]').text((Math.round(volume * 100) / 100).toFixed(2));
			$('span[name="concreqvalue"]').text(CalcRequiredConcrete(volume,bagtruck));
		}	
	});
		
	function CalcCircleArea(radius, radinch)
	{
		radius = radinch == 1 ? radius : radius * 12;
		var area = Math.PI * radius * radius / 144;
		return (Math.round(area * 100) / 100).toFixed(2);
		//return 0;
	}

	function CalcCircleVol(radius, thickness, radinch, thickinch)
	{
		radius = radinch == 1 ? radius : radius * 12;
		thickness = thickinch == 1 ? thickness : thickness * 12; 
		return (Math.PI * radius * radius * thickness)/1728; 
		//return 0;
	}

	function CalcSquareArea(side, sideinch)
	{
		side = sideinch == 1 ? side : side * 12;
		var area = (side * side) / 144;
		return (Math.round(area * 100) / 100).toFixed(2);
		//return 0;
	}

	function CalcSquareVol(side, thickness, sideinch, thickinch)
	{
		side = sideinch == 1 ? side : side * 12;
		thickness = thickinch == 1 ? thickness : thickness * 12;
		return (side * side * thickness) / 1728;
		//return 0;
	}

	function CalcRectangleArea(length, width, lengthinch, widthinch)
	{
		length = lengthinch == 1 ? length : length * 12;
		width = widthinch == 1 ? width : width * 12;
		var area = (length * width) / 144;
		return (Math.round(area * 100) / 100).toFixed(2);
		//return 0;
	}

	function CalcRectangleVol(length, width, thickness, thickinch, lengthinch, widthinch)
	{
		length = lengthinch == 1 ? length : length * 12;
		width = widthinch == 1 ? width : width * 12;
		thickness = thickinch == 1 ? thickness : thickness * 12;
		return (length * width * thickness) / 1728;
		//return 0;
	}

	function CalcTrapezoidArea(side1, side2, height, heightinch, side1inch, side2inch)
	{
		side1 = side1inch == 1 ? side1 : side1 * 12;
		side2 = side1inch == 1 ? side2 : side2 * 12;
		height = heightinch == 1 ? height : height * 12;
		var area = (((side1 + side2) * height) / 2) / 144;
		return (Math.round(area * 100) / 100).toFixed(2);
		//return 0;
	}

	function CalcTrapezoidVol(side1, side2, height, thickness, thickinch, heightinch, side1inch, side2inch)
	{
		side1 = side1inch == 1 ? side1 : side1 * 12;
		side2 = side1inch == 1 ? side2 : side2 * 12;
		height = heightinch == 1 ? height : height * 12;
		thickness = thickinch == 1 ? thickness : thickness * 12;
		return ((((side1 + side2) * height) / 2) * thickness) / 1728;
		//return 0;
	}

	function CalcTriangleArea(bottom, height, botinch, heightinch)
	{
		bottom = botinch == 1 ? bottom : bottom * 12;
		height = heightinch == 1 ? height : height * 12;
		var area = ((bottom * height)/2) / 144;
		return (Math.round(area * 100) / 100).toFixed(2);
		//return 0;
	}

	function CalcTriangleVol(bottom, height, thickness, botinch, heightinch, thickinch)
	{
		bottom = botinch == 1 ? bottom : bottom * 12;
		height = heightinch == 1 ? height : height * 12;
		thickness = thickinch == 1 ? thickness : thickness * 12;
		return (((bottom * height) / 2) * thickness) / 1728;
		//return 0;
	}

	function CalcRequiredConcrete(volume, bagtruck)
	{
		//return bagtruck == 1 ? Math.Round(((volume/27)+.25) * 4, MidpointRounding.AwayFromZero) / 4 : Math.Round((volume / 0.67), 0, MidpointRounding.AwayFromZero);
		if (bagtruck == 1)
		{
			return (Math.ceil(volume/27 * 4) / 4).toFixed(2);
		}
		else
		{
			return Math.ceil(volume/0.67);                
		}
		//return 0;
	}



});