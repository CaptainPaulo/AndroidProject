var platform : RuntimePlatform = Application.platform;

var scoreText : GameObject;
var win: int;

var winImage: GameObject;
var winText: UI.Text;
var textPlayAgain: UI.Text;
var textExit: UI.Text;

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
var playerPlay : boolean;

private var pos : float;

function Start () {

	scoreText = GameObject.Find("Score");
	scoreText.GetComponent(UI.Text).text = "Score: " + scoreNumber;

	yield WaitForSeconds (0.15);

	playerPlay = false;

	winImage = GameObject.Find("winner");

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

	ennemyBigHandRock = GameObject.Find("ennemyBigHandRock");
	ennemyBigHandPaper = GameObject.Find("ennemyBigHandPaper");
	ennemyBigHandScissors = GameObject.Find("ennemyBigHandScissors");

	winImage.GetComponent.<Renderer>().enabled = false;

	ennemyBigHandRock.GetComponent.<Renderer>().enabled = false;
	ennemyBigHandPaper.GetComponent.<Renderer>().enabled = false;
	ennemyBigHandScissors.GetComponent.<Renderer>().enabled = false;

	bigHandRock.GetComponent.<Renderer>().enabled = false;
	bigHandPaper.GetComponent.<Renderer>().enabled = false;
	bigHandScissors.GetComponent.<Renderer>().enabled = false;

	}

function Update () {

	if(platform == RuntimePlatform.Android || platform == RuntimePlatform.IPhonePlayer){
			if(Input.touchCount > 0) {
					if(Input.GetTouch(0).phase == TouchPhase.Began){
							checkTouch(Input.GetTouch(0).position);
					}
			}
	}else if(platform == RuntimePlatform.WindowsEditor){
			if(Input.GetMouseButtonDown(0)) {
					checkTouch(Input.mousePosition);
			}
	}
	if (playerPlay == true) {
		Destroy(menu);
		Destroy(choose);
		Destroy(scoreText);
		playerPlayed();
	}
}

function checkTouch(pos){
		var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
		var touchPos : Vector2 = new Vector2(wp.x, wp.y);
		var hit = Physics2D.OverlapPoint(touchPos);

		if(hit){
				Debug.Log(hit.transform.gameObject.name);

				if (hit.transform.gameObject.name == "handPaper")
					bigHand = bigHandPaper;
				else if (hit.transform.gameObject.name == "handScissors")
					bigHand = bigHandScissors;
				else if (hit.transform.gameObject.name == "handRock")
					bigHand = bigHandRock;

				if (hit.transform.gameObject.name == "PlayAgain")
				{
					SceneManagement.SceneManager.LoadScene("SceneSinglePlayer");
					return;
				}
				else if (hit.transform.gameObject.name == "Exit")
				{
					SceneManagement.SceneManager.LoadScene("SceneMenu");
					return;
				}
				else if (hit.transform.gameObject.name == "Menu")
				{
					SceneManagement.SceneManager.LoadScene("SceneMenu");
					return;
				}

				Destroy(handRock);
				Destroy(handPaper);
				Destroy(handScissors);

				playerPlay = true;

				PlayIA();
		}
}


function playerPlayed() {
	bigHand.transform.Translate(Vector2.up * 5f * Time.deltaTime);
	ennemyBigHand.transform.Translate(Vector2.up * 5f * Time.deltaTime);
	if (bigHand.transform.position.y > -2.3) {
		playerPlay = false;
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

	yield WaitForSeconds (1);

	if (win == 0) {
		winText.text = "Draws";
	}
	else if (win == 1) {
		scoreNumber++;
		winText.text = "Player win";
	}
	else if (win == 2) {
		winText.text = "IA win";
	}

	textPlayAgain.text = "Play Again";
	textExit.text= "Exit";
	winImage.GetComponent.<Renderer>().enabled = true;
}

function PlayIA() {

	ennemy = Random.Range(0, 3);
	if (ennemy == 0)
		ennemyBigHand = ennemyBigHandRock;
	if (ennemy == 1)
		ennemyBigHand = ennemyBigHandPaper;
	if (ennemy == 2)
		ennemyBigHand = ennemyBigHandScissors;

	ennemyBigHand.GetComponent.<Renderer>().enabled = true;
	bigHand.GetComponent.<Renderer>().enabled = true;
}
