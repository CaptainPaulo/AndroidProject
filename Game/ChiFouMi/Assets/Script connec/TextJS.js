#pragma strict
import WebSocketSharp;

function Start () {
	var socket = new WebSocket("ws://192.168.0.102:8080");
	socket.OnMessage += function(sender, e) {
		Debug.Log(e.Data);
	};
	socket.Connect();

	socket.Send('{"request": "register"}');
}

function Update () {

}
