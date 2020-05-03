function love.load()
    Object = require "lib.classic"
    require "player"
    require "npc"
    require "bullet"

    player = Player()
    npc = Npc()
    listOfBullets = {}
end

function love.update(dt)
    player:update(dt)
    npc:update(dt)

    for i,v in ipairs(listOfBullets) do
        v:update(dt)

        -- check collision if bullet alive
        if (v.status == BULLET_STATUSES.ALIVE) then
            --Each bullets checks if there is collision with the enemy
            v:checkCollision(npc)
        end

        --If the bullet has the property dead and it's true then..
        if v.status == BULLET_STATUSES.DEAD then
            --Remove it from the list
            table.remove(listOfBullets, i)
        end
    end
end

function love.draw()
    player:draw()
    npc:draw()

    for i,v in ipairs(listOfBullets) do
        v:draw()
    end
end

function love.keypressed(key)
    player:keyPressed(key)
end