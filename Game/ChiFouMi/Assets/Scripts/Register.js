#pragma strict

import UnityEngine.UI;

var RegisterButton : GameObject;

var username : String;
var password : String;
var passwordverif : String;

var nameInput : UnityEngine.UI.InputField;
var passwordInput : UnityEngine.UI.InputField;
var passwordVerifInput : UnityEngine.UI.InputField;

function Start () {
	RegisterButton = GameObject.Find("Register");
}

function Update () {
	username = nameInput.text;
	password = passwordInput.text;
	passwordverif = passwordVerifInput.text;
}

function OnMouseDown() {
	Debug.Log(gameObject);
	if (gameObject == RegisterButton) {
		Debug.Log("Register");
		Debug.Log(username);
		Debug.Log(password);
		Debug.Log(passwordverif);

		SceneManagement.SceneManager.LoadScene("SceneMenu");
		return 0;
	}
	return 1;
}
