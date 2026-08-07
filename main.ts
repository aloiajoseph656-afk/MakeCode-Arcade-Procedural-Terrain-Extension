namespace proceduralLand {
    /**
     * Generates procedural terrain across a tilemap.
     * @param heightChange maximum terrain height change per column
     * @param surfaceMin minimum surface height
     * @param surfaceMax maximum surface height
     * @param surfaceBlock surface tile
     * @param layer2Block second terrain layer
     * @param layer3Block deep terrain layer
     * @param layer2Height depth of the second layer
     * @param tilemapHeight height of the tilemap in tiles
     * @param tilemapWidth width of the tilemap in tiles
     */
    //% block="generate procedural land|height change $heightChange surface min $surfaceMin surface max $surfaceMax surface $surfaceBlock layer 2 $layer2Block layer 3 $layer3Block layer 2 depth $layer2Height tilemap height $tilemapHeight tilemap width $tilemapWidth"
    //% heightChange.defl=1
    //% surfaceMin.defl=5
    //% surfaceMax.defl=10
    //% layer2Height.defl=3
    //% tilemapHeight.defl=16
    //% tilemapWidth.defl=16
    //% heightChange.min=0 heightChange.max=10
    //% surfaceMin.min=0 surfaceMin.max=100
    //% surfaceMax.min=0 surfaceMax.max=100
    //% layer2Height.min=0 layer2Height.max=100
    //% tilemapHeight.min=1 tilemapHeight.max=100
    //% tilemapWidth.min=1 tilemapWidth.max=100
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
            } else if (currentHeight < surfaceMin) {
                currentHeight = surfaceMin
            }

            for (let y = 0; y < tilemapHeight; y++) {

                if (y < currentHeight) {
                    tiles.setTileAt(
                        tiles.getTileLocation(x, y),
                        image.create(16, 16)
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
