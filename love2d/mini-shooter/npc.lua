Npc = Object:extend()

local img_height = 16 * 3

function Npc:new()
    self.image = love.graphics.newImage("assets/boy.png")
    self.x = 325
    self.y = love.graphics.getHeight()
    self.speed = 100
    self.scale = 3
    self.width = self.image:getWidth() * 3
    self.height = self.image:getHeight() * 3
end

function Npc:update(dt)
    self.x = self.x + self.speed * dt 

    local window_width = love.graphics.getWidth()

    if self.x < 0 then
        self.x = 0
        self.speed = -self.speed
    elseif self.x + self.width > window_width then
        self.x = window_width - self.width
        self.speed = -self.speed
    end
end

function Npc:draw()
    love.graphics.draw(self.image, self.x, self.y - img_height - 20, 0, self.scale, self.scale)
end