Interact with this application like so:

        $ ./music

        Welcome to your music collection!

        > add "Ride the Lightning" "Metallica"

        Added "Ride the Lightning" by Metallica

        > add "Licensed to Ill" "Beastie Boys"

        Added "Licensed to Ill" by Beastie Boys

        > add "Pauls Boutique" "Beastie Boys"

        Added "Pauls Boutique" by Beastie Boys

        > add "The Dark Side of the Moon" "Pink Floyd"

        Added "The Dark Side of the Moon" by Pink Floyd

        > show all

        "Ride the Lightning" by Metallica (unplayed)
        "Licensed to Ill" by Beastie Boys (unplayed)
        "Pauls Boutique" by Beastie Boys (unplayed)
        "The Dark Side of the Moon" by Pink Floyd (unplayed)

        > play "Licensed to Ill"

        You're listening to "Licensed to Ill"

        > play "The Dark Side of the Moon"

        You're listening to "The Dark Side of the Moon"

        > show all

        "Ride the Lightning" by Metallica (unplayed)
        "Licensed to Ill" by Beastie Boys (played)
        "Pauls Boutique" by Beastie Boys (unplayed)
        "The Dark Side of the Moon" by Pink Floyd (played)

        > show unplayed

        "Ride the Lightning" by Metallica
        "Pauls Boutique" by Beastie Boys

        > show all by "Beastie Boys"

        "Licensed to Ill" by Beastie Boys (played)
        "Pauls Boutique" by Beastie Boys (unplayed)

        > show unplayed by "Beastie Boys"

        "Pauls Boutique" by Beastie Boys

        > quit

        Bye!

        $

--------------------------

As shown above, the program should accept the following commands:

- **add "$title" "$artist"**: adds an album to the collection with the given title and artist. All albums are unplayed by default.
- **play "$title"**: marks a given album as played.
- **show all**: displays all of the albums in the collection
- **show unplayed**: display all of the albums that are unplayed
- **show all by "$artist"**: shows all of the albums in the collection by the given artist
- **show unplayed by "$artist"**: shows the unplayed albums in the collection by the given artist
- **quit**: quits the program
