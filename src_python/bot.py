# bot.py
import os

from discord.ext.commands import Bot
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

initial_extensions = ['cogs.todo',
                      'cogs.todo',
                      'cogs.todo']

class MrRoboto(Bot):
    async def on_ready(self):
        pass

    async def on_disconnect(self):
        pass

if __name__ == '__main__':
    bot = MrRoboto('?')
    
    for extension in initial_extensions:
        bot.load_extension(extension)

    bot.run(TOKEN, bot=True, reconnect=True)