//Copyright 2017 Patrick Laughrea
var LOCAL_STORAGE = storageAvailable("localStorage");
var DAY_MILLIS = 3600 * 24 * 1000;
var ID_LANGUAGE_BOX = "language-box";

window.onload = function()
{
	if (!LOCAL_STORAGE || !localStorage.getItem(ID_LANGUAGE_BOX) || daysSinceClosed(ID_LANGUAGE_BOX) >= 90)
		showBox(ID_LANGUAGE_BOX);
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

function setDisplay(id, value)
{
	document.getElementById(id).style.display = value;
}

function setDisplayBox(id, value)
{
	setDisplay(id, value);
	setDisplay(id + "-m1", value);
	setDisplay(id + "-m2", value);
}

function showBox(boxId)
{
	setDisplayBox(boxId, "block");
}

function hideBox(boxId)
{
	setDisplayBox(boxId, "none");
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