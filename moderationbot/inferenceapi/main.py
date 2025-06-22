from typing import Optional, Dict, Any
from fastapi import FastAPI, Response, status
from pydantic import BaseModel, Field

app = FastAPI()

class MessageEntry(BaseModel):
    content: str
    message_ID: str = Field(..., alias="messageID")
    author_ID: str = Field(..., alias="authorID")
    author_username: str = Field(..., alias="authorUsername")
    channel_ID: str = Field(..., alias="channelID")
    channel_name: str = Field(..., alias="channelName")
    guild_ID: str = Field(..., alias="guildID")
    guild_name: str = Field(..., alias="guildName")
    msg_created_timestamp: str = Field(..., alias="msgCreatedTimestamp")# milliseconds since 1970-01-01
    author_time_in_server: Optional[str] = Field(None, alias="authorTimeInServer")# may be "unknown" if member has left
    message_length: str = Field(..., alias="messageLength")
    word_count: str = Field(..., alias="wordCount")
    has_link: str = Field(..., alias="hasLink")
    has_mention: str = Field(..., alias="hasMention")
    num_roles: str = Field(..., alias="numRoles")
    is_default_message: str = Field(..., alias="isDefaultMessage")

    class Config:
      validate_by_name = True

@app.get("/")
def health():
    return {"status": "alive"}

@app.post("/echo")
async def echo(entry: MessageEntry):
    probability = 0.99
    message = entry.content
    return {"message": message, "verdict": str(0), "probability": str(probability)} 

@app.post("/predict")
async def call_model(entry: MessageEntry): 
    # time_since_join = int(entry.author_time_in_server) - int(entry.msg_created_timestamp)

    if int(entry.word_count) <= 3:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    elif int(entry.message_type) == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    
     # ... otherwise call the ML model and return the prediction

