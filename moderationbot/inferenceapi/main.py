from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel, Field
from model.model import classify_sentence

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
    msg_created_timestamp: str = Field(..., alias="msgCreatedTimestamp") # milliseconds since 1970-01-01
    author_time_in_server: Optional[str] = Field(None, alias="authorTimeInServer") # may be "unknown" if member has left
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

@app.post("/predict")
async def call_model(entry: MessageEntry): 
    message = entry.content
    
    label, prob = classify_sentence(message)
    prob = round(prob[label],3)*100

    if label == 0:
        return {"message": message, "verdict": str(0), "confidence": str(prob) + "%"} 
    if label == 1:
        if prob < 95:
            return {"message": message, "verdict": str(2), "confidence": str(prob) + "%"} 
        else: 
            return {"message": message, "verdict": str(1), "confidence": str(prob) + "%"} 