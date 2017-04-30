# Chifoumi Server

Naive implementation of the chifoumi game in Ruby using WebSocket.

## How to use

Both request and response are in the JSON format.

### Lauch the server

```ruby
ruby server.rb
```

### Connect to the server

```javascript
socket = new WebSocket("ws://localhost:8080")

socket.onmessage = function(msg){
    console.log(msg.data)
}
```

### Join a game

#### Request

```javascript
socket.send('{"request": "register"}')
```

#### Response

If no player is available:
```javascript
{"code":10,"msg":"Waiting for a player..."}
```

If a player is available:
```javascript
{"code":11,"game_id":42,"msg":"Game start!"}
```

### Play

#### Request

```javascript
socket.send('{"action": "scissors"}')
```

#### Response

Player A will receive:
 
 ```javascript
{"code":20,"msg":"Waiting other player to play..."}
```

Player B will receive:

```javascript
{"code":28,"msg":"Other player played."}
```

After player B played (for example scissors) he will receive 2 messages:

```javascript
{"code":21,"other_player_weapon":"rock","msg":"Fight!"}
{"code":23,"score":0,"msg":"You LOSE! :("}
```

Player A will receive:

```javascript
{"code":21,"other_player_weapon":"scissors","msg":"Fight!"}
{"code":22,"score":1,"msg":"You WIN! :)"}
```

### Replay and leave the game

When the game is finished, the client should send a request to inform the other player if he wants to continue the game or not.

#### Replay

##### Request

```javascript
socket.send('{"request": "replay"}')
```

##### Response

```javascript
{"code":12, "msg":"Waiting for other player choice..."}
```

If the other player also sends a `replay` request, a new game will restart. If not, both player will be placed in the queue.


#### Leave

##### Request

```javascript
socket.send('{"request": "leave"}')
```

##### Response

If no other player are available in the queue:

```javascript
{"code":10,"msg":"Waiting for a player..."}
```

Else:

```javascript
{"code":11,"game_id":1478,"msg":"Game start!"}
```