Player = Object:extend()

local frame_size = 128
local frameNumber = 1
local walkingFrameNumber = 1

function loadFrames(bbyImageAll)
    local frames = {}

    -- right-move-1
    table.insert(frames,
        love.graphics.newQuad(0, 0, frame_size, frame_size, bbyImageAll:getWidth(), bbyImageAll:getHeight()))
    -- right-move-2
    table.insert(frames,
        love.graphics.newQuad(frame_size, 0, frame_size, frame_size, bbyImageAll:getWidth(), bbyImageAll:getHeight()))
    -- go
    table.insert(frames,
        love.graphics.newQuad(0, frame_size, frame_size, frame_size, bbyImageAll:getWidth(), bbyImageAll:getHeight()))
    -- come
    table.insert(frames,
        love.graphics.newQuad(frame_size, frame_size, frame_size, frame_size, bbyImageAll:getWidth(), bbyImageAll:getHeight()))
    
    return frames
end

function Player:new()
    self.image = love.graphics.newImage("assets/bby_all.png")
    self.frames = loadFrames(self.image)
    -- self.image = love.graphics.newImage("assets/girl.png")
    self.x = 300
    self.y = 20
    self.speed = 500
    -- self.width = self.image:getWidth() * 3
    self.quadWidth = 64;
    self.scale = 1
    self.scaleDir = 1
end

function Player:update(dt)
    local is_moving = true
    if love.keyboard.isDown("left") then
        self.x = self.x - self.speed * dt
        self.scaleDir = -1
        frameNumber = frameNumber + dt * 4
    elseif love.keyboard.isDown("right") then
        self.x = self.x + self.speed * dt
        self.scaleDir = 1
        frameNumber = frameNumber + dt * 4
    elseif love.keyboard.isDown("space") then
        frameNumber = 3
        is_moving = false
    else
        -- therefore, baby should look forward
        frameNumber = 4
        self.scaleDir = 1
        is_moving = false
    end

    -- frame number is between 1 and 2.99999
    if frameNumber >= 3 and is_moving then
        frameNumber = 1
    end

    --Get the width of the window
    window_width = love.graphics.getWidth()

    --If the x is too far too the left then..
    if self.x < 0 then
        --Set x to 0
        self.x = 0

    --Else, if the right side is too far to the right then..
    elseif self.x + self.quadWidth > window_width then
        --Set the right side to the window's width.
        self.x = window_width - self.quadWidth
    end
end

function Player:draw()
    -- with frames:
    local frame_index = math.floor(frameNumber)
    love.graphics.draw(self.image, self.frames[frame_index], self.x, self.y, 0, self.scale * self.scaleDir, self.scale, frame_size/2)
    -- before frames:
    -- love.graphics.draw(self.image, self.x, self.y, 0, self.scale, self.scale)
end

function Player:keyPressed(key)
    --If the spacebar is pressed
    if key == "space" then
        --Put a new instance of Bullet inside listOfBullets.
        table.insert(listOfBullets, Bullet(self.x - frame_size / 4, self.y + frame_size - 20))
    end
end