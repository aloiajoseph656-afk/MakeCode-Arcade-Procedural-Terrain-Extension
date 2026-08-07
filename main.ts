namespace proceduralLand {
    //% color="#5B8C5A" icon="\uf1b2"
    //% block="Procedural Land"
    namespace Terrain {

        /**
         * Generates procedural terrain across the current tilemap.
         */
        //% block="generate terrain height change $heightChange surface min $surfaceMin surface max $surfaceMax surface $surfaceBlock layer 2 $layer2Block layer 3 $layer3Block layer 2 depth $layer2Height tilemap height $tilemapHeight tilemap width $tilemapWidth"
        //% heightChange.defl=1
        //% surfaceMin.defl=1
        //% surfaceMax.defl=4
        //% layer2Height.defl=5
        //% tilemapHeight.defl=16
        //% tilemapWidth.defl=16
        //% surfaceBlock.shadow=tile
        //% layer2Block.shadow=tile
        //% layer3Block.shadow=tile
        //% group="Terrain"
        export function generate(
            heightChange: number,
            surfaceMin: number,
            surfaceMax: number,
            surfaceBlock: Image,
            layer2Block: Image,
            layer3Block: Image,
            layer2Height: number,
            tilemapHeight: number,
            tilemapWidth: number
        ) {
            let currentHeight = randint(surfaceMin, surfaceMax)

            for (let x = 0; x < tilemapWidth; x++) {

                if (x > 0) {
                    currentHeight += randint(-heightChange, heightChange)
                }

                if (currentHeight > surfaceMax) {
                    currentHeight = surfaceMax
                }

                if (currentHeight < surfaceMin) {
                    currentHeight = surfaceMin
                }

                for (let y = 0; y < tilemapHeight; y++) {

                    if (y < currentHeight) {
                        tiles.setTileAt(
                            tiles.getTileLocation(x, y),
                            img`
                                . . . . . . . .
                                . . . . . . . .
                                . . . . . . . .
                                . . . . . . . .
                                . . . . . . . .
                                . . . . . . . .
                                . . . . . . . .
                                . . . . . . . .
                            `
                        )

                        tiles.setWallAt(
                            tiles.getTileLocation(x, y),
                            false
                        )

                    } else if (y == currentHeight) {
                        tiles.setTileAt(
                            tiles.getTileLocation(x, y),
                            surfaceBlock
                        )

                        tiles.setWallAt(
                            tiles.getTileLocation(x, y),
                            true
                        )

                    } else if (y <= currentHeight + layer2Height) {
                        tiles.setTileAt(
                            tiles.getTileLocation(x, y),
                            layer2Block
                        )

                        tiles.setWallAt(
                            tiles.getTileLocation(x, y),
                            true
                        )

                    } else {
                        tiles.setTileAt(
                            tiles.getTileLocation(x, y),
                            layer3Block
                        )

                        tiles.setWallAt(
                            tiles.getTileLocation(x, y),
                            true
                        )
                    }
                }
            }
        }
    }
}

