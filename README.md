# Objectify

```
yarn start
```

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
Each object created by a user will use a standardized formatting. For example, we could already use a formatting which has been proposed for what they call "classified listings" from [NOSTR NIP 99](https://github.com/nostr-protocol/nips/blob/master/99.md). 

```jsonc
{
  "kind": 30402,
  "created_at": 1675642635,
  // Markdown content
  "content": "An example of an item that can be posted through this app we are developing.",
  "tags": [
    ["d", "some identifier if needed"],
    ["title", "example object"],
    ["published_at", "1296962229"],
    ["t", "clothing"],
    ["image", "https://url.to.img", "256x256"],
    ["summary", "My favourite pair of pants no longer fit me :("],
    ["location", "8001, Zurich"],
    ["price", "0", "CHF"],
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

### inventory
One screen in the app should show users the objects that they have created which we call the "inventory". They should be able to modify the details of their objects if needed. I imagine this as a scroll view, or gallery view screen.

### object discovery
Users should be able to discover the items of other nearby users. This will be done by referring to local relays for event subscriptions. The main screen where users can discover the items of nearby users will be a swiping screen so that users can swipe through objects. There should also be a search screen with a gallery view. 

#### filters
Discovering objects can be done by searching through tags and key words in the object symmary and title.
Another way that objects can be filtered is through user social graphs. A user's social graph is defined by the npubs that the user follows. Objects can be displayed for a given depth which specified the depth of the social graph generated by looking at increasingly more followers of followers.