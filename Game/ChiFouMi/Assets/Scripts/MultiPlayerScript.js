var platform : RuntimePlatform = Application.platform;

var scoreText : GameObject;
var win: int;

var winImage: GameObject;
var winText: UI.Text;
var servermessage: UI.Text;
var textPlayAgain: UI.Text;

var playAgain: GameObject;
var exit: GameObject;

var ennemy : int;

var menu : GameObject;
var choose : GameObject;

var bigHand :GameObject;
var ennemyBigHand :GameObject;

var handRock : GameObject;
var handPaper : GameObject;
var handScissors : GameObject;

var bigHandRock : GameObject;
var bigHandPaper : GameObject;
var bigHandScissors : GameObject;

var ennemyBigHandRock : GameObject;
var ennemyBigHandPaper : GameObject;
var ennemyBigHandScissors : GameObject;

static var scoreNumber : int;
var player1Play : boolean;
var player2Play : boolean;

var message : String;
var oldmessage : String;

private var pos : float;

static var socket : WebSocket;

static var queue = 0;

function Start () {

	scoreText = GameObject.Find("Score");

	player1Play = false;
	player2Play = false;

	menu = GameObject.Find("Menu");
	choose = GameObject.Find("Choose");

	playAgain = GameObject.Find("PlayAgain");
	exit = GameObject.Find("Exit");

	handRock = GameObject.Find("handRock");
	handPaper = GameObject.Find("handPaper");
	handScissors = GameObject.Find("handScissors");

	bigHandRock = GameObject.Find("bigHandRock");
	bigHandPaper = GameObject.Find("bigHandPaper");
	bigHandScissors = GameObject.Find("bigHandScissors");

	ennemyBigHand = GameObject.Find("ennemyBigHand");

	ennemyBigHandRock = GameObject.Find("ennemyBigHandRock");
	ennemyBigHandPaper = GameObject.Find("ennemyBigHandPaper");
	ennemyBigHandScissors = GameObject.Find("ennemyBigHandScissors");

	scoreText.GetComponent(UI.Text).text = "";
	choose.GetComponent(UI.Text).text = "";
	handPaper.GetComponent.<Renderer>().enabled = false;
	handScissors.GetComponent.<Renderer>().enabled = false;
	handRock.GetComponent.<Renderer>().enabled = false;

	winImage = GameObject.Find("winner");

	ennemyBigHandRock.GetComponent.<Renderer>().enabled = false;
	ennemyBigHandPaper.GetComponent.<Renderer>().enabled = false;
	ennemyBigHandScissors.GetComponent.<Renderer>().enabled = false;

	bigHandRock.GetComponent.<Renderer>().enabled = false;
	bigHandPaper.GetComponent.<Renderer>().enabled = false;
	bigHandScissors.GetComponent.<Renderer>().enabled = false;

	winImage.GetComponent.<Renderer>().enabled = true;
	servermessage.text = "Connecting to server...";

	if (queue == 0)
	{

		Debug.Log("New Connection");
		socket = new WebSocket("ws://192.168.43.248:8080");

		socket.Connect();

		socket.Send('{"request": "register"}');
		Debug.Log("Send: request register");
	}
	else {
		Debug.Log("Already connected");
	}

	socket.OnMessage += function(sender, e) {
		message = e.Data;
	};
}

function Update () {

	if(platform == RuntimePlatform.Android || platform == RuntimePlatform.IPhonePlayer){
			if(Input.touchCount > 0) {
					if(Input.GetTouch(0).phase == TouchPhase.Began){
							checkTouch(Input.GetTouch(0).position);
					}
			}
	} else if(platform == RuntimePlatform.WindowsEditor){
			if(Input.GetMouseButtonDown(0)) {
					checkTouch(Input.mousePosition);
			}
	}

	if(message.Contains('Waiting'))
	{
		winImage.GetComponent.<Renderer>().enabled = true;
		servermessage.text = "Waiting for\nanother player...";
	}

	if(message.Contains('Lobby destroyed.'))
	{
		lobbyDestroyed();
		return;
	 }
	// else if(message.Contains('Lobby left.'))
	// {
	// 	lobbyLeft();
	// 	return;
	// }

	if(message.Contains('"Game start!"') && player1Play == false && player2Play == false)
	{
		winImage.GetComponent.<Renderer>().enabled = false;
		servermessage.text = "";

		scoreText.GetComponent(UI.Text).text = "Score: " + scoreNumber;
		choose.GetComponent(UI.Text).text = "Choose your hand:";

		handPaper.GetComponent.<Renderer>().enabled = true;
		handScissors.GetComponent.<Renderer>().enabled = true;
		handRock.GetComponent.<Renderer>().enabled = true;
	}

	if (player1Play == true && player2Play == false) {
		winImage.GetComponent.<Renderer>().enabled = true;
		servermessage.text = "Waiting for\nother player playing...";
		choose.GetComponent(UI.Text).text = "";
		scoreText.GetComponent(UI.Text).text = "";
	}

	if (player1Play == true && player2Play == true) {
		winImage.GetComponent.<Renderer>().enabled = false;
		servermessage.text = "";

//		menu.GetComponent(UI.Text).text = "";
		choose.GetComponent(UI.Text).text = "";
		scoreText.GetComponent(UI.Text).text = "";
		playerPlayed();
	}

	if(message.Contains('"Fight!"'))
		{
			OtherPlayer();
		}

		if (message != oldmessage) {
			Debug.Log(message);
			oldmessage = message;
		}

}

