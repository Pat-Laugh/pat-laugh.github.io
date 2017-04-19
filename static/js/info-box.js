//Copyright 2017 Patrick Laughrea
var LOCAL_STORAGE = storageAvailable("localStorage");
var DAY_MILLIS = 3600 * 24 * 1000;
var ID_CONSTRUCTION_BOX = "construction-box";
var ID_LANGUAGE_BOX = "language-box";

window.onload = function()
{
	if (LOCAL_STORAGE)
	{
		if (!localStorage.getItem(ID_CONSTRUCTION_BOX) || daysSinceClosed(ID_CONSTRUCTION_BOX) >= 1)
			showBox(ID_CONSTRUCTION_BOX);
		if (!localStorage.getItem(ID_LANGUAGE_BOX) || resetOnceConstructionDone(ID_LANGUAGE_BOX))
			showBox(ID_LANGUAGE_BOX);
	}
	else
	{
		showBox(ID_CONSTRUCTION_BOX);
		showBox(ID_LANGUAGE_BOX);
	}
}

function daysSinceClosed(boxId)
{
	return (Date.now() - localStorage[boxId]) / DAY_MILLIS;
}

function closeBox(boxId)
{
	hideBox(boxId);
	if (LOCAL_STORAGE)
		localStorage.setItem(boxId, Date.now());
}

function showBox(boxId)
{
	document.getElementById(boxId).style.display = "block";
}

function hideBox(boxId)
{
	document.getElementById(boxId).style.display = "none";
}

function resetOnceConstructionDone(boxId)
{
	var consDone = false;
	var dateDone = new Date(2017, 00, 15).getTime();
	return consDone && localStorage[boxId] < dateDone;
}

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type)
{
	try
	{
		var storage = window[type], x = "____";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e)
	{
		return false;
	}
}