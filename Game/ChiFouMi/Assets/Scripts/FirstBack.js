#pragma strict

var Back : GameObject;

function Start () {
	yield WaitForSeconds (0.2);
	Back = GameObject.Find("Menu");
}

function Update () {

}

function OnMouseDown() {
	Debug.Log(gameObject);
	if (gameObject == Back) {
		Debug.Log(gameObject);
		SceneManagement.SceneManager.LoadScene("SceneFirstMenu");
		return;
	}
}
