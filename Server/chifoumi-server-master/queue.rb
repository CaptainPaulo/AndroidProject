require './game'

module Chifoumi
  class Queue
    attr_reader :players

    def initialize
      @players = []
    end

    def add_player(player)
      @players << player
      if enough_players?
        pair_players
      else
        @players.last.notify({code: CODE[:waiting_queue], msg: 'Waiting for a player...'})
      end
    end

    def pair_players
      Game.new(@players.pop, @players.pop, self).start
    end

    def size
      @players.count
    end

    def enough_players?
      @players.count.even?
    end

    private :pair_players
  end
end