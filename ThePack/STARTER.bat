@echo off
title Inactive
color 1b
:clear
cls
echo Type anything to start the server:
echo.
:command
set /p s="Enter command: "
goto :start
:start
color 2a
title Launching World
start /b launch_world.bat
title Launching Login
ping localhost -w 100 >nul
start /b launch_login.bat
title Launching Channel
ping localhost -w 100 >nul
start /b launch_channel.bat
title Done
ping localhost -w 100 >nul
color b
title Fully Active