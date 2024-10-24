# Objectify

## purpose 
The goal of this project is to create a sharing and give-away app built on top of the NOSTR protocol.

Other services exist online for sharing goods between people:
- Olio    
- Facebook Marketplace
- even Instagram is used for some sales and give-aways

there are sure to be more examples. What they all have in common is that they are so called "walled gardens". The data that they create within their application ecosystem is not accessible from the outside. It is only accessible through their application interface.

NOSTR protocol provides a means of creating interoperable applications. A sharing and give-away platform is best suited in an ecosystem which is interoperable and open the way NOSTR is. This means that while our project can start defining good standards of use, other projects can start their own applications for their tailored use cases but following the same standards. This means that we can achieve true network effects while working on disparate applications, because we adhere to the same protocol and have access to the same data through relays.


## code
This application will make use of the NOSTR protocol.
- For an overview of the NOSTR protocol: https://github.com/nostr-protocol/nostr
- For an overview of the NOSTR NIPS: https://github.com/nostr-protocol/nips
- For a NOSTR Development Kit, NDK: https://github.com/nostr-dev-kit/ndk
- For a React NDK: https://github.com/nostr-dev-kit/ndk-react 

This project is a fork of the React Native Boilerplate repository, https://thecodingmachine.github.io/react-native-boilerplate/, for the file structure.

This project uses gluestack-ui component library, https://gluestack.io/, for basic, useful and pretty components.

## Features and Functionality

### objects
Each object created by a user will use a standardized formatting. For example, we could already use a formatting which has been proposed for what they call "classified listings" from ![NOSTR NIP 99](https://github.com/nostr-protocol/nips/blob/master/99.md). 

```jsonc
{
  "kind": 30402,
  "created_at": 1675642635,
  // Markdown content
  "content": "Lorem [ipsum][nostr:nevent1qqst8cujky046negxgwwm5ynqwn53t8aqjr6afd8g59nfqwxpdhylpcpzamhxue69uhhyetvv9ujuetcv9khqmr99e3k7mg8arnc9] dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nRead more at nostr:naddr1qqzkjurnw4ksz9thwden5te0wfjkccte9ehx7um5wghx7un8qgs2d90kkcq3nk2jry62dyf50k0h36rhpdtd594my40w9pkal876jxgrqsqqqa28pccpzu.",
  "tags": [
    ["d", "lorem-ipsum"],
    ["title", "Lorem Ipsum"],
    ["published_at", "1296962229"],
    ["t", "electronics"],
    ["image", "https://url.to.img", "256x256"],
    ["summary", "More lorem ipsum that is a little more than the title"],
    ["location", "NYC"],
    ["price", "100", "USD"],
    [
      "e",
      "b3e392b11f5d4f28321cedd09303a748acfd0487aea5a7450b3481c60b6e4f87",
      "wss://relay.example.com"
    ],
    [
      "a",
      "30023:a695f6b60119d9521934a691347d9f78e8770b56da16bb255ee286ddf9fda919:ipsum",
      "wss://relay.nostr.org"
    ]
  ],
  "pubkey": "...",
  "id": "..."
}
```

Screens:
- Explorer
    - 