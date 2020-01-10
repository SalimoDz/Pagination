```javascript

$(document).ready(function ($) {

var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

var url = $(location).attr('href'),
		parts = url.split("/"),
		last_part = parts[parts.length-1]; // TO GET LAST PART OF THE URI

	last_part = last_part.replace("#", ""); // TO REMOVE # FROM THE WORD

	function swaparray(input, index_A, index_B) { // swap values of array

		var temp = input[index_A];

		input[index_A] = input[index_B];
		input[index_B] = temp;
	}

	function countelements(thearray, index) { // Count elements remaining from specific index to the end

		var count = 0;

		for(var i = index+1; i < thearray.length; i++){

				count = count + 1;
		}

		return count;
	}

	var f = 0;

	function forloopEQ(keystart,keycondition,arraytest)
	{
		if(arraytest.length > 4) {

			for (f = keystart; f <= keycondition; f++) {

				if (arraytest[f] == "...") {

					// TO DISABLE HREF OF THE 3 POINTS IF CLICKED
					$('#lastp').before('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + arraytest[f] + '</a></li>');

				} else {

					// TO ADD PAGES IN ORDER WITH THEIR NUMBERS RESPECTIVELY
					$('#lastp').before('<li class="page-item"><a class="page-link" href=' + baseUrl + "/Tuto/page" + arraytest[f] + '>' + arraytest[f] + '</a></li>');
				}
			}
		}
		else
		{
			// THIS IS A SPECIAL CASE WHEN THE LENGTH OF THE ARRAY IS BELOW 4 ELEMENTS EXP: ['...',2,3,4]
			keystart = 1;
			keycondition = itemsPage.length-1;

			for (f = keystart; f <= keycondition; f++) {

					// TO ADD PAGES IN ORDER WITH THEIR NUMBERS RESPECTIVELY
					$('#lastp').before('<li class="page-item"><a class="page-link" href=' + baseUrl + "/Tuto/page" + arraytest[f] + '>' + arraytest[f] + '</a></li>');

			}
		}

	}

	function forloopNOTEQ(keystart,keycondition,arraytest)
	{

		for (f = keystart; f < keycondition; f++) {

			if (arraytest[f] == "...") {

				$('#lastp').before('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + arraytest[f] + '</a></li>');

			} else {

				$('#lastp').before('<li class="page-item"><a class="page-link" href=' + baseUrl + "/Tuto/page" + arraytest[f] + '>' + arraytest[f] + '</a></li>');
			}

		}

	}

	var itemsPage = ["...",2,3,4,"...",5,6,7,"...",8]; // MANUAL ARRAY, YOU ADD VALUES TO IT DEPENDING ON YOUR NEEDS
																// THIS ARRAY WORK WITH 3 PAGES THEN 3 POINTS + 1 PAGE
																// EXP : ["...",1,2,3,"...",4] WHEN YOU ADD "..." SEPARATOR IN THE END, IT IS MANDATORY TO ADD A PAGE WITH IT IN ORDER TO WORK PROPERLY
																// THIS ARRAY WORK WITH 3 STEPS
	var i = 0;

	var lastitemindex = itemsPage.length - 1; // TO GET THE LAST INDEX OF ARRAY


	if(last_part == "FileSharing")
	{

		forloopEQ(1,4,itemsPage); // THE FIRST PAGE
	}

	else { // LAST PART OF URI CONTAIN PAGES NUMBERS

		i = last_part.substr(4); // TO GET PAGE NUMBER FROM THE URI

		i = $.inArray( parseInt(i), itemsPage ); // TO GET THE SPECIFIC INDEX OF A GIVEN ELEMENT IN AN ARRAY

		if(i == -1) // FIRST CONDITION -- LAST PAGE NOT INCLUDED IN THE ARRAY, (FIRST AND LAST PAGE ARE TREATED SEPARATELY FROM THE ARRAY)
		{

			if (itemsPage[lastitemindex-3] == "...") // THE 3 POINTS VALUE IS IN 3 STEPS BACKWARDS -- MEANING THE PAGES ARE IN ORDER
			{

				forloopEQ(lastitemindex-3,lastitemindex,itemsPage); // TO SHOW THE REST OF THE PAGES

			} // END IF

			else
			{

				if(itemsPage.length > 4 ) {

					var indexofitem = itemsPage.indexOf("...", lastitemindex - 3); // GET INDEX OF SPECIFIC ELEMENT FROM SPECIFIC START POINT

					if (countelements(itemsPage, indexofitem) == 1) // COUNT ELEMENTS AND SWAP 2 STEPS BACKWARDS TO MATCH THE PAGES ORDER
					{
						swaparray(itemsPage, indexofitem, indexofitem - 1);
						swaparray(itemsPage, indexofitem - 1, indexofitem - 2);

					} else if (countelements(itemsPage, indexofitem) == 2) // COUNT ELEMENTS AND SWAP 1 STEP BACKWARDS TO MATCH THE PAGES ORDER
					{
						swaparray(itemsPage, indexofitem, indexofitem - 1);
					}

					forloopEQ(lastitemindex - 3,lastitemindex,itemsPage); // SHOW THE LAST PART OF THE PAGES
				}
				else
				{
					forloopEQ(1,lastitemindex,itemsPage); // SHOW THE PAGES FROM THE START
				}

			}

		}
		else if (itemsPage[i + 1] == "...") { // THE SECOND CONDITION TO TEST IN THE ARRAY

			swaparray(itemsPage, i + 1, i + 2); // TO SWAP THE NEXT 3 POINTS VALUE
			swaparray(itemsPage, i - 3, i - 2); // TO SWAP THE PREVIOUS 3 POINTS VALUE

			if (itemsPage[lastitemindex] == "...") // THE 3 POINTS ARE IN THE LAST POSITION AFTER ARRAY SWAP
			{

				forloopNOTEQ(lastitemindex - 4 , lastitemindex,itemsPage); // NOT EQ -> (< STRICT) IN FOR LOOP


			} else { // THE 3 POINTS ARE NOT IN THE LAST POSITION AFTER ARRAY SWAP

				forloopEQ(i-2,i+2,itemsPage);

			}


		} else if (itemsPage[i - 1] == "...") { // THE THIRD CONDITION TO TEST IN THE ARRAY

			if (itemsPage[i-2] != null) { // TO TEST IF 3 POINTS ARE NOT IN THE BEGINNING

				if(countelements(itemsPage,i) > 3) // TO CHECK IF THE WE HAVE 3 PAGES AHEAD TO SWAP IN ORDER
				{
					swaparray(itemsPage, i - 1, i - 2);
					swaparray(itemsPage, i + 3, i + 2);

					forloopEQ(i-2,i+2,itemsPage);


				} // END IF OF COUNT ELEMENTS

				else // ELSE OF COUNT ELEMENTS
				{


					switch(true) {

						case (countelements(itemsPage,i) == 0):


								swaparray(itemsPage, i - 1, i - 2);
								swaparray(itemsPage, i - 2, i - 3);

								forloopEQ(i-3,lastitemindex,itemsPage);

						break;

						case (countelements(itemsPage,i) == 1 || countelements(itemsPage,i) == 2):

								swaparray(itemsPage, i - 1, i - 2);

								forloopEQ(i-2,lastitemindex,itemsPage);

							break;

						default:
							// Nothing
					}

				}

			} else { // THE 3 POINTS ARE IN THE BEGINNING

				forloopEQ(1,4,itemsPage);

			}

		} else  // THE LAST CONDITION TO TEST IN THE ARRAY
		{

			if (itemsPage[i - 2] == "..." && itemsPage[i - 3] != null) { // TO CHECK IF THE 3 POINTS ARE NOT IN THE START OF THE ARRAY

				if(countelements(itemsPage,i) == 0 ) // COUNT ELEMENTS AND SWAP 1 STEP BACKWARDS TO MATCH THE PAGES ORDER
					{

						swaparray(itemsPage, i-2, i-3);

						forloopEQ(i-3,lastitemindex,itemsPage);

					}
				else   // ELEMENTS REMAINING ARE > 0
					{

					forloopEQ(i-2,i+1,itemsPage);

					}

			} else if (itemsPage[i - 2] == "..." && itemsPage[i - 3] == null) { // TO CHECK IF THE 3 POINTS ARE IN THE START OF THE ARRAY

				forloopEQ(1,4,itemsPage);

			} // END ELSE IF
			else
			{

				if (itemsPage[i-3] == "...") // THE 3 POINTS VALUE IS IN 3 STEPS BACKWARDS -- MEANING THE PAGES ARE IN ORDER
				{

					forloopEQ(i-3,i,itemsPage);

				} // END IF
				else if(itemsPage[i-2] == "...") // THE 3 POINTS VALUE IS IN 3 STEPS BACKWARDS -- NEED 1 SWAP
				{
					swaparray(itemsPage, i-2, i-3);

					forloopEQ(i-3,i,itemsPage);
				}

			}

		} // END OF THE LAST CONDITION

		var getpagenum = last_part.substr(4); // TO GET PAGE NUMBER

		$('.pagination').find($('.active')).removeClass('active');

		if(last_part == "LastPage") {

			$('.pagination').find($("a[href$=" + last_part + "]")).closest('li').addClass('active'); // TO SET THE CURRENT PAGE TO ACTIVE PAGE AND HIGHLIGHT IT
		}
		else
		{
			$('.pagination').find($("a[href$=page" + getpagenum + "]")).closest('li').addClass('active'); 
		}

	} // END OF ELSE STATEMENT (LAST_PART = PAGES NUMBER)
  
  });

```
