function buildCastle() {
    const CASTLE_POSITION = player.position()
    const CASTLE_DIAMETER = 5

    function createPane(block_type: Block, diameter: number, zIndex: number, holeDiameter: number) {
        let corner = CASTLE_POSITION.add(pos(-diameter, zIndex, -diameter))
        let border = diameter * 2 + 1
        for (let i = 0; i < border; i++) {
            for (let j = 0; j < border; j++) {
                if (Math.abs(i - diameter) >= holeDiameter || Math.abs(j - diameter) >= holeDiameter) {
                    blocks.place(block_type, corner.add(pos(i, 0, j)))
                }
            }
        }
    }

    function buildBridge() {
        let startPoint = CASTLE_POSITION.add(pos(-CASTLE_DIAMETER, -1, -1))

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                blocks.place(Block.Obsidian, startPoint.add(pos(-i, 0, j)))
            }
        }
    }

    function cutOutWindow(startPoint: Position, width: number, height: number, xAxis: boolean, fill: boolean) {
        let block = fill ? GLASS_PANE : AIR
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (xAxis) {
                    blocks.place(block, startPoint.add(pos(i, j, 0)))
                } else {
                    blocks.place(block, startPoint.add(pos(0, j, i)))
                }
            }
        }
    }

    function stairs() {
        blocks.place(Block.StoneBrickStairs, CASTLE_POSITION.add(pos(-1,0,CASTLE_DIAMETER-1)))
        blocks.place(Block.StoneBrickStairs, CASTLE_POSITION.add(pos(0,1,CASTLE_DIAMETER-1)))
        blocks.place(Block.StoneBrickStairs, CASTLE_POSITION.add(pos(1,2,CASTLE_DIAMETER-1)))

        blocks.place(Block.StoneBrickStairs, CASTLE_POSITION.add(pos(-1,4,CASTLE_DIAMETER-1)))
        blocks.place(Block.StoneBrickStairs, CASTLE_POSITION.add(pos(0,5,CASTLE_DIAMETER-1)))
        blocks.place(Block.StoneBrickStairs, CASTLE_POSITION.add(pos(1,6,CASTLE_DIAMETER-1)))

        blocks.place(Block.Air, CASTLE_POSITION.add(pos(-1,3,CASTLE_DIAMETER-1)))
        blocks.place(Block.Air, CASTLE_POSITION.add(pos(0,3,CASTLE_DIAMETER-1)))
        blocks.place(Block.Air, CASTLE_POSITION.add(pos(1,3,CASTLE_DIAMETER-1)))
        blocks.place(Block.Air, CASTLE_POSITION.add(pos(-1,7,CASTLE_DIAMETER-1)))
        blocks.place(Block.Air, CASTLE_POSITION.add(pos(0,7,CASTLE_DIAMETER-1)))
        blocks.place(Block.Air, CASTLE_POSITION.add(pos(1,7,CASTLE_DIAMETER-1)))
    }

    function tower(startingPos: Position) {
        let corner = startingPos.add(pos(-1,0,-1))
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let z = 0; z < 5; z++) {
                    blocks.place(Block.MossyCobblestoneWall, startingPos.add(pos(i,z,j)))
                }
            }
        }
    }

    createPane(Block.MossyStoneBricks, CASTLE_DIAMETER + 3, -1, CASTLE_DIAMETER + 3)
    createPane(Block.MossyStoneBricks, CASTLE_DIAMETER + 3, -2, 0)
    createPane(Block.Water, CASTLE_DIAMETER + 2, -1, CASTLE_DIAMETER + 1)
    createPane(Block.Stone, CASTLE_DIAMETER, -1, 0)
    buildBridge()
    createPane(Block.Stone, CASTLE_DIAMETER, 0, CASTLE_DIAMETER)
    createPane(Block.Stone, CASTLE_DIAMETER, 1, CASTLE_DIAMETER)
    createPane(Block.Stone, CASTLE_DIAMETER, 2, CASTLE_DIAMETER)
    createPane(Block.Stone, CASTLE_DIAMETER, 3, 0)
    createPane(Block.Bricks, CASTLE_DIAMETER, 4, CASTLE_DIAMETER)
    createPane(Block.Bricks, CASTLE_DIAMETER, 5, CASTLE_DIAMETER)
    createPane(Block.Bricks, CASTLE_DIAMETER, 6, CASTLE_DIAMETER)
    createPane(Block.Bricks, CASTLE_DIAMETER, 7, 0)
    createPane(Block.MossyCobblestoneWall, CASTLE_DIAMETER, 8, CASTLE_DIAMETER)
    cutOutWindow(CASTLE_POSITION.add(pos(-CASTLE_DIAMETER, 0, -1)), 3, 3, false, false)
    cutOutWindow(CASTLE_POSITION.add(pos(CASTLE_DIAMETER, 1, -1)), 3, 2, false, true)
    cutOutWindow(CASTLE_POSITION.add(pos(-1, 5, -CASTLE_DIAMETER)), 3, 2, true, true)
    cutOutWindow(CASTLE_POSITION.add(pos(-1, 5, CASTLE_DIAMETER)), 3, 2, true, true)
    cutOutWindow(CASTLE_POSITION.add(pos(CASTLE_DIAMETER, 5, -1)), 3, 2, false, true)
    stairs()
    tower(CASTLE_POSITION.add(pos(CASTLE_DIAMETER -2,8,CASTLE_DIAMETER-2)))
    tower(CASTLE_POSITION.add(pos(-CASTLE_DIAMETER,8,CASTLE_DIAMETER-2)))
    tower(CASTLE_POSITION.add(pos(CASTLE_DIAMETER -2,8,-CASTLE_DIAMETER)))
    tower(CASTLE_POSITION.add(pos(-CASTLE_DIAMETER,8,-CASTLE_DIAMETER)))
}

player.onChat("build", function () {
    buildCastle()
})
