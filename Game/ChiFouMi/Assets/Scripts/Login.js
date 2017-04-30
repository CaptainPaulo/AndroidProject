#pragma strict

import UnityEngine.UI;

var LoginButton : GameObject;

var username : String;
var password : String;

var nameInput : UnityEngine.UI.InputField;
var passwordInput : UnityEngine.UI.InputField;

function Start () {
	yield WaitForSeconds (0.2);
	LoginButton = GameObject.Find("Login");
}

function Update () {
	username = nameInput.text;
	password = passwordInput.text;
}

function OnMouseDown() {
	Debug.Log(gameObject);
	if (gameObject == LoginButton) {
		Debug.Log("Login");
		Debug.Log(username);
		Debug.Log(password);

		SceneManagement.SceneManager.LoadScene("SceneMenu");
		return 0;
	}
	return 1;
}
