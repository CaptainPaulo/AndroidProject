#pragma strict

var singlePlayer : GameObject;
var multiPlayer : GameObject;
var rules : GameObject;
var option : GameObject;
var disconnect : GameObject;
var varlaunch : boolean;

function Start () {
	singlePlayer = GameObject.Find("SinglePlayer");
	multiPlayer = GameObject.Find("MultiPlayer");
	rules = GameObject.Find("Rules");
	option = GameObject.Find("Options");
	disconnect = GameObject.Find("Disconnect");
	varlaunch = false;
	yield WaitForSeconds (0.4);
	varlaunch = true;
}

function Update () {
}

function OnMouseDown() {
	Debug.Log(gameObject);
	if (gameObject == singlePlayer) {
		Debug.Log("Single");
		SceneManagement.SceneManager.LoadScene("SceneSinglePlayer");
		return 0;
	}
	else if (gameObject == multiPlayer) {
		Debug.Log("Multi");
		SceneManagement.SceneManager.LoadScene("SceneMultiPlayer");
		return 0;
	}
	else if (gameObject == rules) {
		Debug.Log("Rules");
		SceneManagement.SceneManager.LoadScene("SceneRules");
		return 0;
	}
	else if (gameObject == option) {
		Debug.Log("Option");
		SceneManagement.SceneManager.LoadScene("SceneOptions");
		return 0;
	}
	else if (gameObject == disconnect && varlaunch == true) {
		Application.Quit();
		Debug.Log("Disconnect");
		return 0;
	}
	return 1;
}
