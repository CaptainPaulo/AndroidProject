module Chifoumi
  class Game
    MAX_ROUND = 3
    attr_reader :id

    def initialize(player_one, player_two, queue)
      @id = rand(5000)
      @round = 0
      @player_one = player_one
      @player_two = player_two
      [@player_one, @player_two].each do |player|
        player.leave = false
        player.replay = false
        player.notify(code: CODE[:game_starting], game_id: @id, msg: 'Game start!')
      end
      @queue = queue
    end

    def opponent_of(player)
      @player_two == player ? @player_one : @player_two
    end

    def start
      [@player_one, @player_two].each do |current_player|
        other_player = opponent_of(current_player)
        current_player.socket.onmessage do |msg|
          req = JSON.parse(msg)
          if req['action']
            handle_actions(current_player, other_player, req)
          elsif req['request']
            handle_requests(current_player, other_player, req)
          end
        end
      end
    end

    def handle_actions(current_player, other_player, req)
      current_player.assign_weapon(req['action'])
      if other_player.played
        current_player.notify(code: CODE[:fight], other_player_weapon: other_player.weapon, msg: 'Fight!')
        other_player.notify(code: CODE[:fight], other_player_weapon: current_player.weapon, msg: 'Fight!')
        fight
      else
        current_player.notify(code: CODE[:waiting_player], msg: 'Waiting other player to play...')
        #other_player.notify(code: CODE[:player_played], msg: 'Other player played.')
      end
    end

    def handle_requests(current_player, other_player, req)
      case req['request']
      when 'replay'
        puts 'replay'
        replay(current_player)
      when 'leave'
        puts 'leave'
        current_player.leave = true
        @queue.add_player(current_player)
        other_player.notify(code: 13, msg: 'Lobby destroyed.')
        @queue.add_player(other_player)
      when 'quit'
        puts 'quit'
        current_player.leave = true
        other_player.notify(code: 13, msg: 'Lobby destroyed.')
        @queue.add_player(other_player)
      end
    end

    def replay(current_player)
      other_player = opponent_of(current_player)
      current_player.replay = true
      if other_player.replay
        restart
      elsif other_player.leave
        @queue.add_player(current_player)
      else
        current_player.notify(code: CODE[:waiting_player_choice], msg: 'Waiting for other player choice...')
      end
    end

    def restart
      [@player_one, @player_two].each do |player|
        player.score = 0
        player.leave = false
        player.replay = false
        player.notify(code: CODE[:game_starting], game_id: @id, msg: 'Game start!')
      end
      @round = 0
    end

    def finish
      if @player_one.score > @player_two.score
        @player_one.win_game
        @player_two.lose_game
      elsif @player_two.score > @player_one.score
        @player_one.lose_game
        @player_two.win_game
      else
        [@player_one, @player_two].each(&:draw_game)
      end
    end

    def fight
      #case @player_one.weapon
      #when 'rock'
      #  rock
      #when 'scissors'
      #  scissors
      #when 'paper'
      #  paper
      #end
      @player_one.played = false
      @player_two.played = false
      @round += 1
      finish if @round == MAX_ROUND
    end

    def paper
      case @player_two.weapon
      when 'rock'
        @player_two.lose
        @player_one.win
      when 'scissors'
        @player_one.lose
        @player_two.win
      else
        [@player_one, @player_two].each(&:draw)
      end
    end

    def scissors
      case @player_two.weapon
      when 'paper'
        @player_two.lose
        @player_one.win
      when 'rock'
        @player_one.lose
        @player_two.win
      else
        [@player_one, @player_two].each(&:draw)
      end
    end

    def rock
      case @player_two.weapon
      when 'scissors'
        @player_two.lose
        @player_one.win
      when 'paper'
        @player_one.lose
        @player_two.win
      else
        [@player_one, @player_two].each(&:draw)
      end
    end

    private :opponent_of, :fight, :rock, :paper, :scissors, :finish, :handle_actions, :handle_requests
  end
end