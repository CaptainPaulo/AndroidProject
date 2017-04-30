require 'eventmachine'
require 'em-websocket'
require 'json'
# noinspection RubyResolve
require './player'
# noinspection RubyResolve
require './queue'

module Chifoumi
  CODE = {
    waiting_queue: 10,
    game_starting: 11,
    waiting_player_choice: 12,
    waiting_player: 20,
    fight: 21,
    player_win_round: 22,
    player_lose_round: 23,
    player_win_game: 24,
    player_lose_game: 25,
    player_draw_round: 26,
    player_draw_game: 27,
    player_played: 28
  }.freeze

  queue = Queue.new

  EM.run do
    EM::WebSocket.start(host: '0.0.0.0', port: 8080) do |ws|
      ws.onopen do |handshake|
        puts 'New client connected!'
      end
      ws.onmessage do |msg|
        puts msg
        req = JSON.parse(msg)
        case req['request']
        when 'register'
          queue.add_player(Player.new(ws))
        end
      end
    end
  end
end