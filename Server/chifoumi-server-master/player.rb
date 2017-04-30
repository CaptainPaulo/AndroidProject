module Chifoumi
  class Player
    attr_accessor :socket, :score, :played, :weapon, :replay, :leave
    attr_reader   :id
    def initialize(ws)
      @id = rand(5000)
      @socket = ws
      @score = 0
      @played = false
      @replay = false
      @leave = false
    end

    def notify(data)
      @socket.send(JSON.dump(data))
    end

    def win_game
      notify({code: CODE[:player_win_game], msg: "You rocks! You win #{@score} rounds."})
    end

    def lose_game
      notify({code: CODE[:player_lose_game], msg: 'You sucks! You lose'})
    end

    def draw_game
      notify({code: CODE[:player_draw_game], msg: 'DRAW GAME! :|'})
    end

    def win
      @score += 1
      notify({code: CODE[:player_win_round], score: @score, msg: 'You WIN! :)'})
    end

    def lose
      notify({code: CODE[:player_lose_round], score: @score, msg: 'You LOSE! :('})
    end

    def draw
      notify({code: CODE[:player_draw_round], msg: 'Draw! :|'})
    end

    def assign_weapon(weapon)
      self.weapon = weapon
      self.played = true
    end
  end
end