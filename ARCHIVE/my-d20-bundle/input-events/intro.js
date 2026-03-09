'use strict';

const { Broadcast } = require('ranvier');

/**
 * Main login intro event
 */
module.exports = {
  event: state => socket => {
    // 1. Define your collection of banners
    const banners = [
      // Banner 1: Neon Portal
      "<bold><magenta>    .  .  .  .  .  .  .  . </magenta>\n" +
      "<bold><cyan>   : !! </bold><white>d20Ranvier</white><bold><cyan> !! : </bold>\n" +
      "<bold><magenta>    '  '  '  '  '  '  '  ' </magenta>",

      // Banner 2: Emerald D20
      "<green>          _     </green>\n" +
      "<green>         / \\    </green>\n" +
      "<bold><white>        / 20\\   </white></bold> <yellow>d20Ranvier</yellow>\n" +
      "<green>        \\   /   </green>\n" +
      "<green>         \\_/    </green>",

      // Banner 3: Minimalist
      "<bold><white>--- [ d20Ranvier: A Multiversal Odyssey ] ---</white></bold>",

      // Banner 4: The Glitch
      "<bold><magenta> d2</magenta><red>0R</red><cyan>anv</cyan><blue>ier </blue></bold>\n"+
      "<bold><red>  _ _ _ </red><magenta> _ ___ </magenta><blue> ____ </blue></bold>\n"+
      "<cyan> | |__ \\|  _ \\ __ _ _ ____ </cyan>\n"+
      "<blue> __| |  ) | |_) / _` | '_ \\ \\ / / </blue>\n"+
      "<magenta>/ _` | / /|  _ < (_| | | | \\ V / </magenta>\n"+
      "<red>\\__,_|_|__|_| \\_\\__,_|_| |_|\\_/ </red>",

      // Banner 5: The Castle Keep
      "<white>       |ZZzzz                                </white>\n"+
      "<white>       |      </white><bold><white>   _      _      _   </white></bold><white>       |ZZzzz </white>\n"+
      "<white>       |_     </white><bold><white>  | |    | |    | |  </white></bold><white>      _|      </white>\n"+
      "<white>     _ | | _  </white><bold><white>  | |    | |    | |  </white></bold><white>   _ | | _    </white>\n"+
      "<white>    | |_| |_| </white><bold><white> [ d 2 0 R a n v i e r ] </white></bold><white> |_| |_| |   </white>\n"+
      "<white>    |         </white><bold><white>  |_|    |_|    |_|  </white></bold><white>         |   </white>",

      // Banner 6: The Dragon's Breath
      "<red>      _,   _  </red>\n"+
      "<red>     /  `./ ) </red><yellow>     ___      ___      </yellow>\n"+
      "<red>    |  -  _-) </red><yellow>    ( d20Ranvier )    </yellow>\n"+
      "<red>     \\ '--'   </red><yellow>     ---      ---      </yellow>\n"+
      "<red>      )  (  </red><bold><red>     / \\ </red></bold>\n"+
      "<red>     /    \\ </red><bold><red>    /   \\ </red></bold>",

      // Banner 7: Starfield
      "<bold><white>  * </white></bold><white>      .          <bold>+</bold>          .       *  \n" +
      "    .      </white><bold><cyan>--- d20Ranvier ---</cyan></white><white>       .      \n" +
      "        +         .          *          <bold>+</bold>    \n" +
      "  .          *          .          .           </white>",

      // Banner 8: Lich
      "<white>      ______\n"+
      "   .-      -.\n"+
      "  /  <bold><red>x    x</red></bold>  \\     <bold><white>d20Ranvier</white></bold>\n"+
      " |            |    <white>REANIMATING...</white>\n"+
      " |   <bold><white>_    _</white></bold>   |\n"+
      "  \\  <bold><white>'(==)'</white></bold>  /\n"+
      "   '._    _.'\n"+
      "      '--'</white>",

      // Banner 9: The Great Eye
      "<green>    _  _   _  _\n"+
      "<green>(/)(/)</green> <magenta>_</magenta> <green>(/)(/)</green>\n"+
      "<green>  \\ \\ </green><magenta>/ \\</magenta><green> / / </green>    <bold><white>THE BEHOLDER</white></bold>\n"+
      "<magenta>   (  <bold><white>O</white></bold>  )  </magenta>    <yellow>d20Ranvier</yellow>\n"+
      "<magenta>    \\_ _/ </magenta>",

      // Banner 10: The Faerie Grove
      "<green>      _\\/_\n"+
      "<magenta>((*))</magenta>\n"+
      "<green>  _\\/_ </green><yellow>*</yellow> <green>_\\/_</green>     <bold><magenta>~ d20Ranvier ~</magenta></bold>\n"+
      "<magenta>  ((*)) </magenta><green>/\\</green>        <italic><white>The Fey Realm</white></italic>\n"+
      "<green>  /\\  </green><yellow>*</yellow>",

      // Banner 11: Cyberpunk Grid
      "<bold><cyan>      __________      __________  </cyan>\n"+
      "<magenta>     / d20      \\    /  Ranvier  \\ </magenta>\n"+
      "<cyan>    /____________\\  /____________\\ </cyan>\n"+
      "<bold><magenta>    >_ SYSTEM_BOOT: MULTIVERSE_LINK_OK</magenta></bold>",

      // Banner 12: Star Wars (Twin Suns / X-Wing)
      "<white>          _     </white>\n"+
      "<white>    =( _ )=   </white><yellow>  .   O </yellow>\n"+
      "<bold><white>      / \\     </white></bold><red>  _______</red>\n"+
      "<white>   --'---'--  </white><red> /       \\</red>\n"+
      "<bold><yellow> d 2 0 R a n v i e r </yellow></bold>",

      // Banner 13: Warhammer 40k (Imperial Aquila)
      "<bold><yellow>  _V_               _V_  </yellow>\n"+
      "<yellow> ( \\ \\_           _/ / ) </yellow>\n"+
      "<yellow>  \\ \\_ \\   _V_   / _/ /  </yellow>\n"+
      "<yellow>   \\ \\_ \\ (   ) / _/ /   </yellow>\n"+
      "<white>    [  d20Ranvier  ]     </white>\n"+
      "<bold><red>    FOR THE EMPEROR </red></bold>",

      // Banner 14: The Eldritch Ritual
      "<bold><magenta>        .   .\n"+
      "       / \\ / \\\n"+
      "      ( <bold><red>@</red></bold> v <bold><red>@</red></bold> )  </magenta></bold> <bold><white>d20Ranvier</white></bold>\n"+
      "<bold><magenta>       \\     /   </magenta></bold> <magenta>REWRITING REALITY...</magenta>\n"+
      "<bold><gray>  <<<=======>>>  </gray></bold>",

      // Banner 15: The Digital Gate (TRON-style)
      "<cyan>      _______  _______ \n"+
      "     |       ||       |\n"+
      "     |  <bold>d20</bold>   || <bold>Ranvier</bold> |\n"+
      "     |   _   ||   _   |\n"+
      "     |  | |  ||  | |  |\n"+
      "<bold><blue> ____| |_|  ||  |_| |____ </blue></bold>\n"+
      "<blue>|________________________| </blue>"
    ];

    // 2. Pick a random one
    const randomBanner = banners[Math.floor(Math.random() * banners.length)];

    // 3. Display it to the player
    Broadcast.sayAt(socket, randomBanner);
    Broadcast.sayAt(socket, "Welcome to the Multiverse. Please enter your name:");

    // Proceed to the next login step
    return socket.emit('login', socket);
  }
};
