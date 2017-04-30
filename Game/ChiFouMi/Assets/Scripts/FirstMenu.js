var Register : GameObject;
var Login : GameObject;

function Start () {
	yield WaitForSeconds (0.2);

	Register = GameObject.Find("Register");
	Login = GameObject.Find("Login");
}

function Update () {
}

function OnMouseDown() {
	Debug.Log(gameObject);
	if (gameObject == Register) {
		Debug.Log("Register");
		SceneManagement.SceneManager.LoadScene("SceneRegister");
		return 0;
	}
	else if (gameObject == Login) {
		Debug.Log("Login");
		SceneManagement.SceneManager.LoadScene("SceneLogin");
		return 0;
	}
	return 1;
}
