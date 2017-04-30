#pragma strict

private var music : int;

var RedBackground : GameObject;
var BlackBackground : GameObject;
var PurpleBackground : GameObject;
var BlueBackground : GameObject;
var LittleRedBackground : GameObject;
var LittleBlackBackground : GameObject;
var LittlePurpleBackground : GameObject;
var LittleBlueBackground : GameObject;
var Sound : GameObject;
var launch : boolean;

function Start () {


	LittleRedBackground = GameObject.Find("littlebackgroundred");
	LittleBlackBackground = GameObject.Find("littlebackgroundblack");
	LittlePurpleBackground = GameObject.Find("littlebackgroundpurple");
	LittleBlueBackground = GameObject.Find("littlebackgroundblue");
	RedBackground = GameObject.Find("backgroundred");
	BlackBackground = GameObject.Find("backgroundblack");
	PurpleBackground = GameObject.Find("backgroundpurple");
	BlueBackground = GameObject.Find("backgroundblue");
	Sound = GameObject.Find("Option2");

	music = PlayerPrefs.GetInt("sound");
	Debug.Log(music);

	if (AudioListener.volume == 0.0) {
		Sound.GetComponent(UI.Text).text = "Music :\nOff";
	}
	else
	{
		Sound.GetComponent(UI.Text).text = "Music :\nOn";
	}

	launch = false;
	yield WaitForSeconds (0.4);
	launch = true;
}

function Update () {

}

function OnMouseDown() {
	Debug.Log(gameObject);
	if (gameObject == LittleRedBackground) {
		RedBackground.GetComponent.<Renderer>().enabled = true;
		BlackBackground.GetComponent.<Renderer>().enabled = false;
		PurpleBackground.GetComponent.<Renderer>().enabled = false;
		BlueBackground.GetComponent.<Renderer>().enabled = false;

		PlayerPrefs.SetString("Background", "Red");

		Debug.Log("Red");
		return 0;
	}
	else if (gameObject == LittleBlackBackground) {
		RedBackground.GetComponent.<Renderer>().enabled = false;
		BlackBackground.GetComponent.<Renderer>().enabled = true;
		PurpleBackground.GetComponent.<Renderer>().enabled = false;
		BlueBackground.GetComponent.<Renderer>().enabled = false;

		PlayerPrefs.SetString("Background", "Black");

		Debug.Log("Black");
		return 0;
	}
	else if (gameObject == LittlePurpleBackground) {
		RedBackground.GetComponent.<Renderer>().enabled = false;
		BlackBackground.GetComponent.<Renderer>().enabled = false;
		PurpleBackground.GetComponent.<Renderer>().enabled = true;
		BlueBackground.GetComponent.<Renderer>().enabled = false;

		PlayerPrefs.SetString("Background", "Purple");

		Debug.Log("Purple");
		return 0;
	}
	else if (gameObject == LittleBlueBackground) {
		RedBackground.GetComponent.<Renderer>().enabled = false;
		BlackBackground.GetComponent.<Renderer>().enabled = false;
		PurpleBackground.GetComponent.<Renderer>().enabled = false;
		BlueBackground.GetComponent.<Renderer>().enabled = true;

		PlayerPrefs.SetString("Background", "Blue");

		Debug.Log("Blue");
		return 0;
	}
	else if (gameObject == Sound && launch == true) {
		Debug.Log("Sound");
		if (AudioListener.volume == 0.0) {
			AudioListener.volume = 1.0;
			Sound.GetComponent(UI.Text).text = "Music :\nOn";
			PlayerPrefs.SetInt("sound", 1);
		}
		else
		{
			AudioListener.volume = 0.0;
			Sound.GetComponent(UI.Text).text = "Music :\nOff";
			PlayerPrefs.SetInt("sound", 0);
		}
		return 0;
	}
	return 1;
}
