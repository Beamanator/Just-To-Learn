Bullet = Object:extend()

BULLET_STATUSES = {
    ALIVE = 'alive', SPLAT = 'splat', DEAD = 'dead'
}

function Bullet:new(x, y)
    -- self.image = love.graphics.newImage("assets/bullet.png")
    self.pooImages = love.graphics.newImage("assets/poo_splat.png")
    local frame_size = 64
    self.mainQuad = love.graphics.newQuad(0, 0, frame_size, frame_size, self.pooImages:getWidth(), self.pooImages:getHeight())
    self.splatQuad = love.graphics.newQuad(0, frame_size, frame_size, frame_size, self.pooImages:getWidth(), self.pooImages:getHeight())

    self.x = x
    self.y = y
    self.speed = 700
    --We'll need these for collision checking
    -- self.width = self.image:getWidth()
    -- self.height = self.image:getHeight()
    self.width = frame_size
    self.height = frame_size
    -- poop status
    self.status = BULLET_STATUSES.ALIVE
    self.splatLife = 0
end

function Bullet:update(dt)
    -- only move vertically if bullet is not a splat
    if self.status == BULLET_STATUSES.ALIVE then
        self.y = self.y + self.speed * dt
    end

    -- determine how long splat should last
    if (self.status == BULLET_STATUSES.SPLAT) then
        self.splatLife = self.splatLife + dt
        if (self.splatLife >= 1) then
            self.status = BULLET_STATUSES.DEAD
        end
    end


    --If the bullet is out of the screen
    if self.y > love.graphics.getHeight() then
        --Restart the game
        love.load()
    end
end

function Bullet:draw()
    if self.status == BULLET_STATUSES.ALIVE then
        love.graphics.draw(self.pooImages, self.mainQuad, self.x, self.y)
    elseif self.status == BULLET_STATUSES.SPLAT then
        love.graphics.draw(self.pooImages, self.splatQuad, self.x, self.y)
    end
end

function Bullet:checkCollision(obj)
    local self_left = self.x
    local self_right = self.x + self.width
    local self_top = self.y
    local self_bottom = self.y + self.height

    local obj_left = obj.x
    local obj_right = obj.x + obj.width
    local obj_top = obj.y
    local obj_bottom = obj.y + obj.height

    if self_right > obj_left and
    self_left < obj_right and
    self_bottom > obj_top and
    self_top < obj_bottom then
        --Should display splat in next game clock iteration
        self.status = BULLET_STATUSES.SPLAT
        --Force splats to same height
        self.y = love.graphics.getHeight() - 64

        --Increase enemy speed
        if obj.speed > 0 then
            obj.speed = obj.speed + 50
        else
            obj.speed = obj.speed - 50
        end
    end
end