function lobbyDestroyed()
{
	winImage.GetComponent.<Renderer>().enabled = true;
	servermessage.text = "Other player leave...";
	yield WaitForSeconds (2);
	socket.Send('{"request": "quit"}');
	Debug.Log("Send: request quit");
	queue = 0;
	socket.Close();
	SceneManagement.SceneManager.LoadScene("SceneMultiPlayer");
	return;
}

function lobbyLeft()
{
	winImage.GetComponent.<Renderer>().enabled = true;
	servermessage.text = "Other player leave...\nRedirect to menu";
	yield WaitForSeconds (2);
	queue = 1;
	SceneManagement.SceneManager.LoadScene("SceneMultiPlayer");
}

function checkTouch(pos){
		var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
		var touchPos : Vector2 = new Vector2(wp.x, wp.y);
		var hit = Physics2D.OverlapPoint(touchPos);

		if(hit){
				Debug.Log(hit.transform.gameObject.name);

				if (hit.transform.gameObject.name == "handPaper")
				{
					bigHand = bigHandPaper;
					player1Play = true;
					socket.Send('{"action": "paper"}');
					Debug.Log("Send: Action Paper");

					Destroy(handScissors);
					Destroy(handPaper);
					Destroy(handRock);
				}
				else if (hit.transform.gameObject.name == "handScissors")
				{
					bigHand = bigHandScissors;
					player1Play = true;
					socket.Send('{"action": "scissors"}');
					Debug.Log("Send: Action Scissors");

					Destroy(handScissors);
					Destroy(handPaper);
					Destroy(handRock);
				}
				else if (hit.transform.gameObject.name == "handRock")
				{
					bigHand = bigHandRock;
					player1Play = true;
					socket.Send('{"action": "rock"}');
					Debug.Log("Send: Action Rock");

					Destroy(handScissors);
					Destroy(handPaper);
					Destroy(handRock);
				}

				if (hit.transform.gameObject.name == "PlayAgain")
				{
					socket.Send('{"request": "quit"}');
					Debug.Log("Send: request quit");
					queue = 0;
					socket.Close();
					SceneManagement.SceneManager.LoadScene("SceneMultiPlayer");
					return;
				}
				else if (hit.transform.gameObject.name == "Menu")
				{
					socket.Send('{"request": "quit"}');
					Debug.Log("Send: request quit");
					queue = 0;
					socket.Close();
					SceneManagement.SceneManager.LoadScene("SceneMenu");
					return;
				}
		}
}


function playerPlayed() {

	ennemyBigHand.GetComponent.<Renderer>().enabled = true;
	bigHand.GetComponent.<Renderer>().enabled = true;

	bigHand.transform.Translate(Vector2.up * 5f * Time.deltaTime);
	ennemyBigHand.transform.Translate(Vector2.up * 5f * Time.deltaTime);
	if (bigHand.transform.position.y > -2.3) {
		player1Play = false;
		player2Play = false;

		win = generateWinner();
		showWinner(win);
		}
}

function generateWinner() {
	Debug.Log(bigHand.name);
	Debug.Log(ennemyBigHand.name);

	if (bigHand.name == "bigHandPaper" && ennemyBigHand.name == "ennemyBigHandRock") {
		return (1);
	}
	else if (bigHand.name == "bigHandPaper" && ennemyBigHand.name == "ennemyBigHandPaper") {
		return (0);
	}
	else if (bigHand.name == "bigHandPaper" && ennemyBigHand.name == "ennemyBigHandScissors") {
		return (2);
	}
	else if (bigHand.name == "bigHandRock" && ennemyBigHand.name == "ennemyBigHandRock") {
		return (0);
	}
	else if (bigHand.name == "bigHandRock" && ennemyBigHand.name == "ennemyBigHandPaper") {
		return (2);
	}
	else if (bigHand.name == "bigHandRock" && ennemyBigHand.name == "ennemyBigHandScissors") {
		return (1);
	}
	else if (bigHand.name == "bigHandScissors" && ennemyBigHand.name == "ennemyBigHandRock") {
		return (2);
	}
	else if (bigHand.name == "bigHandScissors" && ennemyBigHand.name == "ennemyBigHandPaper") {
		return (1);
	}
	else if (bigHand.name == "bigHandScissors" && ennemyBigHand.name == "ennemyBigHandScissors") {
		return (0);
	}
	return (-1);
}

function showWinner(win) {

	yield WaitForSeconds (0.5);

	if (win == 0) {
		winText.text = "Draws";
	}
	else if (win == 1) {
		scoreNumber++;
		winText.text = "YOU win!";
	}
	else if (win == 2) {
		winText.text = "You lose..";
	}

	winImage.GetComponent.<Renderer>().enabled = true;
	textPlayAgain.text = "Play Again";
}

function OtherPlayer() {
	if (message == '{"code":21,"other_player_weapon":"rock","msg":"Fight!"}')
	{
		ennemyBigHand = ennemyBigHandRock;
			player2Play = true;
	}
	else if (message == '{"code":21,"other_player_weapon":"paper","msg":"Fight!"}')
	{
		ennemyBigHand = ennemyBigHandPaper;
		player2Play = true;
	}
	else if (message == '{"code":21,"other_player_weapon":"scissors","msg":"Fight!"}')
	{
		ennemyBigHand = ennemyBigHandScissors;
		player2Play = true;
	}
}
