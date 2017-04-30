#pragma strict

public var fadeSpeed : float = 1.5f;            // Speed that the screen fades to and from black.


private var sceneStarting : boolean = true;     // Whether or not the scene is still fading in.
private var sceneEnding : boolean = false;     // Whether or not the scene is still fading in.

var RedBackground : GameObject;
var BlackBackground : GameObject;
var PurpleBackground : GameObject;
var BlueBackground : GameObject;

private var background : String;
private var sound : int;

function Awake ()
{
    // Set the texture so that it is the the size of the screen and covers it.
    GetComponent.<GUITexture>().pixelInset = new Rect(0f, 0f, Screen.width, Screen.height);
}

function Start()
{

	RedBackground = GameObject.Find("backgroundred");
	BlackBackground = GameObject.Find("backgroundblack");
	PurpleBackground = GameObject.Find("backgroundpurple");
	BlueBackground = GameObject.Find("backgroundblue");

	background = PlayerPrefs.GetString("Background");
	sound = PlayerPrefs.GetInt("sound");

	if (background == "Red") {
		RedBackground.GetComponent.<Renderer>().enabled = true;
		BlackBackground.GetComponent.<Renderer>().enabled = false;
		PurpleBackground.GetComponent.<Renderer>().enabled = false;
		BlueBackground.GetComponent.<Renderer>().enabled = false;
	}
	else if (background == "Black") {
		RedBackground.GetComponent.<Renderer>().enabled = false;
		BlackBackground.GetComponent.<Renderer>().enabled = true;
		PurpleBackground.GetComponent.<Renderer>().enabled = false;
		BlueBackground.GetComponent.<Renderer>().enabled = false;
	}
	else if (background == "Purple") {
		RedBackground.GetComponent.<Renderer>().enabled = false;
		BlackBackground.GetComponent.<Renderer>().enabled = false;
		PurpleBackground.GetComponent.<Renderer>().enabled = true;
		BlueBackground.GetComponent.<Renderer>().enabled = false;
	}
	else if (background == "Blue") {
		RedBackground.GetComponent.<Renderer>().enabled = false;
		BlackBackground.GetComponent.<Renderer>().enabled = false;
		PurpleBackground.GetComponent.<Renderer>().enabled = false;
		BlueBackground.GetComponent.<Renderer>().enabled = true;
	}

	Debug.Log(sound);

	if (sound == 0) {
		AudioListener.volume = 0.0;
	}
	else
	{
		AudioListener.volume = 1.0;
	}

	//backgroundblue = GameObject.Find("backgroundblueStart");


}

function Update ()
{
	if(sceneStarting)
	{
			// ... call the StartScene function.
			StartScene();
		}
}

function FadeToClear ()
{
    // Lerp the colour of the texture between itself and transparent.
    GetComponent.<GUITexture>().color = Color.Lerp(GetComponent.<GUITexture>().color, Color.clear, fadeSpeed * Time.deltaTime);
}


function FadeToBlack ()
{
    // Lerp the colour of the texture between itself and black.
    GetComponent.<GUITexture>().color = Color.Lerp(GetComponent.<GUITexture>().color, Color.black, fadeSpeed * Time.deltaTime);
}


function StartScene ()
{
    // Fade the texture to clear.
    FadeToClear();

    // If the texture is almost clear...
    if(GetComponent.<GUITexture>().color.a <= 0.01f)
    {
        // ... set the colour to clear and disable the GUITexture.
        GetComponent.<GUITexture>().color = Color.clear;
        GetComponent.<GUITexture>().enabled = false;

        // The scene is no longer starting.
        sceneStarting = false;
//				yield WaitForSeconds (2);
				SceneManagement.SceneManager.LoadScene("SceneMenu");
    }
}
//
//
// public function EndScene ()
// {
//     // Make sure the texture is enabled.
//     GetComponent.<GUITexture>().enabled = true;
//
//     // Start fading towards black.
//     FadeToBlack();
//
//     // If the screen is almost black...
//     if(GetComponent.<GUITexture>().color.a >= 0.80f){
// 			Debug.Log("Launch");
// 			sceneEnding = false;
// 			SceneManagement.SceneManager.LoadScene("SceneFirstMenu");
// 			Destroy(backgroundblue);
// 		}
//
// }


// ﻿#pragma strict
//
// public var fadeSpeed : float = 1.5f;
// var back : GameObject;
//
// function Start () {
// //	yield WaitForSeconds (3);
// 	back = GameObject.Find("BackGround");
// 	FadeToBlack();
// //	SceneManagement.SceneManager.LoadScene("SceneFirstMenu");
// }
//
// function Update () {
//
// }
//
// function FadeToBlack ()
// {
// 		// Lerp the colour of the texture between itself and black.
// 		back.GetComponent.<GUITexture>().color = Color.Lerp(GetComponent.<GUITexture>().color, Color.black, fadeSpeed * Time.deltaTime);
// }
//
