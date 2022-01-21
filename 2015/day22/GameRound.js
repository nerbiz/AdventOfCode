import Utilities from '../../Utilities.js';
import GameWins from './GameWins.js';

export default class GameRound
{
    /**
     * This class handles 1 round, containing a player and boss turn
     * @param {object} player
     * @param {object} boss
     * @param {array} allSpells
     * @param {array} castedSpells
     * @param {object} newSpell
     * @constructor
     */
    constructor(player, boss, allSpells, castedSpells, newSpell)
    {
        // Use cloning, because different game progressions are used
        this.player = Utilities.clone(player);
        this.boss = Utilities.clone(boss);
        this.allSpells = allSpells;
        this.castedSpells = Utilities.clone(castedSpells);
        this.newSpell = Utilities.clone(newSpell);
    }

    /**
     * Start the player and boss turns
     * @returns {void}
     */
    start()
    {
        // Before casting a new spell, see if the mana spending is already higher than the lowest
        const manaCost = this.castedSpells.map(spell => spell.cost)
            .reduce((sum, cost) => sum + cost, 0)
            + this.newSpell.cost;

        if (manaCost >= GameWins.lowestManaCost) {
            return;
        }

        if (this.playerTurn() === true) {
            return;
        }

        if (this.bossTurn() === true) {
            return;
        }

        // Get any ongoing spells (can't cast duplicates)
        const ongoingSpellNames = this.castedSpells
            .filter(spell => spell.turns > 0)
            .map(spell => spell.name);

        const availableSpells = this.allSpells.filter(spell =>
            this.player.mana >= spell.cost && ! ongoingSpellNames.includes(spell.name));

        // Boss wins if player can't afford any spells
        if (availableSpells.length === 0) {
            GameWins.bossWon(this.castedSpells);
            return;
        }

        for (const spell of availableSpells) {
            const gameRound = new GameRound(
                this.player,
                this.boss,
                this.allSpells,
                this.castedSpells,
                spell
            );

            gameRound.start();
        }
    }

    /**
     * Apply a spell
     * @param {object} spell
     * @returns {void}
     */
    useSpell(spell)
    {
        this.boss.hitPoints -= spell.damage;
        this.player.hitPoints += spell.heal;
        this.player.mana += spell.mana;

        // Prevent other spells from overwriting armor
        if (spell.armor > 0) {
            this.player.armor = spell.armor;
        }

        spell.turns = Math.max(0, spell.turns - 1);
    };

    /**
     * Do things before the plauyer or boss turn
     * @returns {boolean} Whether the player or boss won
     */
    preTurn()
    {
        // Armor can be raised with an ongoing spell
        this.player.armor = 0;

        // Apply any ongoing spells
        this.castedSpells
            .filter(spell => spell.turns > 0)
            .forEach(spell => {
                this.useSpell(spell);
            });

        // Stop if the player won
        if (this.checkWin() === true) {
            return true;
        }

        return false;
    }

    /**
     * Check if the player or boss won
     * @returns {boolean}
     */
    checkWin()
    {
        if (this.boss.hitPoints <= 0) {
            GameWins.playerWon(this.castedSpells);
            return true;
        } else if (this.player.hitPoints <= 0) {
            GameWins.bossWon(this.castedSpells);
            return true;
        }

        return false;
    }

    /**
     * Do the player turn
     * @returns {boolean} Whether the player or boss won
     */
    playerTurn()
    {
        // Stop if the boss won
        if (this.checkWin() === true) {
            return true;
        }

        // Apply all ongoing pre-turn effects, stop if the player won
        if (this.preTurn() === true) {
            return true;
        }

        // Cast the new spell
        this.castedSpells.push(this.newSpell);
        this.player.mana -= this.newSpell.cost;

        // Apply the spell if it should be immediately
        if (this.newSpell.immediate === true) {
            this.useSpell(this.newSpell);
        }

        // Stop if the player won
        if (this.checkWin() === true) {
            return true;
        }

        return false;
    }

    /**
     * Do the boss turn
     * @returns {boolean} Whether the player or boss won
     */
    bossTurn()
    {
        // Apply all ongoing pre-turn effects, stop if the player won
        if (this.preTurn() === true) {
            return true;
        }

        // Reduce player hit points (damage - armor)
        this.player.hitPoints -= (this.boss.damage - this.player.armor);

        // Stop if the boss won
        if (this.checkWin() === true) {
            return true;
        }

        return false;
    }
}
