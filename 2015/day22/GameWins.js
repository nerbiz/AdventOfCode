export default class GameWins
{
    static player = [];
    static boss = [];
    static lowestManaCost = Infinity;

    /**
     * Register a game won by the player
     * @param {array} castedSpells
     * @returns {void}
     */
    static playerWon(castedSpells)
    {
        this.player.push(castedSpells);

        const manaUsed = castedSpells.map(spell => spell.cost)
            .reduce((sum, cost) => sum + cost, 0);

        this.lowestManaCost = Math.min(this.lowestManaCost, manaUsed);
    }

    /**
     * Register a game won by the boss
     * @param {array} castedSpells
     * @returns {void}
     */
     static bossWon(castedSpells)
     {
         this.boss.push(castedSpells);
     }
}
